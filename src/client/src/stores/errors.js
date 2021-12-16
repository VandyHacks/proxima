import { writable } from 'svelte/store';

export const showErrorModal = writable(false);
export const errorMessage = writable('');

export function showError(error) {
    if (error.message) {
      let parsedError = JSON.parse(error.message);
      errorMessage.set(parsedError.error);
    } else {
      errorMessage.set('An error has occured');
    }
    showErrorModal.set(true);
  }
