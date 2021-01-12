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
    Tabs, 
    Tab, 
    TabContent
  } from 'carbon-components-svelte';
  import CheckmarkFilled32 from 'carbon-icons-svelte/lib/CheckmarkFilled32';
  import Document32 from 'carbon-icons-svelte/lib/Document32';
  import LogoGithub32 from 'carbon-icons-svelte/lib/LogoGithub32';
  import LogoLinkedin32 from 'carbon-icons-svelte/lib/LogoLinkedin32';
  import Portfolio32 from 'carbon-icons-svelte/lib/Portfolio32';
  import LogoInstagram32 from 'carbon-icons-svelte/lib/LogoInstagram32';
  import { showErrorModal, errorMessage } from '../stores/errors.js';
  import WatsonHealthTextAnnotationToggle32 from 'carbon-icons-svelte/lib/WatsonHealthTextAnnotationToggle32';
  import { onMount } from 'svelte';
  import wretch from 'wretch';
  import { LollipopChart } from '@carbon/charts-svelte';

  import { API_URL } from '../config/api';
  import ConfirmationModal from '../components/ConfirmationModal.svelte';
  import { ApplicationStatus, CommitteeType } from '../interfaces';
  import { capitalizeFirstLetter, replaceUnderscores } from '../utils/filters';
  import { path } from 'svelte-pathfinder';
  import type { Application, Comments, Note } from '../interfaces';

  let application: Application;
  let applicationResponses: { question: string; response: string }[] = [];
  let notes: Note[];
  let comments: Comments[];

  let changeStatus = () => {};
  let openModal = false;
  let modalText = '';
  let committeeToAcceptTo = CommitteeType.OPERATIONS;

  function toggleModal() {
    openModal = !openModal;
  }

  function showError(error) {
    if (error.message) {
      let parsedError = JSON.parse(error.message);
      errorMessage.set(parsedError.error);
    } else {
      errorMessage.set('An error has occured');
    }
    showErrorModal.set(true);
  }

  let rows = [];

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
    const data: { application: Application; notes: Note[]; comments: Comments[] } = await wretch(
      `${API_URL}/applications/${$path.applicantid}`
    )
      .get()
      .json();
    application = data.application;
    notes = data.notes;
    comments = data.comments;
    console.log(comments);
    applicationResponses = [
      {
        question: `Can you tell us why you would be a good fit for the ${application.committees.map(
          committeeObj => ' ' + committeeObj.committee
        )} committee roles through your past experiences, skills, and ideas?`,
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
        question: 'How did you learn about VandyHacks?',
        response: application.source
      }
    ];

    loading = false;
  });

  $: if (application) {
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
  }

  async function changeApplicationStatus(newStatus: ApplicationStatus) {
    loading = true;
    openModal = false;
    wretch(`${API_URL}/applications/${$path.applicantid}`)
      .put({
        status: newStatus,
        committee: committeeToAcceptTo
      })
      .res(() => {
        application.status = newStatus;
        if (newStatus === ApplicationStatus.ACCEPTED) {
          application.committee_accepted = committeeToAcceptTo;
        }
        loading = false;
      })
      .catch(showError);
  }

  function openConfirmationModal(newStatus: ApplicationStatus) {
    modalText = `Are you sure you want change this applicants status to ${newStatus}? This will automatically send the email to the applicant.`;
    changeStatus = () => changeApplicationStatus(newStatus);
    openModal = true;
  }
  const chartStyle = 'background-color: inherit;';
</script>

<svelte:head>
  <link
    rel="stylesheet"
    href="https://unpkg.com/@carbon/charts/styles.min.css" />
</svelte:head>

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
        {replaceUnderscores(cell.value)}
      {:else if cell.key === 'attended' || cell.key === 'director'}
        {#if cell.value}
          <CheckmarkFilled32 />
        {:else}No{/if}
      {:else if cell.key === 'committees'}
        {#if application.status === ApplicationStatus.ACCEPTED}
          <Tag type="green">
            {capitalizeFirstLetter(application.committee_accepted)}
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
    {#each notes as { interviewer_name, responses, reliability, interest, teamwork, overall, thoughts }}
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

        <StructuredList>
          <StructuredListHead>
            <StructuredListRow head>
              <StructuredListCell head>Thoughts</StructuredListCell>
            </StructuredListRow>
          </StructuredListHead>
          <StructuredListBody>
            <StructuredListRow>
              <StructuredListCell>{thoughts}</StructuredListCell>
            </StructuredListRow>
          </StructuredListBody>
        </StructuredList>

        <LollipopChart
          data={[{ group: 'Reliability', key: 'Reliability', value: reliability }, { group: 'Interest', key: 'Interest', value: interest }, { group: 'Teamwork', key: 'Teamwork', value: teamwork }, { group: 'Overall', key: 'Overall', value: overall }]}
          options={{ title: 'Scores', axes: { bottom: { title: application.name, scaleType: 'labels', mapsTo: 'key' }, left: { mapsTo: 'value' } }, height: '400px' }}
          style={chartStyle} />
      </AccordionItem>
    {/each}

    <AccordionItem open title="Comments">
      <Tabs>
        {#each comments as { commenter_name }}
          <Tab label={commenter_name} />
        {/each}
        <div slot="content">
          {#each comments as { content }}
          <TabContent>{content}</TabContent>
          {/each}
        </div>
      </Tabs>
    </AccordionItem>
  </Accordion>

  {#if application.status != ApplicationStatus.ACCEPTED}
    <ButtonSet style="display: flex; justify-content: flex-end;">
      {#if application.status == ApplicationStatus.APPLIED}
        <Button
          on:click={() => openConfirmationModal(ApplicationStatus.TOINTERVIEW)}>
          Interview
        </Button>
      {:else if application.status == ApplicationStatus.TOINTERVIEW}
        <Button
          on:click={() => openConfirmationModal(ApplicationStatus.ACCEPTED)}>
          Accept
        </Button>
      {/if}
      {#if application.status === ApplicationStatus.APPLIED || application.status === ApplicationStatus.TOINTERVIEW}
        <Button
          kind="danger"
          on:click={() => openConfirmationModal(ApplicationStatus.REJECTED)}>
          Reject
        </Button>
      {/if}
    </ButtonSet>
  {/if}
  <ConfirmationModal
    open={openModal}
    bind:committee={committeeToAcceptTo}
    committees={application.committees}
    showCommittees={application.status === ApplicationStatus.TOINTERVIEW}
    {changeStatus}
    {toggleModal}
    {modalText} />
{/if}
