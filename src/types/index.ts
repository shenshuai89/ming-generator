import { ButtonAttrs } from "./button";
import { IconAttrs } from "./icon";
import { LineAttrs } from "./line";
import { MoreAttrs } from "./more";

export interface ComponentItem {
  type: "button" | "icon" | "line" | "more";
  icon?: string;
  label?: string;
  value?: any;
  field?: string;
  attrs: ButtonAttrs | IconAttrs | LineAttrs | MoreAttrs;
  children?: ComponentItem[];
}
