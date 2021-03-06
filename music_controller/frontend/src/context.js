import React, { useContext, useEffect, useState } from "react";
import { useCallback } from "react";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const defaultVotes = 2;
  const [roomCode, setRoomCode] = useState("");
  const [guestCanPause, setGuestCanPause] = useState(true);
  const [votesToSkip, setVotesToSkip] = useState(defaultVotes);
  const [successMsg, setSuccessMsg] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);
  const [spotifyAuthenticated, setSpotifyAuthenticated] = useState(false);
  const [song, setSong] = useState([]);

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
    <AppContext.Provider
      value={{
        defaultVotes,
        roomCode,
        setRoomCode,
        guestCanPause,
        setGuestCanPause,
        votesToSkip,
        setVotesToSkip,
        successMsg,
        setSuccessMsg,
        errorMsg,
        setErrorMsg,
        spotifyAuthenticated,
        setSpotifyAuthenticated,
        song,
        setSong,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
