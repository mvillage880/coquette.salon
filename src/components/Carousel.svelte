<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { client } from "@libs/microcms";
  import type { MicroCMSImage } from "microcms-js-sdk";
  import type { Gallery } from "src/types/microcms/gallery";

  let images: MicroCMSImage[] = [];
  let clonedImages: MicroCMSImage[] = [];
  let loading = true;

  let itemsPerPage = 4; // PCでは4列表示
  let currentIndex = 0;
  let isTransitioning = false;
  let interval;

  // ✅ microCMSから画像を取得
  async function fetchImages() {
    try {
      const content = await client.getObject<Gallery>({ endpoint: "gallery" });
      images = content.images;
      updateClonedImages();
    } catch (e) {
      console.error("画像の取得に失敗しました:", e);
    } finally {
      loading = false;
    }
  }

  // ✅ 無限ループのために画像リストの最初と最後のアイテムをコピー
  function updateClonedImages() {
    clonedImages = [
      ...images.slice(-itemsPerPage),
      ...images,
      ...images.slice(0, itemsPerPage),
    ];
    currentIndex = itemsPerPage; // 最初の表示位置を調整
  }

  function updateItemsPerPage() {
    if (window.innerWidth < 640) {
      itemsPerPage = 2; // スマホ: 2列
    } else if (window.innerWidth < 1024) {
      itemsPerPage = 3; // タブレット: 3列
    } else {
      itemsPerPage = 4; // PC: 4列
    }
    document.documentElement.style.setProperty(
      "--items-per-page",
      itemsPerPage.toString()
    );
    updateClonedImages();
  }

  function startAutoSlide() {
    interval = setInterval(() => {
      nextSlide();
    }, 3000);
  }

  function stopAutoSlide() {
    clearInterval(interval);
  }

  function nextSlide() {
    if (isTransitioning) return;
    isTransitioning = true;
    stopAutoSlide();

    currentIndex++;

    setTimeout(() => {
      if (currentIndex >= clonedImages.length - itemsPerPage) {
        currentIndex = itemsPerPage;
      }
      isTransitioning = false;
    }, 500);

    startAutoSlide();
  }

  function prevSlide() {
    if (isTransitioning) return;
    isTransitioning = true;
    stopAutoSlide();

    currentIndex--;

    setTimeout(() => {
      if (currentIndex < 0) {
        currentIndex = clonedImages.length - itemsPerPage - 1;
      }
      isTransitioning = false;
    }, 500);

    startAutoSlide();
  }

  onMount(() => {
    fetchImages();
    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    startAutoSlide();
  });

  onDestroy(() => {
    stopAutoSlide();
    window.removeEventListener("resize", updateItemsPerPage);
  });
</script>

{#if loading}
  <p class="text-center">画像を読み込み中...</p>
{:else}
  <div class="relative mx-auto max-w-6xl overflow-hidden">
    <div
      class="carousel flex transition-transform duration-500 ease-in-out"
      style="transform: translateX(calc(-{currentIndex} * (100% / var(--items-per-page))));"
    >
      {#each clonedImages as image}
        <div class="carousel-item">
          <img
            src={image.url}
            alt=""
            class="h-auto w-full object-cover shadow-md"
          />
        </div>
      {/each}
    </div>

    <!-- ✅ 前へ・次へボタン -->
    <button
      class="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black bg-opacity-50 px-4 py-2 text-white"
      on:click={prevSlide}
    >
      ◀
    </button>
    <button
      class="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black bg-opacity-50 px-4 py-2 text-white"
      on:click={nextSlide}
    >
      ▶
    </button>
  </div>
{/if}

<style>
  .carousel {
    display: flex;
    gap: 24px;
  }

  .carousel-item {
    flex: 0 0 calc(100% / var(--items-per-page));
    max-width: calc(100% / var(--items-per-page));
  }

  @media (max-width: 1024px) {
    :root {
      --items-per-page: 3;
    }
  }

  @media (max-width: 640px) {
    :root {
      --items-per-page: 2;
    }
  }
</style>
