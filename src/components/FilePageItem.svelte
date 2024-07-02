<script lang="ts">
  export let item;

  import StringUtils from '$utils/StringUtils.ts';
  import EventUtils from '$utils/EventUtils.ts';
  import ArrayUtils from '$utils/ArrayUtils.ts';

  let max = item.file.pages;
  let values = [item.start, item.end];
  let isSinglePage = max <= 1;
  let pipstep = Math.ceil(max/ 5);

  function fileName() {
    return StringUtils.middleEllipsis(item.file.name);
  }

  import { createEventDispatcher } from 'svelte';

  const duplicateFilePageDispatcher = createEventDispatcher<{ duplicateFilePage: Object }>();
  async function duplicateFilePage(event: Event) {
    duplicateFilePageDispatcher("duplicate-file-page", item);
  }

  const removeFilePageDispatcher = createEventDispatcher<{ removeFilePage: Object }>();
  async function removeFilePage(event: Event) {
    removeFilePageDispatcher("remove-file-page", item);
  }

  const setRange = EventUtils.createDebounce(async (event: Event) => {
    const detail = event.detail;
    item.start = detail.values[0];
    item.end = detail.values[1];
  });

  import RangeSlider from "svelte-range-slider-pips";
  import { MoveVertical, X, Files } from 'lucide-svelte';
  import { Input } from '$lib/components/ui/input';
  import { Label } from '$lib/components/ui/label';
  import { Button } from '$lib/components/ui/button';
</script>

<div class="flex w-[100%] justify-center py-1">
  <div class="flex w-[96%] p-2 rounded-md border">
    <div class="flex w-[5%] h-[100%] justify-center items-center">
      <MoveVertical class="flex h-[90%] justify-center items-center" />
    </div>
    <div class="flex flex-col w-[95%] justify-center pl-2">
      <div class="flex w-[100%] justify-center pl-3">
        <div class="flex w-[80%] items-center">
          <Label>{fileName()}</Label>
          <Label class="text-gray-400 pl-2">[{item.start},{item.end}]</Label>
        </div>
        <div class="flex w-[10%] h-[100%] justify-center items-center">
          <Button variant="ghost" size="sm" class="p-1" on:click={removeFilePage}>
            <X />
            <span class="sr-only">Remove</span>
          </Button>
        </div>
        <div class="flex w-[10%] h-[100%] justify-center items-center">
          <Button variant="ghost" size="sm" class="p-1" on:click={duplicateFilePage}>
            <Files />
            <span class="sr-only">Duplicate</span>
          </Button>
        </div>
      </div>
      {#if !isSinglePage}
      <div>
        <RangeSlider min={1} max={item.file.pages} first="label" last="label" range pips {pipstep} all="label" float on:change={setRange} bind:values />
      </div>
      {/if}
    </div>
  </div>
</div>

<style>
</style>
