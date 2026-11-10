import React from 'react';

interface FooterProps {
  name: string;
  rightsText: string;
  creditText: string;
}

const Footer: React.FC<FooterProps> = ({ name, rightsText, creditText }) => (
  <footer className="footer">
    <div className="container footer__inner">
      <p>
        &copy; {new Date().getFullYear()} {name}. {rightsText}
      </p>
      <p>
        {creditText}{' '}
        <a href="https://github.com/stackedlol/ascii-sharks" target="_blank" rel="noopener noreferrer">
          ascii-sharks
        </a>
      </p>
    </div>
  </footer>
);

export default Footer;
