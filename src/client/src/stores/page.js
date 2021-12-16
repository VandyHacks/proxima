import { derived } from 'svelte/store';
import { path } from 'svelte-pathfinder';
import { routes } from '../routes/config';

export const page = derived(
  path,
  $path => {
    for (const route of routes) {
      if ($path.pattern(route.path)) {
        return route.component;
      }
    }
  },
  null
);
