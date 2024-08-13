import { computeColorCode, GlobalProperties, Link, Tab } from "./components/common";
import logo from './icons/logo.svg';

export type LayoutProperties = { children: JSX.Element | JSX.Element[] } & GlobalProperties;

export default function({ children, ...props }: LayoutProperties) {
  return <div data-testid={`${props["data-testid"]}`} style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: computeColorCode('white') }}>
    <nav data-testid={`${props["data-testid"]}-nav`} style={{ position: 'sticky', top: 0, left: 0, right: 0, boxShadow: `0px 5px 5px ${computeColorCode('disabled')}` }}>
      <Tab data-testid={`${props["data-testid"]}-nav-tab`} style={{ orientation: 'horizontal' }}>
        <Link data-testid={`${props["data-testid"]}-nav-home-link`} to='/' icon={{ source: logo, style: { size: { width: '50px', height: '50px' } } }}/>
        <Link data-testid={`${props["data-testid"]}-nav-philosophy-link`} to='/philosophy' text={{ content: 'philosophy', style: { size: { height: '15px' }, padding: '0px 5px 0px 5px' } }}/>
      </Tab>
    </nav>
    <div data-testid={`${props["data-testid"]}-page`} style={{ position: 'absolute', left: 0, right: 0, bottom: 0, top: '50px' }}>
      {children}
    </div>
  </div>
}