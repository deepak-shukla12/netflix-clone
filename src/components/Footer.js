import React from 'react';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__columns">
          <div className="footer__column">
            <h3>Company</h3>
            <ul>
              <li>About Us</li>
              <li>Contact Us</li>
              <li>Careers</li>
            </ul>
          </div>
          <div className="footer__column">
            <h3>Help & Support</h3>
            <ul>
              <li>FAQ</li>
              <li>Support</li>
              <li>Terms of Use</li>
            </ul>
          </div>
          <div className="footer__column">
            <h3>Connect with Us</h3>
            <ul>
              <li>Facebook</li>
              <li>Twitter</li>
              <li>Instagram</li>
            </ul>
          </div>
        </div>
        <div className="footer__bottom">
          <p>&copy; 2024 Your Netflix Clone. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
