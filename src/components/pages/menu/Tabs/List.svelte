<script lang="ts">
  /*import MicroCMSPicture from "@components/MicroCMSPicture.svelte";*/
  import type { Menu } from "src/types/microcms/menu";

  export let items: Pick<Menu, "name" | "price" | "description">[] = [];
</script>

<ul class="space-y-5 px-2">
  {#each items as item}
    <li class="bbccc pb125">
      <div class="flex items-end justify-between">
        <div class="font-extrabold">{item.name}</div>
        <div class="font-extrabold">￥{item.price}</div>
      </div>
      <div class="text-sm">{item.description}</div>
      <!--div class="mt-4 max-w-[15rem]">
        <MicroCMSPicture
          src={item.image.url}
          imgixParams={{
            fit: "crop",
            ar: "1:1",
          }}
          widths={[240, 480, 720]}
          width={240}
          height={240}
          sizes="20rem"
          alt=""
        />
      </div-->
    </li>
  {/each}
</ul>
