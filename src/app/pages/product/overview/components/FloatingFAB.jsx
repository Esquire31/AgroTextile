'use client';

import { MessageCircle } from 'lucide-react';
import { useIntl } from 'react-intl';

export default function FloatingFAB({ product }) {
  const { formatMessage } = useIntl();

  const handleInquiry = () => {
    const message = encodeURIComponent(
      `Hello! I am interested in the ${product.title} (ID: ${product.id}). Could you provide more information regarding pricing and technical specs?`
    );
    window.open(`https://wa.me/917600006560?text=${message}`, '_blank');
  };

  return (
    <button
      onClick={handleInquiry}
      title={formatMessage({ id: 'app.products.overview.fab.inquiry' }, { product: product.title })}
      className="fixed bottom-8 right-8 z-50 bg-primary text-on-primary rounded-full p-5 shadow-2xl hover:scale-110 active:scale-95 transition-all spring-hover border-4 border-background/20 backdrop-blur-sm"
    >
      <MessageCircle size={32} />
      <span className="absolute -top-1 -right-1 flex h-4 w-4">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
        <span className="relative inline-flex rounded-full h-4 w-4 bg-secondary"></span>
      </span>
    </button>
  );
}
