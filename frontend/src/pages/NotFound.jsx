export const NotFound = () => {
    return (
        <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'center', 
            alignItems: 'center', 
            minHeight: '100vh',
            textAlign: 'center'
        }}>
            <h1>404</h1>
            <p>Page Not Found</p>
            <a href="/">Go back to home</a>
        </div>
    );
};
