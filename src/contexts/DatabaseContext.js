import React, { useContext } from "react";
import { firestore as db } from "../firebase";

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

  // All information from AuthContext
  const value = {
    DB_insertNewData,
    DB_getDocumentById,
  };

  //   Render children inside provider and pass value
  return (
    <DatabaseContext.Provider value={value}>
      {children}
    </DatabaseContext.Provider>
  );
}
