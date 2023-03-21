"use client";

import Select from "@/components/input/select/Select";
import React, { useState } from "react";

const PLAYER_COLORS = ["Random", "White", "Black"];

const GameSettings = () => {
  const [playerColor, setPlayerColor] = useState(PLAYER_COLORS[0]);
  return (
    <div>
      <Select
        options={PLAYER_COLORS}
        value={playerColor}
        setValue={setPlayerColor}
      ></Select>
    </div>
  );
};

export default GameSettings;
