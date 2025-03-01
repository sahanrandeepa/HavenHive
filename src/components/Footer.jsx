import React from 'react';
import { Container } from 'react-bootstrap';
import './Footer.css';


function Footer() {
  return (
    <footer className="bg-dark text-white text-center py-3">
      <Container>
        <p className="mb-0">© {new Date().getFullYear()} Property Finder. All Rights Reserved.</p>
      </Container>
    </footer>
  );
}

export default Footer;

