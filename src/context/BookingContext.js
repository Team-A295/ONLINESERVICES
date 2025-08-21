// BookingContext.js
import React, { createContext, useState, useEffect, useCallback } from "react";
import { db, auth } from "./firebase";
import {
  collection,
  setDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
  getDocs,
  writeBatch,
  doc,
  where,
  updateDoc,
  deleteDoc,
  getDoc,
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

  // 🔹 Auth Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (!currentUser) {
        setUserProfile(null);
        setBookings([]);
        setLoading(false);
        console.log("🔹 DEBUG: User signed out"); // 🔹 DEBUG
      } else {
        console.log("🔹 DEBUG: User signed in", currentUser.uid); // 🔹 DEBUG
      }
    });
    return () => unsubscribe();
  }, []);

  // 🔹 Fetch User Profile
  useEffect(() => {
    if (!user?.uid) return; // 🔹 NEW: safeguard
    const userDocRef = doc(db, "users", user.uid);

    let unsubscribeProfile;
    try { // 🔹 NEW: wrap listener in try/catch
      unsubscribeProfile = onSnapshot(
        userDocRef,
        (snapshot) => {
          setUserProfile(snapshot.exists() ? snapshot.data() : null);
          console.log("🔹 DEBUG: User profile snapshot received", snapshot.data()); // 🔹 DEBUG
        },
        (error) => {
          console.error("Firestore Error (profile):", error); // 🔹 DEBUG
          setUserProfile(null);
        }
      );
    } catch (error) { // 🔹 NEW
      console.error("Error initializing profile listener:", error); // 🔹 DEBUG
    }

    return () => {
      if (unsubscribeProfile) unsubscribeProfile(); // 🔹 NEW
    };
  }, [user]);

  // 🔹 Fetch User Bookings (realtime sync)
  useEffect(() => {
    if (!user?.uid) { // 🔹 NEW: safeguard
      setBookings([]);
      return;
    }
    setLoading(true);

    let unsubscribeBookings;
    try { // 🔹 NEW
      const bookingsQuery = query(
        collection(db, "users", user.uid, "bookings"),
        orderBy("createdAt", "asc")
      );

      unsubscribeBookings = onSnapshot(
        bookingsQuery,
        (snapshot) => {
          const userBookings = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setBookings(userBookings);
          setLoading(false);
          console.log("🔹 DEBUG: Bookings snapshot received", userBookings); // 🔹 DEBUG
        },
        (error) => {
          console.error("Failed to fetch bookings:", error); // 🔹 DEBUG
          setLoading(false);
        }
      );
    } catch (error) { // 🔹 NEW
      console.error("Error initializing bookings listener:", error); // 🔹 DEBUG
      setLoading(false);
    }

    return () => {
      if (unsubscribeBookings) unsubscribeBookings(); // 🔹 NEW
    };
  }, [user]);

  // 🔹 Add Booking (same ID in both collections)
  const addBooking = useCallback(
    async (bookingData) => {
      if (!user?.uid) return; // 🔹 NEW: safeguard
      try {
        const bookingId = doc(collection(db, "bookings")).id; // generate unique ID
        const newBooking = {
          ...bookingData,
          userId: user.uid,
          username: userProfile?.name || "",
          status: "Pending",
          createdAt: serverTimestamp(),
        };

        // Save booking in both places
        await setDoc(doc(db, "bookings", bookingId), newBooking);
        await setDoc(doc(db, "users", user.uid, "bookings", bookingId), newBooking);

        console.log("🔹 DEBUG: Booking added", newBooking); // 🔹 DEBUG
      } catch (error) {
        console.error("Error adding booking:", error); // 🔹 DEBUG
      }
    },
    [user, userProfile]
  );

  // 🔹 Update Booking Status
  const updateBookingStatus = useCallback(async (bookingId, userId, newStatus) => {
    try {
      const bookingRef = doc(db, "bookings", bookingId);
      const userBookingRef = doc(db, "users", userId, "bookings", bookingId);

      // Update top-level booking
      await updateDoc(bookingRef, { status: newStatus });

      // Update user booking (create if missing)
      const userBookingSnap = await getDoc(userBookingRef);
      if (userBookingSnap.exists()) {
        await updateDoc(userBookingRef, { status: newStatus });
      } else {
        const topBookingSnap = await getDoc(bookingRef);
        if (topBookingSnap.exists()) {
          const data = topBookingSnap.data();
          await setDoc(userBookingRef, { ...data, status: newStatus });
        }
      }

      // Optimistic UI update
      setBookings((prev) =>
        prev.map((b) => (b.id === bookingId ? { ...b, status: newStatus } : b))
      );

      console.log(`🔹 DEBUG: Booking ${bookingId} status updated to ${newStatus}`); // 🔹 DEBUG
    } catch (error) {
      console.error("Error updating booking status:", error); // 🔹 DEBUG
    }
  }, []);

  // 🔹 Delete Booking
  const deleteBooking = useCallback(async (bookingId, userId) => {
    try {
      await deleteDoc(doc(db, "bookings", bookingId));
      await deleteDoc(doc(db, "users", userId, "bookings", bookingId));

      setBookings((prev) => prev.filter((b) => b.id !== bookingId));

      console.log(`🔹 DEBUG: Booking ${bookingId} deleted`); // 🔹 DEBUG
    } catch (error) {
      console.error("Error deleting booking:", error); // 🔹 DEBUG
    }
  }, []);

  // 🔹 Clear ALL bookings of a user
  const clearBookings = useCallback(async () => {
    if (!user?.uid) return; // 🔹 NEW
    try {
      // Delete from user subcollection
      const userBookingsRef = collection(db, "users", user.uid, "bookings");
      const userSnapshot = await getDocs(userBookingsRef);
      const batch = writeBatch(db);
      userSnapshot.forEach((docSnap) => batch.delete(docSnap.ref));
      await batch.commit();

      // Delete from top-level
      const topLevelBookingsQuery = query(
        collection(db, "bookings"),
        where("userId", "==", user.uid)
      );
      const topLevelSnapshot = await getDocs(topLevelBookingsQuery);
      const topLevelBatch = writeBatch(db);
      topLevelSnapshot.forEach((docSnap) => topLevelBatch.delete(docSnap.ref));
      await topLevelBatch.commit();

      setBookings([]);

      console.log("🔹 DEBUG: All bookings cleared for user", user.uid); // 🔹 DEBUG
    } catch (error) {
      console.error("Error clearing bookings:", error); // 🔹 DEBUG
    }
  }, [user]);

  // 🔹 Admin: Update User Role
  const updateUserRole = useCallback(
    async (userId, newRole) => {
      try {
        const userRef = doc(db, "users", userId);
        await updateDoc(userRef, { role: newRole });

        if (userProfile && userProfile.uid === userId) {
          setUserProfile((prev) => ({ ...prev, role: newRole }));
        }

        console.log(`🔹 DEBUG: Role of ${userId} updated to ${newRole}`); // 🔹 DEBUG
      } catch (error) {
        console.error("❌ Error updating user role:", error); // 🔹 DEBUG
      }
    },
    [userProfile]
  );

  // ✅ Context Provider
  return (
    <BookingContext.Provider
      value={{
        user,
        userProfile,
        bookings,
        addBooking,
        updateBookingStatus,
        deleteBooking,
        clearBookings,
        updateUserRole,
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
