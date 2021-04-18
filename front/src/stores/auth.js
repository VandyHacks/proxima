import { writable } from 'svelte/store';
export const token = writable(null);
export const user = writable(null);
export const isLoggedIn = writable(false);