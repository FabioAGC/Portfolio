import React from 'react';

interface FooterProps {
  rightsText: string;
}

const Footer: React.FC<FooterProps> = ({ rightsText }) => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t border-white/5 bg-primary pt-12 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
        <p className="text-slate-600 text-xs tracking-wider uppercase font-medium">
          &copy; {currentYear} Fabitos. {rightsText}
        </p>
      </div>
    </footer>
  );
};

export default Footer;