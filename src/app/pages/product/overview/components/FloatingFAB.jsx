import { MessageCircle } from 'lucide-react';

export default function FloatingFAB() {
  return (
    <button className="fixed bottom-8 right-8 md:hidden bg-primary text-on-primary rounded-full p-4 shadow-2xl hover:scale-110 transition-transform">
      <MessageCircle size={24} />
    </button>
  );
}