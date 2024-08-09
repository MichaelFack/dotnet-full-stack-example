import { computeTextStyle, Text } from '../../components/common';
import Layout from '../../layout';

export default function FirstQuestionAnnotated(): JSX.Element {
  return <Layout data-testid='layout'>
    <div data-testid='phil-first' style={{ ...computeTextStyle({ size: 'small' }), width: '100%', height: '100%', justifyContent: 'center', alignContent: 'center' }}>
      <Text data-testid='phil-first-text-1' style={{ size: 'really big' }} content='The First Question' />
      <p>Am I experiencing?</p>
      <p>
        It should be pretty self evident that, in fact, if you are having the experience of reading this that you are experiencing.
      </p>
    </div>
  </Layout>
}
