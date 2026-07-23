import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  image?: string;
}

export default function PageHeader({ title, subtitle, image }: PageHeaderProps) {
  return (
    <div
      className="relative pt-16 md:pt-20 pb-12 md:pb-16 bg-cover bg-center"
      style={
        image
          ? { backgroundImage: `linear-gradient(rgba(124,45,18,0.85), rgba(154,52,18,0.85)), url(${image})` }
          : { background: 'linear-gradient(135deg, #7c2d12, #9a3412)' }
      }
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
        <div className="flex items-center gap-2 text-sm text-orange-200 mb-2">
          <Link to="/" className="hover:text-white">Home</Link>
          <ChevronRight size={14} />
          <span className="text-white">{title}</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-2">{title}</h1>
        {subtitle && <p className="text-orange-100 text-base md:text-lg max-w-2xl">{subtitle}</p>}
      </div>
    </div>
  );
}
