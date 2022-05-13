import { scores, users } from "@prisma/client";
import { NextApiRequest } from "next";

export type UserRegiser = {
    userName: string;
    email: string;
    password: string;
    confirmPassword: string;
};

export type UserLogin = {
    login: string;
    password: string;
};

export type UserClientType = {
    token: string;
    userName: string;
    email: string;
    id: number;
    avatar?: string;
    isLoggedIn: boolean;
}

export type Level = {
    id: number;
    name: string;
    difficulty: "Easy" | "Medium" | "Hard";
    linesToWin: number;
    createdAt: string;
    updatedAt: string;
    users: users;
    scores: scores[];
}

export type NextApiRequestWithUser = NextApiRequest & {
    user: UserClientType;
};