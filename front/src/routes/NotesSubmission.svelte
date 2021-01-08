<script lang="ts">
  import {
    Tag,
    Column,
    Row,
    Tile,
    TextInput,
    Button,
    Slider,
    TextArea,
    TextAreaSkeleton,
    Loading
  } from 'carbon-components-svelte';
  import { onMount } from 'svelte';
  import wretch from 'wretch';

  import { API_URL } from '../config/api';
  import { capitalizeFirstLetter } from '../utils/filters';
  import { path } from 'svelte-pathfinder';
  import type { Application, Note, ApplicantResponse } from '../interfaces';

  const intro =
    "Thank you for applying to VandyHacks! As a quick overview for how this interview will go, we'll ask you a a couple of questions just to get to know your work habits, then we'll go into a couple questions specific to the committees you indicated you were interested in on your application. If you have any questions, we'll leave a couple of minutes at the end and we can try to answer them as best as possible. Of course, if you don't have any questions, don't feel pressured. We won't count them as part of your application. We will be taking notes on our laptops to refer back to while you answer.";

  let reliability: number = 1;
  let interest: number = 1;
  let teamwork: number = 1;
  let overall: number = 1;
  let thoughts: string = '';
  let interviewerName: string = '';

  let notesStatus: 'submitting' | 'submitted';
  let submissionResponse = '';

  let application;
  let applicantResponses: ApplicantResponse[] = [];

  let loading = true;

  onMount(async () => {
    const data: { application: Application; notes: Note[] } = await wretch(
      `${API_URL}/applications/${$path.applicantid}`
    )
      .get()
      .json();
    application = data.application;

    const applicantQuestions: {
      id: number;
      content: string;
      specificity: string;
      description: string;
    }[] = await wretch(`${API_URL}/applications/${$path.applicantid}/questions`)
      .get()
      .json();

    applicantResponses = applicantQuestions.map(applicationQuestion => ({
      questionId: applicationQuestion.id,
      response: '',
      content: applicationQuestion.content,
      specificity: applicationQuestion.specificity,
      description: applicationQuestion.description
    }));

    loading = false;
  });

  async function submitNotes() {
    notesStatus = 'submitting';
    let data = {
      interviewer_name: interviewerName,
      reliability,
      interest,
      teamwork,
      overall,
      thoughts,
      questionAnswers: applicantResponses
    };
    wretch(`${API_URL}/applications/${$path.applicantid}/notes`)
      .post(data)
      .res(() => {
        notesStatus = 'submitted';
        submissionResponse = `Notes and responses successfully added from ${interviewerName}`;
      });
  }
</script>

{#if loading}
  <TextAreaSkeleton />
{:else}
  {#if notesStatus == 'submitted'}
    <Tile style="text-align: center; margin: var(--cds-spacing-07) 0;">
      <h4>{submissionResponse}</h4>
    </Tile>
  {:else}
    <Column>
      <Tile style="text-align: center; margin: var(--cds-spacing-07) 0;">
        <h4>{`This is interview form for ${application.name}`}</h4>
        {#each application.committees as { committee }}
          <Tag type="green">{capitalizeFirstLetter(committee)}</Tag>
        {/each}
      </Tile>
      <Tile style="text-align: left; margin: var(--cds-spacing-07) 0;">
        <p>{intro}</p>
      </Tile>
      <TextInput
        style="padding-bottom: var(--cds-spacing-07);"
        bind:value={interviewerName}
        labelText="Interviewer name"
        placeholder="Enter your name..." />
      {#each applicantResponses as { response, content, description }}
        <div style="padding-bottom: var(--cds-spacing-07);">
          <TextArea
            bind:value={response}
            labelText={content}
            placeholder="Enter a response..."
            helperText={description} />
        </div>
      {/each}
      <Row style="margin: 0; padding: var(--cds-spacing-07) 0;" padding>
        <Slider
          labelText="Reliability"
          min={1}
          max={7}
          maxLabel="7"
          bind:value={reliability} />
        <Slider
          labelText="Interest"
          min={1}
          max={7}
          maxLabel="7"
          bind:value={interest} />
        <Slider
          labelText="Teamwork"
          min={1}
          max={7}
          maxLabel="7"
          bind:value={teamwork} />
        <Slider
          labelText="Overall"
          min={1}
          max={7}
          maxLabel="7"
          bind:value={overall} />
      </Row>
      <TextArea
        bind:value={thoughts}
        labelText="Additional thoughts on {application.name}"
        placeholder="Enter your thoughts..." />
      <div style="display: flex; justify-content:flex-end;">
        {#if notesStatus === 'submitting'}
          <Loading />
        {:else}
          <Button on:click={submitNotes}>Submit</Button>
        {/if}
      </div>
    </Column>
  {/if}
{/if}

<style>
  :root {
    --cds-label-01-font-size: 0.9rem;
  }
</style>
