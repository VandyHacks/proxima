<script lang="ts">
  import {
    Button,
    DataTable,
    TextAreaSkeleton,
    Toolbar,
    ToolbarContent
  } from 'carbon-components-svelte';
  import wretch from 'wretch';
  import { onMount } from 'svelte';
  import { API_URL } from '../config/api';
  import { capitalizeFirstLetter } from '../utils/filters';

  import Add32 from 'carbon-icons-svelte/lib/Add32';

  let loading = true;

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
        <Button size="default" icon={Add32} kind="ghost">Add Question</Button>
      </ToolbarContent>
    </Toolbar>
    <span slot="cell" let:row let:cell>
      {#if cell.key === 'specificity'}
        {capitalizeFirstLetter(cell.value)}
      {:else}{cell.value}{/if}
    </span>
  </DataTable>
{/if}