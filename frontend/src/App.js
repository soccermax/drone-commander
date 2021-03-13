import "./App.css";
import React, {useRef, useState, useEffect} from "react";
import Webcam from "react-webcam"
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';



import * as handTrack from 'handtrackjs';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));




function App() {
  const classes = useStyles();
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  let isVideo = false;
  let model = null;
  let video;

  let historyValues = [];
  const MAX_NUMBER_OF_VALUES = 10;
  const CHANGE_THRESHOLD = 30;
  let checkCurrentlyRunning = false;

  const modelParams = {
    flipHorizontal: true,   // flip e.g for video
    maxNumBoxes: 20,        // maximum number of boxes to detect
    iouThreshold: 0.5,      // ioU threshold for non-max suppression
    scoreThreshold: 0.85,    // confidence threshold for predictions.
  }

  const detectLeftRight = (xAxis) => {
    if (checkCurrentlyRunning) {
      return;
    }
    if (historyValues.length < MAX_NUMBER_OF_VALUES) {
      historyValues.push(xAxis);
    } else {
      console.log("start compare");
      checkCurrentlyRunning = true;
      historyValues.shift();
      historyValues.push(xAxis);
      let differenceOf100Values = 0;
      for (let i = 0; i < historyValues.length - 1; i++) {
        const difference = historyValues[i] - historyValues[i + 1];
        differenceOf100Values += difference;
        // console.log(differenceOf100Values);
      }
      if (differenceOf100Values >= CHANGE_THRESHOLD) {
        console.log("moving left detected!");
      } else if (differenceOf100Values <= CHANGE_THRESHOLD * -1) {
        console.log("moving right detected!");
      } else {
        console.log("no significant movement");
      }
      historyValues = [];
      checkCurrentlyRunning = false;
    }
  }

  function startVideo() {
    handTrack.startVideo(video).then(function (status) {
      console.log("video started", status);
      if (status) {
        isVideo = true
        runDetection()
      } else {
        console.log("Please enable video");
      }
    });
  }

  function runDetection() {
    model.detect(video).then(predictions => {
      if (predictions.length > 0) {
        detectLeftRight(predictions[0].bbox[0]);
      }
      model.renderPredictions(predictions, canvasRef.current, canvasRef.current.getContext("2d"), video);
      if (isVideo) {
        requestAnimationFrame(runDetection);
      }
    });
  }

  useEffect(() => {
    handTrack.load(modelParams).then(lmodel => {
      // detect objects in the image.
      model = lmodel;
      console.log("Loaded Model!");
      if (webcamRef.current && webcamRef.current.video.readyState === 4) {
        video = webcamRef.current.video;
        startVideo();
      } else {
        setTimeout(() => {
          video = webcamRef.current.video;
          startVideo();
        }, 3000)
      }
    });
  }, [])
  return (
    <div className="App">
      <header className="App-header">
        <Webcam
          ref={webcamRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 640,
            height: 480,
          }}
        />

        <canvas
          id="canvasId"
          ref={canvasRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 640,
            height: 480,
          }}
        />
      </header>
<Grid container spacing={3}>
        <Grid item xs>
          <Paper className={classes.paper}>xs</Paper>
        </Grid>
        <Grid item xs>
          <Paper className={classes.paper}>xs</Paper>
        </Grid>
        <Grid item xs>
          <Paper className={classes.paper}>xs</Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
