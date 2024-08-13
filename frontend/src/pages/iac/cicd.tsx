import Layout from '../../layout';
import { computeTextStyle, Text } from '../../components/common';

export default function cicd(): JSX.Element {
  return <Layout data-testid='layout'>
    <div data-testid='iac-main' style={{ ...computeTextStyle({ size: 'small' }), width: '100%', height: '100%', justifyContent: 'center', alignContent: 'center' }}>
      <Text data-testid='iac-main-text-1' style={{ size: 'really big' }} content='CI/CD' />
      <p>
        The process of automating the development cycle can be a tricky endevour.
        It is simultanious true that we want to enable developers to develop high quality code in parralel, while ensuring that the production environment stays stable and updated.
        How we achieve continous deployment and continuous development in a balanced way is both important and non-trivial.
      </p>
      <Text data-testid='iac-main-text-3' style={{ size: 'big' }} content='Issue 1: stability' />
      <p>
        For the developers it would be the easiest solution for them to be able to continuously push all their changes, with total disregard to bugs, linting and testing.
        The issue that arrise solely from having multiple developers work in parralel is merging their workloads. Luckily that's a solved issue; before being able to push changes, it is the responsibility of the developer to resolve any conflicts between changes since branching off and the latest state.
        We want production to be stable though, so we want some quality measures enabled.
      </p>
      <p>
        Static code analysis can discover syntax bugs and similar errors.
        Testing serve to challenge and enforce the assumptions we as developers make.
        In general these exist on multiple levels; unit-, integration-, end-to-end- and full-stack-system testing.
      </p>
      <p>
        A unit test is a test of singular code unit, which can be tested in isolation, such as a class in object oriented programming or a function in functional programming.
        For instance; take a function and verify that it will produce A given it has state B and receives input C.
      </p>
      <p>
        An integration test is any test which takes a set of units composed to integrate somehow and verifies that they interact as expected.
        For instance; take a set of functions, some higher order using one or more lower order functions, and consider them a single function, where the composition of the functions can be considered a part of the state.
        Then we again verify that it will produce A given it has state B and receives input C.
        While this formulation makes it seem straight forward some integrations are harder to test than others.
        In larger systems, such as webpages or continuously running programs, the developers may have to rely on third party software or being clever.
        A warning though; being overly clever often leads to overly complicated and over-engineered solutions, and if something is stupid, but it works, it's not stupid.
      </p>
      <p>
        An end-to-end test is a test which tests the full system running as in production.
        For instance, if the product is an API then an end-to-end test then it should be available as in production on another environment in which it can be tested, both functionally, but stress- & benchmark testing.
        This includes verifying that external integrations are used as expected, scalability works and 
      </p>
      <p>
        Full-stack-system testing is an arbitrary definition of testing complex systems that include sensors, IoT devices etc. then it should also be verified to work in conjunction with your software.
        While not applicable to all solutions, to have a small physical replica of the production setup, on which the developers can verify that changes will rollout gracefully can be critical for ensuring production stability.
      </p>
      <Text data-testid='iac-main-text-3' style={{ size: 'big' }} content='Issue 2: Productivity' />
      <p>
        For the production environment's stability's sake it would be the easiest solution for developers never to be able to push any of their changes.
        That's not feasible though, as new features and security updates etc. are needed throughout the lifetime of a product.
        Furthermore we would like developers to have an easier time introducing and maintaining the product.
        Otherwise we wouldn't have invented computation languages - they serve to break down the barrier between machine-executable and human-readable code.
      </p>
      <p>
        Consistency helps us as developers more quickly read and understand our codebase.
        For consistency's sake we want some code consistency checks using linting.
        While we can use static code analysis to discover syntax bugs, we can also use it to help make our codebase more consistent.
      </p>
      <p>
        Automatic formatting and workloads can help us reduce the amount of manual labor performed as part of the development cycle.
        This frees up the developer from having to worry about the development cycle to instead just code.
        Known tools like GitHub helps the developer (and the team manager and product owner) separate work and manage changes.
        Ideally the development cycle ends there; just features and maintainance, and in a lot of setups that's acheived.
      </p>
      <Text data-testid='iac-main-text-1' style={{ size: 'big' }} content='Solutions' />
      <p>
        Environments, continuous integration and continuos deployment make it possible to have both a developer environment where developers can focus on their work, while the production environment can remain stable.
      </p>
    </div>
  </Layout>
}
