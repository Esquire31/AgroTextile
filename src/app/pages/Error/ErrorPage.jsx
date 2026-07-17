import { useMemo, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  Lock,
  CreditCard,
  ShieldOff,
  SearchX,
  Clock,
  Gauge,
  ServerCrash,
  CloudOff,
  FileWarning,
  AlertTriangle,
  RefreshCw,
  LogIn,
  Wallet,
  Home,
} from 'lucide-react';
import { useErrorPage } from '@/app/pages/Error/ErrorContext';

const ERROR_MAP = {
  400: { title: 'Bad Request', message: "The request couldn't be processed as sent. Check the details and try again.", icon: FileWarning, tone: 'warning' },
  401: { title: 'Authentication Required', message: 'Sign in to continue. This area requires a verified account.', icon: Lock, tone: 'warning', action: 'signin' },
  402: { title: 'Payment Required', message: 'This action needs an active plan. Update billing to continue.', icon: CreditCard, tone: 'warning', action: 'billing' },
  403: { title: 'Access Restricted', message: "Your account doesn't have permission to view this page.", icon: ShieldOff, tone: 'danger' },
  404: { title: 'Page Not Found', message: "This route doesn't exist. It may have moved, or the link is outdated.", icon: SearchX, tone: 'primary' },
  408: { title: 'Request Timed Out', message: 'The connection took too long to respond. Try again.', icon: Clock, tone: 'warning', action: 'retry' },
  409: { title: 'Conflict', message: 'This action conflicts with the current state of the resource.', icon: FileWarning, tone: 'warning' },
  429: { title: 'Too Many Requests', message: "You've hit the rate limit. Wait a moment, then retry.", icon: Gauge, tone: 'warning', action: 'retry' },
  500: { title: 'Server Error', message: 'Something failed on our end. Our team has been notified.', icon: ServerCrash, tone: 'danger', action: 'retry' },
  502: { title: 'Bad Gateway', message: 'An upstream service returned an invalid response.', icon: CloudOff, tone: 'danger', action: 'retry' },
  503: { title: 'Service Unavailable', message: "We're temporarily offline for maintenance. Back shortly.", icon: CloudOff, tone: 'danger', action: 'retry' },
  504: { title: 'Gateway Timeout', message: "The upstream server didn't respond in time.", icon: CloudOff, tone: 'danger', action: 'retry' },
};

const DEFAULT_ERROR = {
  title: 'Unexpected Error',
  message: 'Something went wrong. Try again or return to the homepage.',
  icon: AlertTriangle,
  tone: 'danger',
  action: 'retry',
};

const TONE_VAR = {
  primary: 'var(--color-primary)',
  warning: 'var(--color-badge-warning)',
  danger: 'var(--color-badge-danger)',
};

export function getErrorContent(code) {
  return ERROR_MAP[code] || DEFAULT_ERROR;
}

export default function ErrorPage({
  code = 404,
  title,
  message,
  reference,
  homeHref = '/',
  onGoHome,
  onGoBack,
  onAction,
}) {
  const prefersReducedMotion = useReducedMotion();
  const { setIsErrorPage } = useErrorPage();
  const content = getErrorContent(code);
  const Icon = content.icon;
  const toneColor = TONE_VAR[content.tone];

  useEffect(() => {
    setIsErrorPage(true);
    return () => setIsErrorPage(false);
  }, [setIsErrorPage]);

  const ref = useMemo(() => {
    if (reference) return reference;
    const stamp = Date.now().toString(36).toUpperCase().slice(-5);
    return `AGT-${code}-${stamp}`;
  }, [code, reference]);

  const goHome = onGoHome || (() => { window.location.href = homeHref; });
  const goBack = onGoBack || (() => { window.history.back(); });

  const actionConfig = {
    retry: { label: 'Retry', icon: RefreshCw, run: onAction || (() => window.location.reload()) },
    signin: { label: 'Sign in', icon: LogIn, run: onAction || (() => { window.location.href = '/login'; }) },
    billing: { label: 'View billing', icon: Wallet, run: onAction || (() => { window.location.href = '/billing'; }) },
  }[content.action];

  const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: prefersReducedMotion ? 0 : 0.09, delayChildren: prefersReducedMotion ? 0 : 0.1 } },
  };
  const item = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 14 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-background text-on-surface px-4"
      role="alert"
      aria-live="assertive"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `repeating-linear-gradient(45deg, ${toneColor} 0, ${toneColor} 1px, transparent 1px, transparent 14px),
            repeating-linear-gradient(-45deg, var(--color-on-surface-variant) 0, var(--color-on-surface-variant) 1px, transparent 1px, transparent 14px)`,
        }}
      />

      <motion.div variants={stagger} initial="hidden" animate="show" className="relative z-10 w-full max-w-xl">
        <div
          className="glass-panel rounded-2xl px-6 py-10 sm:px-12 sm:py-14 text-center border"
          style={{ borderColor: 'color-mix(in srgb, var(--color-outline-variant) 30%, transparent)' }}
        >
         

          <motion.div variants={item} className="flex justify-center mb-4">
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center"
              style={{ backgroundColor: `color-mix(in srgb, ${toneColor} 12%, transparent)`, color: toneColor }}
            >
              <Icon size={26} strokeWidth={1.75} />
            </div>
          </motion.div>

          <motion.p variants={item} className="type-display leading-none mb-3" style={{ color: toneColor }}>
            {code}
          </motion.p>

          <motion.h1 variants={item} className="type-headline mb-3 text-on-surface">
            {title || content.title}
          </motion.h1>
          <motion.p variants={item} className="type-body-lg text-on-surface-variant max-w-md mx-auto mb-10">
            {message || content.message}
          </motion.p>

          <motion.div variants={item} className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={goHome}
              className="type-button w-full sm:w-auto bg-primary text-on-primary rounded-lg px-6 py-3.5 flex items-center justify-center gap-2 hover:shadow-lg transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <Home size={16} />
              Return to homepage
            </button>

            {actionConfig && (
              <button
                type="button"
                onClick={actionConfig.run}
                className="type-button w-full sm:w-auto rounded-lg px-6 py-3.5 flex items-center justify-center gap-2 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                style={{ color: toneColor, border: `1px solid color-mix(in srgb, ${toneColor} 45%, transparent)` }}
              >
                <actionConfig.icon size={16} />
                {actionConfig.label}
              </button>
            )}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}