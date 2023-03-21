"use client";

import Select from "@/components/input/select/Select";
import SelectWithText from "@/components/input/selectWithText/SelectWithText";
import React, { useState } from "react";

const PLAYER_COLORS = ["Random", "White", "Black"];
const TIME_OPTIONS = ["15", "20", "25", "30", "35", "40", "45"];

const GameSettings = () => {
  const [playerColor, setPlayerColor] = useState(PLAYER_COLORS[0]);
  const [moveTime, setMoveTime] = useState(TIME_OPTIONS[3]);
  return (
    <div className="flex flex-col">
      <label className="mt-3 mb-2 text-sm font-medium text-white">
        Select player color
      </label>
      <Select
        options={PLAYER_COLORS}
        value={playerColor}
        setValue={setPlayerColor}
      />
      <label className="mt-3 mb-2 text-sm font-medium text-white">
        Move time (s)
      </label>
      <SelectWithText
        options={TIME_OPTIONS}
        value={moveTime}
        setValue={setMoveTime}
      />
    </div>
  );
};

export default GameSettings;
