/* eslint-disable @typescript-eslint/no-explicit-any */
import { writable, type Writable } from 'svelte/store';

export const storeHighlightJs: Writable<any> = writable(undefined);
