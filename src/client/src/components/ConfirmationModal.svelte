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

  export let onSubmit = () => {};
  export let toggleConfirmationModal = () => {};

  export let modalText: string = '';
  export let modalHeading: string = '';

  export let committees = [];
</script>

<Modal
  size="sm"
  hasScrollingContent={false}
  bind:open
  {modalHeading}
  primaryButtonText="Yes"
  secondaryButtonText="No"
  on:click:button--secondary={toggleConfirmationModal}
  on:submit={onSubmit}>
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
