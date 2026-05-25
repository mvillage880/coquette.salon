<script lang="ts">
  export type Review = {
    id?: string;
    title?: string;
    customerLabel: string;
    message: string;
  };

  export let reviews: Review[] = [];

  let currentIndex = 1;
  let isResetting = false;

  $: displayReviews =
    reviews.length > 1
      ? [reviews[reviews.length - 1], ...reviews, reviews[0]]
      : reviews;

  function nextSlide() {
    if (reviews.length <= 1) return;

    currentIndex++;

    if (currentIndex >= displayReviews.length - 1) {
      setTimeout(() => {
        isResetting = true;
        currentIndex = 1;

        requestAnimationFrame(() => {
          isResetting = false;
        });
      }, 500);
    }
  }

  function prevSlide() {
    if (reviews.length <= 1) return;

    currentIndex--;

    if (currentIndex <= 0) {
      setTimeout(() => {
        isResetting = true;
        currentIndex = reviews.length;

        requestAnimationFrame(() => {
          isResetting = false;
        });
      }, 500);
    }
  }

  function goToSlide(index: number) {
    currentIndex = index + 1;
  }
</script>

{#if reviews.length > 0}
  <div class="review-carousel">
    <div class="review-carousel__viewport">
      <div
        class="review-carousel__track"
        class:is-resetting={isResetting}
        style="transform: translateX(calc(50% - ((var(--slide-width) + var(--slide-gap)) * {currentIndex} + (var(--slide-width) / 2))));"
      >
        {#each reviews as review}
          <article class="review-carousel__item">
            {#if review.title}
              <h3 class="review-carousel__title">{review.title}</h3>
            {/if}

            <p class="review-carousel__label">{review.customerLabel}</p>
            <p class="review-carousel__message">{review.message}</p>
          </article>
        {/each}
      </div>
    </div>

    {#if reviews.length > 1}
      <button
        class="review-carousel__arrow review-carousel__arrow--prev"
        type="button"
        on:click={prevSlide}
      >
        ←
      </button>

      <button
        class="review-carousel__arrow review-carousel__arrow--next"
        type="button"
        on:click={nextSlide}
      >
        →
      </button>

      <div class="review-carousel__dots">
        {#each reviews as _, index}
          <button
            type="button"
            class:active={index === currentIndex}
            aria-label={`${index + 1}件目の口コミへ`}
            on:click={() => goToSlide(index)}
          />
        {/each}
      </div>
    {/if}
  </div>
{/if}

<style>
  .review-carousel {
    --slide-width: 40%;
    --slide-gap: 64px;

    position: relative;
    width: 100%;
    overflow: hidden;
  }

  .review-carousel__track.is-resetting {
    transition: none;
  }

  .review-carousel__viewport {
    overflow: visible;
  }

  .review-carousel__track {
    display: flex;
    gap: var(--slide-gap);
    transition: transform 0.5s ease;
  }

  .review-carousel__item {
    flex: 0 0 var(--slide-width);
    min-height: 260px;
    padding: 40px 36px;
    border: 1px solid currentColor;
    background: #fff;
    position: relative;
  }

  .review-carousel__title {
    margin-bottom: 12px;
    font-family: Shippori Mincho, serif;
    font-size: 1.35rem;
    font-weight: 800;
    line-height: 1.6;
  }

  .review-carousel__label {
    position: absolute;
    right: 36px;
    bottom: 32px;
    /*margin-bottom: 24px;*/
    font-size: 0.875rem;
    color: #6b7280;
  }

  .review-carousel__message {
    line-height: 2;
    font-size: 0.95rem;
  }

  .review-carousel__arrow {
    position: absolute;
    top: 45%;
    z-index: 2;
    width: 44px;
    height: 44px;
    border: 1px solid currentColor;
    background: #fff;
    transform: translateY(-50%);
  }

  .review-carousel__arrow--prev {
    left: 28%;
  }

  .review-carousel__arrow--next {
    right: 28%;
  }

  .review-carousel__dots {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-top: 28px;
  }

  .review-carousel__dots button {
    width: 8px;
    height: 8px;
    border-radius: 9999px;
    background: currentColor;
    opacity: 0.25;
  }

  .review-carousel__dots button.active {
    opacity: 1;
  }

  @media (max-width: 640px) {
    .review-carousel {
      --slide-width: 82%;
      --slide-gap: 16px;

      padding-bottom: 72px;
    }

    .review-carousel__item {
      min-height: 240px;
      padding: 32px 24px;
    }

    .review-carousel__arrow {
      top: auto;
      bottom: 18px;
      transform: none;
    }

    .review-carousel__arrow--prev {
      left: calc(50% - 56px);
    }

    .review-carousel__arrow--next {
      right: calc(50% - 56px);
    }

    .review-carousel__dots {
      margin-top: 20px;
    }
  }
</style>
