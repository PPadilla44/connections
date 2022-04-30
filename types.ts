export type UserRegiser = {
    userName: string;
    email: string;
    password: string;
    confirmPassword: string;
};

export type UserClientType = {
    token: string;
    userName: string;
    email: string;
    id: number;
    avatar?: string;
    isLoggedIn: boolean;
}