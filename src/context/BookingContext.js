// BookingContext.js
import React, { createContext, useState, useEffect, useCallback } from "react";
import { db, auth } from "./firebase";
import {collection,setDoc,onSnapshot,  query,orderBy,serverTimestamp,getDocs,writeBatch,doc,where,updateDoc,deleteDoc,getDoc,} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export const BookingContext = createContext(); 

export const BookingProvider = ({ children }) => {
  const [bookings, setBookings] = useState([]);
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedArea, setSelectedArea] = useState("");
  // 🔹 Auth listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (!currentUser) {
        setUserProfile(null);
        setBookings([]);
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);
  // 🔹 Fetch user profile
  useEffect(() => {
    if (!user) return;
    const userDocRef = doc(db, "users", user.uid);
    const unsubscribeProfile = onSnapshot(
      userDocRef,
      (snapshot) => setUserProfile(snapshot.exists() ? snapshot.data() : null),
      (error) => {
        console.error("Firestore Error (profile):", error);
        setUserProfile(null);
      }
    );
    return () => unsubscribeProfile();
  }, [user]);
  // 🔹 Fetch user bookings
  useEffect(() => {
    if (!user) {
      setBookings([]);
      return;
    }
    setLoading(true);
    const bookingsQuery = query(
      collection(db, "users", user.uid, "bookings"),
      orderBy("createdAt", "asc")
    );
    const unsubscribeBookings = onSnapshot(
      bookingsQuery,
      (snapshot) => {
        const userBookings = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBookings(userBookings);
        setLoading(false);
      },
      (error) => {
        console.error("Failed to fetch bookings:", error);
        setLoading(false);
      }
    );
    return () => unsubscribeBookings();
  }, [user]);
  //  Add booking with SAME ID in both collections
  const addBooking = useCallback(
    async (bookingData) => {
      if (!user) return;
      try {
        const bookingId = doc(collection(db, "bookings")).id; // generate ID
        const newBooking = {
          ...bookingData,
          userId: user.uid,
          username: userProfile?.name || "",
          status: "Pending",
          createdAt: serverTimestamp(),
        };
        // Save to top-level and user subcollection with SAME ID
        await setDoc(doc(db, "bookings", bookingId), newBooking);
        await setDoc(
          doc(db, "users", user.uid, "bookings", bookingId),
          newBooking
        );
      } catch (error) {
        console.error("Error adding booking:", error);
      }
    },
    [user, userProfile]
  );
  //  Update booking status safely
  const updateBookingStatus = useCallback(async (bookingId, userId, newStatus) => {
    try {
      const bookingRef = doc(db, "bookings", bookingId);
      const userBookingRef = doc(db, "users", userId, "bookings", bookingId);
      // 1️ Update top-level booking
      await updateDoc(bookingRef, { status: newStatus });
      // 2️ Check if user booking exists
      const userBookingSnap = await getDoc(userBookingRef);
      if (userBookingSnap.exists()) {
        // Update existing document
        await updateDoc(userBookingRef, { status: newStatus });
      } else {
        // If it doesn't exist, create it with top-level booking data + new status
        const topBookingSnap = await getDoc(bookingRef);
        if (topBookingSnap.exists()) {
          const data = topBookingSnap.data();
          await setDoc(userBookingRef, { ...data, status: newStatus });
        }
      }
      // 3️ Optimistic UI update
      setBookings((prev) =>
        prev.map((b) =>
          b.id === bookingId ? { ...b, status: newStatus } : b
        )
      );
    } catch (error) {
      console.error("Error updating booking status:", error);
    }
  }, []);
  //  Delete single booking
  const deleteBooking = useCallback(async (bookingId, userId) => {
    try {
      await deleteDoc(doc(db, "bookings", bookingId));
      await deleteDoc(doc(db, "users", userId, "bookings", bookingId));
      setBookings((prev) => prev.filter((b) => b.id !== bookingId));
    } catch (error) {
      console.error("Error deleting booking:", error);
    }
  }, []);
  //  Clear all bookings of a user
  const clearBookings = useCallback(async () => {
    if (!user) return;
    try {
      const userBookingsRef = collection(db, "users", user.uid, "bookings");
      const userSnapshot = await getDocs(userBookingsRef);
      const batch = writeBatch(db);
      userSnapshot.forEach((docSnap) => batch.delete(docSnap.ref));
      await batch.commit();

      const topLevelBookingsQuery = query(
        collection(db, "bookings"),
        where("userId", "==", user.uid)
      );
      const topLevelSnapshot = await getDocs(topLevelBookingsQuery);
      const topLevelBatch = writeBatch(db);
      topLevelSnapshot.forEach((docSnap) => topLevelBatch.delete(docSnap.ref));
      await topLevelBatch.commit();

      setBookings([]);
    } catch (error) {
      console.error("Error clearing bookings:", error);
    }
  }, [user]);
  //  Admin: Update user role
  const updateUserRole = useCallback(async (userId, newRole) => {
    try {
      const userRef = doc(db, "users", userId);
      await updateDoc(userRef, { role: newRole });

      if (userProfile && userProfile.uid === userId) {
        setUserProfile((prev) => ({ ...prev, role: newRole }));
      }

      console.log(` Role of ${userId} updated to ${newRole}`);
    } catch (error) {
      console.error("❌ Error updating user role:", error);
    }
  }, [userProfile]);
  return (
    <BookingContext.Provider
      value={{user,userProfile, bookings,addBooking,updateBookingStatus,deleteBooking,clearBookings,updateUserRole,loading,selectedCity,setSelectedCity,selectedArea,setSelectedArea, }}>
      {children}
    </BookingContext.Provider>
  );
};