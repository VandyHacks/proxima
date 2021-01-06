<script lang="ts">
  import {
    SkipToContent,
    Header,
    HeaderGlobalAction,
    HeaderNav,
    HeaderNavItem,
    HeaderUtilities
  } from 'carbon-components-svelte';

  import { theme } from '../stores/themes.js';
  import Moon24 from 'carbon-icons-svelte/lib/Moon24';
  import Sun24 from "carbon-icons-svelte/lib/Sun24";

  const changeTheme = () => {
    theme.set(($theme === 'g90') ? 'g10' : 'g90');
  }
</script>

<Header
  company="Proxima"
  platformName="VandyHacks"
  uiShellAriaLabel="Proxima | Recruitment Application for VandyHacks"
  href="/">
  <HeaderNav>
    <HeaderNavItem href="/" text="Applications" />
    <HeaderNavItem href="/questions" text="Questions" />
  </HeaderNav>
  <HeaderUtilities>
    <HeaderGlobalAction
      aria-label="Dark Mode"
      icon={($theme === 'g90') ? Sun24 : Moon24}
      on:click={changeTheme} />
  </HeaderUtilities>
  <div slot="skip-to-content">
    <SkipToContent />
  </div>
</Header>
