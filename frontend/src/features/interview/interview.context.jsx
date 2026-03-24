import { createContext, useState } from "react";

export const InterviewContext = createContext();

export const InterviewProvider = ({ children }) => {

    // const [loading, setLoading] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);
    const [isFetchingReports, setIsFetchingReports] = useState(false);
    const [isFetchingSingle, setIsFetchingSingle] = useState(false);
    const [report, setReport] = useState(null);
    const [reports, setReports] = useState([]);
    const [error, setError] = useState(null);

    return (
        <InterviewContext.Provider value={{
            isGenerating,
            setIsGenerating,
            isFetchingReports,
            setIsFetchingReports,
            isFetchingSingle,
            setIsFetchingSingle, report, setReport, reports, setReports,error,
setError,
        }}>
            {children}
        </InterviewContext.Provider>
    );
}