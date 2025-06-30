import React from 'react';

export default function Footer() {
  return (
    <footer id="footer">
      <div className="container text-center">
        <p>&copy; {new Date().getFullYear()} $MYBAGS. All rights reserved.</p>
        <div className="social-links">
          <a
            href="https://x.com/i/communities/1933583099096625391"
            target="_blank"
            rel="noopener noreferrer"
          >
            Twitter
          </a>
          <a
            href="https://discord.com/invite/your-discord-code"
            target="_blank"
            rel="noopener noreferrer"
          >
</a>
        </div>
      </div>
    </footer>
  );
}
