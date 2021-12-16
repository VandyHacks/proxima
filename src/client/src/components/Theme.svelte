<script lang="ts">
  let persistKey = 'carbon-theme';
  const themes = ['light', 'g10', 'g90', 'g100'];
  import { onMount, afterUpdate } from 'svelte';
  import { theme } from '../stores/themes.js';

  onMount(() => {
    const persistedTheme = localStorage.getItem(persistKey);
    theme.set(persistedTheme);
  });
  afterUpdate(() => {
    document.documentElement.setAttribute('theme', $theme);
    localStorage.setItem(persistKey, $theme);
  });
</script>

<slot />
