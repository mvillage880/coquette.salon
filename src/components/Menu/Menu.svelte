<script>
  import {
    Dialog,
    DialogOverlay,
    DialogTitle,
    DialogDescription,
    Portal,
    Transition,
  } from "@rgossiaux/svelte-headlessui";
  import clsx from "clsx";
  import { onMount } from "svelte";

  let isOpen = false;
  const open = () => (isOpen = true);
  const close = () => (isOpen = false);
  const toggle = () => (isOpen = !isOpen);

  const links = [
    {
      mainLabel: "MENU",
      subLabel: "メニュー",
      href: "/menu",
      hiddenDesktop: true,
    },
    {
      mainLabel: "SHOP",
      subLabel: "店舗情報",
      href: "/#shop",
      hiddenDesktop: true,
    },
    {
      mainLabel: "NEWS",
      subLabel: "お知らせ",
      href: "/news/1",
    },
    {
      mainLabel: "HAIR STYLE",
      subLabel: "ヘアスタイル",
      href: "https://beauty.hotpepper.jp/slnH000357592/style/",
      target: "_blank",
      rel: "noopener noreferrer",
    },
    /*{
      mainLabel: "CONTACT",
      subLabel: "お問い合わせ",
      href: "/contact",
    },*/
  ];

  // 開閉ボタンがメニューに重なっている都合上、
  // on:closeにclose()を渡すと、開閉ボタンを押した時にtoggle()も実行されてしまうため、
  // Escキーによるクローズ処理を実装をここで行う
  window.addEventListener("keydown", (e) => {
    if (isOpen && e.key === "Escape") {
      close();
    }
  });

  // **アンカーリンク & 別ページ遷移に対応**
  function handleLinkClick(event, href) {
    if (href.startsWith("/#")) {
      event.preventDefault(); // デフォルトのジャンプを防ぐ
      close(); // メニューを閉じる

      if (window.location.pathname === "/") {
        // **トップページなら直接スクロール**
        scrollToAnchor(href);
      } else {
        // **別のページから `/#shop` をクリックした場合**
        location.replace(href); // `/#shop` 付きでページ遷移
      }
    } else {
      close(); // 通常のページ遷移は即閉じる
    }
  }

  // **スムーズスクロールを適用**
  function scrollToAnchor(href) {
    const targetId = href.replace("/#", "");
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  // **ページロード時に `#shop` がある場合はスクロール**
  onMount(() => {
    if (window.location.hash) {
      scrollToAnchor(window.location.hash);
    }
  });

  // **ページの変更を監視してメニューを閉じる**
  onMount(() => {
    const observer = new MutationObserver(() => {
      close();
    });

    observer.observe(document.body, { childList: true, subtree: true });

    window.addEventListener("popstate", close);

    return () => {
      observer.disconnect();
      window.removeEventListener("popstate", close);
    };
  });
</script>

<!--Dialog
  open={isOpen}
  class={clsx(
    "invisible fixed inset-0 z-40 overflow-y-auto bg-white opacity-0 transition-[opacity,visibility] duration-500 [&.open]:visible [&.open]:opacity-100",
    isOpen && "open"
  )}
  static
>
  <nav class="h-full">
    <--ul class="flex h-full flex-col justify-center gap-6 py-16"--
    <ul class="flex h-full flex-col justify-center py-16">
      {#each links as link}
        <li
          class="flex justify-center [&.hidden-desktop]:sm:hidden"
          class:hidden-desktop={link.hiddenDesktop}
        >
          <a class="flex flex-col px-8 py-4 text-center" href={link.href}>
            <span class="font-english text-2xl sm:text-3xl"
              >{link.mainLabel}</span
            >
            <span class="font-sans text-base sm:text-lg">{link.subLabel}</span>
          </a>
        </li>
      {/each}
    </ul>
  </nav>
</Dialog>

<Portal>
  <button
    class="fixed right-10 top-10 z-50 flex h-10 w-10 flex-col items-center justify-center gap-4 text-secondary sm:right-14 sm:top-12 sm:h-14 sm:w-14"
    on:click={toggle}
  >
    <span
      class="absolute inset-0 m-auto h-px w-full -translate-y-2 transform-gpu bg-current duration-500 [&.open]:translate-y-0 [&.open]:rotate-45"
      class:open={isOpen}
    />
    <span
      class="absolute inset-0 m-auto h-px w-full translate-y-2 transform-gpu bg-current duration-500 [&.open]:translate-y-0 [&.open]:-rotate-45"
      class:open={isOpen}
    />
  </button>
</Portal-->

<Dialog
  open={isOpen}
  class={clsx(
    "invisible fixed inset-0 z-40 overflow-y-auto bg-white opacity-0 transition-[opacity,visibility] duration-500 [&.open]:visible [&.open]:opacity-100",
    isOpen && "open"
  )}
  static
>
  <nav class="h-full">
    <ul class="flex h-full flex-col justify-center py-16">
      {#each links as link}
        <li
          class="flex justify-center [&.hidden-desktop]:sm:hidden"
          class:hidden-desktop={link.hiddenDesktop}
        >
          <a
            class="flex flex-col px-8 py-4 text-center"
            href={link.href}
            on:click={(event) => handleLinkClick(event, link.href)}
          >
            <span class="font-english text-2xl sm:text-3xl"
              >{link.mainLabel}</span
            >
            <span class="font-sans text-base sm:text-lg">{link.subLabel}</span>
          </a>
        </li>
      {/each}
    </ul>
  </nav>
</Dialog>

<Portal>
  <button
    class="fixed right-10 top-10 z-50 flex h-10 w-10 flex-col items-center justify-center gap-4 text-secondary sm:right-14 sm:top-12 sm:h-14 sm:w-14"
    on:click={toggle}
  >
    <span
      class="absolute inset-0 m-auto h-px w-full -translate-y-2 transform-gpu bg-current duration-500 [&.open]:translate-y-0 [&.open]:rotate-45"
      class:open={isOpen}
    />
    <span
      class="absolute inset-0 m-auto h-px w-full translate-y-2 transform-gpu bg-current duration-500 [&.open]:translate-y-0 [&.open]:-rotate-45"
      class:open={isOpen}
    />
  </button>
</Portal>
