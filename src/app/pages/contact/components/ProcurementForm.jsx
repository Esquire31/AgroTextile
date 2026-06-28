'use client';

import { useState } from 'react';
import { Package, Leaf, Send, ArrowRight, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getCountries, getCountryCallingCode, isValidPhoneNumber } from 'libphonenumber-js';
import en from 'react-phone-number-input/locale/en.json';

// ─────────────────────────────────────────────────────────────────
// EMAIL DELIVERY SETUP (read this before deploying)
//
// This form sends submissions straight to an email address using
// Web3Forms — chosen because it's genuinely free forever, requires
// zero backend/server code, and sends directly from the browser
// via a single fetch() call. (Formspree is the other well-known
// option but has a smaller free tier and more setup friction.)
//
// To make this live:
//   1. Go to https://web3forms.com and enter the email address you
//      want submissions sent to. They'll email you a free Access Key
//      — no account/password needed, just email verification.
//   2. Paste that key into WEB3FORMS_ACCESS_KEY below.
//
// Every form-to-email service (Web3Forms, Formspree, etc.) requires
// an access key like this — there's no way to send email from a
// public website without one, otherwise anyone could spam through
// your form. The key only allows submissions INTO your inbox, it
// can't be used to read your email or send arbitrary mail elsewhere.
// ─────────────────────────────────────────────────────────────────
const WEB3FORMS_ACCESS_KEY = '1e678b49-c3d8-460e-bff5-3683e95c36ab';

// Full country list built from libphonenumber-js's real metadata —
// every ISO country code it supports, each with its actual dial
// code and an English display name. This replaces a hand-typed
// 10-country list with the complete, accurate set (240+ countries),
// in "IN +91 India" style. libphonenumber-js itself ships no React
// component and no CSS, so this works identically regardless of
// React version and never touches any existing styling — only the
// <select>/<option> markup below (built with the site's existing
// classes) renders it.
const COUNTRY_LIST = getCountries()
  .map((isoCode) => ({
    isoCode,
    dialCode: `+${getCountryCallingCode(isoCode)}`,
    name: en[isoCode] || isoCode,
  }))
  .sort((a, b) => a.name.localeCompare(b.name));

