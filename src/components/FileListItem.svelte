<script lang="ts">
  export let item;

  import StringUtils from '$utils/StringUtils.ts';
  import EventUtils from '$utils/EventUtils.ts';
  import PdfUtils from '$utils/PdfUtils.ts';

  let errors = {
    file: false
  };

  const debounce = EventUtils.createDebounce(async (event: Event) => {
    const target = event.target;

    try {
      let password = target.value;
      await PdfUtils.loadPdf(item.blob, { password });
      item.password = password;
      errors.file = false;
    } catch (e) {
      errors.file = true;
      console.log(e);
    }
  });

  $: labelStyle = errors.file ? "color: red;" : "";

  function fileName() {
    return StringUtils.middleEllipsis(item.name);
  }

  import { createEventDispatcher } from 'svelte';
  const dispatcher = createEventDispatcher<{ addFilePage: Object }>();
  async function addFilePage(event: Event) {
    console.log("addFilePage");
    dispatcher("add-file-page", item);
  }

  import FileX from "lucide-svelte/icons/file-x";
  import FilePlus from "lucide-svelte/icons/file-plus";
  import { Input } from '$lib/components/ui/input';
  import { Label } from '$lib/components/ui/label';
  import { Button } from '$lib/components/ui/button';
</script>

<div class="flex w-[100%] justify-center py-1">
  <div class="flex w-[96%] p-2 rounded-md border">
    <div class="flex flex-col w-[80%] justify-center">
      <Label for="file" class="pl-1" style="{labelStyle}">{fileName()}</Label>
      {#if item.isEncrypted && !item.password}
      <Input id="file" class="mt-1" placeholder="Password" on:input={debounce} type="password" disabled={item.password}/>
      {/if}
    </div>
    <div class="flex w-[10%] h-[100%] justify-center items-center">
      <Button variant="ghost" size="sm" class="p-1" on:click={addFilePage}>
        <FileX />
        <span class="sr-only">Remove File</span>
      </Button>
    </div>
    <div class="flex w-[10%] h-[100%] justify-center items-center">
      {#if !item.isEncrypted || item.password}
      <Button variant="ghost" size="sm" class="p-1" on:click={addFilePage}>
        <FilePlus />
        <span class="sr-only">Add To File Pages</span>
      </Button>
      {/if}
    </div>
  </div>
</div>

<style>
</style>
