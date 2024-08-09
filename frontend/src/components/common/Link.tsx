import { CSSProperties } from "react";
import { Icon, IconProperties } from "./icon"
import { computeTextStyle, Text, TextProperties } from "./text"
import { GlobalProperties } from "./global";

export type LinkStyle = {
  orientation?: 'horizontal' | 'vertical';
}

export type LinkProperties = {
  to: string,
  text?: Omit<TextProperties, 'data-testid'>,
  icon?: Omit<IconProperties, 'data-testid'>,
  style?: LinkStyle,
} & GlobalProperties;

export function Link({ to, text, icon, style, ...props }: LinkProperties): JSX.Element {
  let content: JSX.Element;

  if (icon && text) {
    content = <div data-testid={`${props["data-testid"]}-composite`} style={{ display: 'flex', flexDirection: style?.orientation === 'horizontal' ? 'row' : 'column', width: 'fit-content', alignItems: 'center', justifyContent: 'center' }}>
      <Icon data-testid={`${props["data-testid"]}-icon`} source={icon.source} alt={icon.alt} style={icon.style}/>
      <Text data-testid={`${props["data-testid"]}-text`} style={text.style} content={text.content} />
    </div>
  } else if (icon) {
    content = <Icon data-testid={`${props["data-testid"]}-icon`} source={icon.source} alt={icon.alt} style={icon.style}/>
  } else if (text) {
    content = <Text data-testid={`${props["data-testid"]}-text`} style={text.style} content={text.content} />
  } else {
    content = <></>
  }

  return <a href={to} data-testid={`${props["data-testid"]}`} style={{ width: 'fit-content', display: 'flex' }}>{content}</a>
}
