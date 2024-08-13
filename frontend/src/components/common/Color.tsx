export type Color = "black"
  | "white"
  | "primary" 
  | "secondary" 
  | "tertriary" 
  | "disabled" 
  | "primary disabled"
  | "secondary disabled"
  | "tertriary disabled";

const colorMap: Record<Color, string> = {
  black: "#000000",
  white: "#FFFFFF",
  primary: "#FFDF00",
  secondary: "#FFB700",
  tertriary: "#DFFA00",
  disabled: "#888888",
  "primary disabled": "#9B8800",
  "secondary disabled": "#9B6F00",
  "tertriary disabled": "#879700"
}

export function computeColorCode(color: Color): string {
  return colorMap[color];
}