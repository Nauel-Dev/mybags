import React from 'react';
export default function Footer() {
  return (
    <footer id="footer">
      <div className="container text-center">
        <p>&copy; {new Date().getFullYear()} $MYBAGS. All rights reserved.</p>
        <div className="social-links">
          <a href="#">Twitter</a>
          <a href="#">Discord</a>
          <a href="#">OpenSea</a>
        </div>
      </div>
    </footer>
  );
}
