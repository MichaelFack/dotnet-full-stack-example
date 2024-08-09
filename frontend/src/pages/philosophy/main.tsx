import Layout from '../../layout';
import { computeTextStyle, Text } from '../../components/common';

export default function Main(): JSX.Element {
  return <Layout data-testid='layout'>
    <div data-testid='phil-main' style={{ width: '100%', height: '100%', justifyContent: 'center', alignContent: 'center' }}>
      <Text data-testid='phil-main-text-1' style={{ size: 'really big' }} content='Philosophy: Love of Wisdom' />
      <p data-testid='phil-main-text-2' style={computeTextStyle({ size: 'small' })}>
        One can spend their time wondering and thinking about a lot of different things, arguably some more productive than others.
        In this 'for fun' section of this webpage I spend a little effort to give you an impression of what you may find value in thinking of.
      </p>
      <p data-testid='phil-main-text-3' style={computeTextStyle({ size: 'small' })}>
        To make things more digestable I have attempted to make some structural sense of my thoughtstreams and divided them into sections.
        So far I have derived these sections;
        <ul style={{ textAlign: 'left' }}>
          <li>The First Question</li>
          <li>The First Question (Annotated)</li>
          <li>Application</li>
        </ul>
      </p>
    </div>
  </Layout>
}
