import { useLocation } from "react-router";

const navItems = [
  { label: "Home", href: "/", badge: null },
  { label: "About", href: "/about", badge: null },
  { label: "Docs", href: "/docs", badge: null },
  { label: "Pricing", href: "/pricing", badge: null },
  { label: "Contact", href: "/contact", badge: null },
];

export default function NexuraNavbar() {
  const location = useLocation();


    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:wght@400;500;600&display=swap');

        .navbar-wrapper {
          width: 100%;
          max-width: 780px;
          margin-left: auto;
          margin-right: auto;
          display: flex;
          flex-direction: column;
        justify-content: center;
        padding: 12px 16px;
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
          padding-right: 16px;
          white-space: nowrap;
          flex-shrink: 0;
        }
        .brand span { color: #ff6a00; }

        .nav-links { display: flex; align-items: center; gap: 2px; flex: 1; }

        .nav-item {
          display: flex; align-items: center; gap: 8px;
          padding: 9px 18px; border-radius: 100px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.92rem; font-weight: 500;
          color: #999; cursor: pointer;
          border: none; background: transparent;
          transition: color 0.2s ease, background 0.2s ease;
          white-space: nowrap; outline: none;
        }
        .nav-item:hover:not(.active) { color: #fff; background: #2a2a2a; }
        .nav-item.active { background: #ff6a00; color: #fff; font-weight: 600; }

        .badge {
          display: inline-flex; align-items: center; justify-content: center;
          width: 22px; height: 22px; border-radius: 50%;
          background: #000; color: #ff6a00;
          font-size: 0.68rem; font-weight: 700;
          font-family: 'Syne', sans-serif; flex-shrink: 0;
        }

        .login-btn {
          display: flex; align-items: center; gap: 8px;
          padding: 10px 22px; border-radius: 100px;
          background: #ff6a00; color: #fff;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.88rem; font-weight: 600;
          border: none; cursor: pointer; flex-shrink: 0;
          transition: background 0.2s ease, transform 0.15s ease;
        }
        .login-btn:hover { background: #e55e00; transform: translateY(-1px); }
        .login-btn:active { transform: translateY(0); }
        .login-icon { width: 15px; height: 15px; }

      `}</style>

            <div className="navbar-wrapper">
              <nav className="navbar">
                <div className="brand">Nex<span>u</span>ra</div>

                <div className="nav-links">
                  {navItems.map(({ label, href, badge }) => {
                    const isActive = location.pathname === href;
                    return (
                      <a
                        key={label}
                        href={href}
                        className={`nav-item${isActive ? " active" : ""}`}
                      >
                        {label}
                        {badge && <span className="badge">{badge}</span>}
                      </a>
                    );
                  })}
                </div>

                <a href="/login" className="login-btn">
                  <svg className="login-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="8" r="4" />
                    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                  </svg>
                  Login
                </a>
              </nav>
            </div>
        </>
    );
}