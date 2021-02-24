import React from "react";
import { useAuth } from "../contexts/AuthContext";

import { useHistory } from "react-router-dom";

export default function Index() {
  const { logout } = useAuth();
  const history = useHistory();

  async function handleLogout() {
    await logout();
    history.push("/login");
  }

  return (
    <div>
      <button onClick={handleLogout}>log out</button>
    </div>
  );
}
