import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { useState } from 'react';

export default function RelatedProducts() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const products = [
    {
      name: 'Organic Alphonso Mangoes',
      origin: 'Ratnagiri',
      spec: 'Brix: 18-20°',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC9HaU--cWlZxcvw1YUA6CtsEibOSRwWyjBTwZKfK0Qw9rf_GM9evCTwBxnFOJucXwJAVqLuG43ViPNCgEjNVuplTNU1TigAeFaV_DfABYFkbs7Q6w2WiwHHLOE_b9hMz0DcpMIlrf4Fpuc3-W0VtwCMTOKf5YFXIZkDO0E5oNjBkTWNXJFa_O6MwlNw6yJiPxC3kuTuSSO-phIhCASy_cSMrCiJ2l5GHgMBaxan4Cw71mlBOh3Fw1AZaTG0kMQRIuF318eMcZ14VI',
      category: 'Premium Fruit',
    },
    {
      name: 'Industrial Hemp Mesh',
      origin: 'Uttarakhand',
      spec: 'GSM: 450+',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA1Q7wsyC4YZZL0uodiqdOLF2xSiPjxe0fJcAhrcKh_mSSAHsW0ppNAT51N7YhsAv5HckDNGztMdEjBSzy5OH7dhbZ-SCH4hdUU2HzE36P-b0n9egR13og1sw3difS54KSfTLkkU5cpSAu5lQLeHRJzXK_uyea4wbWMgf5UxI_q1G4q9SFpvyyH9g2VNTplh3dw96jVlOb4zatmhGDeoRmnGmogsWiU7-o4yzZghGSkfJ6-O5JIwDEeIuFUFRAKLStWQC_Mc_qBflc',
      category: 'Industrial Grade',
    },
    {
      name: 'Technical Grade Flax',
      origin: 'European Sourcing',
      spec: 'Moisture: <12%',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC7zFaVCdhtk7O2v2jUuVxSbEEQz03uX9RXM5EpWIWsAfJnyMwR1UZdhiopv3apEcL8ssBM35Gj2ELaTJsOq4vphl12kf2Va_qA4xUWUBxGeuMrQyrhS-lZCEF4df9scOxBN9pPQ3lVCPOROvZnhFhBO5FY6gmkQLC2F7uVcZOkPQ6ATZ8IZI1mGC1IewR2sxZR0O01EcWobAWD0os2K4IrBcg66bBIixGbJRgRuFQ0CpveN518gBSLQBQmh6yEqS1HhCISQxEvmfE',
      category: 'Textiles',
    },
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % products.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
  };

  return (
    <section className="py-10 mb-15">
      <div className="flex items-center justify-between mb-12">
        <h2 className="text-headline-lg font-bold text-on-surface">Related Commodities</h2>
        <div className="flex gap-3">
          <button
            onClick={prevSlide}
            className="w-12 h-12 rounded-full border-2 border-outline-variant hover:border-primary transition-colors flex items-center justify-center"
          >
            <ArrowLeft size={20} className="text-on-surface-variant hover:text-primary" />
          </button>
          <button
            onClick={nextSlide}
            className="w-12 h-12 rounded-full border-2 border-outline-variant hover:border-primary transition-colors flex items-center justify-center"
          >
            <ArrowRight size={20} className="text-on-surface-variant hover:text-primary" />
          </button>
        </div>
      </div>

      {/* Product Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product, idx) => (
          <div key={idx} className="glass-card rounded-2xl overflow-hidden flex flex-col border border-outline-variant/20 hover:border-outline-variant/40 transition-all spring-hover group cursor-pointer">
            {/* Display Area */}
            <div className="relative h-64 overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Category Badge */}
              <span className="absolute top-4 right-4 bg-surface-container/90 backdrop-blur-md px-4 py-2 rounded-full text-xs font-bold text-on-surface border border-outline-variant/30">
                {product.category}
              </span>
            </div>

            {/* Content */}
            <div className="p-6 flex-1 flex flex-col">
              <h3 className="text-title-md font-bold text-on-surface mb-3">{product.name}</h3>

              <div className="flex justify-between text-body-md text-on-surface-variant mb-6 grow">
                <div>
                  <p className="text-label-sm text-on-surface-variant mb-1">Origin:</p>
                  <p className="font-semibold text-on-surface">{product.origin}</p>
                </div>
                <div className="text-right">
                  <p className="text-label-sm text-on-surface-variant mb-1">{product.spec.split(':')[0]}</p>
                  <p className="font-mono font-bold text-on-surface">{product.spec.split(':')[1]}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-outline-variant/30 flex items-center justify-between">
                <span className="text-primary font-bold">View Specs</span>
                <ArrowUpRight size={18} className="text-primary" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}