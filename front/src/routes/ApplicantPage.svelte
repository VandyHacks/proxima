<script lang="ts">
  import {
    Accordion,
    AccordionItem,
    ButtonSet,
    Button,
    ClickableTile,
    DataTable,
    DataTableSkeleton,
    Form,
    Link,
    Modal,
    Row,
    StructuredList,
    StructuredListHead,
    StructuredListRow,
    StructuredListCell,
    StructuredListBody,
    Tabs,
    Tab,
    TabContent,
    Tag,
    TextArea,
    TextInput
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
  import type { Application, Comment, Note } from '../interfaces';

  let application: Application;
  let applicationResponses: { question: string; response: string }[] = [];
  let notes: Note[];
  let comments: Comment[];

  let commenterValue = '';
  let contentValue = '';

  let changeStatus = () => {};
  let open = false;
  let confirmationModal = false;
  let modalText = '';
  let committeeToAcceptTo = CommitteeType.OPERATIONS;

  function toggleModal() {
    confirmationModal = !confirmationModal;
  }
  const toggleQuestionModal = () => {
    open = !open;
  };

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
    const data: {
      application: Application;
      notes: Note[];
      comments: Comment[];
    } = await wretch(`${API_URL}/applications/${$path.applicantid}`)
      .get()
      .json();
    application = data.application;
    notes = data.notes;
    comments = data.comments;
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
      },
      {
        question:
          'Tell us about the VH event(s) you attended and what you liked/disliked about your experience.',
        response: application.feedback
      }
    ];

    loading = false;
  });

  async function addComment() {
    const newComment = {
      commenter_name: commenterValue,
      content: contentValue
    };
    loading = true;
    open = false;
    wretch(`${API_URL}/applications/${$path.applicantid}/comments`)
      .post(newComment)
      .res(() => {
        comments.push(newComment);
        commenterValue = '';
        contentValue = '';
        loading = false;
      })
      .catch(showError);
  }

  $: if (application) {
    rows = [
      {
        name: application.name,
        resume: application.resume_link,
        year: capitalizeFirstLetter(application.year),
        email: application.email,
        committees: application.committees,
        status: capitalizeFirstLetter(application.status),
        attended: application.attendedVH,
        director: application.director
      }
    ];
  }

  async function changeApplicationStatus(newStatus: ApplicationStatus) {
    loading = true;
    confirmationModal = false;
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
    modalText = `Are you sure you want change this applicants status to ${replaceUnderscores(
      newStatus
    )}? This will automatically send the email to the applicant.`;
    changeStatus = () => changeApplicationStatus(newStatus);
    confirmationModal = true;
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
              <StructuredListCell style="white-space: pre-wrap;">
                {response || 'No response'}
              </StructuredListCell>
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
              <StructuredListCell head>Specificity</StructuredListCell>
              <StructuredListCell head>Response</StructuredListCell>
            </StructuredListRow>
          </StructuredListHead>
          <StructuredListBody>
            {#each responses as { question, specificity, note }}
              <StructuredListRow>
                <StructuredListCell>{question}</StructuredListCell>
                <StructuredListCell>
                  {capitalizeFirstLetter(specificity)}
                </StructuredListCell>
                <StructuredListCell style="white-space: pre-wrap;">
                  {note}
                </StructuredListCell>
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
              <StructuredListCell style="white-space: pre-wrap;">
                {thoughts}
              </StructuredListCell>
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
      {#if !comments.length}
        <p style="padding-bottom: var(--cds-spacing-04);">
          No comments have been written for this applicant. Would you like to
          add one?
        </p>
      {:else}
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
      {/if}
      <Button size="field" kind="secondary" on:click={toggleQuestionModal}>
        Add comment
      </Button>

      <Modal
        hasForm
        hasScrollingContent
        bind:open
        modalHeading="Add Comment"
        primaryButtonText="Send Comment"
        secondaryButtonText="Cancel"
        style="width: 100%;"
        on:click:button--secondary={toggleQuestionModal}
        on:submit={addComment}>
        <Form>
          <div style="padding-bottom: var(--cds-spacing-07);">
            <TextInput
              bind:value={commenterValue}
              style="padding-bottom: var(--cds-spacing-07);"
              labelText="Comment Type"
              placeholder="Comment Type (Takehome Assessment, General Thoughts, Name, Etc.)" />
          </div>
          <TextArea
            bind:value={contentValue}
            style="padding-bottom: var(--cds-spacing-07);"
            labelText="Comment:"
            placeholder="Enter a comment..." />
        </Form>
      </Modal>
    </AccordionItem>
  </Accordion>

  {#if application.status != ApplicationStatus.ACCEPTED}
    <ButtonSet style="display: flex; justify-content: flex-end;">
      <Button
        style="margin-right: 1px;"
        href="/applicants/{$path.applicantid}/notes">
        Start Interview
      </Button>
      {#if application.status == ApplicationStatus.APPLIED}
        <Button
          on:click={() => openConfirmationModal(ApplicationStatus.TOINTERVIEW)}>
          Schedule Interview
        </Button>
      {:else if application.status == ApplicationStatus.TOINTERVIEW || application.status === ApplicationStatus.INREVIEW}
        <Button
          on:click={() => openConfirmationModal(ApplicationStatus.ACCEPTED)}>
          Accept
        </Button>
      {/if}
      {#if application.status === ApplicationStatus.APPLIED || application.status === ApplicationStatus.TOINTERVIEW || application.status === ApplicationStatus.INREVIEW}
        <Button
          kind="danger"
          on:click={() => openConfirmationModal(ApplicationStatus.REJECTED)}>
          Reject
        </Button>
      {/if}
    </ButtonSet>
  {/if}
  <ConfirmationModal
    bind:open={confirmationModal}
    bind:committee={committeeToAcceptTo}
    committees={application.committees}
    showCommittees={application.status === ApplicationStatus.TOINTERVIEW}
    {changeStatus}
    {toggleModal}
    {modalText} />
{/if}
