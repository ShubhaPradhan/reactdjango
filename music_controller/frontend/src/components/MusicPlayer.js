import React from "react";
import {
  Grid,
  Typography,
  Card,
  IconButton,
  LinearProgress,
} from "@material-ui/core";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import { useGlobalContext } from "../context";

const MusicPlayer = () => {
  const { song } = useGlobalContext();
  const {
    title,
    artist,
    duration,
    time,
    image_url,
    is_playing,
    id,
    votes,
    votes_required,
  } = song;

  let songProgress = (song.time / song.duration) * 100;

  const pauseSong = () => {
    console.log("shubha");
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    };
    fetch("/spotify/pause", requestOptions);
  };

  const playSong = () => {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    };
    fetch("/spotify/play", requestOptions);
  };

  const skipSong = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };
    fetch("/spotify/skip", requestOptions);
  };
  return (
    <Card>
      <Grid container alignItems="center">
        <Grid item align="center">
          <img src={image_url} alt={title} />
        </Grid>
        <Grid item align="center" className="info-controls">
          <Typography component="h6" variant="h6">
            {title}
          </Typography>
          <Typography color="textSecondary" variant="subtitle1">
            {artist}
          </Typography>
          <LinearProgress
            variant="determinate"
            value={songProgress}
            className="progress"
          />
          <div>
            <IconButton
              onClick={() => {
                is_playing ? pauseSong() : playSong();
              }}
            >
              {is_playing ? <PauseIcon /> : <PlayArrowIcon />}
            </IconButton>
            <IconButton onClick={skipSong}>
              <SkipNextIcon />
              {votes} / {votes_required}
            </IconButton>
          </div>
        </Grid>
      </Grid>
    </Card>
  );
};

export default MusicPlayer;
