<script lang="ts">
  import { onMount } from 'svelte';
  import Viewpoint from 'svelte-viewpoint';
  import { page } from './stores/page.js';
  import { showErrorModal, errorMessage } from './stores/errors.js';
  import { path, query } from 'svelte-pathfinder';

  import {
    Content,
    Grid,
    Loading,
    Modal,
    Button
  } from 'carbon-components-svelte';
  import Header from './components/Header.svelte';
  import Theme from './components/Theme.svelte';

  import { isLoggedIn, token, user } from './stores/auth.js';
  import { API_URL } from './config/api.js';
  import wretch from 'wretch';

  isLoggedIn.set(false);

  onMount(async () => {
    let authToken: string | null = $query.accessToken
      ? $query.accessToken
      : localStorage.getItem('token');

    if ($query.accessToken) {
      localStorage.setItem('token', authToken);
      window.history.replaceState({}, document.title, '/');
    }
    if (authToken != null) {
      token.set(authToken);
      isLoggedIn.set(true);
      
      const existingUser = await wretch(`${API_URL}/users`)
      .auth(`Bearer ${authToken}`)
      .options({ credentials: 'include', mode: 'cors' })
      .get()
      .error(403, error => { 
        isLoggedIn.set(false);
        localStorage.clear;
        user.set(null);
       })
      .json()
      .catch(error => { console.log(error); });

      user.set(existingUser);
    }
  });

  function login() {
    window.location.href = `http://localhost:3000/auth/slack`;
  }
</script>

<Theme>
  {#if $isLoggedIn}
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
    <div
      style="position: relative; top: 100px; margin: auto; width: 50%; text-align: center;">
      <h4>Welcome To Proxima</h4>
      <Button on:click={login} style="margin-top: 10px;">Login</Button>
    </div>
  {/if}
</Theme>

<style>
  :root {
    --cds-label-01-font-size: 1.1rem !important;
    --cds-helper-text-01-font-size: 1rem !important;
  }
</style>
