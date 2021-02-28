import React, { useState, useEffect } from "react";
import CreateIcon from "@material-ui/icons/Create";
import { useAuth } from "../contexts/AuthContext";
import { useDatabase } from "../contexts/DatabaseContext";

import { Image, Center, Box } from "@chakra-ui/react";

export default function Avatar() {
  const { currentUser } = useAuth();
  const [user, setUser] = useState();
  const { DB_getDocumentById, DB_changeAvatar } = useDatabase();
  const [overlay, setOverlay] = useState("none");

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = () => {
    DB_getDocumentById("users", currentUser.uid).then((res) => {
      setUser(res);
    });
  };

  const changeAvatarHandler = async (e) => {
    const types = ["image/png", "image/jpeg"];

    let selected = e.target.files[0];
    if (selected && types.includes(selected.type)) {
      await DB_changeAvatar(selected, currentUser.uid);
      fetchUser();
    }
  };

  return (
    <Center className="Avatar">
      {user && (
        <form>
          <label
            className="avatar-wrapper"
            onMouseEnter={() => setOverlay("flex")}
            onMouseLeave={() => setOverlay("none")}
          >
            <Box display={overlay} className="avatar-overlay">
              <input type="file" onChange={changeAvatarHandler} />
              <CreateIcon />
            </Box>
            <Image
              borderRadius="full"
              boxSize="128px"
              src={user.avatar}
              alt=""
            />
          </label>
        </form>
      )}
    </Center>
  );
}
