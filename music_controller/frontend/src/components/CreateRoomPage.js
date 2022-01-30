import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Button,
  Grid,
  Typography,
  TextField,
  FormHelperText,
  FormControl,
  Radio,
  RadioGroup,
  FormControlLabel,
  Collapse,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { useGlobalContext } from "../context";

const CreateRoomPage = ({
  update,
  roomCode,
  updateVotesToSkip,
  updateGuestCanPause,
}) => {
  const {
    guestCanPause,
    votesToSkip,
    setGuestCanPause,
    setVotesToSkip,
    successMsg,
    setSuccessMsg,
    errorMsg,
    setErrorMsg,
  } = useGlobalContext();

  let navigate = useNavigate();

  const handleVotesToSkip = (e) => {
    setVotesToSkip(e.target.value);
  };

  const handleGuestCanPause = (e) => {
    setGuestCanPause(e.target.value === "true" ? true : false);
  };

  const handleCreate = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        votes_to_skip: votesToSkip,
        guest_can_pause: guestCanPause,
      }),
    };
    fetch("/api/create-room", requestOptions)
      .then((response) => response.json())
      .then((data) => navigate(`/room/${data.code}`));
  };

  const handleUpdate = () => {
    const requestOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        votes_to_skip: votesToSkip,
        guest_can_pause: guestCanPause,
        code: roomCode,
      }),
    };
    fetch("/api/update-room", requestOptions).then((response) => {
      if (response.ok) {
        setSuccessMsg(true);
      } else {
        setErrorMsg(true);
      }
    });
  };

  if (update) {
    return (
      <Grid container spacing={1}>
        <Grid item xs={12} align="center">
          <Collapse
            in={successMsg}
            item
            xs={6}
            align="center"
            className="messages"
          >
            <Alert severity="success" onClose={() => setSuccessMsg(false)}>
              Room updated successfully !
            </Alert>
          </Collapse>
          <Collapse
            in={errorMsg}
            item
            xs={6}
            align="center"
            className="messages"
          >
            <Alert severity="error" onClose={() => setErrorMsg(false)}>
              Error in updating settings
            </Alert>
          </Collapse>
        </Grid>
        <Grid item xs={12} align="center">
          <Typography component="h4" variant="h4">
            Update Room
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <FormControl component="fieldset">
            <FormHelperText>
              <div align="center">Guest Control of Playback State</div>
            </FormHelperText>
            <RadioGroup
              row
              defaultValue={updateGuestCanPause.toString()}
              onChange={handleGuestCanPause}
            >
              <FormControlLabel
                value="true"
                control={<Radio color="primary" />}
                label="Play/Pause"
                labelPlacement="bottom"
              />
              <FormControlLabel
                value="false"
                control={<Radio color="secondary" />}
                label="No Control"
                labelPlacement="bottom"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12} align="center">
          <FormControl>
            <TextField
              required={true}
              type="number"
              defaultValue={updateVotesToSkip}
              inputProps={{
                min: 1,
                style: { textAlign: "center" },
              }}
              onChange={handleVotesToSkip}
            />
            <FormHelperText>
              <div align="center">Votes Required to Skip Song</div>
            </FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} align="center">
          <Button color="primary" variant="contained" onClick={handleUpdate}>
            Update Room
          </Button>
        </Grid>
      </Grid>
    );
  } else {
    return (
      <Grid container spacing={1}>
        <Grid item xs={12} align="center">
          <Typography component="h4" variant="h4">
            Create A Room
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <FormControl component="fieldset">
            <FormHelperText>
              <div align="center">Guest Control of Playback State</div>
            </FormHelperText>
            <RadioGroup row defaultValue="true" onChange={handleGuestCanPause}>
              <FormControlLabel
                value="true"
                control={<Radio color="primary" />}
                label="Play/Pause"
                labelPlacement="bottom"
              />
              <FormControlLabel
                value="false"
                control={<Radio color="secondary" />}
                label="No Control"
                labelPlacement="bottom"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12} align="center">
          <FormControl>
            <TextField
              required={true}
              type="number"
              defaultValue={votesToSkip}
              inputProps={{
                min: 1,
                style: { textAlign: "center" },
              }}
              onChange={handleVotesToSkip}
            />
            <FormHelperText>
              <div align="center">Votes Required to Skip Song</div>
            </FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} align="center">
          <Button color="primary" variant="contained" onClick={handleCreate}>
            Create Room
          </Button>
        </Grid>

        <Grid item xs={12} align="center">
          <Button color="secondary" variant="contained" to="/" component={Link}>
            Back
          </Button>
        </Grid>
      </Grid>
    );
  }
};

export default CreateRoomPage;
