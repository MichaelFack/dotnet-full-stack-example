import { CSSProperties } from "react"
import { GlobalProperties } from "./global"

export type IconStyle = {
  size: "really small" | "small" | "big" | "really big" | { width: string, height: string }
  rotate?: 'left' | 'right' | 'upside down'
}

function computeStyle(style: IconStyle): CSSProperties {
  let result: CSSProperties = {}

  switch (style.size) {
    case "really small":
      result = { ...result, width: "25px", height: "25px" };
      break;
    case "small":
      result = { ...result, width: "50px", height: "50px" };
      break;
    case "big":
      result = { ...result, width: "75px", height: "75px" };
      break;
    case "really big":
      result = { ...result, width: "100px", height: "100px" };
      break;
    default:
      result = { ...result, ...style.size };
  }

  if (style.rotate) {
    switch (style.rotate) {
      case "left":
        result = { ...result, rotate: '90deg' }
        break;
      case "right":
        result = { ...result, rotate: '270deg' }
        break;
      case "upside down":
        result = { ...result, rotate: '180deg' }
        break;
    }
  }

  return result;
}

const defaultStyle: IconStyle = { size: 'big' }

export type IconProperties = { source: string, alt?: string, style?: IconStyle } & GlobalProperties;

export function Icon({ alt, source, style, ...props }: IconProperties): JSX.Element {
  return <img data-testid={`${props["data-testid"]}`} src={source} alt={alt} style={computeStyle(style ?? defaultStyle)}/>
}