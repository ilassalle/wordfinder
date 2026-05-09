import React from 'react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="page">
            <header className="header">
                <h1>Word Finder</h1>
            </header>
            <main className="main">{children}</main>
            <footer className="footer">
                <p>&copy; {new Date().getFullYear()} Word Finder App</p>
            </footer>
        </div>
    );
};

export default Layout;
