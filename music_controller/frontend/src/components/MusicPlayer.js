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
  const { title, artist, duration, time, image_url, is_playing, id, votes } =
    song;

  let songProgress = (song.time / song.duration) * 100;
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
            <IconButton>
              {is_playing ? <PauseIcon /> : <PlayArrowIcon />}
            </IconButton>
            <IconButton>
              <SkipNextIcon />
            </IconButton>
          </div>
        </Grid>
      </Grid>
    </Card>
  );
};

export default MusicPlayer;
