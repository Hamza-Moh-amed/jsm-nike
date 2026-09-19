"use server"

import z from "zod";


const COOKIE_OPTIONS = {
    httpOnly: true as const,
    secure: true as const,
    sameSite: "strict" as const,
    path: "/" as const,
    maxAge: 60 * 60 * 24 * 7, // 7 days
};

const emailSchema = z.email();
const passwordSchema = z.string().min(8).max(128);
const nameSchema = z.string().min(1).max(100);


export async function createGuestSession() {
    
}
