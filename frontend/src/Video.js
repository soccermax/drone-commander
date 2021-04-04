import React, {useRef, useState, useEffect} from "react";
import {makeStyles, useTheme} from '@material-ui/core/styles';
import * as handpose from "@tensorflow-models/handpose";
import Webcam from "react-webcam";
import {drawHand} from "./util";
import * as fp from "fingerpose";
import thumbsDown from "./fingerposes/thumbsDown";
import * as tf from "@tensorflow/tfjs";
import {controlDroneBasedOnGesture} from "./utils/droneControl";

const useStyles = makeStyles((theme) => ({}));

export default function Video({detectedGesture, setDetectedGesture, setDroneConnectionStatus, setHandPoseModelStatus}) {
  const theme = useTheme();
  const classes = useStyles();
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const runHandpose = async () => {
    const net = await handpose.load();
    setInterval(() => {
      detect(net)
    }, 100);
  };

  const detect = async (net) => {
    if (webcamRef.current && webcamRef.current.video.readyState === 4) {
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      const hand = await net.estimateHands(video);
      setHandPoseModelStatus(prevValue => {
        if (prevValue === "loaded") {
          return prevValue;
        } else {
          return "loaded";
        }
      });

      if (hand.length > 0) {
        const GE = new fp.GestureEstimator([fp.Gestures.VictoryGesture, fp.Gestures.ThumbsUpGesture, thumbsDown]);
        const gesture = await GE.estimate(hand[0].landmarks, 7);
        if (gesture.gestures.length > 0) {
          console.log(gesture)
          const confidence = gesture.gestures.map(
            (prediction) => prediction.confidence
          );
          const maxConfidence = confidence.indexOf(
            Math.max.apply(null, confidence)
          );
          setDetectedGesture(gesture.gestures[maxConfidence].name);
          setDroneConnectionStatus(connectionStatus => {
            if (connectionStatus === "CONNECTED") {
              controlDroneBasedOnGesture(gesture.gestures[maxConfidence].name);
            }
            return connectionStatus;
          });
        } else {
          setDetectedGesture("no gesture");
        }
      }

      const ctx = canvasRef.current.getContext("2d");
      drawHand(hand, ctx);
    }
  };

  useEffect(() => {
    runHandpose()
  }, []);

  return (
    <React.Fragment>
      <div style={{display: "flex", justifyContent: "center"}}>
        <Webcam
          ref={webcamRef}
          audio={false}
          style={{
            position: "absolute",
            textAlign: "center",
            marginLeft: "auto",
            zindex: 9,
            width: 640,
            height: 480,
          }}
        />
        <canvas
          ref={canvasRef}
          style={{
            textAlign: "center",
            position: "absolute",
            marginLeft: "auto",
            zindex: 9,
            width: 640,
            height: 480,
          }}
        />
      </div>
    </React.Fragment>
  );
}
