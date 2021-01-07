<script lang="ts">
  import {
    Button,
    DataTable,
    Dropdown,
    Form,
    Modal,
    TextAreaSkeleton,
    TextArea,
    Tile,
    Toolbar,
    ToolbarContent
  } from 'carbon-components-svelte';
  import wretch from 'wretch';
  import { onMount } from 'svelte';
  import { API_URL } from '../config/api';
  import { capitalizeFirstLetter } from '../utils/filters';

  import Add32 from 'carbon-icons-svelte/lib/Add32';

  let loading = true;
  let open = false;

  let headers = [
    {
      key: 'id',
      value: 'ID'
    },
    {
      key: 'content',
      value: 'Content'
    },
    {
      key: 'specificity',
      value: 'Committee'
    }
  ];

  let rows = [];

  onMount(async () => {
    rows = await wretch(`${API_URL}/questions`).get().json();
    loading = false;
  });
</script>

{#if loading}
  <TextAreaSkeleton />
{:else}
  <DataTable sortable title="All Questions" {headers} {rows}>
    <Toolbar>
      <ToolbarContent>
        <Button size="default" icon={Add32} kind="ghost" on:click={() => (open = true)}>Add Question</Button>
      </ToolbarContent>
    </Toolbar>
    <span slot="cell" let:row let:cell>
      {#if cell.key === 'specificity'}
        {capitalizeFirstLetter(cell.value)}
      {:else}{cell.value}{/if}
    </span>
    <Modal
      preventCloseOnClickOutside
      hasForm
      hasScrollingContent
      bind:open
      modalHeading="Add Question"
      primaryButtonText="Confirm"
      secondaryButtonText="Cancel"
      on:click:button--secondary={() => (open = false)}
      on:open
      on:close
      on:submit
    >


      <Form on:submit>
        <Dropdown
          titleText="Choose a committee:"
          selectedIndex={0}
          items={[{ id: '0', text: 'General' }, { id: '1', text: 'Operations' }, { id: '2', text: 'Fax' }]}
        />
        <Tile></Tile>
        <TextArea helperText="_" labelText="Description:" placeholder="Enter a description..." />
        <TextArea labelText="Content:" placeholder="Enter content..." />
      </Form>
    </Modal>
  </DataTable>
{/if}
