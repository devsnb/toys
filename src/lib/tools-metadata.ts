export interface ToolMetadata {
  id: string;
  href: string;
  title: string;
  description: string;
}

export const toolsMetadata: ToolMetadata[] = [
  {
    id: "calculator",
    href: "/calculator",
    title: "Calculator",
    description: "Perform calculations",
  },
  {
    id: "color-picker",
    href: "/color-picker",
    title: "Color Picker",
    description: "Pick and convert colors",
  },
  {
    id: "encoder",
    href: "/encoder",
    title: "Encoder / Decoder",
    description: "Encode and decode data",
  },
  {
    id: "json-formatter",
    href: "/formatter/json",
    title: "JSON Formatter",
    description: "Format and minify JSON",
  },
];
