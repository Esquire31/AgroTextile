'use client';

import { useState, useRef, useEffect } from 'react';
import { Package, Leaf, Send, ArrowRight, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getCountries, getCountryCallingCode, isValidPhoneNumber } from 'libphonenumber-js/max';
import en from 'react-phone-number-input/locale/en.json';
import { useIntl } from 'react-intl';

const WEB3FORMS_ACCESS_KEY = process.env.WEB3_ACCESS_KEY;

const COUNTRY_LIST = getCountries()
  .map((isoCode) => ({
    isoCode,
    dialCode: `+${getCountryCallingCode(isoCode)}`,
    name: en[isoCode] || isoCode,
  }))
  .sort((a, b) => a.name.localeCompare(b.name));

// Letters (any language) and spaces only — blocks digits and special
// characters as the person types, rather than only validating on submit.
const sanitizeName = (value) => value.replace(/[^\p{L}\s]/gu, '');

export default function ProcurementForm() {
  const { formatMessage } = useIntl();
  const [focusedLabel, setFocusedLabel] = useState(null);
  const [status, setStatus] = useState('idle');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    countryIso: 'IN',
    phone: '',
    sector: 'Industrial Textiles & Protective Gear',
    details: '',
  });

  const [errors, setErrors] = useState({});

  const [countryOpen, setCountryOpen] = useState(false);
  const [countryQuery, setCountryQuery] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const countryBoxRef = useRef(null);
  const countrySearchRef = useRef(null);
  const optionRefs = useRef([]);

  const selectedCountry = COUNTRY_LIST.find((c) => c.isoCode === formData.countryIso);

  const filteredCountries = (() => {
    const q = countryQuery.trim().toLowerCase();
    if (!q) return COUNTRY_LIST;
    return COUNTRY_LIST.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.isoCode.toLowerCase().includes(q) ||
        c.dialCode.includes(q) ||
        c.dialCode.replace('+', '').includes(q)
    );
  })();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (countryBoxRef.current && !countryBoxRef.current.contains(e.target)) {
        setCountryOpen(false);
        setCountryQuery('');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (countryOpen) {
      setHighlightedIndex(0);
      countrySearchRef.current?.focus();
    }
  }, [countryOpen]);

  useEffect(() => {
    optionRefs.current[highlightedIndex]?.scrollIntoView({ block: 'nearest' });
  }, [highlightedIndex]);

  const selectCountry = (isoCode) => {
    setFormData((prev) => ({ ...prev, countryIso: isoCode }));
    if (errors.phone) setErrors((prev) => ({ ...prev, phone: null }));
    setCountryOpen(false);
    setCountryQuery('');
  };

  const handleCountrySearchKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex((i) => Math.min(i + 1, filteredCountries.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredCountries[highlightedIndex]) {
        selectCountry(filteredCountries[highlightedIndex].isoCode);
      }
    } else if (e.key === 'Escape') {
      setCountryOpen(false);
      setCountryQuery('');
    }
  };

  const services = [
    {
      icon: Package,
      title: formatMessage({ id: 'app.pages.contact.form.services.logistics.title' }),
      description: formatMessage({ id: 'app.pages.contact.form.services.logistics.description' }),
    },
    {
      icon: Leaf,
      title: formatMessage({ id: 'app.pages.contact.form.services.fruit.title' }),
      description: formatMessage({ id: 'app.pages.contact.form.services.fruit.description' }),
    },
  ];

  const validateEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const validatePhone = (value, countryIso) => {
    if (!value) return false;
    try {
      return isValidPhoneNumber(value, countryIso);
    } catch {
      return false;
    }
  };

  const handlePhoneChange = (e) => {
    const digitsOnly = e.target.value.replace(/\D/g, '');
    setFormData((prev) => ({ ...prev, phone: digitsOnly }));
    if (errors.phone) setErrors((prev) => ({ ...prev, phone: null }));
  };

  // Name: strips digits/special characters live, so they physically
  // can't be typed in — not just flagged after the fact.
  const handleNameChange = (e) => {
    const cleaned = sanitizeName(e.target.value);
    setFormData((prev) => ({ ...prev, name: cleaned }));
    if (errors.name) setErrors((prev) => ({ ...prev, name: null }));
  };

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: null }));
  };

  const validate = () => {
    const next = {};
    if (!formData.name.trim()) {
      next.name = formatMessage({ id: 'app.pages.contact.form.validation.required' });
    } else if (!/^[\p{L}\s]+$/u.test(formData.name)) {
      next.name = formatMessage({ id: 'app.pages.contact.form.validation.name_invalid' });
    }
    if (!validateEmail(formData.email)) next.email = formatMessage({ id: 'app.pages.contact.form.validation.email_invalid' });
    if (!validatePhone(formData.phone, formData.countryIso)) {
      next.phone = formatMessage(
        { id: 'app.pages.contact.form.validation.phone_invalid' },
        { country: en[formData.countryIso] || formData.countryIso }
      );
    }
    if (!formData.details.trim()) next.details = formatMessage({ id: 'app.pages.contact.form.validation.required' });
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('submitting');

    try {
      const dialCode = `+${getCountryCallingCode(formData.countryIso)}`;
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `New Procurement Inquiry — ${formData.name}`,
          from_name: formData.name,
          name: formData.name,
          email: formData.email,
          phone: `${dialCode} ${formData.phone}`,
          sector: formData.sector,
          message: formData.details,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setStatus('success');
        setFormData({
          name: '',
          email: '',
          countryIso: 'IN',
          phone: '',
          sector: 'Industrial Textiles & Protective Gear',
          details: '',
        });
        setTimeout(() => setStatus('idle'), 4000);
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const fieldBorder = (hasError) =>
    hasError
      ? 'color-mix(in srgb, var(--color-error) 60%, transparent)'
      : 'color-mix(in srgb, var(--color-outline-variant) 30%, transparent)';

  optionRefs.current = [];

  return (
    <section id="procurement-form" className="py-section-gap scroll-mt-28">
      <div className="max-w-container-max mx-auto px-margin-mobile sm:px-margin-desktop">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="font-headline-lg text-headline-lg text-on-surface mb-8">{formatMessage({ id: 'app.pages.contact.form.title' })}</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-12">
              {formatMessage({ id: 'app.pages.contact.form.subtitle' })}
            </p>
            <div className="space-y-6">
              {services.map((service, idx) => {
                const Icon = service.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    className="flex gap-4 p-6 glass-panel rounded-lg hover:border-primary/40 transition-colors cursor-pointer group"
                  >
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-all">
                      <Icon size={20} />
                    </div>
                    <div>
                      <h4 className="font-title-md text-title-md text-on-surface mb-1">{service.title}</h4>
                      <p className="text-on-surface-variant">{service.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="p-6 sm:p-10 glass-panel rounded-xl shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Send size={120} />
            </div>

            <style>{`
              .procurement-field::placeholder {
                color: color-mix(in srgb, var(--color-on-surface-variant) 70%, transparent);
              }
              .procurement-field-error-text {
                color: var(--color-error);
              }
              /* Glossy dial-code button: soft top-light gradient +
                 inner highlight ring + subtle depth on hover/active,
                 all built from the existing --color-primary token so
                 it stays on-brand instead of introducing new colors. */
              .country-select-btn {
                background:
                  linear-gradient(180deg,
                    color-mix(in srgb, var(--color-primary) 14%, var(--color-surface-container)) 0%,
                    var(--color-surface-container) 55%
                  );
                box-shadow:
                  inset 0 1px 0 color-mix(in srgb, white 25%, transparent),
                  inset 0 -1px 0 color-mix(in srgb, black 8%, transparent);
                transition: background 0.25s ease, box-shadow 0.25s ease, transform 0.15s ease;
              }
              .country-select-btn:hover {
                background:
                  linear-gradient(180deg,
                    color-mix(in srgb, var(--color-primary) 22%, var(--color-surface-container)) 0%,
                    var(--color-surface-container) 55%
                  );
              }
              .country-select-btn:active {
                transform: translateY(1px);
                box-shadow:
                  inset 0 1px 2px color-mix(in srgb, black 15%, transparent);
              }
            `}</style>

            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label
                    className={`font-label-sm text-label-sm uppercase text-on-surface-variant transition-colors ${
                      focusedLabel === 'name' ? 'text-primary' : ''
                    }`}
                  >
                    {formatMessage({ id: 'app.pages.contact.form.field.name.label' })}
                  </label>
                  <input
                    value={formData.name}
                    onChange={handleNameChange}
                    onFocus={() => setFocusedLabel('name')}
                    onBlur={() => setFocusedLabel(null)}
                    className="procurement-field w-full bg-surface-container text-on-surface border rounded-lg p-4 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                    style={{ borderColor: fieldBorder(errors.name) }}
                    type="text"
                    inputMode="text"
                    autoCapitalize="words"
                  />
                  {errors.name && (
                    <p className="text-xs procurement-field-error-text flex items-center gap-1">
                      <AlertCircle size={12} /> {errors.name}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label
                    className={`font-label-sm text-label-sm uppercase text-on-surface-variant transition-colors ${
                      focusedLabel === 'email' ? 'text-primary' : ''
                    }`}
                  >
                    {formatMessage({ id: 'app.pages.contact.form.field.email.label' })}
                  </label>
                  <input
                    value={formData.email}
                    onChange={handleChange('email')}
                    onFocus={() => setFocusedLabel('email')}
                    onBlur={() => setFocusedLabel(null)}
                    className="procurement-field w-full bg-surface-container text-on-surface border rounded-lg p-4 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                    style={{ borderColor: fieldBorder(errors.email) }}
                    type="email"
                    placeholder={formatMessage({ id: 'app.pages.contact.form.field.email.placeholder' })}
                  />
                  {errors.email && (
                    <p className="text-xs procurement-field-error-text flex items-center gap-1">
                      <AlertCircle size={12} /> {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label
                  className={`font-label-sm text-label-sm uppercase text-on-surface-variant transition-colors ${
                    focusedLabel === 'phone' ? 'text-primary' : ''
                  }`}
                >
                  {formatMessage({ id: 'app.pages.contact.form.field.phone.label' })}
                </label>
                <div className="flex">
                  <div ref={countryBoxRef} className="relative shrink-0 w-28 sm:w-36">
                    <button
                      type="button"
                      onClick={() => setCountryOpen((o) => !o)}
                      onFocus={() => setFocusedLabel('phone')}
                      onBlur={() => setFocusedLabel(null)}
                      aria-haspopup="listbox"
                      aria-expanded={countryOpen}
                      className="country-select-btn procurement-field relative focus:z-10 w-full text-left text-on-surface border rounded-l-lg pl-3 pr-2 py-4 focus:ring-2 focus:ring-primary focus:border-transparent outline-none truncate"
                      style={{ borderColor: fieldBorder(errors.phone), borderRight: 'none' }}
                    >
                      {selectedCountry ? `${selectedCountry.dialCode} ${selectedCountry.name}` : formData.countryIso}
                    </button>

                    {countryOpen && (
                      <div
                        className="absolute z-20 top-full left-0 mt-1 w-64 max-w-[80vw] bg-surface-container border rounded-lg shadow-xl overflow-hidden"
                        style={{ borderColor: 'color-mix(in srgb, var(--color-outline-variant) 30%, transparent)' }}
                      >
                        <input
                          ref={countrySearchRef}
                          value={countryQuery}
                          onChange={(e) => setCountryQuery(e.target.value)}
                          onKeyDown={handleCountrySearchKeyDown}
                          type="text"
                          placeholder="Search country or code"
                          className="procurement-field w-full bg-surface-container text-on-surface border-b p-3 outline-none"
                          style={{ borderColor: 'color-mix(in srgb, var(--color-outline-variant) 30%, transparent)' }}
                        />
                        <ul role="listbox" className="max-h-56 overflow-y-auto py-1">
                          {filteredCountries.length === 0 && (
                            <li className="px-3 py-2 text-sm text-on-surface-variant">No matches</li>
                          )}
                          {filteredCountries.map((c, idx) => (
                            <li
                              key={c.isoCode}
                              ref={(el) => (optionRefs.current[idx] = el)}
                              role="option"
                              aria-selected={c.isoCode === formData.countryIso}
                            >
                              <button
                                type="button"
                                onClick={() => selectCountry(c.isoCode)}
                                onMouseEnter={() => setHighlightedIndex(idx)}
                                className={`w-full text-left px-3 py-2 text-sm transition-colors ${
                                  idx === highlightedIndex ? 'bg-primary/10 text-primary' : 'text-on-surface'
                                } ${c.isoCode === formData.countryIso ? 'font-semibold' : ''}`}
                              >
                                {c.dialCode} {c.name}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                  <input
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    onFocus={() => setFocusedLabel('phone')}
                    onBlur={() => setFocusedLabel(null)}
                    className="procurement-field relative focus:z-10 w-full bg-surface-container text-on-surface border rounded-r-lg p-4 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all tabular-nums"
                    style={{ borderColor: fieldBorder(errors.phone) }}
                    type="tel"
                    inputMode="numeric"
                    placeholder={formatMessage({ id: 'app.pages.contact.form.field.phone.placeholder' })}
                  />
                </div>
                {errors.phone && (
                  <p className="text-xs procurement-field-error-text flex items-center gap-1">
                    <AlertCircle size={12} /> {errors.phone}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label
                  className={`font-label-sm text-label-sm uppercase text-on-surface-variant transition-colors ${
                    focusedLabel === 'sector' ? 'text-primary' : ''
                  }`}
                >
                  {formatMessage({ id: 'app.pages.contact.form.field.sector.label' })}
                </label>
                <select
                  value={formData.sector}
                  onChange={handleChange('sector')}
                  onFocus={() => setFocusedLabel('sector')}
                  onBlur={() => setFocusedLabel(null)}
                  className="procurement-field w-full bg-surface-container text-on-surface border rounded-lg p-4 focus:ring-2 focus:ring-primary focus:border-transparent outline-none appearance-none transition-all"
                  style={{ borderColor: 'color-mix(in srgb, var(--color-outline-variant) 30%, transparent)' }}
                >
                  <option value="Textiles & Garments">
                    {formatMessage({ id: 'app.pages.contact.form.field.sector.option.industrial' })}
                  </option>
                  <option value="Fresh Produce & Agro Products">
                    {formatMessage({ id: 'app.pages.contact.form.field.sector.option.fresh_produce' })}
                  </option>
                  <option value="Other">
                    {formatMessage({ id: 'app.pages.contact.form.field.sector.option.other' })}
                  </option>
                </select>
              </div>

              <div className="space-y-2">
                <label
                  className={`font-label-sm text-label-sm uppercase text-on-surface-variant transition-colors ${
                    focusedLabel === 'details' ? 'text-primary' : ''
                  }`}
                >
                  {formatMessage({ id: 'app.pages.contact.form.field.details.label' })}
                </label>
                <textarea
                  value={formData.details}
                  onChange={handleChange('details')}
                  onFocus={() => setFocusedLabel('details')}
                  onBlur={() => setFocusedLabel(null)}
                  className="procurement-field w-full bg-surface-container text-on-surface border rounded-lg p-4 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  style={{ borderColor: fieldBorder(errors.details) }}
                  placeholder={formatMessage({ id: 'app.pages.contact.form.field.details.placeholder' })}
                  rows="4"
                ></textarea>
                {errors.details && (
                  <p className="text-xs procurement-field-error-text flex items-center gap-1">
                    <AlertCircle size={12} /> {errors.details}
                  </p>
                )}
              </div>

              <motion.button
                whileTap={{ scale: status === 'idle' ? 0.98 : 1 }}
                disabled={status === 'submitting' || status === 'success'}
                className="w-full bg-primary text-on-primary font-bold py-5 rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-3 group disabled:opacity-90 disabled:cursor-not-allowed"
                style={{ '--tw-shadow-color': 'color-mix(in srgb, var(--color-primary) 30%, transparent)' }}
                type="submit"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {status === 'submitting' && (
                    <motion.span
                      key="submitting"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-3"
                    >
                      <Loader2 size={20} className="animate-spin" />
                      {formatMessage({ id: 'app.pages.contact.form.btn.submitting' })}
                    </motion.span>
                  )}
                  {status === 'success' && (
                    <motion.span
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-3"
                    >
                      <CheckCircle2 size={20} />
                      {formatMessage({ id: 'app.pages.contact.form.btn.success' })}
                    </motion.span>
                  )}
                  {(status === 'idle' || status === 'error') && (
                    <motion.span
                      key="idle"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-3"
                    >
                      {formatMessage({ id: 'app.pages.contact.form.btn.submit' })}
                      <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>

              {status === 'error' && (
                <p className="text-sm procurement-field-error-text flex items-center gap-2 justify-center">
                  <AlertCircle size={14} />
                  {formatMessage({ id: 'app.pages.contact.form.error' })}
                </p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}