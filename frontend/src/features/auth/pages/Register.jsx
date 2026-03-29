import { useForm } from "react-hook-form";
import "../auth.form.scss";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";

export const Register = () => {
  const { loading, handleRegister } = useAuth();

  const [serverError, setServerError] = useState("");
  const [fieldError, setFieldError] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const passwordValue = watch("password") || "";

  const onSubmit = async (data) => {
    setServerError("");
    setFieldError({});

    const res = await handleRegister({
      username: data.username.trim(),
      email: data.email.trim(),
      password: data.password.trim(),
    });

    if (res.success) {
      navigate("/", { replace: true });
    } else {
      const msg = res.message?.toLowerCase() || "";

      if (msg.includes("username")) {
        setFieldError({ username: res.message });
      } else if (msg.includes("email") || msg.includes("account")) {
        setFieldError({
          email: "Email already registered. Try logging in.",
        });
      } else {
        setServerError(res.message);
      }
    }
  };

  return (
    <main className="auth-page">
      <div className="form-container">
        <h1>Register</h1>

        
        {serverError && <p className="error">{serverError}</p>}

        <form onSubmit={handleSubmit(onSubmit)}>
          
          
          <div className="input-group">
            <label>Username</label>
            <input
              type="text"
              placeholder="Enter username"
              autoComplete="username"
              {...register("username", {
                required: "Username is required",
                minLength: {
                  value: 3,
                  message: "Minimum 3 characters",
                },
              })}
            />

            {errors.username && (
              <p className="error">{errors.username.message}</p>
            )}

            {fieldError.username && (
              <p className="error">{fieldError.username}</p>
            )}
          </div>

        
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter email address"
              autoComplete="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Enter a valid email",
                },
              })}
            />

            {errors.email && (
              <p className="error">{errors.email.message}</p>
            )}

            {fieldError.email && (
              <p className="error">
                {fieldError.email} 
              </p>
            )}
          </div>

          
          <div className="input-group password-group">
            <label>Password</label>

            <div className="password-input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                autoComplete="new-password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Minimum 6 characters",
                  },
                })}
              />

              {passwordValue && (
                <span
                  className="eye-icon"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? (
                   
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="currentColor" strokeWidth="2" />
                      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
                    </svg>
                  ) : (
                    
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path d="M17.94 17.94C16.18 19.22 14.15 20 12 20C5 20 1 12 1 12C2.06 9.94 3.56 8.18 5.36 6.86M9.9 4.24C10.59 4.08 11.29 4 12 4C19 4 23 12 23 12C22.18 13.6 21.1 15.06 19.82 16.32M1 1L23 23" stroke="currentColor" strokeWidth="2" />
                    </svg>
                  )}
                </span>
              )}
            </div>

            {errors.password && (
              <p className="error">{errors.password.message}</p>
            )}
          </div>

         
          <button
            className="button primary-button"
            disabled={isSubmitting || loading}
          >
            {isSubmitting || loading ? (
              <>
                <svg 
                  className="spinner"
                  style={{ 
                    animation: "spin 1s linear infinite",
                  }}
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
                Creating account...
              </>
            ) : "Register"}
          </button>
        </form>

        <p>
          Already have an account? 
          <Link 
            to="/login" 
            style={{ 
              pointerEvents: isSubmitting || loading ? "none" : "auto",
              opacity: isSubmitting || loading ? 0.5 : 1,
              transition: "opacity 0.2s ease"
            }}
          >
            Login
          </Link>
        </p>
      </div>
    </main>
  );
};