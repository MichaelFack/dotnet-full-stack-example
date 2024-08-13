import { computeTextStyle, Text } from '../../components/common';
import Layout from '../../layout';

export default function FirstQuestionAnnotated(): JSX.Element {
  return <Layout data-testid='layout'>
    <div data-testid='phil-first' style={{ ...computeTextStyle({ size: 'small' }), width: '100%', height: '100%', justifyContent: 'center', alignContent: 'center' }}>
      <Text data-testid='phil-first-text-1' style={{ size: 'really big' }} content='The First Question' />
      <p>
        A lot of people has spent a lot of time trying to derive what the first position we should take is.
        For some reason a lot of people place a lot of importance on what is first, though there's not any intrincic value to be derived hereof.
        With that said what is the first question I believe we as people have to take a stance on?
      </p>
      <i>
        Am I experiencing?
      </i>
      <p>
        While there's a lot of similar questions (such as; am I real? What is real? Is there a reality? Is there a god? What is god?) and a lot of different phrasings of the same sentiment I believe this version is breif and simplistic.
        It also reduces the amount of assumptions made, which I find convenient when having to prove the statement, which I intend to.
        My motivation behind proving this statement is to derive a commonground, a foundation to further derive meaning from.
        That is ultimately my goal, as I believe philosophy is tool for which we can derive meaning to our lives, which I beleive is justified in itself.
        To outline why though; I have perceived that a nihilistic approach to life, a life without meaning, often trends towards depressive living, a negative spiral, as there's little meaning in self-preservation and maintaining a healthy happy life if there's little meaning in total.
        So, let's attempt to prove the statement using reason and logic.
      </p>
      <i>
        It should be pretty self evident that, in fact, if you are having the experience of reading this that you are experiencing.
      </i>
    </div>
  </Layout>
}
