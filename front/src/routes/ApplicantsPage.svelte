<script lang="ts">
  import {
    DataTable,
    Toolbar,
    ToolbarContent,
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
  import type { Application, ApplicantRow } from '../interfaces';
  import { ApplicationStatus, CommitteeType } from '../interfaces';
  import { capitalizeFirstLetter, replaceUnderscores } from '../utils/filters';
  import { token } from '../stores/auth.js';
  import { getColorForCommittee } from '../config/utils';

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
      key: 'resume_link',
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
  let rows: ApplicantRow[];
  let selectedCommittees: CommitteeType[] = [];
  let filteredRows;

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
      resume_link: application.resume_link,
      email: application.email,
      committees: application.committees,
      status: application.status,
      committee_accepted: application.committee_accepted
    }));
    filteredRows = rows;
    loading = false;
  });

  $: if (selectedCommittees.length !== 0) {
    filteredRows = rows.filter(row => {
      if (row.status == ApplicationStatus.ACCEPTED) {
        return selectedCommittees.includes(row.committee_accepted);
      }
      return selectedCommittees.every(selectedCommittee =>
        row.committees.some(({ committee }) => committee === selectedCommittee)
      );
    });
  } else {
    filteredRows = rows;
  }

  const updateCommitteeSelection = (committee: CommitteeType) => {
    if (!selectedCommittees.includes(committee)) {
      selectedCommittees = [...selectedCommittees, committee];
    }
  };

  const resetCommitteeSelection = (committeeToRemove: CommitteeType) => () => {
    selectedCommittees = selectedCommittees.filter(
      committee => committee !== committeeToRemove
    );
  };
</script>

<svelte:window on:click={click} />

{#if loading}
  <DataTableSkeleton />
{:else}
  <DataTable
    sortable
    title="Active Applications: {filteredRows.length}"
    {headers}
    rows={filteredRows}>
    <Toolbar>
      <ToolbarContent>
        <!-- <ToolbarSearch bind:value={searchTerm} /> -->
        {#each selectedCommittees as committee}
          <Tag
            type={getColorForCommittee(committee)}
            filter
            on:click={resetCommitteeSelection(committee)}>
            {capitalizeFirstLetter(committee)}
          </Tag>
        {/each}
      </ToolbarContent>
    </Toolbar>
    <span slot="cell" let:row let:cell>
      {#if cell.key === 'resume_link'}
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
          <Tag
            type="green"
            on:click={() => updateCommitteeSelection(row.committee_accepted)}>
            {capitalizeFirstLetter(row.committee_accepted)}
          </Tag>
        {:else}
          {#each cell.value as { committee }}
            <Tag
              type={getColorForCommittee(committee)}
              on:click={() => updateCommitteeSelection(committee)}>
              {capitalizeFirstLetter(committee)}
            </Tag>
          {/each}
        {/if}
      {:else}{cell.value}{/if}
    </span>
  </DataTable>
{/if}
