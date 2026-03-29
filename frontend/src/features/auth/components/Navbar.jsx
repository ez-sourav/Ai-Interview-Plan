import { useAuth } from "../../auth/hooks/useAuth";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import "../../interview/style/navbar.scss";

const Navbar = () => {
  const { user, handleLogout, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [mobileMenuOpen]);

  const isActive = (path) => location.pathname === path;

  const onLogout = async () => {
    setIsLoggingOut(true);

    await handleLogout();

    setTimeout(() => {
      navigate("/welcome", { replace: true });
    }, 1000);
  };

  const handleNavClick = (path) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <>

      <div className={`navbar-wrapper ${!user && location.pathname === '/welcome' ? 'no-hamburger' : ''}`}>
        <nav className="navbar">


          {/* Left - Logo */}
          <div className="navbar__left">
            <h2 onClick={() => handleNavClick("/")} className="navbar__logo">
              Interview<span>IQ</span>
            </h2>
          </div>

          {/* Hamburger Menu - Hide on welcome page for non-logged-in users */}
          {!(!user && location.pathname === '/welcome') && (
            <button
              className={`navbar__hamburger ${mobileMenuOpen ? 'active' : ''}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          )}

          {/* Right - Navigation & User */}
          <div className={`navbar__right ${mobileMenuOpen ? 'active' : ''}`}>
            {!user && location.pathname === '/welcome' ? (
              <>
                {/* Desktop and Tablet: Show both Login and Get Started */}
                <nav className="navbar__nav navbar__auth-nav">
                  <button
                    className="navbar__link navbar__login-link"
                    onClick={() => handleNavClick("/login")}
                  >
                    Login
                  </button>
                  <button
                    className="navbar__link navbar__get-started-link"
                    onClick={() => handleNavClick("/register")}
                    style={{
                      background: "linear-gradient(135deg, #ffb689 0%, #ff7f11 100%)",
                      color: "#512300",
                      padding: "0.5rem 1.5rem",
                      borderRadius: "0.5rem",
                      fontFamily: "Space Grotesk, sans-serif",
                      fontWeight: "700",
                      border: "none",
                      transition: "all 0.2s ease"
                    }}
                  >
                    Get Started
                  </button>
                </nav>

                {/* Mobile: Show only Get Started */}
                <nav className="navbar__nav navbar__auth-nav-mobile">
                  <button
                    className="navbar__link navbar__get-started-link"
                    onClick={() => handleNavClick("/register")}
                  >
                    Get Started
                  </button>
                </nav>
              </>
            ) : user && (
              <>
                <nav className="navbar__nav">
                  <button
                    className={`navbar__link ${isActive('/') ? 'active' : ''}`}
                    onClick={() => handleNavClick("/")}
                  >
                    Create Plan
                  </button>
                  <button
                    className={`navbar__link ${isActive('/recent-plans') ? 'active' : ''}`}
                    onClick={() => handleNavClick("/recent-plans")}
                  >
                    My Plans
                  </button>
                </nav>

                <div className="navbar__divider"></div>

                <div className="navbar__user">
                  <div className="navbar__user-info">
                    <span className="navbar__username">{user.username}</span>
                    <small className="navbar__email">{user.email}</small>
                  </div>
                </div>

                <button
                  onClick={onLogout}
                  disabled={isLoggingOut}
                  className="navbar__logout"
                  title="Logout"
                >
                  {isLoggingOut ? (
                    <>
                      <svg
                       
                        className="spinner"
                        style={{ animation: "spin 1s linear infinite", marginRight: "6px" }}
                      >
                        <circle
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="2"
                          fill="none"
                          strokeDasharray="31.416"
                          strokeDashoffset="15.708"
                          strokeLinecap="round"
                        />
                      </svg>
                      <span>Logging out...</span>
                    </>
                  ) : (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                        <polyline points="16 17 21 12 16 7" />
                        <line x1="21" y1="12" x2="9" y2="12" />
                      </svg>
                      <span>Logout</span>
                    </>
                  )}
                </button>
              </>
            )}
          </div>
        </nav>
      </div>
      {mobileMenuOpen && (
        <div
          className="navbar__overlay"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Navbar;