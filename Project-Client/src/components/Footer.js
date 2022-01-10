import React from "react";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer-padding footer">
      <p>Faisal Ahmed ⓒ {year}</p>
    </footer>
  );
}

export default Footer;