<script lang="ts">
  import Viewpoint from 'svelte-viewpoint';
  import { page } from './stores/page.js';
  import { showErrorModal, errorMessage } from './stores/errors.js';
  import { path } from 'svelte-pathfinder';

  import { Content, Grid, Loading, Modal } from 'carbon-components-svelte';
  import Header from './components/Header.svelte';
  import Theme from './components/Theme.svelte';

  let theme: 'g10' = 'g10';
</script>

<Theme persist bind:theme>
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
        modalHeading="The error has occured">
        <p>{$errorMessage}</p>
      </Modal>
    </Grid>
  </Content>
</Theme>
