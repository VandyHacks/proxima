<script lang="ts">
  import {
    DataTable,
    Toolbar,
    ToolbarContent,
    ToolbarSearch,
    Tag,
    OverflowMenu,
    OverflowMenuItem,
    DataTableSkeleton,
    Link
  } from 'carbon-components-svelte';
  import Document32 from 'carbon-icons-svelte/lib/Document32';
  import { onMount } from 'svelte';
  import wretch from 'wretch';

  import { API_URL } from '../config/api';
  import type { Application } from '../interfaces';
  import { capitalizeFirstLetter } from '../utils/filters';

  let searchTerm = '';

  let headers = [
    {
      key: 'name',
      value: 'Name'
    },
    {
      key: 'resume',
      value: 'Resume'
    },
    {
      key: 'email',
      value: 'Email'
    },
    {
      key: 'committees',
      value: 'Committees'
    },
    {
      key: 'status',
      value: 'Status'
    },
    { key: 'overflow', empty: true }
  ];
  let rows = [];

  let loading = true;

  onMount(async () => {
    const applications: Application[] = await wretch(`${API_URL}/applications`)
      .get()
      .json();
    rows = applications.map(application => ({
      id: application.id,
      name: application.name,
      resume: application.resume_link,
      email: application.email,
      committees: application.committees,
      status: application.status
    }));
    loading = false;
  });
</script>

{#if loading}
  <DataTableSkeleton />
{:else}
  <DataTable sortable title="Active Applications" {headers} {rows}>
    <Toolbar>
      <ToolbarContent>
        <ToolbarSearch bind:value={searchTerm} />
      </ToolbarContent>
    </Toolbar>
    <span slot="cell" let:row let:cell>
      {#if cell.key === 'resume'}
        <a target="_blank" href={cell.value}>
          <Document32 />
        </a>
        {:else if cell.key === 'name'}
        <Link inline href="/applicants/{row.id}">
          {cell.value}
        </Link>
      {:else if cell.key === 'overflow'}
        <OverflowMenu flipped>
          <OverflowMenuItem text="Take notes" />
          <OverflowMenuItem
            href="/applicants/{row.id}"
            text="Application" />
        </OverflowMenu>
      {:else if cell.key === 'status'}
        {capitalizeFirstLetter(cell.value)}
      {:else if cell.key === 'committees'}
        {#each cell.value as committee}
          <Tag type="green">{capitalizeFirstLetter(committee)}</Tag>
        {/each}
      {:else}{cell.value}{/if}
    </span>
  </DataTable>
{/if}
