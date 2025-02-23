<script>
  /*import { Carousel, Slide } from "svelte-carousel";
  import "svelte-carousel/dist/svelte-carousel.css"; // スタイルを適用*/
  import { onMount } from "svelte";
  /*import Carousel from "svelte-carousel"; // `default` エクスポートとしてインポート
  import Image from "../components/MicroCMSPicture.svelte"; // 画像コンポーネントをインポート*/

  // 画像データ
  const images = [
    { src: "../src/images/top/01.jpg", alt: "Image 1" },
    { src: "../src/images/top/02.jpg", alt: "Image 2" },
    { src: "../src/images/top/03.jpg", alt: "Image 3" },
    { src: "../src/images/top/04.jpg", alt: "Image 4" },
    { src: "../src/images/top/05.jpg", alt: "Image 5" },
    { src: "../src/images/top/06.jpg", alt: "Image 6" },
    { src: "../src/images/top/07.jpg", alt: "Image 7" },
    { src: "../src/images/top/08.jpg", alt: "Image 8" },
  ];

  console.log("Images Loaded in Carousel:", images);

  let currentIndex = 0;
  let interval;
  let itemsPerPage = 4; // PCでは4枚表示
  let maxIndex = 0; // 最後のスライド位置

  // ✅ 画面サイズによって `itemsPerPage` を変更
  function updateItemsPerPage() {
    if (window.innerWidth < 640) {
      itemsPerPage = 2; // スマホ: 2列
    } else if (window.innerWidth < 1024) {
      itemsPerPage = 3; // タブレット: 3列
    } else {
      itemsPerPage = 4; // PC: 4列
    }

    // ✅ CSS変数として適用
    document.documentElement.style.setProperty(
      "--items-per-page",
      itemsPerPage
    );

    // ✅ 最大スライド位置を更新
    maxIndex = images.length - itemsPerPage;
  }

  // ✅ 自動スライド（1枚ずつスライド）
  const startAutoSlide = () => {
    interval = setInterval(() => {
      nextSlide();
    }, 3000);
  };

  const stopAutoSlide = () => {
    clearInterval(interval);
  };

  // ✅ スライドを次へ（1枚ずつスライド）
  const nextSlide = () => {
    stopAutoSlide();
    currentIndex = currentIndex + 1 > maxIndex ? 0 : currentIndex + 1; // ✅ 画像1枚分スライド
    startAutoSlide();
  };

  // ✅ スライドを前へ（1枚ずつスライド）
  const prevSlide = () => {
    stopAutoSlide();
    currentIndex = currentIndex - 1 < 0 ? maxIndex : currentIndex - 1; // ✅ 画像1枚分スライド
    startAutoSlide();
  };

  onMount(() => {
    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    startAutoSlide();
  });
</script>

<div class="relative mx-auto max-w-6xl overflow-hidden">
  <!-- ✅ カルーセル本体 -->
  <div
    class="flex gap-2 transition-transform duration-500 ease-in-out"
    style="transform: translateX(-{currentIndex * (100 / itemsPerPage)}%);"
  >
    {#each images as image}
      <div class="carousel-item">
        <img
          src={image.src}
          alt={image.alt}
          class="h-auto w-full rounded-lg object-cover shadow-md"
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

  <!-- ✅ インジケーター（ドット） -->
  <div class="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
    {#each Array(images.length - itemsPerPage + 1) as _, i}
      <button
        class="h-3 w-3 rounded-full transition-all duration-300"
        class:opacity-50={i !== currentIndex}
        class:bg-white={i === currentIndex}
        on:click={() => (currentIndex = i)}
      />
    {/each}
  </div>
</div>

<style>
  /* ✅ `grid` ではなく `flex: 0 0 X%;` を適用 + 余白追加 */
  .carousel-item {
    flex: 0 0 calc(100% / var(--items-per-page) - 18px); /* ✅ 画像幅 - 余白 */
    max-width: calc(100% / var(--items-per-page) - 18px);
    padding-right: 10px; /* ✅ 画像間の余白 */
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
