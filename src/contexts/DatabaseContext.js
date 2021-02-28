import React, { useContext } from "react";
import { firestore as db, storage } from "../firebase";

const DatabaseContext = React.createContext();

// Create custom hook for authentication
export function useDatabase() {
  return useContext(DatabaseContext);
}

export function DatabaseProvider({ children }) {
  // Insert new data into collection
  function DB_insertNewData(collection, data) {
    return db.collection(collection).doc(data.id).set({
      id: data.id,
      avatar: data.avatar,
    });
  }

  // Get document by id
  async function DB_getDocumentById(collection, docId) {
    const snapshot = db.collection(collection).doc(docId);
    const doc = await snapshot.get();
    return doc.data();
  }

  // Add avatar to storage
  async function DB_changeAvatar(file, userId) {
    const storageRef = storage.ref();
    const fileRef = storageRef.child(file.name);
    await fileRef.put(file);
    const fileURL = await fileRef.getDownloadURL();
    return db.collection("users").doc(userId).set({
      id: userId,
      avatar: fileURL,
    });
  }

  // All information from AuthContext
  const value = {
    DB_insertNewData,
    DB_getDocumentById,
    DB_changeAvatar,
  };

  //   Render children inside provider and pass value
  return (
    <DatabaseContext.Provider value={value}>
      {children}
    </DatabaseContext.Provider>
  );
}
