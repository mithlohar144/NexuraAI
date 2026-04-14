import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router";
import { useAuth } from "../auth/hook/useAuth";

const navItems = [
  { label: "Home",    href: "/",        badge: null },
  { label: "About",   href: "/about",   badge: null },
  { label: "Docs",    href: "/docs",    badge: null },
  { label: "Pricing", href: "/pricing", badge: null },
  { label: "Contact", href: "/contact", badge: null },
];

export default function NexuraNavbar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const { handleLogout } = useAuth();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:wght@400;500;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; }

        .navbar-wrapper {
          width: 100%;
          max-width: 780px;
          margin: 0 auto;
          padding: 12px 16px;
          position: sticky;
          top: 12px;
          z-index: 40;
        }

        .navbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #1a1a1a;
          border-radius: 100px;
          padding: 8px 10px 8px 20px;
          border: 0.5px solid #333;
          gap: 4px;
        }

        .brand {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 1.15rem;
          letter-spacing: -0.03em;
          color: #fff;
          white-space: nowrap;
          flex-shrink: 0;
          text-decoration: none;
        }
        .brand span { color: #ff6a00; }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 2px;
          flex: 1;
          padding: 0 8px;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 9px 18px;
          border-radius: 100px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.92rem;
          font-weight: 500;
          color: #999;
          cursor: pointer;
          text-decoration: none;
          border: none;
          background: transparent;
          transition: color 0.2s ease, background 0.2s ease;
          white-space: nowrap;
          outline: none;
        }
        .nav-item:hover:not(.active) { color: #fff; background: #2a2a2a; }
        .nav-item.active { background: #ff6a00; color: #fff; font-weight: 600; }

        .badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 22px; height: 22px;
          border-radius: 50%;
          background: #000;
          color: #ff6a00;
          font-size: 0.68rem;
          font-weight: 700;
          font-family: 'Syne', sans-serif;
          flex-shrink: 0;
        }

        .login-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 22px;
          border-radius: 100px;
          background: #ff6a00;
          color: #fff;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.88rem;
          font-weight: 600;
          text-decoration: none;
          border: none;
          cursor: pointer;
          flex-shrink: 0;
          transition: background 0.2s ease, transform 0.15s ease;
        }
        .login-btn:hover { background: #e55e00; transform: translateY(-1px); }
        .login-btn:active { transform: translateY(0); }
        .login-icon { width: 15px; height: 15px; }

        .user-actions {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-shrink: 0;
        }

        .profile-wrapper {
          position: relative;
        }

        .profile-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 999px;
          background: #2a2a2a;
          border: 1px solid #444;
          color: #fff;
          cursor: pointer;
          text-decoration: none;
          transition: background 0.2s ease, border-color 0.2s ease, transform 0.15s ease;
        }
        .profile-btn:hover { background: #333; border-color: #666; transform: translateY(-1px); }

        .user-dropdown {
          position: absolute;
          right: 0;
          top: 115%;
          min-width: 180px;
          padding: 6px;
          border-radius: 16px;
          background: #111;
          border: 1px solid #333;
          box-shadow: 0 18px 40px rgba(0, 0, 0, 0.7);
          display: flex;
          flex-direction: column;
          gap: 4px;
          z-index: 50;
        }

        .user-dropdown-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px 10px;
          border-radius: 999px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.86rem;
          font-weight: 500;
          color: #ddd;
          background: transparent;
          border: none;
          text-decoration: none;
          cursor: pointer;
          transition: background 0.15s ease, color 0.15s ease;
        }
        .user-dropdown-item:hover {
          background: #222;
          color: #fff;
        }

        /* ── Hamburger (hidden on desktop) ── */
        .hamburger {
          display: none;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 5px;
          width: 38px;
          height: 38px;
          border: none;
          background: #2a2a2a;
          border-radius: 50%;
          cursor: pointer;
          flex-shrink: 0;
          padding: 0;
          transition: background 0.2s;
        }
        .hamburger:hover { background: #333; }
        .hamburger .bar {
          width: 16px;
          height: 1.5px;
          background: #fff;
          border-radius: 2px;
          transition: transform 0.25s ease, opacity 0.25s ease;
          transform-origin: center;
        }
        .hamburger.open .bar:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
        .hamburger.open .bar:nth-child(2) { opacity: 0; transform: scaleX(0); }
        .hamburger.open .bar:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }

        /* ── Mobile dropdown ── */
        .mobile-menu {
          display: none;
          flex-direction: column;
          background: #1a1a1a;
          border: 0.5px solid #333;
          border-radius: 20px;
          margin-top: 8px;
          overflow: hidden;
          animation: slideDown 0.2s ease;
        }
        .mobile-menu.open { display: flex; }

        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .mobile-nav-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 20px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.95rem;
          font-weight: 500;
          color: #999;
          text-decoration: none;
          border-bottom: 0.5px solid #252525;
          transition: background 0.15s, color 0.15s;
        }
        .mobile-nav-item:last-of-type { border-bottom: none; }
        .mobile-nav-item:hover { background: #222; color: #fff; }
        .mobile-nav-item.active { color: #ff6a00; font-weight: 600; }

        .mobile-arrow { font-size: 0.9rem; color: #444; transition: color 0.15s; }
        .mobile-nav-item.active .mobile-arrow { color: #ff6a00; }
        .mobile-nav-item:hover .mobile-arrow { color: #666; }

        .mobile-login {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin: 12px 16px 16px;
          padding: 13px;
          border-radius: 100px;
          background: #ff6a00;
          color: #fff;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.9rem;
          font-weight: 600;
          text-decoration: none;
          transition: background 0.2s;
        }
        .mobile-login:hover { background: #e55e00; }

        .mobile-actions {
          display: flex;
          flex-direction: column;
          gap: 8px;
          padding: 8px 16px 16px;
        }

        .mobile-action-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 11px 13px;
          border-radius: 999px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.9rem;
          font-weight: 600;
          text-decoration: none;
          border: none;
          cursor: pointer;
        }

        .mobile-action-primary {
          background: #ff6a00;
          color: #fff;
        }
        .mobile-action-primary:hover { background: #e55e00; }

        .mobile-action-secondary {
          background: #222;
          color: #eee;
        }
        .mobile-action-secondary:hover { background: #2a2a2a; }

        /* ── Breakpoint ── */
        @media (max-width: 640px) {
          .navbar {
            border-radius: 50px;
            padding: 8px 10px 8px 18px;
          }
          .nav-links,
          .login-btn,
          .user-actions { display: none; }
          .hamburger  { display: flex; }
        }
      `}</style>

      <div className="navbar-wrapper">

        {/* Top bar */}
        <nav className="navbar">
          <Link to="/" className="brand">Nex<span>u</span>ra</Link>

          {/* Desktop links */}
          <div className="nav-links">
            {navItems.map(({ label, href, badge }) => (
              <Link
                key={label}
                to={href}
                className={`nav-item${location.pathname === href ? " active" : ""}`}
              >
                {label}
                {badge && <span className="badge">{badge}</span>}
              </Link>
            ))}
          </div>

          {/* Desktop auth area */}
          {user ? (
            <div className="user-actions">
              <div className="profile-wrapper">
                <button
                  type="button"
                  className="profile-btn"
                  aria-label="Account menu"
                  onClick={() => setUserMenuOpen(o => !o)}
                >
                  <svg className="login-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="8" r="4" />
                    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                  </svg>
                </button>
                {userMenuOpen && (
                  <div className="user-dropdown">
                    <Link
                      to="/account"
                      className="user-dropdown-item"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <span>Profile</span>
                    </Link>
                    <Link
                      to="/app"
                      className="user-dropdown-item"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <span>Open chat</span>
                    </Link>
                    <button
                      type="button"
                      className="user-dropdown-item"
                      onClick={async () => {
                        await handleLogout();
                        setUserMenuOpen(false);
                      }}
                    >
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <Link to="/login" className="login-btn">
              <svg className="login-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
              </svg>
              Login
            </Link>
          )}

          {/* Hamburger — mobile only */}
          <button
            className={`hamburger${menuOpen ? " open" : ""}`}
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
          >
            <span className="bar" />
            <span className="bar" />
            <span className="bar" />
          </button>
        </nav>

        {/* Mobile dropdown */}
        <div className={`mobile-menu${menuOpen ? " open" : ""}`}>
          {navItems.map(({ label, href, badge }) => (
            <Link
              key={label}
              to={href}
              className={`mobile-nav-item${location.pathname === href ? " active" : ""}`}
              onClick={() => setMenuOpen(false)}
            >
              <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
                {label}
                {badge && <span className="badge">{badge}</span>}
              </span>
              <span className="mobile-arrow">›</span>
            </Link>
          ))}
          {user ? (
            <div className="mobile-actions">
              <Link
                to="/account"
                className="mobile-action-btn mobile-action-secondary"
                onClick={() => setMenuOpen(false)}
              >
                Profile
              </Link>
              <Link
                to="/app"
                className="mobile-action-btn mobile-action-primary"
                onClick={() => setMenuOpen(false)}
              >
                Open chat
              </Link>
              <button
                type="button"
                className="mobile-action-btn mobile-action-secondary"
                onClick={async () => {
                  await handleLogout();
                  setMenuOpen(false);
                }}
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="mobile-login"
              onClick={() => setMenuOpen(false)}
            >
              <svg style={{ width: 15, height: 15 }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
              </svg>
              Login
            </Link>
          )}
        </div>

      </div>
    </>
  );
}