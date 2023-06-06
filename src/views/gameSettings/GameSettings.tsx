"use client";

import Button from "@/components/button/Button";
import Select from "@/components/input/select/Select";
import SelectWithText from "@/components/input/selectWithText/SelectWithText";
import { useGameStore } from "@/store/gameStore";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useChatStore } from "@/store/chatMovesStore";
import Switch from "@/components/input/switch/Switch";

const PLAYER_COLORS = ["Random", "White", "Black"] as const;
type PlayerColor = (typeof PLAYER_COLORS)[number];
const TIME_OPTIONS = ["15", "20", "25", "30", "35", "40", "45"];

const GameSettings = () => {
  const [playerColorState, setPlayerColorState] = useState<PlayerColor>(
    PLAYER_COLORS[0]
  );
  const setGameState = useGameStore((state) => state.setGameState);
  const setMoveTime = useGameStore((state) => state.setMoveTime);
  const setPlayerColor = useGameStore((state) => state.setPlayerColor);
  const restartGame = useGameStore((state) => state.restartGame);
  const setIsChatTurn = useChatStore((state) => state.setIsChatTurn);
  const setAutoPromoteToQueen = useGameStore(
    (state) => state.setAutoPromoteToQueen
  );
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
      autoPromotion: true,
    },
  });

  const onSubmit: SubmitHandler<SettingsSchema> = (data) => {
    const getColor = () => {
      if (data.playerColor === "Black") return "b";
      if (data.playerColor === "White") return "w";
      return Math.random() < 0.5 ? "w" : "b";
    };

    const color = getColor();

    if (color === "b") setIsChatTurn(true);
    else setIsChatTurn(false);
    setAutoPromoteToQueen(data.autoPromotion);
    setGameState("game");
    setMoveTime(data.moveTime);
    setPlayerColor(color);
    restartGame();
  };

  const setColor = (v: PlayerColor) => {
    setValue("playerColor", v);
    setPlayerColorState(v);
  };

  return (
    <div
      className="flex h-full w-full flex-col px-10"
      style={{ minHeight: "300px" }}
    >
      <p className="mb-5 text-xl font-semibold text-white">Game settings</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className="mt-3 mb-2 block text-sm font-medium text-white">
          Player color
        </label>
        <Select
          options={[...PLAYER_COLORS]}
          value={playerColorState}
          setValue={setColor}
          error={errors.playerColor}
        />
        <label className="mt-3 mb-2 block text-sm font-medium text-white">
          Move time (s)
        </label>
        <SelectWithText
          className="pb-10"
          options={TIME_OPTIONS}
          defaultValue={30}
          setValue={(v: string) =>
            setValue("moveTime", parseInt(v), { shouldValidate: true })
          }
          error={errors.moveTime}
          {...register("moveTime")}
        />
        <div className="pb-10">
          <Switch defaultChecked={true} {...register("autoPromotion")}>
            Always promote to queen
          </Switch>
        </div>
        <Button primary className="mt-auto w-full" type="submit">
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
  autoPromotion: z.boolean(),
});

type SettingsSchema = z.infer<typeof settingsSchema>;

export default GameSettings;
