# Testing Philosophy

## Types of Testing

![Unit-vs-Integration-Tests](./images/unit-vs-integration.gif)

1. Unit Test

   1. Tests one piece of code(usually one function)

2. Integration Test

   1. How multiple units work together

3. Acceptance/End to End (E2E) Test

   1. Uses actual browser abd connections to server

   2. Requires a tool like Selenium/Puppeter

   3. Not part of course (Enzyme not designed for it)

4. Functional Test

   1. Can be any of the above; focuses on user flow

> Code-based Tests == Testing Implementation
> Functional Tests == Testing Behaviour

We will do the following for now

1. Code-based Unit Tests

2. Code-based Integration Tests

3. Functional Integration Tests

## Testing Goals Tradeoffs

See the [Video 14.Testing Tradeoffs](https://www.udemy.com/course/react-testing-with-jest-and-enzyme/learn/lecture/16175897#overview) (good one)

1. Goal 1: Easy Maintenace of Tests

   1. Test Behaviour `(what app should do)`, not implementation `(how it works)`

   2. Means Ideally if we refactor code, we should not have to rewrite the tests as long as the behaviour remains same

   3. The if Implemetation changes, Tests still remains same

   4. Testing Implementation is `brittle` (easily broken when app still works)

   5. See video example

2. Goal 2: Easy diagnosis of failing tests

   1. We do not want to spend a huge amount of time trying to fih=gure out why tests failed

   2. But this usually means testing implementaion which we said we shouldn't do

   3. So it's a tradeoff

   4. See video example

## Tradeoffs

You got to find the balance

1. Functional (Behavioural) Testing leads to

   1. More Robusts Tests

   2. More Difficult to find what cause failure

2. Code Based (Implementation) Testing leads to

   1. Ease of Diagnosis

   2. Brittle Tests

## Snapsot Testing (Not part of this course)

1. Jest includes this feature

2. As a way to `freeze` a component or other output in time

3. It takes the ouput of render componenet and saves it, then when you re-run tests if there are any changes, the test fails

4. Can do this with components or other functions that have output like JSON

## Why No Snapsot Testing

She does like snapshot testing for react components

1. No TDD

2. Very Brittle

3. Difficult to Diagnose

4. No test Intent. If there's failure, does code still meet spec
