<script lang="ts">
  import { onMount } from 'svelte';
  import Viewpoint from 'svelte-viewpoint';
  import { page } from './stores/page.js';
  import { showErrorModal, errorMessage } from './stores/errors.js';
  import { path } from 'svelte-pathfinder';

  import {
    Content,
    Grid,
    Loading,
    Modal,
    Button
  } from 'carbon-components-svelte';
  import Header from './components/Header.svelte';
  import Theme from './components/Theme.svelte';

  import { authStore } from './stores/auth.js';

  const { user, signin } = authStore;

  let loading = true;

  onMount(async () => {
    await authStore.init();
    loading = false;
  });
</script>

<Theme>
  {#if loading}
    <Loading withOverlay={false} />
  {:else if $user}
    <Header />
    <Content style="background: none; padding: 1rem">
      <Grid>
        <Viewpoint component={$page} timeout={1000} path={$path}>
          <div slot="loading">
            <Loading withOverlay={false} />
          </div>
        </Viewpoint>
        <Modal
          passiveModal
          bind:open={$showErrorModal}
          modalHeading="An error has occurred">
          <p>{$errorMessage}</p>
        </Modal>
      </Grid>
    </Content>
  {:else}
    <Button on:click={signin}>Login</Button>
  {/if}
</Theme>
