import type { Menu } from "@type/microcms/menu";
import type {
  MicroCMSContentId,
  MicroCMSDate,
  MicroCMSListContent,
} from "microcms-js-sdk";

export type MenuObject = {
  cut: Pick<Menu, "name" | "price" | "description" >[];
  color: Pick<Menu, "name" | "price" | "description">[];
  perm: Pick<Menu, "name" | "price" | "description" >[];
  straight: Pick<Menu, "name" | "price" | "description">[];
  treatment: Pick<Menu, "name" | "price" | "description">[];
  hairset: Pick<Menu, "name" | "price" | "description" >[];
  headspa: Pick<Menu, "name" | "price" | "description">[];
  others: Pick<Menu, "name" | "price" | "description">[];
};

export const buildMenuObject = (
  menuList: (Menu & MicroCMSListContent)[]
): MenuObject => {
  const cutMenuList = menuList
    .filter((menu) => menu.category.includes("カット"))
  const colorMenuList = menuList
    .filter((menu) => menu.category.includes("カラー"))
  const permMenuList = menuList
    .filter((menu) => menu.category.includes("パーマ"))
  const straightMenuList = menuList
    .filter((menu) => menu.category.includes("縮毛矯正"))
    const treatmentMenuList = menuList
    .filter((menu) => menu.category.includes("トリートメント"))
  const hairsetMenuList = menuList
    .filter((menu) => menu.category.includes("ヘアセット"))
  const headspaMenuList = menuList
    .filter((menu) => menu.category.includes("ヘッドスパ"))
  const othersMenuList = menuList
    .filter((menu) => menu.category.includes("その他"))


  const pick = (array: (Menu & MicroCMSContentId & MicroCMSDate)[]) =>
    array.map(
      ({
        name,
        price,
        description,
      }): Pick<Menu, "name" | "price" | "description"> => ({
        name,
        price,
        description,
      })
    );

  // Combine all menu items into a single list


  const menuObject = {
    cut : pick(cutMenuList),
    color : pick(colorMenuList),
    perm : pick(permMenuList),
    straight : pick(straightMenuList),
    treatment : pick(treatmentMenuList),
    hairset : pick(hairsetMenuList),
    headspa : pick(headspaMenuList),
    others : pick(othersMenuList),
  };

  return menuObject;
};