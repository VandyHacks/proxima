<script lang="ts">
  import Viewpoint from 'svelte-viewpoint';
  import { page } from './stores/page.js';
  import { showErrorModal, errorMessage } from './stores/errors.js';
  import { path } from 'svelte-pathfinder';

  import { Content, Grid, Loading, Modal } from 'carbon-components-svelte';
  import Header from './components/Header.svelte';
  import Theme from './components/Theme.svelte';
</script>

<Theme>
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
</Theme>
