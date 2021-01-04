import { writable } from 'svelte/store';

export const showErrorModal = writable(false);
export const errorMessage = writable('');
