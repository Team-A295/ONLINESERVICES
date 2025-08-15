import React, { createContext, useState, useEffect, useCallback } from "react";
import { db, auth } from "./firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
  getDocs,
  writeBatch,
  doc,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [bookings, setBookings] = useState([]);
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedArea, setSelectedArea] = useState("");

  // Effect 1: Handles user authentication state (login/logout)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (!currentUser) {
        // If logged out, clear all data and finish loading
        setUserProfile(null);
        setBookings([]);
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  // Effect 2: Fetches the logged-in user's profile (including role)
  useEffect(() => {
    if (!user) return; // Only run if a user is logged in

    const userDocRef = doc(db, "users", user.uid);
    const unsubscribeProfile = onSnapshot(
      userDocRef,
      (snapshot) => {
        setUserProfile(snapshot.exists() ? snapshot.data() : null);
      },
      (error) => {
        console.error("Firestore Error: Failed to fetch user profile.", error);
        setUserProfile(null);
      }
    );
    return () => unsubscribeProfile();
  }, [user]);

  // Effect 3: Fetches the user's bookings and controls the final loading state
  useEffect(() => {
    if (!user) {
      setBookings([]); // Clear bookings on logout
      return;
    }

    setLoading(true); // Show loading screen while fetching bookings
    const bookingsQuery = query(
      collection(db, "users", user.uid, "bookings"),
      orderBy("createdAt", "asc")
    );

    const unsubscribeBookings = onSnapshot(
      bookingsQuery,
      (snapshot) => {
        const userBookings = snapshot.docs.map((doc) => ({
          id: doc.id, ...doc.data(),
        }));
        setBookings(userBookings);
        setLoading(false); // Finish loading after bookings are fetched
      },
      (error) => {
        console.error("Failed to fetch bookings:", error);
        setLoading(false); // Also finish loading on error
      }
    );
    return () => unsubscribeBookings();
  }, [user]);

  // Function to add a new booking
  const addBooking = useCallback(async (bookingData) => {
    if (!user) return;

    const newBooking = {
      ...bookingData,
      userId: user.uid,
      status: 'Pending', // Add a default status for the admin to see
      createdAt: serverTimestamp(),
    };

    try {
      // Write to the top-level 'bookings' collection for the admin
      await addDoc(collection(db, "bookings"), newBooking);
      // Also write to the user-specific subcollection
      await addDoc(collection(db, "users", user.uid, "bookings"), newBooking);
    } catch (error) {
      console.error("Error adding booking:", error);
    }
  }, [user]);

  // Function to clear all of a user's bookings
  const clearBookings = useCallback(async () => {
    if (!user) return;
    try {
      const bookingsRef = collection(db, "users", user.uid, "bookings");
      const querySnapshot = await getDocs(bookingsRef);
      const batch = writeBatch(db);
      querySnapshot.forEach((doc) => batch.delete(doc.ref));
      await batch.commit();
    } catch (error) {
      console.error("Error clearing bookings:", error);
    }
  }, [user]);

  return (
    <BookingContext.Provider
      value={{
        user,
        userProfile,
        bookings,
        addBooking,
        clearBookings,
        loading,
        selectedCity,
        setSelectedCity,
        selectedArea,
        setSelectedArea,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};