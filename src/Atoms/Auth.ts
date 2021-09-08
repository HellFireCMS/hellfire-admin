import { atom } from "jotai";
import { User } from "../models/User";

export const userAtom = atom<User | undefined>(undefined)