<script lang="ts">
  import {
    Modal,
    RadioButtonGroup,
    RadioButton,
    FormGroup
  } from 'carbon-components-svelte';
  import { CommitteeType } from '../interfaces';
  import { capitalizeFirstLetter } from '../utils/filters';

  export let open: boolean;
  export let showCommittees = false;
  export let committee: CommitteeType = CommitteeType.OPERATIONS;

  export let changeStatus = () => {};
  export let toggleModal = () => {};

  export let modalText: string = '';

  export let committees = [
    { id: 0, text: { committee: CommitteeType.OPERATIONS } },
    { id: 1, text: { committee: CommitteeType.DEVELOPMENT } },
    { id: 2, text: { committee: CommitteeType.HACKEREXPERIENCE } },
    { id: 3, text: { committee: CommitteeType.DESIGN } },
    { id: 4, text: { committee: CommitteeType.SPONSORSHIP } },
    { id: 5, text: { committee: CommitteeType.CONTENT } },
    { id: 6, text: { committee: CommitteeType.MARKETING } }
  ];
</script>

<Modal
  size="sm"
  hasScrollingContent={false}
  bind:open
  modalHeading="Change applicant status"
  primaryButtonText="Yes"
  secondaryButtonText="No"
  on:click:button--secondary={toggleModal}
  on:submit={changeStatus}>
  <p style={showCommittees ? 'padding-bottom: var(--cds-spacing-07);' : ''}>
    {modalText}
  </p>
  {#if showCommittees}
    <FormGroup legendText="Choose a committee">
      <RadioButtonGroup orientation="vertical" bind:selected={committee}>
        {#each committees as { id, text } (id)}
          <RadioButton
            labelText={capitalizeFirstLetter(text.committee)}
            value={text.committee} />
        {/each}
      </RadioButtonGroup>
    </FormGroup>
  {/if}
</Modal>
