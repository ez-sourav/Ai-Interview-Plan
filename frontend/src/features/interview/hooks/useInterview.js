import { useContext, useEffect } from 'react'
import { getAllInterviewReports, getInterviewReportById, generateInterviewReport} from '../services/interview.api'
import { InterviewContext } from '../interview.context'
import { useParams } from 'react-router-dom'

export const useInterview = () => {
    const context = useContext(InterviewContext);
    const { interviewId } = useParams();
    if (!context) {
        throw new Error('useInterview must be used within an InterviewProvider');
    }

    const { isGenerating, setIsGenerating,
        isFetchingReports, setIsFetchingReports,
        isFetchingSingle, setIsFetchingSingle, report, setReport, reports, setReports, error, setError } = context;

    const generateReport = async ({ jobDescription, selfDescription, resumeFile }) => {
        setIsGenerating(true);
        let response = null;
        try {
            response = await generateInterviewReport({ jobDescription, selfDescription, resumeFile });
            setReport(response.interviewReport);
        } catch (error) {
            console.error("Error generating interview report:", error);
        } finally {
            setIsGenerating(false);
        }
        return response?.interviewReport || null;
    }

    const getReportById = async (interviewId) => {
        setIsFetchingSingle(true);
        setError(null);
        let response = null;
        try {
            response = await getInterviewReportById(interviewId);
            setReport(response?.interviewReport || null);
        } catch (error) {
            console.error("Error fetching interview report:", error);
            setReport(null);
            if (error.response?.status === 404) {
                setError(null); // not found case
            } else {
                setError("Something went wrong. Please try again.");
            }
        } finally {
            setIsFetchingSingle(false);
        }
        return response?.interviewReport || null;
    }

    const getReports = async () => {
        setIsFetchingReports(true);
        let response = null;
        try {
            response = await getAllInterviewReports();
            setReports(response?.interviewReports || []);
        } catch (error) {
            console.error("Error fetching interview reports:", error);
        } finally {
            setIsFetchingReports(false);
        }
        return response?.interviewReports || [];
    }

    useEffect(() => {
        if (interviewId) {
            getReportById(interviewId);
        } else {
            getReports();
        }
    }, [interviewId])

    return {
        isGenerating,
        isFetchingReports,
        isFetchingSingle,
        report,
        reports,
        generateReport,
        getReportById,
        getReports,
    }
}