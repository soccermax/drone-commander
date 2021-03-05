import "./App.css";
import React, { useRef, useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";
import Webcam from "react-webcam";
import {drawHand} from "./util";
import * as fp from "fingerpose";
import thumbsDown from "./fingerposes/thumbsDown";

function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [detectedGesture, setDetectedGesture] = useState("no gesture");

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
        {<p style={{marginBottom: "1000px"}}>{detectedGesture}</p>}
      </header>
    </div>
  );
}

export default App;
