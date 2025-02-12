<script lang="ts">
  import { onMount, onDestroy } from "svelte";

  let observer: IntersectionObserver;

  onMount(() => {
    console.log("🚀 ScrollAnimation.svelte が実行されました！");

    if (typeof window === "undefined") {
      console.warn("⚠ `window` が未定義（SSR 環境）");
      return;
    }

    setTimeout(() => {
      const elements: NodeListOf<Element> =
        document.querySelectorAll(".animate");
      console.log("✅ Found elements:", elements);

      if (elements.length === 0) {
        console.warn("⚠ `.animate` クラスの要素が見つかりません！");
        return;
      }

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              console.log("🔥 Intersecting:", entry.target);
              (entry.target as HTMLElement).classList.add("show");
              observer.unobserve(entry.target);
            }
          });
        },
        { rootMargin: "100px", threshold: 0.3 }
      );

      elements.forEach((el) => observer.observe(el));
    }, 100);
  });

  onDestroy(() => {
    if (observer) {
      console.log("🛑 Intersection Observer を解除しました");
      observer.disconnect();
    }
  });
</script>

<slot />
