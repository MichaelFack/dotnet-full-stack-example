import { useState } from "react"
import { computeTextStyle, TextProperties } from "./text"
import { Icon } from "./icon"
import DownArrow from "../../icons/downarrow.svg"
import { GlobalProperties } from "./global"
import { Text } from "./text"

export type DropdownStyle = {
  size?: 'small' | 'big' | 'really big'
}

export type DropdownProperties = {
  header: TextProperties,
  children: JSX.Element | JSX.Element[],
  style?: DropdownStyle
} & GlobalProperties;

export function Dropdown({ header, children, style, ...props }: DropdownProperties): JSX.Element {
  const [isOpen, setOpen] = useState(false)

  return <div hidden={props.hidden} data-testid={props["data-testid"]} style={{ width: 'fit-content', height: 'fit-content' }}>
    <a data-testid={`${props["data-testid"]}-header`} onClick={() => setOpen(!isOpen)} style={{ ...computeTextStyle(header.style ?? {}), cursor: 'pointer', width: 'fit-content' }}>
      <Text content={header.content} data-testid={`${props["data-testid"]}-header-content`} />
      <Icon data-testid={`${props["data-testid"]}-header-downarrow`} source={DownArrow} style={{ size: { width: '15px', height: '15px' }, rotate: isOpen? 'upside down' : undefined }} />
    </a>
    <div data-testid={`${props["data-testid"]}-menu`} hidden={!isOpen} style={{ width: 'fit-content', position: 'absolute' }}>
      { children }
    </div>
  </div>
}
