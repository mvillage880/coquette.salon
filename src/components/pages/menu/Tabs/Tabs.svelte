<script lang="ts">
  import {
    TabGroup,
    TabList,
    TabPanel,
    TabPanels,
  } from "@rgossiaux/svelte-headlessui";
  import Tab from "./Tab.svelte";
  import Section from "./Section.svelte";
  import type { Menu } from "src/types/microcms/menu";

  export let menu: {
    cut: Pick<Menu, "name" | "price" | "description">[];
    color: Pick<Menu, "name" | "price" | "description">[];
    perm: Pick<Menu, "name" | "price" | "description">[];
    straight: Pick<Menu, "name" | "price" | "description">[];
    treatment: Pick<Menu, "name" | "price" | "description">[];
    hairset: Pick<Menu, "name" | "price" | "description">[];
    headspa: Pick<Menu, "name" | "price" | "description">[];
    others: Pick<Menu, "name" | "price" | "description">[];
  };
</script>

<TabGroup class="mt-16 sm:mt-24">
  <TabList class="-mx-8 grid grid-cols-3 font-extrabold sm:mx-0">
    <Tab>カット</Tab>
    <Tab>カラー</Tab>
    <Tab>パーマ</Tab>
    <Tab>縮毛矯正</Tab>
    <Tab>トリートメント</Tab>
    <Tab>ヘアセット</Tab>
    <Tab>ヘッドスパ</Tab>
    <Tab>その他</Tab>
  </TabList>
  <TabPanels class="mt-10 sm:mt-16 sm:px-5 lg:mt-20 lg:px-10">
    <TabPanel class="space-y-10">
      <Section items={menu.cut} />
    </TabPanel>
    <TabPanel class="space-y-10">
      <Section items={menu.color} />
    </TabPanel>
    <TabPanel class="space-y-10">
      <Section items={menu.perm} />
    </TabPanel>
    <TabPanel class="space-y-10">
      <Section items={menu.straight} />
    </TabPanel>
    <TabPanel class="space-y-10">
      <Section items={menu.treatment} />
    </TabPanel>
    <TabPanel class="space-y-10">
      <Section items={menu.hairset} />
    </TabPanel>
    <TabPanel class="space-y-10">
      <Section items={menu.headspa} />
    </TabPanel>
    <TabPanel class="space-y-10">
      <Section items={menu.others} />
    </TabPanel>
  </TabPanels>
</TabGroup>
