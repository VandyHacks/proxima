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
  import { click } from 'svelte-pathfinder';
  import wretch from 'wretch';

  import { API_URL } from '../config/api';
  import type { Application } from '../interfaces';
  import { ApplicationStatus } from '../interfaces';
  import { capitalizeFirstLetter, replaceUnderscores } from '../utils/filters';

  let searchTerm = '';

  const headers = [
    {
      key: 'name',
      value: 'Name'
    },
    {
      key: 'resume',
      value: 'Résumé'
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

  const colors = {
    operations: 'magenta',
    development: 'teal',
    'hacker experience': 'blue',
    design: 'cyan',
    sponsorship: 'green',
    content: 'purple',
    marketing: 'gray'
  };

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
      status: application.status,
      committee_accepted: application.committee_accepted
    }));
    loading = false;
  });
</script>

<svelte:window on:click={click} />

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
        <Link inline href="/applicants/{row.id}">{cell.value}</Link>
      {:else if cell.key === 'overflow'}
        <OverflowMenu flipped>
          <OverflowMenuItem
            href="/applicants/{row.id}/notes"
            text="Take notes" />
          <OverflowMenuItem href="/applicants/{row.id}" text="Application" />
        </OverflowMenu>
      {:else if cell.key === 'status'}
        {replaceUnderscores(cell.value)}
      {:else if cell.key === 'committees'}
        {#if row.status === ApplicationStatus.ACCEPTED}
          <Tag type="green">
            {capitalizeFirstLetter(row.committee_accepted)}
          </Tag>
        {:else}
          {#each cell.value as { committee }}
            <Tag type={colors[committee]}>
              {capitalizeFirstLetter(committee)}
            </Tag>
          {/each}
        {/if}
      {:else}{cell.value}{/if}
    </span>
  </DataTable>
{/if}
