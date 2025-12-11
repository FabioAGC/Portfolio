import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t border-white/5 bg-primary pt-12 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
        <p className="text-slate-600 text-xs tracking-wider uppercase font-medium">
          &copy; {currentYear} Fabitos. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;