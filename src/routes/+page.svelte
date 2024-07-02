<script lang="ts">
  import { v4 as uuidv4 } from 'uuid';

  import PdfUtils from '$utils/PdfUtils.ts';
  import ArrayUtils from '$utils/ArrayUtils.ts';

  // iframe
  let pdfData = {};

  // blob URL to release
  let currentBlobUrl = null;

  // file list
  let files = [];
  let filePages = [];

  function createData() {
    return {
      file: {},
      label: 'Add File'
    };
  }

  async function addFile(event) {
    const item = event.detail;
    const pdf = await PdfUtils.loadPdf(item.blob, { ignoreEncryption: true });
    const newFile = {
      id: uuidv4(),
      name: item.name,
      blob: item.blob,
      isEncrypted: pdf.isEncrypted,      
      pages: pdf.getPages().length,
    };
    files = [...files, newFile];
  }

  async function addFilePage(event) {
    const file = event.detail;
    const newFilePage = {
      file,
      start: 1,
      end: file.pages,
    };
    filePages = [...filePages, newFilePage];
  }

  async function renderPdf() {
    if (!files.length) {
      return;
    }

    if (currentBlobUrl) {
      URL.revokeObjectURL(currentBlobUrl);
      currentBlobUrl = null;
    }
    
    const inputDatum = [];
    for (let filePage of filePages) {
      inputDatum.push({
        file: filePage.file,
        pages: ArrayUtils.createArray(filePage.start - 1, filePage.end - 1),
      });
    }

    const blobUrl = await PdfUtils.createPdf(inputDatum);

    currentBlobUrl = blobUrl;
    pdfData.blobUrl = blobUrl;
    pdfData = pdfData; // svelte things
  }

  import { Button } from '$lib/components/ui/button';
  import { Label } from '$lib/components/ui/label';
  import * as Card from "$lib/components/ui/card";
  import { ScrollArea } from "$lib/components/ui/scroll-area";

  import FileInput from '$components/FileInput.svelte';
  import PdfViewer from '$components/PdfViewer.svelte';
  import FileList from '$components/FileList.svelte';
  import FilePagesList from '$components/FilePagesList.svelte';
  import * as Accordion from "$lib/components/ui/accordion";
</script>

<svelte:head>
  <title>Local PDF Combiner</title>
  <meta name="description" content="Local PDF Combiner" />
</svelte:head>

<section>
  <div class="pdf-info mb-2">
    <Accordion.Root>
      <Accordion.Item value="item-1">
        <Accordion.Trigger>What is this?</Accordion.Trigger>
        <Accordion.Content>
          This is PDF combiner that is done locally in your browser. You can add PDFs and select which pages to combine.
          <ol class="list-decimal list-inside ml-2">
            <li>In the Add To File List, choose the file to add.</li>
            <li>In the Add To File List, click the Add File button beside it.</li>
            <li>In the File List, click the Add File button to add it to the File Pages List.</li>
            <li>In the File Page List, select the page range to include.</li>
            <li>Repeat the steps to add more PDFs and pages as necessary.</li>
            <li>Click Render To The PDF Viewer button.</li>
          </ol>
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  </div>

  <div class="pdf-combiner">
    <div class="options">
      <Button variant="outline" on:click={renderPdf}>Render To The PDF Viewer</Button>
      <FileInput label="Add To File List" on:add-file={addFile} />
      <div class="files-options">
        <div class="files">
          <FileList files={files} on:add-file-page={addFilePage} />
        </div>
        <div class="files-pages">
          <FilePagesList filePages={filePages} />
        </div>
      </div>
    </div>

    <div class="pdf">
      <PdfViewer pdfData="{pdfData}" />
    </div>
  </div>
</section>

<style>
  section {
    display: flex;
    flex-direction: column;
  }

  .options {
    display: flex;
    flex-direction: column;
    margin-bottom: 1em;
    gap: 0.5em;
  }

  .files-options {
    display: flex;
    flex-direction: row;
    gap: 0.5em;
  }

  .files,
  .files-pages  {
    display: flex;
    flex-direction: column;
    width: 100%;
    flex-basis: 50%;
  }

  .pdf {
    diplay: flex;
    height: 1024px;
  }

  @media (min-width: 1100px) {
    section {
      display: flex;
      flex-direction: column;
    }
    
    .pdf-combiner {
      display: flex;
      flex-direction: row;
    }

    .options {
      padding-right: 1em;
      flex: 0 0 40%;
    }

    .files-options {
      display: flex;
      flex-direction: column;
      gap: 0.5em;
    }

    .files,
    .files-pages  {
      display: flex;
      flex-direction: column;
      width: 100%;
      flex-basis: 100%;
    }

    .pdf {
      flex: 0 0 60%;
    }
  }

</style>
