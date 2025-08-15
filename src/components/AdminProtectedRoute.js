import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { auth, db } from '../context/firebase'; // Make sure this path is correct
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

const AdminProtectedRoute = ({ children }) => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                // User is logged in, check their role in Firestore
                const userDocRef = doc(db, 'users', user.uid);
                const userDoc = await getDoc(userDocRef);

                if (userDoc.exists() && userDoc.data().role === 'admin') {
                    setIsAdmin(true);
                } else {
                    setIsAdmin(false);
                }
            } else {
                // User is not logged in
                setIsAdmin(false);
            }
            setLoading(false);
        });

        // Clean up the listener when the component unmounts
        return () => unsubscribe();
    }, []);

    // While we are checking the user's role, show a loading message
    if (loading) {
        return <div><h1>Loading...</h1></div>;
    }

    // If the user is an admin, show the component. Otherwise, redirect them to login.
    if (isAdmin) {
        return children; // Renders the AdminDashboard
    } else {
        return <Navigate to="/login" />;
    }
};

export default AdminProtectedRoute;