import Navbar from "../features/auth/components/Navbar";
import Footer from "../features/auth/components/Footer";
import { LoadingScreen } from "../features/auth/components/LoadingScreen";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../features/auth/hooks/useAuth";

const Landing = () => {
    const { user, isAuthChecked } = useAuth();
    const navigate = useNavigate();

    if (!isAuthChecked) {
        return <LoadingScreen message="Loading..." subMessage="Please wait" />;
    }
    if (user) {
        return <Navigate to="/" replace />;
    }

    return (
        <>
            <Navbar />

            <main style={{ backgroundColor: "#131314", color: "#e5e2e3", padding:"0" , fontFamily: "'Inter', sans-serif" }}>

                {/* ══════════════════════════════════════════
                    HERO
                ══════════════════════════════════════════ */}
                <section style={{ position: "relative", overflow: "hidden", padding: "60px 20px 50px" }}>
                    {/* Ambient glow */}
                    <div style={{
                        position: "absolute", top: "-160px", right: "-160px",
                        width: "600px", height: "600px",
                        background: "radial-gradient(circle, rgba(255,127,17,0.12) 0%, transparent 70%)",
                        borderRadius: "50%", pointerEvents: "none", zIndex: 0
                    }} />

                    <div style={{
                        maxWidth: "1280px", margin: "0 auto", position: "relative", zIndex: 1,
                        display: "flex", flexWrap: "wrap", alignItems: "flex-start", gap: "64px"
                    }}>
                        {/* Left copy */}
                        <div style={{ flex: "1 1 420px", minWidth: 0 }}>
                            <h1 style={{
                                fontFamily: "'Space Grotesk', sans-serif",
                                fontSize: "clamp(2.6rem, 5vw, 4.5rem)",
                                fontWeight: 700, lineHeight: 1.1,
                                color: "#ffffff", marginBottom: "24px", letterSpacing: "-0.02em"
                            }}>
                                Land Your{" "}
                                <span style={{ color: "#ff7f11" }}>Dream Job</span>{" "}
                                with AI-Driven Interview Prep
                            </h1>
                            <p style={{
                                color: "#dfc0b0", fontSize: "1.125rem", lineHeight: 1.7,
                                marginBottom: "40px", maxWidth: "520px"
                            }}>
                                Generate personalized interview plans, identify skill gaps, and
                                practice with realistic questions tailored to any role.
                            </p>

                            <div style={{ marginBottom: "48px" }}>
                                <button 
                                    onClick={() => navigate("/register")}
                                    style={{
                                        padding: "16px 32px", borderRadius: "12px",
                                        background: "linear-gradient(135deg, #ffb689 0%, #ff7f11 100%)",
                                        color: "#5f2a00", fontFamily: "'Space Grotesk', sans-serif",
                                        fontWeight: 700, fontSize: "1.05rem", border: "none",
                                        cursor: "pointer", 
                                        transition: "filter 0.2s"
                                    }}
                                    onMouseEnter={e => e.currentTarget.style.filter = "brightness(1.1)"}
                                    onMouseLeave={e => e.currentTarget.style.filter = "brightness(1)"}
                                >
                                    Start Preparing for Free
                                </button>
                            </div>

                        </div>

                        {/* Right — dashboard image */}
                        <div style={{ flex: "1 1 380px", minWidth: 0, position: "relative" }}>
                            <div style={{
                                background: "#201f20", borderRadius: "20px", padding: "16px",
                                boxShadow: "0 32px 80px rgba(0,0,0,0.5)",
                                border: "1px solid rgba(88,66,54,0.15)"
                            }}>
                                <img
                                    src="/image.png"
                                    alt="Dashboard preview"
                                    style={{ width: "100%", borderRadius: "12px", display: "block" }}
                                />
                            </div>
                            {/* Floating score card — positioned inside the wrapper so it doesn't escape layout */}
                            <div style={{
                                position: "absolute", bottom: "-32px", left: "-32px",
                                background: "#2a2a2b", padding: "24px", borderRadius: "20px",
                                boxShadow: "0 16px 48px rgba(0,0,0,0.5)",
                                border: "1px solid rgba(88,66,54,0.25)",
                                width: "220px", display: "none"
                            }}
                                className="score-card"
                            >
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                                    <span style={{ fontSize: "10px", fontWeight: 700, color: "#dfc0b0", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                                        Match Score
                                    </span>
                                    <span className="material-symbols-outlined" style={{ color: "#4ae176", fontVariationSettings: "'FILL' 1", fontSize: "20px" }}>
                                        stars
                                    </span>
                                </div>
                                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "2.5rem", fontWeight: 700, color: "#ffffff", marginBottom: "8px" }}>
                                    84%
                                </div>
                                <div style={{ width: "100%", background: "#353436", height: "6px", borderRadius: "999px", overflow: "hidden" }}>
                                    <div style={{ width: "84%", height: "100%", background: "#4ae176" }} />
                                </div>
                                <p style={{ fontSize: "10px", color: "#dfc0b0", marginTop: "12px", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 700 }}>
                                    Ready for Senior Role
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Score card shown via media query workaround — inline style for md+ */}
                    <style>{`
                        @media (min-width: 768px) { .score-card { display: block !important; } }
                        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600&display=swap');
                        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');
                    `}</style>
                </section>

                {/* ══════════════════════════════════════════
                    HOW IT WORKS
                ══════════════════════════════════════════ */}
                <section style={{ padding: "44px 20px" }}>
                    <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
                        {/* Heading */}
                        <div style={{ textAlign: "center", marginBottom: "48px" }}>
                            <h2 style={{
                                fontFamily: "'Space Grotesk', sans-serif",
                                fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
                                fontWeight: 700, color: "#ffffff", marginBottom: "16px"
                            }}>How It Works</h2>
                            <div style={{ width: "80px", height: "4px", background: "#ff7f11", margin: "0 auto", borderRadius: "2px" }} />
                        </div>

                        {/* Cards */}
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
                            {[
                                { num: "01", icon: "upload_file",   title: "Upload Your Profile",   accent: true,  desc: "Share your resume or a brief professional bio to help our AI understand your unique career journey." },
                                { num: "02", icon: "content_paste", title: "Paste Job Description", accent: true,  desc: "Input the job description of your target role. We analyze every requirement and hidden expectation." },
                                { num: "03", icon: "psychology",    title: "Get Your AI Plan",      accent: true,  desc: "Receive a custom roadmap featuring predicted questions, strategic advice, and mock practice simulations." },
                            ].map(({ num, icon, title, accent, desc }) => (
                                <div key={num} style={{
                                    background: "#201f20", borderRadius: "20px",
                                    padding: "40px", position: "relative", overflow: "hidden",
                                    borderTop: accent ? "2px solid rgba(255,127,17,0.35)" : "2px solid transparent"
                                }}>
                                    {/* Ghost number */}
                                    <span style={{
                                        position: "absolute", top: "8px", right: "16px",
                                        fontFamily: "'Space Grotesk', sans-serif",
                                        fontSize: "6rem", fontWeight: 900,
                                        color: "rgba(255,255,255,0.04)", userSelect: "none", lineHeight: 1
                                    }}>{num}</span>

                                    <div style={{
                                        width: "56px", height: "56px", background: "#2a2a2b",
                                        borderRadius: "14px", display: "flex", alignItems: "center",
                                        justifyContent: "center", marginBottom: "32px"
                                    }}>
                                        <span className="material-symbols-outlined" style={{ color: "#ff7f11", fontSize: "28px" }}>{icon}</span>
                                    </div>
                                    <h3 style={{
                                        fontFamily: "'Space Grotesk', sans-serif",
                                        fontSize: "1.2rem", fontWeight: 700,
                                        color: "#ffffff", marginBottom: "12px"
                                    }}>{title}</h3>
                                    <p style={{ color: "#dfc0b0", lineHeight: 1.65, fontSize: "0.95rem" }}>{desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ══════════════════════════════════════════
                    FEATURES BENTO GRID
                ══════════════════════════════════════════ */}
                <section style={{ padding: "64px 20px", background: "#1c1b1c" }}>
                    <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
                        <div style={{ marginBottom: "56px" }}>
                            <h2 style={{
                                fontFamily: "'Space Grotesk', sans-serif",
                                fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
                                fontWeight: 700, color: "#ffffff", marginBottom: "12px"
                            }}>Advanced AI Intelligence</h2>
                            <p style={{ color: "#dfc0b0", fontSize: "1.05rem" }}>
                                Engineered for candidates who demand the best preparation.
                            </p>
                        </div>

                        {/* Bento grid — uses CSS grid with named areas for proper layout */}
                        <div style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(12, 1fr)",
                            gap: "20px"
                        }}>

                            {/* ── Personalized Question Bank (8/12) ── */}
                            <div style={{
                                gridColumn: "span 12",
                                background: "#201f20", borderRadius: "20px", padding: "40px",
                                display: "flex", flexWrap: "wrap", gap: "32px",
                                minHeight: "260px", overflow: "hidden"
                            }}
                                className="bento-8"
                            >
                                <div style={{ flex: "1 1 260px" }}>
                                    <h3 style={{
                                        fontFamily: "'Space Grotesk', sans-serif",
                                        fontSize: "1.4rem", fontWeight: 700,
                                        color: "#ffffff", marginBottom: "16px"
                                    }}>Personalized Question Bank</h3>
                                    <p style={{ color: "#dfc0b0", lineHeight: 1.65, fontSize: "0.95rem" }}>
                                        Get a tailored mix of technical and behavioral questions specific to the industry and role seniority.
                                    </p>
                                    <ul style={{ marginTop: "24px", listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
                                        {["Behavioral Deep-dives"].map(item => (
                                            <li key={item} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.9rem", color: "#e5e2e3" }}>
                                                <span className="material-symbols-outlined" style={{ color: "#4ae176", fontSize: "20px" }}>check_circle</span>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div style={{
                                    flex: "1 1 240px",
                                    background: "#353436", borderRadius: "14px",
                                    padding: "16px", border: "1px solid rgba(88,66,54,0.12)",
                                    alignSelf: "flex-start"
                                }}>
                                    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                                        <div style={{ padding: "12px", background: "#2a2a2b", borderRadius: "8px", borderLeft: "4px solid #ff7f11" }}>
                                            <p style={{ fontSize: "10px", fontWeight: 700, color: "#ff7f11", marginBottom: "6px", textTransform: "uppercase" }}>Behavioral</p>
                                            <p style={{ fontSize: "12px", color: "#ffffff" }}>Describe a time you navigated a complex stakeholder conflict...</p>
                                        </div>
                                        <div style={{ padding: "12px", background: "#2a2a2b", borderRadius: "8px",borderLeft: "4px solid #00B954" }}>
                                            <p style={{ fontSize: "10px", fontWeight: 700, color: "#00b954", marginBottom: "6px", textTransform: "uppercase" }}>Technical</p>
                                            <p style={{ fontSize: "12px", color: "#ffffff" }}>Explain the difference between optimistic and pessimistic locking...</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* ── Match Score (4/12) ── */}
                            <div style={{
                                gridColumn: "span 12",
                                background: "#ff7f11", borderRadius: "20px", padding: "40px",
                                display: "flex", flexDirection: "column", justifyContent: "space-between",
                                position: "relative", overflow: "hidden", minHeight: "260px"
                            }}
                                className="bento-4"
                            >
                                <div style={{
                                    position: "absolute", bottom: "-32px", right: "-32px",
                                    opacity: 0.1, transform: "scale(1.4)", pointerEvents: "none"
                                }}>
                                    <span className="material-symbols-outlined" style={{ fontSize: "180px", fontVariationSettings: "'FILL' 1" }}>insights</span>
                                </div>
                                <div>
                                    <h3 style={{
                                        fontFamily: "'Space Grotesk', sans-serif",
                                        fontSize: "1.5rem", fontWeight: 700,
                                        color: "#5f2a00", marginBottom: "8px"
                                    }}>Match Score</h3>
                                    <p style={{ color: "rgba(95,42,0,0.75)", fontSize: "0.9rem" }}>
                                        Real-time analysis of your resume vs. job requirements.
                                    </p>
                                </div>
                                <div style={{ marginTop: "32px" }}>
                                    <div style={{
                                        fontFamily: "'Space Grotesk', sans-serif",
                                        fontSize: "4rem", fontWeight: 700, color: "#5f2a00"
                                    }}>92%</div>
                                    <div style={{
                                        fontSize: "0.8rem", fontWeight: 700, color: "#5f2a00",
                                        textTransform: "uppercase", letterSpacing: "0.08em", marginTop: "6px"
                                    }}>Candidate Readiness</div>
                                </div>
                            </div>

                            {/* ── Skill Gaps (4/12) ── */}
                            <div style={{
                                gridColumn: "span 12",
                                background: "#201f20", borderRadius: "20px",
                                padding: "40px", minHeight: "260px"
                            }}
                                className="bento-4"
                            >
                                <div style={{
                                    width: "48px", height: "48px",
                                    background: "rgba(147,0,10,0.2)", borderRadius: "12px",
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    marginBottom: "24px"
                                }}>
                                    <span className="material-symbols-outlined" style={{ color: "#ffb4ab", fontSize: "24px" }}>warning</span>
                                </div>
                                <h3 style={{
                                    fontFamily: "'Space Grotesk', sans-serif",
                                    fontSize: "1.2rem", fontWeight: 700,
                                    color: "#ffffff", marginBottom: "10px"
                                }}>Skill Gaps</h3>
                                <p style={{ color: "#dfc0b0", fontSize: "0.9rem", lineHeight: 1.6, marginBottom: "24px" }}>
                                    Identify exactly where you're falling short so you can bridge the gap before the big day.
                                </p>
                                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                                    {["System Design", "Scalability"].map(tag => (
                                        <span key={tag} style={{
                                            padding: "4px 12px", background: "#353436",
                                            borderRadius: "999px", fontSize: "10px",
                                            color: "#ffb4ab", fontWeight: 700,
                                            border: "1px solid rgba(255,180,171,0.25)"
                                        }}>{tag}</span>
                                    ))}
                                </div>
                            </div>

                            {/* ── Realistic Practice (8/12) ── */}
                            <div style={{
                                gridColumn: "span 12",
                                background: "#201f20", borderRadius: "20px",
                                padding: "40px", display: "flex",
                                flexDirection: "column", justifyContent: "space-between",
                                minHeight: "260px", overflow: "hidden"
                            }}
                                className="bento-8"
                            >
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "16px" }}>
                                    <div style={{ flex: 1 }}>
                                        <h3 style={{
                                            fontFamily: "'Space Grotesk', sans-serif",
                                            fontSize: "1.4rem", fontWeight: 700,
                                            color: "#ffffff", marginBottom: "12px"
                                        }}>Realistic Practice</h3>
                                        <p style={{ color: "#dfc0b0", lineHeight: 1.65, fontSize: "0.95rem" }}>
                                            Practice with our AI-generated questions that match your target role's difficulty and receive personalized preparation tips.
                                        </p>
                                    </div>
                                    <span className="material-symbols-outlined" style={{ color: "#ff7f11", fontSize: "56px", flexShrink: 0 }}>school</span>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>

                {/* ══════════════════════════════════════════
                    FINAL CTA
                ══════════════════════════════════════════ */}
                <section style={{ padding: "64px 20px" }}>
                    <div style={{ maxWidth: "860px", margin: "0 auto", textAlign: "center" }}>
                        <div style={{
                            position: "relative", padding: "48px 32px",
                            borderRadius: "24px", background: "#2a2a2b", overflow: "hidden"
                        }}>
                            <div style={{
                                position: "absolute", inset: 0,
                                background: "#ff7f11", opacity: 0.05,
                                pointerEvents: "none"
                            }} />
                            <div style={{ position: "relative", zIndex: 1 }}>
                                <h2 style={{
                                    fontFamily: "'Space Grotesk', sans-serif",
                                    fontSize: "clamp(1.8rem, 3.5vw, 3rem)",
                                    fontWeight: 700, color: "#ffffff", marginBottom: "20px"
                                }}>Ready to ace your next interview?</h2>
                                <p style={{
                                    color: "#dfc0b0", fontSize: "1.1rem",
                                    lineHeight: 1.7, marginBottom: "48px", maxWidth: "540px", margin: "0 auto 48px"
                                }}>
                                    Get your custom preparation plan in seconds and walk into that room with unparalleled confidence.
                                </p>
                                <button 
                                    onClick={() => navigate("/register")}
                                    style={{
                                        padding: "20px 48px", borderRadius: "14px",
                                        background: "linear-gradient(135deg, #ffb689 0%, #ff7f11 100%)",
                                        color: "#5f2a00", fontFamily: "'Space Grotesk', sans-serif",
                                        fontWeight: 700, fontSize: "1.15rem", border: "none",
                                        cursor: "pointer",
                                        transition: "transform 0.2s, filter 0.2s"
                                    }}
                                >
                                    Get Started for Free
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

            </main>

            {/* Bento grid responsive breakpoints */}
            <style>{`
                @media (min-width: 768px) {
                    .bento-8 { grid-column: span 8 !important; }
                    .bento-4 { grid-column: span 4 !important; }
                }
            `}</style>

            <Footer />
        </>
    );
};

export default Landing;