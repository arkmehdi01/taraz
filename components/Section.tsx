import React from 'react';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
  light?: boolean;
}

const Section: React.FC<SectionProps> = ({ children, className = '', title, subtitle, light = false }) => {
  return (
    <section className={`py-20 ${light ? 'bg-white' : 'bg-gray-50'} ${className}`}>
      <div className="container mx-auto px-6">
        {(title || subtitle) && (
          <div className="text-center mb-16 max-w-3xl mx-auto">
            {subtitle && <span className="text-accent font-medium tracking-wide uppercase text-sm mb-2 block">{subtitle}</span>}
            {title && <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{title}</h2>}
            <div className="w-24 h-1 bg-accent mx-auto mt-6"></div>
          </div>
        )}
        {children}
      </div>
    </section>
  );
};

export default Section;