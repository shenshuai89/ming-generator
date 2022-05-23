import { ComponentItem } from "../types";

export const baseComponent: ComponentItem[] = [
  {
    type: "button",
    label: "按钮",
    icon: "Coin",
    attrs: {
      btntext: "按钮",
      type: "default",
      size: "default",
      square: false,
      round: false,
      hairline: false,
      color: "",
      plain: false,
      disabled: false,
      block: false,
      loading: false,
      icon: "",
      iconPosition: "left",
      loadingText: "",
      loadingType: "circular",
      url: "",
      to: "",
      replace: false,
    },
  },
  {
    type: "icon",
    label: "图标",
    icon: "CollectionTag",
    attrs: {
      name: "edit",
      color: "inherit",
      company: "px",
      size: "20",
      dot: false,
      badge: "",
    },
  },
];

export const chartsComponent: ComponentItem[] = [
  {
    type: "line",
    label: "折线图",
    icon: "DataLine",
    attrs: {
      width: 375,
      height: 300,
      title: "折线图",
      smooth: false,
      areaStyle: false,
      xAxisData: [
        { name: "Mon" },
        { name: "Tue" },
        { name: "Wed" },
        { name: "Thu" },
        { name: "Fri" },
        { name: "Sat" },
        { name: "Sun" },
      ],
      seriesData: [
        { data: 820 },
        { data: 932 },
        { data: 901 },
        { data: 934 },
        { data: 1290 },
        { data: 1330 },
        { data: 1320 },
      ],
    },
  },
];

export const businessComponent: ComponentItem[] = [
  {
    type: "more",
    label: "更多",
    icon: "More",
    attrs: {
      leftOptions: {
        style: {
          color: "#000",
          fontWeight: 700,
          fontSize: 18,
        },
        text: "新品好物",
      },
      rightOptions: {
        style: {
          color: "#ddd",
          fontSize: 14,
          fontWeight: 400,
        },
        icon: "right",
        iconSize: 12,
        iconColor: "#ddd",
        text: "更多",
      },
    },
  },
];
