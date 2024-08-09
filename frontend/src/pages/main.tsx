import Layout from '../layout';
import { Text } from '../components/common';

export default function MainPage(): JSX.Element {
  return <Layout data-testid='layout'>
    <div style={{ width: '100%', height: '100%', justifyContent: 'center', alignContent: 'center' }}>
      <Text data-testid='main-text-1' content='Hello!' />
      <Text data-testid='main-text-2' content='Wellcome to this webpage.' />
      <Text data-testid='main-text-3' content='Feel free to browse, though content is limited.' />
    </div>
  </Layout>
}
