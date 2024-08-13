import Layout from '../../layout';
import { computeTextStyle, Text } from '../../components/common';

export default function Main(): JSX.Element {
  return <Layout data-testid='layout'>
    <div data-testid='iac-main' style={{ ...computeTextStyle({ size: 'small' }), width: '100%', height: '100%', justifyContent: 'center', alignContent: 'center' }}>
      <Text data-testid='iac-main-text-1' style={{ size: 'really big' }} content='Automation: to be self-acting' />
    </div>
  </Layout>
}
