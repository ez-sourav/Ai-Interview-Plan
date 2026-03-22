import { useAuth } from "../../auth/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import "../../interview/style/navbar.scss";

const Navbar = () => {
  const { user, handleLogout, loading } = useAuth();
  const navigate = useNavigate();

  const onLogout = async () => {
    await handleLogout();
    navigate("/login", { replace: true });
  };

  return (
    <div className="navbar-wrapper">
      <nav className="navbar">
        {/* Left */}
        <div className="navbar__left">
          <h2 onClick={() => navigate("/")}>
            AI<span>Interview</span>
          </h2>
        </div>

        {/* Right */}
        <div className="navbar__right">
          {user && (
            <>
              <div className="navbar__user">
                <span>{user.username}</span>
                <small>{user.email}</small>
              </div>

              <button onClick={onLogout} disabled={loading}>
                {loading ? "..." : "Logout"}
              </button>
            </>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;