"use client";

import Button from "@/components/button/Button";
import Select from "@/components/input/select/Select";
import SelectWithText from "@/components/input/selectWithText/SelectWithText";
import { useGameStore } from "@/store/gameStore";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const PLAYER_COLORS = ["Random", "White", "Black"] as const;
type PlayerColor = (typeof PLAYER_COLORS)[number];
const TIME_OPTIONS = ["15", "20", "25", "30", "35", "40", "45"];

const GameSettings = () => {
  const [playerColorState, setPlayerColorState] = useState<PlayerColor>(
    PLAYER_COLORS[0]
  );
  const setIsGameActive = useGameStore((state) => state.setIsGameActive);
  const setMoveTime = useGameStore((state) => state.setMoveTime);
  const setPlayerColor = useGameStore((state) => state.setPlayerColor);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<SettingsSchema>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      moveTime: parseInt(TIME_OPTIONS[3]),
      playerColor: "Random",
    },
  });

  const startGame = () => {
    setIsGameActive(true);
    // setMoveTime(moveTimeState);
    // setPlayerColor(playerColorState);
  };

  const onSubmit: SubmitHandler<SettingsSchema> = (data) => {
    console.log("SUBMIT");
    const getColor = () => {
      if (data.playerColor === "Black") return "b";
      if (data.playerColor === "White") return "w";
      return Math.random() < 0.5 ? "w" : "b";
    };

    setIsGameActive(true);
    setMoveTime(data.moveTime);
    setPlayerColor(getColor());
  };

  const setColor = (v: string) => {
    const value = v as PlayerColor;
    setValue("playerColor", value);
    setPlayerColorState(value);
  };

  return (
    <div className="flex w-[200px] flex-col p-5 shadow">
      <p className="mb-5 text-xl font-semibold text-white">Game settings</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className="mt-3 mb-2 block text-sm font-medium text-white">
          Select player color
        </label>
        <Select
          options={[...PLAYER_COLORS]}
          value={playerColorState}
          setValue={setColor}
        />
        <label className="mt-3 mb-2 block text-sm font-medium text-white">
          Move time (s)
        </label>
        <SelectWithText
          className="pb-10"
          options={TIME_OPTIONS}
          setValue={(v: string) =>
            setValue("moveTime", parseInt(v), { shouldValidate: true })
          }
          error={errors.moveTime}
          {...register("moveTime")}
        />
        <Button
          primary
          className="mt-5 w-full"
          type="submit"
          onClick={startGame}
        >
          Play
        </Button>
      </form>
    </div>
  );
};

const settingsSchema = z.object({
  moveTime: z.coerce
    .number({ invalid_type_error: "Only numbers are accepted" })
    .min(5, { message: "5 seconds is minimum" })
    .max(60, { message: "60 seconds is maximum" }),
  playerColor: z.union([
    z.literal("Random"),
    z.literal("Black"),
    z.literal("White"),
  ]),
});

type SettingsSchema = z.infer<typeof settingsSchema>;

export default GameSettings;
