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
    { id: 0, committee: CommitteeType.OPERATIONS },
    { id: 1, committee: CommitteeType.DEVELOPMENT },
    { id: 2, committee: CommitteeType.HACKEREXPERIENCE },
    { id: 3, committee: CommitteeType.DESIGN },
    { id: 4, committee: CommitteeType.SPONSORSHIP },
    { id: 5, committee: CommitteeType.CONTENT },
    { id: 6, committee: CommitteeType.MARKETING }
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
        {#each committees as { id, committee } (id)}
          <RadioButton
            labelText={capitalizeFirstLetter(committee)}
            value={committee} />
        {/each}
      </RadioButtonGroup>
    </FormGroup>
  {/if}
</Modal>
