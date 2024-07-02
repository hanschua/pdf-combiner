<script lang="ts">
  export let label;

  let input: Element = null;
  let file: File = null;

  let errors = {
    file: ""
  };

  $: labelStyle = errors.file ? "color: red;" : "";

  import PdfUtils from '$utils/PdfUtils.ts';

  import { PDFDocument, StandardFonts, rgb } from '@cantoo/pdf-lib';
  import { createEventDispatcher } from 'svelte';

  const dispatcher = createEventDispatcher<{ addFile: Object }>();

  async function onChange(event: Event) {
    const target = event.target;
    const files = target.files;
    if (!files || !files.length) {
      return;
    }

    input = target;
    file = files[0];
    errors.file = "";
  }

  async function addPdf() {
    if (!file) {
      errors.file = "Select A File";
      return;
    }

    const item = {
      name: file.name,
      blob: await PdfUtils.createBlobCopy(file)
    };

    dispatcher('add-file', item);

    // reset
    input.value = null;
    file = null;
    errors.file = "";
  }

  import FilePlus from "lucide-svelte/icons/file-plus";
  import { Input } from '$lib/components/ui/input';
  import { Label } from '$lib/components/ui/label';
  import { Button } from '$lib/components/ui/button';
  import { ScrollArea } from "$lib/components/ui/scroll-area";
  import * as Collapsible from "$lib/components/ui/collapsible";
  import ChevronsUpDown from "lucide-svelte/icons/chevrons-up-down";
</script>

<Collapsible.Root class="w-[100%] space-y-2" open="true">
  <div class="flex items-center">
    <Collapsible.Trigger asChild let:builder>
      <Button builders={[builder]} variant="ghost" size="sm" class="flex justify-start items-center w-[100%] p-3">
        <ChevronsUpDown class="h-4 w-4" />
        <span class="sr-only">Toggle</span>
        <h4 class="ml-3 text-sm font-semibold">{label}</h4>
      </Button>
    </Collapsible.Trigger>
  </div>
  <Collapsible.Content class="space-y-2">
    <div class="flex h-[100%] space-between align-items rounded-md border p-1">
      <Input class="border-0" on:change={onChange} type="file" accept="application/pdf" />
      <div class="flex h-[100%] w-9 justify-center items-center">
      <Button variant="ghost" class="p-1 mr-2" on:click={addPdf}>
        <FilePlus />
        <span class="sr-only">Add To File List</span>
      </Button>
      </div>
    </div>
  </Collapsible.Content>
</Collapsible.Root>

<style>
</style>
