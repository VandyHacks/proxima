<script lang="ts">
  import {
    SkipToContent,
    Header,
    HeaderGlobalAction,
    HeaderNav,
    HeaderNavItem,
    HeaderUtilities
  } from 'carbon-components-svelte';
  import { getContext } from 'svelte';

  import Moon24 from 'carbon-icons-svelte/lib/Moon24';

  export let isDark = true;

  const ctx: { dark: any; light: any; updateVar: any } = getContext('Theme');

  $: if (ctx) {
    ctx.dark.subscribe(value => {
      console.log('dark mode?', value);
    });
    ctx.light.subscribe(value => {
      console.log('light mode?', value);
    });
    ctx.updateVar('--cds-productive-heading-06-font-size', '4rem');
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
      icon={Moon24}
      on:click={() => {
        isDark = !isDark;
      }} />
  </HeaderUtilities>
  <div slot="skip-to-content">
    <SkipToContent />
  </div>
</Header>
