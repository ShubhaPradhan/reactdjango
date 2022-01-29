import React, { useContext, useEffect, useState } from "react";
import { useCallback } from "react";
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [roomCode, setRoomCode] = useState("");
  const componentDidMount = useCallback(async () => {
    try {
      const response = await fetch("/api/user-in-room");
      const data = await response.json();
      if (data) {
        setRoomCode(data.code);
        return {
          code: data.code,
        };
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    componentDidMount();
  }, []);
  return (
    <AppContext.Provider value={{ roomCode }}>{children}</AppContext.Provider>
  );
};

// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
