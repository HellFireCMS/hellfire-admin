import { atom } from "jotai";
import { Config } from "../models/Config";

export const configAtom = atom<Config>({
    backendUrl: ""
})