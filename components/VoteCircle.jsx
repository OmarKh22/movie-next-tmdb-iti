"use client";

import React from "react";

export default function VoteCircle({ value }) {
  const percentage = Math.round((value || 0) * 10);
  const color = percentage >= 75 ? "#22c55e" : "#facc15";

  return (
    <div className="w-16 h-16 relative flex items-center justify-center">
      <div 
        className="w-full h-full rounded-full border-4 border-gray-200 flex items-center justify-center"
        style={{
          background: `conic-gradient(${color} ${percentage * 3.6}deg, #e5e7eb ${percentage * 3.6}deg)`
        }}
      >
        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
          <span className="text-sm font-bold text-gray-900">{percentage}%</span>
        </div>
      </div>
    </div>
  );
} 