"use client";

import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function VoteCircle({ value }) {
  const percentage = Math.round(value * 10);
  const color = percentage >= 75 ? "#22c55e" : "#facc15";

  return (
    <div className="w-15 h-15">
      <CircularProgressbar
        value={percentage}
        text={`${percentage}%`}
        styles={buildStyles({
          pathColor: color,
          textColor: "#fff",
          trailColor: "#e5e7eb",
          textSize: "30px",
        })}
      />
    </div>
  );
}
