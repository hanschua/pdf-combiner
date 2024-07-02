<script lang="ts">
  export let filePages;

  import * as Collapsible from "$lib/components/ui/collapsible";
  import { ScrollArea } from "$lib/components/ui/scroll-area";
  import { Button } from '$lib/components/ui/button';
  import FilePageItem from '$components/FilePageItem.svelte';
  import ChevronsUpDown from "lucide-svelte/icons/chevrons-up-down";
</script>

<Collapsible.Root class="w-[100%] space-y-2" open="true">
  <div class="flex items-center">
    <Collapsible.Trigger asChild let:builder>
      <Button builders={[builder]} variant="ghost" size="sm" class="flex justify-start items-center w-[100%] p-3">
        <ChevronsUpDown class="h-4 w-4" />
        <span class="sr-only">Toggle</span>
        <h4 class="ml-3 text-sm font-semibold">File Pages</h4>
      </Button>
    </Collapsible.Trigger>
  </div>
  <Collapsible.Content class="space-y-2">
    <div class="flex h-[300px] rounded-md border py-[4px]">
      {#if filePages.length > 0}
      <ScrollArea class="w-[100%]">
        {#each filePages as filePage}
        <FilePageItem item={filePage} />
        {/each}
      </ScrollArea>
      {:else}
      <div class="flex grow items-center justify-center">No File Pages</div>
      {/if}
    </div>
  </Collapsible.Content>
</Collapsible.Root>

<style>
</style>
