import React, { useEffect, useState } from "react";
import { Grid, Button, Typography } from "@material-ui/core";
import { useParams, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context";

import CreateRoomPage from "./CreateRoomPage";
import MusicPlayer from "./MusicPlayer";

const Room = () => {
  let navigate = useNavigate();
  const { roomCode } = useParams();
  const {
    setRoomCode,
    guestCanPause,
    votesToSkip,
    setGuestCanPause,
    setVotesToSkip,
    spotifyAuthenticated,
    setSpotifyAuthenticated,
    song,
    setSong,
  } = useGlobalContext();

  const [isHost, setisHost] = useState(false);
  const [showSetting, setShowSetting] = useState(false);

  React.useEffect(() => {
    const getRoomDetails = () => {
      fetch(`/api/get-room?code=${roomCode}`)
        .then((response) => {
          if (!response.ok) {
            setRoomCode(null);
            navigate("/");
          }
          return response.json();
        })
        .then((data) => {
          setVotesToSkip(data.votes_to_skip),
            setGuestCanPause(data.guest_can_pause),
            setisHost(data.is_host);
        });
      if (isHost) {
        authenticateSpotify();
      }
    };
    getRoomDetails();
  }, [isHost]);

  const authenticateSpotify = () => {
    fetch("/spotify/is-authenticated")
      .then((response) => response.json())
      .then((data) => {
        setSpotifyAuthenticated(data.status);
        if (!data.status) {
          fetch("/spotify/get-auth-url")
            .then((response) => response.json())
            .then((data) => window.location.replace(data.url));
        }
      });
  };

  const handleLeave = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };
    fetch("/api/leave-room", requestOptions).then((response) => navigate("/"));
  };

  const getCurrentSong = () => {
    fetch("/spotify/current-song")
      .then((response) => {
        if (!response.ok) {
          return {};
        } else {
          return response.json();
        }
      })
      .then((data) => {
        setSong(data);
      });
  };

  useEffect(() => {
    const interval = setInterval(getCurrentSong, 1000);
    return () => clearInterval(interval);
  });

  const renderSettings = () => {
    return (
      <Grid container spacing={1}>
        <Grid item xs={12} align="center">
          <CreateRoomPage
            update={true}
            updateVotesToSkip={votesToSkip}
            updateGuestCanPause={guestCanPause}
            roomCode={roomCode}
          />
        </Grid>
        <Grid item xs={12} align="center">
          <Button
            color="secondary"
            variant="contained"
            onClick={() => setShowSetting(false)}
          >
            Close
          </Button>
        </Grid>
      </Grid>
    );
  };
  const renderSettingsButton = () => {
    return (
      <Grid item xs={12} align="center">
        <Button
          variant="contained"
          color="primary"
          onClick={() => setShowSetting(true)}
        >
          Settings
        </Button>
      </Grid>
    );
  };
  if (showSetting) {
    return renderSettings();
  } else {
    return (
      <Grid container spacing={1}>
        <Grid item xs={12} align="center">
          <Typography variant="h3" component="h3">
            Code: {roomCode}
          </Typography>
        </Grid>
        <MusicPlayer />
        {isHost ? renderSettingsButton() : null}
        <Grid item xs={12} align="center">
          <Button variant="contained" color="secondary" onClick={handleLeave}>
            Leave Room
          </Button>
        </Grid>
      </Grid>
    );
  }
};

export default Room;
