import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { FileText, Anchor, ShoppingBag, Check } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

const ProductCard = ({
  product,
  onOpenSpecs,
  onOpenBooking,
  onAddToBasket,
  isInBasket,
}) => {
  const { formatMessage } = useIntl();
  const [addingState, setAddingState] = useState(false);

  const handleQuickAdd = () => {
    setAddingState(true);
    onAddToBasket(product, 1);
    setTimeout(() => setAddingState(false), 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
      className="glass-card group rounded-2xl overflow-hidden flex flex-col shadow-xl border border-outline-variant/10 hover:border-primary/30 hover:shadow-primary/5 transition-all duration-300"
    >
      {/* Product Image Container */}
      <div className="relative h-64 overflow-hidden">
        <Link to={`/products/${product.id}`} className="block w-full h-full">
          <div
            className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
            style={{ backgroundImage: `url('${product.thumbnail || product.image}')` }}
          />
        </Link>
        
        {/* Category Badge */}
        <div className={`absolute top-4 left-4 text-[10px] font-mono font-bold px-3.5 py-1.5 rounded-full uppercase tracking-wider ${
          product.category === 'Textile'
            ? 'bg-primary text-on-primary border border-primary/20'
            : 'bg-secondary-container text-on-secondary-container border border-secondary-container/30'
        }`}>
          {product.category}
        </div>

        {/* Quick Add To Basket Floating Trigger */}
        <button
          onClick={handleQuickAdd}
          title={formatMessage({ id: 'app.products.card.btn.add_to_basket_title' })}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-surface-container/80 backdrop-blur-md border border-outline-variant/30 flex items-center justify-center text-on-surface hover:text-primary hover:border-primary hover:bg-surface-container transition-all cursor-pointer shadow-md"
        >
          {addingState || isInBasket ? (
            <Check className="w-4 h-4 text-secondary" />
          ) : (
            <ShoppingBag className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Product Information Body */}
      <div className="p-6 md:p-8 flex flex-col justify-between flex-1 space-y-6">
        <div>
          <span className="font-mono text-[9px] text-on-surface-variant/60 block uppercase tracking-wider mb-1">
            {formatMessage({ id: 'app.products.card.label.origin' })}: {product.details.origin.split(',')[0]}
          </span>
          <Link to={`/products/${product.id}`} className="block hover:text-primary transition-colors">
            <h3 className="font-serif text-xl md:text-2xl text-on-surface mb-3 tracking-tight font-medium">
              {product.title}
            </h3>
          </Link>
          <p className="font-sans text-xs md:text-sm text-on-surface-variant line-clamp-3 leading-relaxed">
            {product.description}
          </p>
        </div>


        {/* Dynamic Spec Badges */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-surface-container-low p-3.5 rounded-xl border border-outline-variant/10 text-left">
            <p className="font-sans text-[10px] font-semibold text-on-surface-variant uppercase tracking-wide mb-1">
              {product.specs.label1}
            </p>
            <p className="font-mono text-sm font-bold text-primary tracking-tight">
              {product.specs.value1}
            </p>
          </div>

          <div className="bg-surface-container-low p-3.5 rounded-xl border border-outline-variant/10 text-left">
            <p className="font-sans text-[10px] font-semibold text-on-surface-variant uppercase tracking-wide mb-1">
              {product.specs.label2}
            </p>
            <p className="font-mono text-sm font-bold text-primary tracking-tight">
              {product.specs.value2}
            </p>
          </div>
        </div>

        {/* Technical & Commercial Actions */}
        <div className="flex flex-col gap-2 pt-2">
          {product.category === 'Textile' ? (
            <button
              onClick={() => onOpenSpecs(product)}
              className="w-full py-3.5 bg-surface-container-highest text-on-surface text-xs font-bold rounded-full border border-outline-variant/20 hover:bg-primary hover:text-on-primary hover:border-transparent transition-all cursor-pointer flex items-center justify-center gap-2 uppercase tracking-wider"
            >
              <FileText className="w-4 h-4" />
              {formatMessage({ id: 'app.products.card.btn.request_specs' })}
            </button>
          ) : (
            <button
              onClick={() => onOpenBooking(product)}
              className="w-full py-3.5 bg-surface-container-highest text-on-surface text-xs font-bold rounded-full border border-outline-variant/20 hover:bg-primary hover:text-on-primary hover:border-transparent transition-all cursor-pointer flex items-center justify-center gap-2 uppercase tracking-wider"
            >
              <Anchor className="w-4 h-4" />
              {formatMessage({ id: 'app.products.card.btn.book_shipment' })}
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
