/*import type { MicroCMSImage } from "microcms-js-sdk";*/

export type Menu = {
  name: string;
  price: number;
  description: string;
  /*image: MicroCMSImage;*/
  /*kind: ["ドリンク" | "フード" | "デザート"];*/
  category: ("カット" | "カラー" | "パーマ" | "縮毛矯正"| "トリートメント" | "ヘアセット" | "ヘッドスパ" | "その他")[];
};
