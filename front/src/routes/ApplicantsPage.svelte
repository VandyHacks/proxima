<script lang="ts">
  import {
    DataTable,
    Tag,
    OverflowMenu,
    OverflowMenuItem,
    DataTableSkeleton,
    Link,
    Button
  } from 'carbon-components-svelte';
  import Document32 from 'carbon-icons-svelte/lib/Document32';
  import { onMount } from 'svelte';
  import { click } from 'svelte-pathfinder';
  import wretch from 'wretch';

  import { API_URL } from '../config/api';
  import type { Application } from '../interfaces';
  import { ApplicationStatus, CommitteeType } from '../interfaces';
  import { capitalizeFirstLetter, replaceUnderscores } from '../utils/filters';
  import { authStore } from '../stores/auth.js';
  const { token } = authStore;

  const headers = [
    {
      key: 'name',
      value: 'Name'
    },
    {
      key: 'year',
      value: 'Year'
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
    sponsorship: 'cool-gray',
    content: 'purple',
    marketing: 'high-contrast'
  };

  let loading = true;

  onMount(async () => {
    const applications: Application[] = await wretch(`${API_URL}/applications`)
      .auth(`Bearer ${$token}`)
      .options({ credentials: 'include', mode: 'cors' })
      .get()
      .json();
    rows = applications.map(application => ({
      id: application.id,
      year: capitalizeFirstLetter(application.year),
      name: application.name,
      resume: application.resume_link,
      email: application.email,
      committees: application.committees,
      status: application.status,
      committee_accepted: application.committee_accepted
    }));
    loading = false;
  });

  let selectedCommittee = null;

  const passesCommitteeFilters = (
    rows: any[],
    selectedCommittee: CommitteeType
  ) => {
    if (selectedCommittee == null) {
      return rows;
    }
    return rows.filter(function (row) {
      let commExists = false;
      row.committees.forEach(function (commObj: { committee: CommitteeType }) {
        if (commObj.committee == selectedCommittee) {
          commExists = true;
        }
      });
      return commExists;
    });
  };

  const updateCommitteeSelection = (committee: CommitteeType) => {
    selectedCommittee = committee;
    return true;
  };

  const getCommitteeSelectionText = (selectedCommittee: CommitteeType) => {
    let text = selectedCommittee != null ? selectedCommittee.toString() : 'all';
    return ' (' + text + ')';
  };
</script>

<svelte:window on:click={click} />

{#if loading}
  <DataTableSkeleton />
{:else}
  <DataTable
    sortable
    title="Active Applications: {rows.length}"
    {headers}
    rows={passesCommitteeFilters(rows, selectedCommittee)}>
    <!-- <Toolbar>
      <ToolbarContent>
        <ToolbarSearch bind:value={searchTerm} />
      </ToolbarContent>
    </Toolbar> -->
    <Button
      kind="secondary"
      disabled={selectedCommittee == null ? true : false}
      on:click={() => updateCommitteeSelection(null)}>
      Clear committee filter:
      {selectedCommittee == null ? 'none' : selectedCommittee}
    </Button>
    <span slot="cell-header" let:header>
      {#if header.key === 'committees'}
        {header.value + getCommitteeSelectionText(selectedCommittee)}
      {:else}{header.value}{/if}
    </span>
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
        {capitalizeFirstLetter(replaceUnderscores(cell.value))}
      {:else if cell.key === 'committees'}
        {#if row.status === ApplicationStatus.ACCEPTED}
          <Tag type="green">
            {capitalizeFirstLetter(row.committee_accepted)}
          </Tag>
        {:else}
          {#each cell.value as { committee }}
            <Tag
              type={colors[committee]}
              on:click={() => updateCommitteeSelection(committee)}>
              {capitalizeFirstLetter(committee)}
            </Tag>
          {/each}
        {/if}
      {:else}{cell.value}{/if}
    </span>
  </DataTable>
{/if}
