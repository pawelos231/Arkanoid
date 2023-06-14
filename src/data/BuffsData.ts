import { BuffTypes } from "../interfaces/HelperEnums";

export interface Buff {
  id: number;
  color: string;
  description: string;
  pathToImage: string;
}

export const tabOfBuffs: Buff[] = [
  {
    id: BuffTypes.PaddleSpeed,
    color: "FF0000",
    description: "enchances your paddle speed",
    pathToImage: "http://localhost:1234/Krzysiu.a065cfe0.png",
  },
  {
    id: BuffTypes.AddLive,
    color: "00FF00",
    description: "Adds one live",
    pathToImage: "http://localhost:1234/Krzysiu.a065cfe0.png",
  },
  {
    id: BuffTypes.SpeedBuff,
    color: "0000FF",
    description: "enchances your ball and paddle speed by small amounts",
    pathToImage: "http://localhost:1234/Krzysiu.a065cfe0.png",
  },
  {
    id: BuffTypes.InvincibilityBuff,
    color: "#ffff00",
    description: "makes you invincible for about 1 minute",
    pathToImage: "http://localhost:1234/Krzysiu.a065cfe0.png",
  },
  {
    id: BuffTypes.DestroyerBuff,
    color: "#FF00FF",
    description: "makes your ball go through EVERYTHING, broken buff",
    pathToImage: "http://localhost:1234/Krzysiu.a065cfe0.png",
  },
];

export const findProperBuff = (id: BuffTypes) => {
  return tabOfBuffs.find((item) => item.id == id);
};
