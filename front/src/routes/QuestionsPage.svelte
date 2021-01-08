<script lang="ts">
  import {
    Button,
    DataTable,
    Dropdown,
    Form,
    Modal,
    TextAreaSkeleton,
    TextArea,
    Tile,
    Toolbar,
    ToolbarContent
  } from 'carbon-components-svelte';
  import wretch from 'wretch';
  import { onMount } from 'svelte';
  import { API_URL } from '../config/api';
  import { capitalizeFirstLetter } from '../utils/filters';
  import { CommitteeType } from '../interfaces';
  import { showError } from '../stores/errors';

  import Add32 from 'carbon-icons-svelte/lib/Add32';

  let loading = true;
  let open = false;

  let contentValue = '';
  let descriptionValue = '';
  let committeeIndex = 0;

  let headers = [
    {
      key: 'specificity',
      value: 'Committee'
    },
    {
      key: 'content',
      value: 'Question'
    },
    {
      key: 'description',
      value: 'Description'
    }
  ];

  let rows = [];
  let committees = [{ id: '8', text: 'general' }];
  const toggleModal = () => {
    open = !open;
  };

  onMount(async () => {
    rows = await wretch(`${API_URL}/questions`).get().json();
    loading = false;

    for (const [key, value] of Object.entries(CommitteeType)) {
      committees.push({ id: key, text: value });
    }
  });

  async function addQuestion() {
    const newQuestion = {
      id: Math.random().toString(3),
      content: contentValue,
      specificity: committees[committeeIndex].text,
      description: descriptionValue
    };
    loading = true;
    open = false;
    wretch(`${API_URL}/questions`)
      .post(newQuestion)
      .res(() => {
        rows.push(newQuestion);
        contentValue = '';
        committees[committeeIndex].text = '';
        descriptionValue = '';
        loading = false;
      })
      .catch(() => {
        loading = false;
        showError();
      });
  }
</script>

{#if loading}
  <TextAreaSkeleton />
{:else}
  <DataTable sortable title="All Questions" {headers} {rows}>
    <Toolbar>
      <ToolbarContent>
        <Button size="default" icon={Add32} kind="ghost" on:click={toggleModal}>
          Add Question
        </Button>
      </ToolbarContent>
    </Toolbar>
    <span slot="cell" let:row let:cell>
      {#if cell.key === 'specificity'}
        {capitalizeFirstLetter(cell.value)}
      {:else}{cell.value}{/if}
    </span>
    <Modal
      preventCloseOnClickOutside
      hasForm
      hasScrollingContent
      bind:open
      modalHeading="Add Question"
      primaryButtonText="Confirm"
      secondaryButtonText="Cancel"
      on:click:button--secondary={toggleModal}
      on:open
      on:close
      on:submit={addQuestion}>
      <Form on:submit>
        <Dropdown
          style="padding-bottom: var(--cds-spacing-07);"
          titleText="Choose a committee:"
          itemToString={item => capitalizeFirstLetter(item.text)}
          bind:selectedIndex={committeeIndex}
          items={committees} />

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
  </DataTable>
{/if}
