import Layout from "../layout";

export default function ErrorPage(): JSX.Element {
  return <Layout data-testid="layout">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
    </Layout>;
}
