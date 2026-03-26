import { useInterview } from "../hooks/useInterview";
import { RecentReports } from "../components/RecentReports";
import "../style/recentPlans.scss";


export const RecentPlans = () => {
    const { reports,isFetchingReports  } = useInterview();

    return (
        <>
            
            <div className="home-page">
                <header className="page-header">
                    <div className="page-header__content">
                        <h1>
                            My <span className="highlight">Interview Plans</span>
                        </h1>
                        <p>View all your generated interview strategies and access previous analysis.</p>
                    </div>
                </header>

                <RecentReports reports={reports}  loading={isFetchingReports}  />
            </div>
        </>
    );
};