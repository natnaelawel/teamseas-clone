
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface SigninAuthInput {
    email: string;
    password: string;
}

export interface SignupAuthInput {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export interface CreateDonationInput {
    count: number;
    displayName: string;
    email: string;
    mobile?: Nullable<string>;
    team?: Nullable<string>;
    message?: Nullable<string>;
    createdAt?: Nullable<DateTime>;
}

export interface UpdateDonationInput {
    id: number;
    count: number;
    displayName: string;
    email: string;
    mobile?: Nullable<string>;
    team?: Nullable<string>;
    message?: Nullable<string>;
    createdAt?: Nullable<DateTime>;
}

export interface OrderByParams {
    field?: Nullable<string>;
    direction?: Nullable<string>;
}

export interface CreateUserInput {
    firstName?: Nullable<string>;
    lastName?: Nullable<string>;
    email: string;
    password: string;
    createdAt?: Nullable<DateTime>;
}

export interface UpdateUserInput {
    id: number;
    firstName?: Nullable<string>;
    lastName?: Nullable<string>;
    email: string;
    password: string;
    createdAt?: Nullable<DateTime>;
}

export interface Auth {
    access_token: string;
}

export interface IMutation {
    signinAuth(signinAuthInput: SigninAuthInput): Auth | Promise<Auth>;
    signupAuth(signupAuthInput: SignupAuthInput): Auth | Promise<Auth>;
    createDonation(createDonationInput: CreateDonationInput): Donation | Promise<Donation>;
    updateDonation(updateDonationInput: UpdateDonationInput): Donation | Promise<Donation>;
    removeDonation(id: number): Nullable<Donation> | Promise<Nullable<Donation>>;
    updateUser(updateUserInput: UpdateUserInput): User | Promise<User>;
    removeUser(id: number): Nullable<User> | Promise<Nullable<User>>;
}

export interface Donation {
    id: number;
    count: number;
    displayName: string;
    email: string;
    mobile?: Nullable<string>;
    team?: Nullable<string>;
    message?: Nullable<string>;
    createdAt?: Nullable<DateTime>;
}

export interface IQuery {
    donations(orderBy?: Nullable<OrderByParams>): Nullable<Donation>[] | Promise<Nullable<Donation>[]>;
    donation(id: number): Nullable<Donation> | Promise<Nullable<Donation>>;
    totalDonations(): number | Promise<number>;
    getMe(): Nullable<User> | Promise<Nullable<User>>;
    users(): Nullable<User>[] | Promise<Nullable<User>[]>;
    user(id: number): Nullable<User> | Promise<Nullable<User>>;
}

export interface Result {
    total: number;
}

export interface ISubscription {
    totalUpdated(): Nullable<Result> | Promise<Nullable<Result>>;
}

export interface User {
    id: number;
    firstName?: Nullable<string>;
    lastName?: Nullable<string>;
    email: string;
    password: string;
    createdAt?: Nullable<DateTime>;
}

export type DateTime = any;
type Nullable<T> = T | null;
