<script lang="ts">
  export let files;

  import { createEventDispatcher } from 'svelte';
  const dispatcher = createEventDispatcher<{ addFilePage: Object }>();
  async function addFilePage(event) {
    dispatcher("add-file-page", event.detail);
  }

  import * as Collapsible from "$lib/components/ui/collapsible";
  import { ScrollArea } from "$lib/components/ui/scroll-area";
  import { Button } from '$lib/components/ui/button';
  import FileListItem from '$components/FileListItem.svelte';
  import ChevronsUpDown from "lucide-svelte/icons/chevrons-up-down";
</script>

<Collapsible.Root class="w-[100%] space-y-2" open="true">
  <div class="flex items-center">
    <Collapsible.Trigger asChild let:builder>
      <Button builders={[builder]} variant="ghost" size="sm" class="flex justify-start items-center w-[100%] p-3">
        <ChevronsUpDown class="h-4 w-4" />
        <span class="sr-only">Toggle</span>
        <h4 class="ml-3 text-sm font-semibold">File List</h4>
      </Button>
    </Collapsible.Trigger>
  </div>
  <Collapsible.Content class="space-y-2">
    <div class="flex h-[200px] rounded-md border py-[4px]">
      {#if files.length > 0}
      <ScrollArea class="w-[100%]">
        {#each files as file}
        <FileListItem item={file} on:add-file-page={addFilePage} />
        {/each}
      </ScrollArea>
      {:else}
        <div class="flex grow items-center justify-center">No Files</div>
      {/if}
    </div>
  </Collapsible.Content>
</Collapsible.Root>

<style>
</style>
