import { CSSProperties } from "react"
import { GlobalProperties } from "./global";

export type TabProperties = {
  children: JSX.Element | JSX.Element[]
  style: { orientation: 'vertical' | 'horizontal' }
} & GlobalProperties;

export function Tab({ children, style, ...props }: TabProperties): JSX.Element {
  let flexStyle: CSSProperties = style.orientation === 'horizontal'
    ? { flexDirection: 'row', width: 'inherit', height: 'fit-content' }
    : { flexDirection: 'column', width: 'fit-content', height: 'inherit' };

  return <div data-testid={`${props["data-testid"]}`} style={{ display: 'flex', ...flexStyle, justifyContent: 'space-between' }}>
    {children}
  </div>
}