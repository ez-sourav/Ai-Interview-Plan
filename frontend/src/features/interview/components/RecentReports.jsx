import { useNavigate } from "react-router-dom";
import "../style/recentReports.scss";

/**
 * @typedef {Object} Report
 * @property {string} _id - Unique report ID
 * @property {string} [title] - Report title
 * @property {string} createdAt - Creation date
 * @property {number} matchScore - Match percentage score
 */

/**
 * Displays a list of recent interview reports with enhanced UI
 * @param {Object} props
 * @param {Report[]} props.reports - Array of report objects
 */
export const RecentReports = ({ reports }) => {
    const navigate = useNavigate();

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric"
        });
    };

    const getScoreTier = (score) => {
        if (score >= 80) return { tier: "high", label: "Excellent" };
        if (score >= 60) return { tier: "mid", label: "Good" };
        return { tier: "low", label: "Fair" };
    };

    return (
        <section className="recent-reports">
            <div className="recent-reports__header">
                <div>
                    <h2>My Interview Plans</h2>
                    <p className="recent-reports__subtitle">
                        {reports.length > 0 
                            ? `${reports.length} ${reports.length === 1 ? 'plan' : 'plans'} available`
                            : 'No plans yet'}
                    </p>
                </div>
                
            </div>

            {reports.length > 0 ? (
                <div className="reports-container">
                    <ul className="reports-list">
                        {reports.map((report) => {
                            const scoreTier = getScoreTier(report.matchScore);
                            return (
                                <li
                                    key={report._id}
                                    className="report-item"
                                    onClick={() => navigate(`/interview/${report._id}`)}
                                    role="button"
                                    tabIndex={0}
                                    onKeyPress={(e) => {
                                        if (e.key === 'Enter' || e.key === ' ') {
                                            navigate(`/interview/${report._id}`);
                                        }
                                    }}
                                >
                                    <div className="report-item__left">
                                        <div className="report-item__icon">
                                            <svg 
                                                xmlns="http://www.w3.org/2000/svg" 
                                                width="20" 
                                                height="20" 
                                                viewBox="0 0 24 24" 
                                                fill="none"
                                                stroke="currentColor" 
                                                strokeWidth="2" 
                                                strokeLinecap="round" 
                                                strokeLinejoin="round"
                                            >
                                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                                <polyline points="14 2 14 8 20 8" />
                                            </svg>
                                        </div>
                                        <div className="report-item__content">
                                            <h3 className="report-item__title">
                                                {report.title || "Untitled Position"}
                                            </h3>
                                            <p className="report-item__meta">
                                                {formatDate(report.createdAt)}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="report-item__middle">
                                        <div className={`match-score-badge score--${scoreTier.tier}`}>
                                            <span className="score-value">{report.matchScore}%</span>
                                            <span className="score-label">{scoreTier.label}</span>
                                        </div>
                                    </div>

                                    <div className="report-item__right">
                                        <svg 
                                            xmlns="http://www.w3.org/2000/svg" 
                                            width="18" 
                                            height="18" 
                                            viewBox="0 0 24 24" 
                                            fill="none"
                                            stroke="currentColor" 
                                            strokeWidth="2" 
                                            strokeLinecap="round" 
                                            strokeLinejoin="round"
                                        >
                                            <polyline points="9 18 15 12 9 6" />
                                        </svg>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            ) : (
                <div className="empty-state">
                    <div className="empty-state__icon">
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            width="48" 
                            height="48" 
                            viewBox="0 0 24 24" 
                            fill="none"
                            stroke="currentColor" 
                            strokeWidth="1.5" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                        >
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                            <polyline points="14 2 14 8 20 8" />
                            <line x1="12" y1="11" x2="12" y2="17" />
                            <line x1="9" y1="14" x2="15" y2="14" />
                        </svg>
                    </div>
                    <div className="empty-state__content">
                        <h3>No interview plans yet</h3>
                        <p>Generate your first interview strategy to get started</p>
                    </div>
                    <button 
                        className="empty-state__cta"
                        onClick={() => navigate('/')}
                        type="button"
                    >
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
                            <polyline points="15 18 9 12 15 6" />
                        </svg>
                        Create First Plan
                    </button>
                </div>
            )}
        </section>
    );
};