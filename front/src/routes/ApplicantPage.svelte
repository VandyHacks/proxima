<script lang="ts">
  import {
    DataTable,
    Tag,
    DataTableSkeleton,
    Link,
    Row,
    StructuredList,
    StructuredListHead,
    StructuredListRow,
    StructuredListCell,
    StructuredListBody,
    Accordion,
    AccordionItem,
    ButtonSet,
    Button,
    Slider
  } from 'carbon-components-svelte';
  import CheckmarkFilled32 from 'carbon-icons-svelte/lib/CheckmarkFilled32';
  import Document32 from 'carbon-icons-svelte/lib/Document32';
  import LogoGithub32 from 'carbon-icons-svelte/lib/LogoGithub32';
  import LogoLinkedin32 from 'carbon-icons-svelte/lib/LogoLinkedin32';
  import Portfolio32 from 'carbon-icons-svelte/lib/Portfolio32';
  import LogoInstagram32 from 'carbon-icons-svelte/lib/LogoInstagram32';
  import WatsonHealthTextAnnotationToggle32 from 'carbon-icons-svelte/lib/WatsonHealthTextAnnotationToggle32';
  import { onMount } from 'svelte';
  import wretch from 'wretch';

  import { API_URL } from '../config/api';
  import { ApplicationStatus } from '../interfaces';
  import { capitalizeFirstLetter } from '../utils/filters';
  import { path } from 'svelte-pathfinder';
  import type { Application, Note } from '../interfaces';

  let application;
  let applicationResponses: { question: string; response: string }[] = [];
  let notes: Note[];

  let headers = [
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
    {
      key: 'attended',
      value: 'Attended VH'
    },
    {
      key: 'director',
      value: 'Director'
    },
    {
      key: 'links',
      value: 'Links'
    },
    {
      key: 'notes',
      value: 'Notes'
    }
  ];

  let rows = [];

  let loading = true;

  onMount(async () => {
    const data: { application: Application; notes: Note[] } = await wretch(
      `${API_URL}/applications/${$path.applicantid}`
    )
      .get()
      .json();
    application = data.application;
    notes = data.notes;
    rows = [
      {
        name: application.name,
        resume: application.resume_link,
        year: application.year,
        email: application.email,
        committees: application.committees,
        status: application.status,
        attended: application.attendedVH,
        director: application.director
      }
    ];
    applicationResponses = [
      {
        question:
          'Can you tell us why you would be a good fit for the Content committee roles through your past experiences, skills, and ideas?',
        response: application.essay1
      },
      {
        question: 'Why are you interested in VandyHacks?',
        response: application.essay2
      },
      {
        question:
          'Tell us about your contribution to a team that you are proud of. What did you do to accomplish it? ',
        response: application.essay3
      },
      {
        question: 'How did you learn about VandyHacks',
        response: application.source
      }
    ];
    loading = false;
  });
</script>

{#if loading}
  <DataTableSkeleton showHeader={false} showToolbar={false} />
  <Accordion skeleton />
{:else}
  <DataTable {headers} {rows}>
    <span slot="cell" let:row let:cell>
      {#if cell.key === 'resume'}
        <a target="_blank" href={cell.value}>
          <Document32 />
        </a>
      {:else if cell.key === 'notes'}
        <Link inline href="/applicants/{$path.applicantid}/notes">
          <WatsonHealthTextAnnotationToggle32 />
        </Link>
      {:else if cell.key === 'links'}
        <Row>
          {#if application.github_link}
            <Link target="_blank" href={application.github_link}>
              <LogoGithub32 />
            </Link>
          {/if}
          {#if application.linkedin_link}
            <Link target="_blank" href={application.linkedin_link}>
              <LogoLinkedin32 />
            </Link>
          {/if}
          {#if application.social_link}
            <Link target="_blank" href={application.social_link}>
              <LogoInstagram32 />
            </Link>
          {/if}
          {#if application.design_link}
            <Link target="_blank" href={application.design_link}>
              <Portfolio32 />
            </Link>
          {/if}
        </Row>
      {:else if cell.key === 'status' || cell.key === 'year'}
        {capitalizeFirstLetter(cell.value)}
      {:else if cell.key === 'attended' || cell.key === 'director'}
        {#if cell.value}
          <CheckmarkFilled32 />
        {:else}No{/if}
      {:else if cell.key === 'committees'}
        {#each cell.value as committee}
          <Tag type="green">{capitalizeFirstLetter(committee)}</Tag>
        {/each}
      {:else}{cell.value}{/if}
    </span>
  </DataTable>

  <Accordion align="start">
    <AccordionItem open title="Application Responses">
      <StructuredList>
        <StructuredListHead>
          <StructuredListRow head>
            <StructuredListCell head>Question</StructuredListCell>
            <StructuredListCell head>Response</StructuredListCell>
          </StructuredListRow>
        </StructuredListHead>
        <StructuredListBody>
          {#each applicationResponses as { question, response }}
            <StructuredListRow>
              <StructuredListCell>{question}</StructuredListCell>
              <StructuredListCell>{response}</StructuredListCell>
            </StructuredListRow>
          {/each}
        </StructuredListBody>
      </StructuredList>
    </AccordionItem>
    {#each notes as { interviewer_name, responses, reliability }}
      <AccordionItem open title="Interview notes from {interviewer_name}">
        <StructuredList>
          <StructuredListHead>
            <StructuredListRow head>
              <StructuredListCell head>Question</StructuredListCell>
              <StructuredListCell head>Description</StructuredListCell>
              <StructuredListCell head>Specificity</StructuredListCell>
              <StructuredListCell head>Response</StructuredListCell>
            </StructuredListRow>
          </StructuredListHead>
          <StructuredListBody>
            {#each responses as { question, description, specificity, note }}
              <StructuredListRow>
                <StructuredListCell>{question}</StructuredListCell>
                <StructuredListCell>{description}</StructuredListCell>
                <StructuredListCell>
                  {capitalizeFirstLetter(specificity)}
                </StructuredListCell>
                <StructuredListCell>{note}</StructuredListCell>
              </StructuredListRow>
            {/each}
          </StructuredListBody>
        </StructuredList>
        <Slider
          labelText="Reliability"
          min={1}
          max={7}
          disabled
          maxLabel="7"
          value={parseInt(reliability, 10)} />
      </AccordionItem>
    {/each}
  </Accordion>

  {#if application.status != ApplicationStatus.ACCEPTED}
    <ButtonSet style="display: flex; justify-content: flex-end;">
      {#if application.status == ApplicationStatus.APPLIED}
        <Button>Interview</Button>
      {:else if application.status == ApplicationStatus.TOINTERVIEW}
        <Button>Accept</Button>
      {/if}
      <Button kind="danger">Reject</Button>
    </ButtonSet>
  {/if}
{/if}
