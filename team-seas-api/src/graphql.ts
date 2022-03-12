
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
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
}

export interface IMutation {
    createDonation(createDonationInput: CreateDonationInput): Donation | Promise<Donation>;
    updateDonation(updateDonationInput: UpdateDonationInput): Donation | Promise<Donation>;
    removeDonation(id: number): Nullable<Donation> | Promise<Nullable<Donation>>;
}

export interface Result {
    total: number;
}

export interface ISubscription {
    totalUpdated(): Nullable<Result> | Promise<Nullable<Result>>;
}

export type DateTime = any;
type Nullable<T> = T | null;
