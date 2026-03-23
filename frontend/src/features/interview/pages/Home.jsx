import { useRef, useState, useCallback } from "react";
import { useInterview } from "../hooks/useInterview";
import "../style/home.scss";
import { useNavigate } from "react-router-dom";
import Navbar from "../../auth/components/Navbar";
import { Toaster, toast } from "react-hot-toast";

const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
    </svg>
);

const XIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
);

const SpinnerIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        className="spinner-icon">
        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
);

export const Home = () => {
    const [fileName, setFileName] = useState("");
    const { isGenerating, generateReport } = useInterview();
    const [jobDescription, setJobDescription] = useState("");
    const [selfDescription, setSelfDescription] = useState("");
    const [jobCharCount, setJobCharCount] = useState(0);
    const resumeInputRef = useRef(null);
    const navigate = useNavigate();



    const handleFileChange = (e) => {
        const file = e.target.files?.[0];

        if (file) {
            if (file.type !== "application/pdf") {
                toast.error("Only PDF files are allowed");
                e.target.value = "";
                return;
            }

            if (file.size > 3 * 1024 * 1024) {
                toast.error("File size must be less than 3MB");
                e.target.value = "";
                return;
            }

            setFileName(file.name);
            toast.success(`Resume uploaded: ${file.name.slice(0, 30)}...`);
        }
    };

    const isValid =
    jobDescription.trim() &&
    (resumeInputRef.current?.files?.length > 0 || selfDescription.trim());

    const handleJobDescChange = (e) => {
        setJobDescription(e.target.value);
        setJobCharCount(e.target.value.length);
    };

    // Main report generation logic
    const performGenerateReport = useCallback(async () => {
        const resumeFile = resumeInputRef.current?.files?.[0];

        // Validation
        if (!jobDescription.trim()) {
            toast.error("Job description is required");
            return false;
        }

        if (!resumeFile && !selfDescription.trim()) {
            toast.error("Please upload a resume or write a self-description");
            return false;
        }

        try {
            const data = await generateReport({
                jobDescription,
                selfDescription,
                resumeFile,
            });

            // Validate response
            if (!data?._id) {
                throw new Error("Invalid response: Missing interview ID");
            }

            toast.success("Interview strategy generated successfully!");
            navigate(`/interview/${data._id}`);
            return true;
        } catch (err) {
            console.error("Report generation error:", err);
            
            let errorMessage = "Failed to generate interview strategy. Please try again.";
            
            // Check if response exists first
            if (err.response) {
                // Server error with custom message
                if (err.response?.data?.message) {
                    errorMessage = err.response.data.message;
                }
                // AI service not working
                else if (err.response?.status === 503) {
                    errorMessage = "AI service is temporarily unavailable. Please try again in a few moments.";
                }
                // Server error
                else if (err.response?.status >= 500) {
                    errorMessage = "Server error occurred. Please try again later.";
                }
                // Validation errors
                else if (err.response?.status === 400) {
                    errorMessage = "Invalid input. Please check your entries and try again.";
                }
                // Other HTTP errors
                else if (err.response?.status >= 400) {
                    errorMessage = err.response.data?.message || "Request failed. Please try again.";
                }
            }
            // Network error - check error code/message for actual network issues
            else if (!err.response && (err.code === 'ECONNABORTED' || err.code === 'ETIMEDOUT' || err.message?.includes('Network'))) {
                errorMessage = "Network connection error. Please check your internet and try again.";
            }
            // Other errors (likely server or request issues)
            else {
                errorMessage = "Unable to process your request. Please try again.";
            }
            
            toast.error(errorMessage);
            return false;
        }
    }, [jobDescription, selfDescription, generateReport, navigate]);

    const handleGenerateReport = async () => {
        await performGenerateReport();
    };

    if (isGenerating) {
        return (
            <main className="loading-screen">
                <div className="loading-content">
                    <SpinnerIcon />
                    <h2>Generating your personalized interview strategy...</h2>
                    <p>This usually takes around 30 seconds.</p>
                </div>
            </main>
        );
    }

    return (
        <>
            <Toaster
                position="top-center"
                reverseOrder={false}
                gutter={8}
                containerClassName=""
                containerStyle={{
                    top: 20,
                    right: 20,
                    zIndex: 99999,
                }}
            />
            <Navbar />
            <div className="home-page">
                <header className="page-header">
                    <h1>
                        Create Your Custom <span className="highlight">Interview Plan</span>
                    </h1>
                    <p>Let our AI analyze the job requirements and your unique profile to build a winning strategy.</p>
                </header>

            <div className="interview-card">
                <div className="interview-card__body">

                    {/* Left Panel - Job Description */}
                    <div className="panel panel--left">
                        <div className="panel__header">
                            <span className="panel__icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                                </svg>
                            </span>
                            <h2>Target Job Description</h2>
                            <span className="badge badge--required">Required</span>
                        </div>
                        <textarea
                            value={jobDescription}
                            onChange={handleJobDescChange}
                            className="panel__textarea"
                            placeholder={`Paste the full job description here...\ne.g. 'Senior Frontend Engineer at Google requires proficiency in React, TypeScript, and large-scale system design...'`}
                            maxLength={5000}
                        />
                        <div className="char-counter">{jobCharCount} / 5000</div>
                    </div>

                    <div className="panel-divider" />

                    {/* Right Panel - Profile */}
                    <div className="panel panel--right">
                        <div className="panel__header">
                            <span className="panel__icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                    <circle cx="12" cy="7" r="4" />
                                </svg>
                            </span>
                            <h2>Your Profile</h2>
                        </div>

                        <div className="upload-section">
                            <label className="section-label">
                                Upload Resume
                                <span className="badge badge--best">Best Results</span>
                            </label>
                            <label className={`dropzone ${fileName ? "dropzone--active" : ""}`} htmlFor="resume">
                                <span className="dropzone__icon">
                                    {fileName ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none"
                                            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                            <polyline points="14 2 14 8 20 8" />
                                            <line x1="16" y1="13" x2="8" y2="13" />
                                            <line x1="16" y1="17" x2="8" y2="17" />
                                            <polyline points="10 9 9 9 8 9" />
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none"
                                            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="16 16 12 12 8 16" />
                                            <line x1="12" y1="12" x2="12" y2="21" />
                                            <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
                                        </svg>
                                    )}
                                </span>

                                {fileName ? (
                                    <>
                                        <p className="dropzone__title dropzone__title--success">
                                            <span className="icon-success"><CheckIcon /></span>
                                            {fileName.length > 28 ? fileName.slice(0, 28) + "…" : fileName}
                                        </p>
                                        <button
                                            type="button"
                                            className="remove-file"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setFileName("");
                                                if (resumeInputRef.current) {
                                                    resumeInputRef.current.value = "";
                                                }
                                            }}
                                        >
                                            <XIcon />
                                            Remove file
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <p className="dropzone__title">Click to upload</p>
                                        <p className="dropzone__subtitle">PDF only · Max 3 MB</p>
                                    </>
                                )}

                                <input
                                    ref={resumeInputRef}
                                    hidden
                                    type="file"
                                    id="resume"
                                    name="resume"
                                    accept=".pdf"
                                    onChange={handleFileChange}
                                />
                            </label>
                        </div>

                        <div className="or-divider"><span>OR</span></div>

                        <div className="self-description">
                            <label className="section-label" htmlFor="selfDescription">Quick Self-Description</label>
                            <textarea
                                value={selfDescription}
                                onChange={(e) => setSelfDescription(e.target.value)}
                                id="selfDescription"
                                name="selfDescription"
                                className="panel__textarea panel__textarea--short"
                                placeholder="Briefly describe your experience, key skills, and years of experience if you don't have a resume handy..."
                            />
                        </div>

                        <div className="info-box">
                            <span className="info-box__icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                    <circle cx="12" cy="12" r="10" />
                                    <line x1="12" y1="8" x2="12" y2="12" stroke="#1a1f27" strokeWidth="2" />
                                    <line x1="12" y1="16" x2="12.01" y2="16" stroke="#1a1f27" strokeWidth="2" />
                                </svg>
                            </span>
                            <p>Either a <strong>Resume</strong> or a <strong>Self Description</strong> is required to generate a personalized plan.</p>
                        </div>
                    </div>
                </div>

                <div className="interview-card__footer">
                    <span className="footer-info">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                            style={{ marginRight: "5px", verticalAlign: "middle" }}>
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="12 6 12 12 16 14" />
                        </svg>
                        AI-Powered · ~30 seconds
                    </span>
                    <button onClick={handleGenerateReport} disabled={!isValid || isGenerating} className="generate-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M13 2L3 14h7v8l11-12h-7z" />
                        </svg>
                        {isGenerating ? "Generating..." : "Generate My Interview Strategy"}
                    </button>
                </div>
            </div>

            </div>
        </>
    );
};