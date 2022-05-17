import { dots, scores, users } from "@prisma/client";
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
    dots: dots[];
}

export type NextApiRequestWithUser = NextApiRequest & {
    user: UserClientType;
};

export type FilterPlaySearchType = {
    search?: string;
    sort?: string;
    order?: "desc" | "asc";

}

export type line = {
    id: string;
    x1: number;
    y1: number;
    x2: number;
    y2: number;
};