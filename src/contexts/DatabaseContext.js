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
    return db.collection(collection).doc(data.id).set(data);
  }

  // Get document by id
  async function DB_getDocumentById(collection, docId) {
    const snapshot = db.collection(collection).doc(docId);
    const doc = await snapshot.get();
    return doc.data();
  }

  // Get documents by collection name
  async function DB_getDocumentsFromCollection(collection) {
    const snapshot = db.collection(collection);
    const doc = await snapshot.get();
    return doc.docs.map((doc) => doc.data());
  }

  // Add avatar to storage and change avatar url in users collection
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

  // Change username
  function DB_changeUsername(email, userId) {
    const username = email.split("@")[0];
    return db.collection("users").doc(userId).update({ username: username });
  }

  // All information from AuthContext
  const value = {
    DB_insertNewData,
    DB_getDocumentById,
    DB_changeAvatar,
    DB_changeUsername,
    DB_getDocumentsFromCollection,
  };

  //   Render children inside provider and pass value
  return (
    <DatabaseContext.Provider value={value}>
      {children}
    </DatabaseContext.Provider>
  );
}
