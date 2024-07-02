<script lang="ts">
  export let file;

  import { createEventDispatcher } from 'svelte';
  const dispatcher = createEventDispatcher<{ addFile: Object }>();

  async function onChange(event: Event) {
    const target = event.target;
    console.log(target.value);
  }

  let timer;
  function debounce(event: Event) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      onChange(event);
    }, 500);
  }

  async function addPdf() {
    if (!file) {
      errors.file = "Select A File";
      return;
    }

    const item = {
      name: file.name,
      blob: await createBlobCopyPromise(file)
    };

    dispatcher('add-file', item);

    // reset
    input.value = null;
    file = null;
    errors.file = "";
  }

  let errors = {
    file: ""
  };

  $: labelStyle = errors.file ? "color: red;" : "";

  function fileName() {
    const name = file.name;
    if (name.length <= 35) {
      return name;
    }
    return name.substr(0, 20) + '...' + name.substr(name.length - 10);
  }

  import { Input } from '$lib/components/ui/input';
  import { Label } from '$lib/components/ui/label';
  import { Button } from '$lib/components/ui/button';
</script>

<div class="file">
  <Label class='name'>{fileName()}</Label>
  {#if file.isEncrypted}
  <div class="password">
    <Label for="password" style="{labelStyle}">Password</Label>
    <Input id="password" on:input={debounce} type="password" />
  </div>
  {/if}
</div>

<style>
  .file {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
</style>
