import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            setIsAuthenticated(false);
            return;
        }

        axios.get("http://127.0.0.1:8000/verify-token", {
            headers: {
                Authorization: token
            }
        }).then(() => {
            setIsAuthenticated(true);
        }).catch(() => {
            setIsAuthenticated(false);
        });
    }, []);

    if (isAuthenticated === null) return <div>Loading...</div>;
    return isAuthenticated ? <>{children}</> : <Navigate to="/" />;
};

export default ProtectedRoute;
