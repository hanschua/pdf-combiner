<script lang="ts">
  export let pdfData;

  let pdfViewer;
  let pdfCss = "display: none;";
  let hasPdf = false;

  // track update
  $: pdfViewer && pdfData && updatePdfViewer();

  const updatePdfViewer = function () {
    if (!pdfViewer || !pdfData.blobUrl) {
      return;
    }

    pdfViewer.src = pdfData.blobUrl;
    pdfCss = "display: visible;";
    hasPdf = true;
  };

  // TODO use PDF.js
  let hasPdfViewer = !!navigator.pdfViewerEnabled;

  import * as Collapsible from "$lib/components/ui/collapsible";
  import { ScrollArea } from "$lib/components/ui/scroll-area";
  import { Button } from '$lib/components/ui/button';
  import FilePageItem from '$components/FilePageItem.svelte';
  import ChevronsUpDown from "lucide-svelte/icons/chevrons-up-down";
</script>

<Collapsible.Root class="h-[100%] w-[100%] space-y-2" open="true">
  <div class="flex items-center">
    <Collapsible.Trigger asChild let:builder>
      <Button builders={[builder]} variant="ghost" size="sm" class="flex justify-start items-center w-[100%] p-3">
        <ChevronsUpDown class="h-4 w-4" />
        <span class="sr-only">Toggle</span>
        <h4 class="ml-3 text-sm font-semibold">Pdf Viewer</h4>
      </Button>
    </Collapsible.Trigger>
  </div>
  <Collapsible.Content class=" h-[700px] space-y-2">
    <div class="flex h-[100%] rounded-md border p-3">
      {#if hasPdfViewer}
      <iframe bind:this={pdfViewer} class="bg-gray w-[100%] h-[100%]" style="{pdfCss}" title="document"></iframe>
      {:else}
      TODO
      {/if}
      {#if !hasPdf}
        <div class="flex grow items-center justify-center">No Pdf Generated</div>
      {/if}
    </div>
  </Collapsible.Content>
</Collapsible.Root>

<style>
</style>
