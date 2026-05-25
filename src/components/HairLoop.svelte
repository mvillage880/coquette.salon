<script lang="ts">
  import type { MicroCMSImage } from "microcms-js-sdk";

  export let images: MicroCMSImage[] = [];

  const loopImages = [...images, ...images];
</script>

<div class="hair-loop">
  <div class="hair-loop__track">
    {#each loopImages as image}
      <div class="hair-loop__item">
        <img src={image.url} alt="" loading="lazy" />
      </div>
    {/each}
  </div>
</div>

<style>
  .hair-loop {
    width: 100%;
    overflow: hidden;
  }

  .hair-loop__track {
    display: flex;
    gap: 24px;
    width: max-content;
    animation: hairLoop 90s linear infinite;
    will-change: transform;
  }

  .hair-loop__item {
    flex: 0 0 auto;
    width: 260px;
  }

  .hair-loop__item img {
    display: block;
    width: 100%;
    height: auto;
    object-fit: cover;
  }

  @keyframes hairLoop {
    from {
      transform: translateX(0);
    }

    to {
      transform: translateX(-50%);
    }
  }
</style>
