import { useAuth } from "../../auth/hooks/useAuth";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import "../../interview/style/navbar.scss";

const Navbar = () => {
  const { user, handleLogout, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
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
    await handleLogout();
    navigate("/login", { replace: true });
  };

  const handleNavClick = (path) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <>
    
    <div className="navbar-wrapper">
      <nav className="navbar">

        
        {/* Left - Logo */}
        <div className="navbar__left">
          <h2 onClick={() => handleNavClick("/")} className="navbar__logo">
            Interview<span>IQ</span>
          </h2>
        </div>

        {/* Hamburger Menu */}
        <button
          className={`navbar__hamburger ${mobileMenuOpen ? 'active' : ''}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Right - Navigation & User */}
        <div className={`navbar__right ${mobileMenuOpen ? 'active' : ''}`}>
          {user && (
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
                disabled={loading}
                className="navbar__logout"
                title="Logout"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>
                <span>{loading ? "..." : "Logout"}</span>
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