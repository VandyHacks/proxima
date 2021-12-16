<script lang="ts">
  import { Dropdown, Form, Modal, TextArea } from 'carbon-components-svelte';
  import { capitalizeFirstLetter } from '../utils/filters';

  export let descriptionValue;
  export let contentValue;
  export let selectedIndex;
  export let open;
  export let items;

  export let toggleModal = () => {};
  export let addQuestion = () => {};
</script>

<Modal
  preventCloseOnClickOutside
  hasForm
  hasScrollingContent
  bind:open
  modalHeading="Add Question"
  primaryButtonText="Confirm"
  secondaryButtonText="Cancel"
  primaryButtonDisabled={!(contentValue.length && descriptionValue.length)}
  on:click:button--secondary={toggleModal}
  on:submit={addQuestion}>
  <Form>
    <Dropdown
      style="padding-bottom: var(--cds-spacing-07);"
      titleText="Choose a committee:"
      itemToString={item => capitalizeFirstLetter(item.text)}
      bind:selectedIndex
      {items} />
    <div style="padding-bottom: var(--cds-spacing-07);">
      <TextArea
        bind:value={contentValue}
        style="padding-bottom: var(--cds-spacing-07);"
        labelText="Question:"
        placeholder="Enter question..." />
    </div>
    <TextArea
      bind:value={descriptionValue}
      style="padding-bottom: var(--cds-spacing-07);"
      labelText="Description:"
      placeholder="Enter a description..." />
  </Form>
</Modal>
