import { CSSProperties } from "react";
import { Color, computeColorCode } from "./color"
import { GlobalProperties } from "./global";

type SizeType = 'really small' | 'small' | 'big' | 'really big';

export type TextStyle = {
  alignment?: 'start' | 'end' | 'left' | 'right' | 'center' | 'justify' | 'match-parent'
  color?: Color,
  font?: 'sans-serif',
  size?: SizeType | { height: string }
  padding?: string
};

const sizeToPixelMap: Record<SizeType, string> = { 
  'really small': '10px',
  'small': '20px',
  'big': '30px',
  'really big': '40px',
}

export function computeTextStyle(props: TextStyle): CSSProperties {
  let fontSize = props.size ? typeof props.size === 'string' ? sizeToPixelMap[props.size]: props.size.height : sizeToPixelMap['small'];

  return {
    color: computeColorCode(props.color ?? 'black'),
    fontFamily: props.font ?? 'sans-serif',
    fontSize: fontSize,
    textAlign: props.alignment ?? 'center',
    padding: props.padding
  }
}

export type TextProperties = { content: string, style?: TextStyle } & GlobalProperties;

export function Text({ content, style, ...props }: TextProperties) {
  return <p data-testid={`${props["data-testid"]}`} style={computeTextStyle(style ?? {})}>{content}</p>
}