export default function ProcurementForm() {
  const [focusedLabel, setFocusedLabel] = useState(null);
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    countryIso: 'IN',
    phone: '',
    sector: 'Industrial Textiles & Protective Gear',
    details: '',
  });

  const [errors, setErrors] = useState({});

  const services = [
    {
      icon: Package,
      title: 'Agro-Textile Logistics',
      description: 'Request technical specs for industrial fabrics and geotextiles.',
    },
    {
      icon: Leaf,
      title: 'Fresh Fruit Export',
      description: 'Volume pricing and cold-chain logistics for international shipments.',
    },
  ];

  // Email: requires something + "@" + something + "." + something
  // (e.g. name@domain.com) — stricter than the browser's loose
  // type="email" check, which would accept "a@b" with no TLD.
  const validateEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  // Phone: validated against the selected country's real numbering
  // rules via libphonenumber-js, instead of a flat "exactly 10
  // digits" check — 10 digits is only correct for India; UK, UAE,
  // Germany, and most other countries use different lengths.
  const validatePhone = (value, countryIso) => {
    if (!value) return false;
    try {
      return isValidPhoneNumber(value, countryIso);
    } catch {
      return false;
    }
  };

  const handlePhoneChange = (e) => {
    // Strip everything except digits as the person types — still
    // digits-only input, just no longer capped at a fixed length,
    // since the correct length depends on which country is selected.
    const digitsOnly = e.target.value.replace(/\D/g, '');
    setFormData((prev) => ({ ...prev, phone: digitsOnly }));
    if (errors.phone) setErrors((prev) => ({ ...prev, phone: null }));
  };

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: null }));
  };

  const validate = () => {
    const next = {};
    if (!formData.name.trim()) next.name = 'Required';
    if (!validateEmail(formData.email)) next.email = 'Enter a valid email (e.g. name@company.com)';
    if (!validatePhone(formData.phone, formData.countryIso)) {
      next.phone = `Enter a valid phone number for ${en[formData.countryIso] || formData.countryIso}`;
    }
    if (!formData.details.trim()) next.details = 'Required';
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

  return (
    <section className="py-section-gap">
      <div className="max-w-container-max mx-auto px-margin-mobile sm:px-margin-desktop">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="font-headline-lg text-headline-lg text-on-surface mb-8">Procurement Inquiry</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-12">
              Our specialized trade consultants are ready to assist with your specific textile or agricultural requirements. Please provide your procurement details below.
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
            `}</style>

            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label
                    className={`font-label-sm text-label-sm uppercase text-on-surface-variant transition-colors ${
                      focusedLabel === 'name' ? 'text-primary' : ''
                    }`}
                  >
                    Full Name
                  </label>
                  <input
                    value={formData.name}
                    onChange={handleChange('name')}
                    onFocus={() => setFocusedLabel('name')}
                    onBlur={() => setFocusedLabel(null)}
                    className="procurement-field w-full bg-surface-container text-on-surface border rounded-lg p-4 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                    style={{ borderColor: fieldBorder(errors.name) }}
                    type="text"
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
                    Business Email
                  </label>
                  <input
                    value={formData.email}
                    onChange={handleChange('email')}
                    onFocus={() => setFocusedLabel('email')}
                    onBlur={() => setFocusedLabel(null)}
                    className="procurement-field w-full bg-surface-container text-on-surface border rounded-lg p-4 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                    style={{ borderColor: fieldBorder(errors.email) }}
                    type="email"
                    placeholder="name@company.com"
                  />
                  {errors.email && (
                    <p className="text-xs procurement-field-error-text flex items-center gap-1">
                      <AlertCircle size={12} /> {errors.email}
                    </p>
                  )}
                </div>
              </div>

              {/* Phone — country selector (default India, IN +91)
                  using real libphonenumber-js data for every
                  supported country, + a number input validated
                  against that specific country's actual numbering
                  rules (not a flat 10-digit assumption) */}
              <div className="space-y-2">
                <label
                  className={`font-label-sm text-label-sm uppercase text-on-surface-variant transition-colors ${
                    focusedLabel === 'phone' ? 'text-primary' : ''
                  }`}
                >
                  Phone Number
                </label>
                <div className="flex">
                  <select
                    value={formData.countryIso}
                    onChange={handleChange('countryIso')}
                    onFocus={() => setFocusedLabel('phone')}
                    onBlur={() => setFocusedLabel(null)}
                    className="procurement-field bg-surface-container text-on-surface border rounded-l-lg pl-3 pr-2 py-4 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all appearance-none shrink-0 w-28 sm:w-36 truncate"
                    style={{ borderColor: fieldBorder(errors.phone), borderRight: 'none' }}
                  >
                    {COUNTRY_LIST.map((c) => (
                      <option key={c.isoCode} value={c.isoCode}>
                       {c.dialCode} {c.name}
                      </option>
                    ))}
                  </select>
                  <input
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    onFocus={() => setFocusedLabel('phone')}
                    onBlur={() => setFocusedLabel(null)}
                    className="procurement-field w-full bg-surface-container text-on-surface border rounded-r-lg p-4 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all tabular-nums"
                    style={{ borderColor: fieldBorder(errors.phone) }}
                    type="tel"
                    inputMode="numeric"
                    placeholder="Phone number"
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
                  Select Sector
                </label>
                <select
                  value={formData.sector}
                  onChange={handleChange('sector')}
                  onFocus={() => setFocusedLabel('sector')}
                  onBlur={() => setFocusedLabel(null)}
                  className="procurement-field w-full bg-surface-container text-on-surface border rounded-lg p-4 focus:ring-2 focus:ring-primary focus:border-transparent outline-none appearance-none transition-all"
                  style={{ borderColor: 'color-mix(in srgb, var(--color-outline-variant) 30%, transparent)' }}
                >
                  <option>Industrial Textiles & Protective Gear</option>
                  <option>Fresh Produce & Agro-Logistics</option>
                  <option>Custom ESG Compliance Sourcing</option>
                </select>
              </div>

              <div className="space-y-2">
                <label
                  className={`font-label-sm text-label-sm uppercase text-on-surface-variant transition-colors ${
                    focusedLabel === 'details' ? 'text-primary' : ''
                  }`}
                >
                  Procurement Details
                </label>
                <textarea
                  value={formData.details}
                  onChange={handleChange('details')}
                  onFocus={() => setFocusedLabel('details')}
                  onBlur={() => setFocusedLabel(null)}
                  className="procurement-field w-full bg-surface-container text-on-surface border rounded-lg p-4 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  style={{ borderColor: fieldBorder(errors.details) }}
                  placeholder="Volume, destination, and technical requirements..."
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
                      Processing...
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
                      Submitted
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
                      Initiate Inquiry
                      <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>

              {status === 'error' && (
                <p className="text-sm procurement-field-error-text flex items-center gap-2 justify-center">
                  <AlertCircle size={14} />
                  Something went wrong — please try again or email us directly.
                </p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}