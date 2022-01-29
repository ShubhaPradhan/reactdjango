import React, { useState, useContext, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
const Room = () => {
  const defaultVotes = 2;
  const { roomCode } = useParams();
  const [guestCanPause, setGuestCanPause] = useState(true);
  const [votesToSkip, setVotesToSkip] = useState(defaultVotes);
  const [isHost, setisHost] = useState(false);

  React.useEffect(() => {
    const getRoomDetails = () => {
      fetch(`/api/get-room?code=${roomCode}`)
        .then((response) => response.json())
        .then((data) => {
          setVotesToSkip(data.votes_to_skip),
            setGuestCanPause(data.guest_can_pause),
            setisHost(data.is_host);
        });
    };
    getRoomDetails();
  }, [roomCode]);
  return (
    <div className="MuiGrid-container">
      <h1>{roomCode}</h1>
      <p>Votes: {votesToSkip}</p>
      <p>Guest Can Pause: {guestCanPause.toString()}</p>
      <p>Host: {isHost.toString()}</p>
    </div>
  );
};

export default Room;
