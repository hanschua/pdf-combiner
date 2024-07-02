<script>
  import { page } from '$app/stores';
  import logo from '$lib/images/svelte-logo.svg';
  
  import Sun from "lucide-svelte/icons/sun";
  import Moon from "lucide-svelte/icons/moon";
  import Github from "lucide-svelte/icons/github";
 
  import { toggleMode } from "mode-watcher";
  import { Button } from "$lib/components/ui/button";
  import { Label } from '$lib/components/ui/label';
</script>

<header>
  <div class="corner">
    <a href="https://kit.svelte.dev">
      <img src={logo} alt="SvelteKit" />
    </a>
  </div>

  <div class="text-xl pt-3">Local PDF Combiner</div>

  <div class="corner-right">
    <Button on:click={toggleMode} variant="outline" size="icon">
      <Sun
        class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
      />
      <Moon
        class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
      />
      <span class="sr-only">Toggle theme</span>
    </Button>

    <a href="https://github.com/sveltejs/kit">
      <Github alt="GitHub" />      
    </a>
  </div>
</header>

<style>
  header {
    display: flex;
    justify-content: space-between;
  }

  .corner {
    width: 3em;
    height: 3em;
  }

  .corner a,
  .corner-right a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 3em;
    height: 3em;
  }

  .corner img {
    width: 2em;
    height: 2em;
    object-fit: contain;
  }

  .corner-right {
    width: 6em;
    height: 3em;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }

  a:hover {
    color: var(--color-theme-1);
  }
  
</style>
