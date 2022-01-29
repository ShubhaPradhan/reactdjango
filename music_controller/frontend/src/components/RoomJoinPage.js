import React, { Component, useState } from "react";
import { TextField, Button, Grid, Typography } from "@material-ui/core";
import { Link, useNavigate } from "react-router-dom";

const RoomJoinPage = () => {
  const navigate = useNavigate();
  const [roomCode, setRoomCode] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const handleSubmit = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code: roomCode,
      }),
    };
    fetch("/api/join-room", requestOptions).then((response) => {
      if (response.ok) {
        navigate(`/room/${roomCode}`);
      } else {
        setError(true);
        if (error) {
          setErrorMessage("Room not found");
        }
      }
    });
  };
  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Typography variant="h4" component="h4">
          Join a Room
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <TextField
          error={errorMessage}
          label="Code"
          placeholder="Enter a Room Code"
          value={roomCode}
          helperText={errorMessage}
          onChange={(e) => setRoomCode(e.target.value)}
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Enter Room
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" color="secondary" to="/" component={Link}>
          Back
        </Button>
      </Grid>
    </Grid>
  );
};

export default RoomJoinPage;
