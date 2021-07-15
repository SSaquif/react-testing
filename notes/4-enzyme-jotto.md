# Jotto App Testing

1. In this section we will set up everything

2. We will also learn to test props

3. [Code Repo](https://github.com/SSaquif/jotto/tree/master/src)

## Resources

1. [prop-types](https://www.npmjs.com/package/prop-types)

2. [check-prop-types](https://www.npmjs.com/package/check-prop-types)

## Wireframes

I think this is a good app to do some wirefrmaing with figma

<p align='center'>
    <img height='400px' width='auto' src='./images/jotto-wf-1.png'/>
</p>

<p align='center'>
    <img height='400px' width='auto' src='./images/jotto-wf-2.png'/>
</p>

<p align='center'>
    <img height='400px' width='auto' src='./images/jotto-wf-3.png'/>
</p>

## setupTests.js

1. This file is created by default by create-react-app

2. We will add our enzyme setup our here

3. So it will run before every test

4. We move the following imports and function call in the setupTest.js file and can remove them from other test files. It's global now.

```js
import Enzyme from "enzyme";
import EnzymeAdapter from "@wojtekmaj/enzyme-adapter-react-17";

Enzyme.configure({ adapter: new EnzymeAdapter() });
```

## Plan

Order of testing

1. `Congrats` and `GuessedWords` components
2. `Input` and `App` components
3. After finishing the above 4 components
4. We can either use Context or Redux for global state
5. I will do both

## `Congrats` and `GuessedWords`

We will test these 2 components first

1. Will be testing props for this components

   1. Make sure props have right type
   2. And when they are not missing when required
   3. This components will be receiving state from the parents as props
   4. D'ont need Redux or Context for this section
   5. Can skip props testing if you use TypeScript
   6. Prop testing we are doing will be using proptypes
   7. With TS proptypes are obsolete

2. We will also setup common tools in this section
   1. Define functions in helper file
   2. Setup Enzyme for every file via jest config

### `Input` and `App` components

In these components we will start testing hooks

1. Input component: Has a state controlled field

   1. UseState hook
   2. We will see how to mock the useState hook in order to set initial conditions for what the state is for our test

2. App component: will get a secret word whenever the component mounts
   1. useEffect hook

## Testing Part 1A: Congrats Component (Testing Props and Rendering)

1. See the component and test file

2. They also have JSDoc in them

3. Child of App

4. Has access to `success`, a piece of state, passed down from App

### Test Plan

1. Will receive success state as prop

2. If succes state is true, then will render a congratulatory msg

3. If false we will simpl return null

### Test Setup

```js
// This function is how we set up our initial prop testing
const setup = (props = {}) => {
  // We pass the shallow component our props object
  return shallow(<Congrats {...props} />);
};

test("renders without error", () => {});

test("renders no text when `success` prop is false", () => {});

test("renders non-empty congrats msg when `success` prop is true", () => {});

test("", () => {});
```

### Final Tests

1. Component

   ```js
   function Congrats({ success }) {
     return (
       <div data-test="congrats-component">
         {success ? (
           <span data-test="congrats-msg">You Guessed It!!</span>
         ) : (
           <></>
         )}
       </div>
     );
   }
   ```

2. Tests

   ```js
   const setup = (props = {}) => {
     return shallow(<Congrats {...props} />);
   };

   test("renders without error", () => {
     const wrapper = setup();
     const component = findByTestAttr(wrapper, "congrats-component");
     expect(component.length).toBe(1);
   });

   test("renders no text when `success` prop is false", () => {
     const wrapper = setup({ success: false });
     const component = findByTestAttr(wrapper, "congrats-component");
     expect(component.text()).toBe(""); // React Fragment returned == Empty string
   });

   test("renders non-empty congrats msg when `success` prop is true", () => {
     const wrapper = setup({ success: true });
     const component = findByTestAttr(wrapper, "congrats-message");
     expect(component.text().length).not.toBe(0);
   });
   ```

## PropTypes Testing

1. Not required if we are using TS

2. If there are no proptypes, the proptypes test always passes

3. So always check with some bad props, to make sure it does fail

### Test

1. Test, before putting it in the `testUtils`

   ```js
   test("does not throw warning with expected props", () => {
     // No need to call setup() and create a shallowWrapper

     const expectedProps = { success: false };

     const propError = checkPropTypes(
       Congrats.PropTypes, // Actual Props
       expectedProps, // Expected Props (i.e some valid props)
       "prop", // we are testing props
       Congrats.name // Name of the component
     );
     // If Test Passes, no error msg so its undefined
     expect(propError).toBeUndefined();
   });
   ```

### Updated Congrats Component and Tests

1. Need to import and create proptypes for the component

2. The first test will also need to be updated by passing success prop now. Since it's required. Otherwise will get warning. But I setup default props to avoid it. See below for details

   ```js
   import PropTypes from "prop-types";

   // ... Component Code

   Congrats.propTypes = {
     success: PropTypes.bool.isRequired,
   };
   ```

3. Finally added a defaultProps object in the Test file. Can help with DRY. But also need to be careful and make sure I am not passing incorrect props by doing this.

## Testing Part 1B: GuessWords Component

1. We learn to test a list of items, coming in from an array in this case

2. We use `jest's describe() and beforeEach()` functions

### Props

| Props        | Data Type        | Description                                       | Initial Value |
| ------------ | ---------------- | ------------------------------------------------- | ------------- |
| guessedWords | Array of Objects | [{word: string, <br/>matchedLetterCount: number}] | []            |

Guessed Words

### PropType

```js
GuessedWords.propTypes = {
  guessedWords: PropTypes.arrayOf(
    PropTypes.shape({
      GuessedWord: PropTypes.string.isRequired,
      matchedLetterCount: PropTypes.number.isRequired,
    })
  ).isRequired,
};
```

### Plan

1. Check the wireframe to see what tests we need

2. Initially has some text, and than changes to show past guesses

3. This are sufficiently different contexts.

4. And we will be doing enough test within each context, that its good idea to separate the test context using `describe`

   ```js
   describe("if no words guessed", () => {});

   describe("if there are words guessed", () => {});
   ```

### Test Setup with describe and beforeEach

1. We will be using the same shallow wrapper in both tests for the first tesing context so, its good idea to `set it up from scratch` before each test

2. We want `wrapper` to be available in the entire scope

```js
describe("if no words guessed", () => {
  let wrapper;
  beforeEach(() => {
    // Overwriting Default Props as we need empty array
    wrapper = setup({ guessedWords: [] });
  });
  test("renders without error", () => {});
  test("renders instruction to guess a word error", () => {});
});

describe("if there are words guessed", () => {
  test("renders without error", () => {});
  test('renders "guessed words" section', () => {});
  test("displays correct number of guessed words");
});
```

### Final Tests

1. [Component](https://github.com/SSaquif/jotto/blob/master/src/GuessedWords.js)
1. [Component Tests](https://github.com/SSaquif/jotto/blob/master/src/GuessedWords.test.js)

## Testing Part 2: Input Component (Testing State)

1. We will test the `useState` Hook

2. Learn how to `Mock the useState hook`

### A word about Props and Global State

1. Will take a `secretWord` prop, to compare with the `input`

2. This will update `success` used in the `Congrats Component`

3. So `success` will likely be a global/lifted state

4. So for now we wont really do much with the 'secretWord' prop yet

### Part 1: The Easy Bit

1. Will test with furthur when we add Context/Redux

2. We will do the usual `component rendering` and `prop checking` tests

### Mock Function on Jests

1. It's a `fake function` that runs instead of a rreal function

2. Can run `alternate code` or just be `placeholder`

3. `Jest` replaces the real function with a mock

4. `Mocks` serves `3 purposes`

   1. Keeps real function from running

      1. This prevents side effects like network calls

   2. Spy on function to see when it's called

   3. Provide returns values

      1. Helps set up test condtions, we will see this with `useState() mocks`

### Method for Mocking Methods in Jest

1. Reset properties on React module to replace with mocks(details later)

2. This means: 'no destructuring on imports' in non-test code (see below)

   ```js
   // Can NOT do this anymore
   import { useState } from "react";
   const [state, setState] = useState();

   // Gotta do this instead
   const [state, setState] = React.useState();
   ```

3. So that really sucks, but there is a way around it apparently. (Explained later, see section Alternate Mocking)

### Part 2: State & State Changes in Our App

1. Create and Update `local state currentGuess` for our `wordInput` component, this is what we will test right now

2. In the future:
   1. Clear currentGuess on Submit
   2. Update guessedWords (shared global state, Redux/Context part)
   3. Check `currentGuess` against `secretWord`

### Test Setup

1. State updates om change

2. Clearing State-controlled field on submit

```js
describe("state controlled input field", () => {
  test("state ipdates with value of input box upon change", () => {});
});
```

### useState Mock & Mock Events

First here's the code for the test

1. We use `jest.fn()` to mock functions

2. We use Enzyme's ShallowWrappe's [simulate()](https://enzymejs.github.io/enzyme/docs/api/ShallowWrapper/simulate.html) method to simulate DOM events.

3. See comments for further details

4. We replace the useState and setCurrentGuess with our mocks

5. `Important`: I am not a fan of this test. I left a [Question](https://www.udemy.com/course/react-testing-with-jest-and-enzyme/learn/lecture/25645648#questions/15370428) in the video explaining why? It's video 58 in section 5.

```js
describe("state controlled input field", () => {
  test("state ipdates with value of input box upon change", () => {
    // Mocking setState and useState functions
    // the mock of setCurrentGuess will return nothing
    const mockSetCurrentGuess = jest.fn();
    React.useState = jest.fn(() => ["", mockSetCurrentGuess]);

    // Getting my input box in a Shallow wrapper
    const wrapper = setup();
    const inputBox = findByTestAttr(wrapper, "input-box");

    // Mocking a onChange event
    // event.target.value is being changed to train
    const mockEvent = { target: { value: "train" } };

    inputBox.simulate("change", mockEvent);

    // Finally we are saying
    // once the onChange is simulate as per above code
    // we expect the mockSetCurrentGuess to run
    // with 'train' as input
    expect(mockSetCurrentGuess).toHaveBeenCalledWith("train");
  });
});
```

### Alternate way of Mocking use state

This what to do if you want to import your hooks. Need to cahnge the following lines

```js
const mockSetCurrentGuess = jest.fn();
React.useState = jest.fn(() => ["", mockSetCurrentGuess]);
```

First we move `the mockSetCurrentGuess` to the global state

Then we replace the second line and alos move that to the global scope as follows

```js
const mockSetCurrentGuess = jest.fn();
// mock entire module to be able to destructure
// Takes module name, and code to return in it's place
jest.mock("react", () => {
  return {
    ...jest.requireActual("react"),
    useState: (initailState) => [initailState, mockSetCurrentGuess],
  };
});
```

We are mocking the entire module using `jest.mock`. We are first mocking the actual `react` module as it is via the `requireActual()` function and then overwriting the useState function of the module only.

This makes production code cleaner and test code maybe a bit more complicated

### Issue: Multiple Pieces of State Within Same Component

If I have multiple pieces of state within the same component, we can't write tests the way we have been.

Two solutions to this:

1. Option 1: Use `useReducer() instead`

   1. Best solution if we want unit tests for component

2. Option 2: Skip unit tests and go straight to functional tests

   1. IMO seems like best thing to do after, the issues i mentioned with the test in previous section

### Somee Additional Notes on Last Test

So I updated the last test to simply check if the value in the input field got updated as expected. Instead of mocking useState. So this worked as expected, but it only works when useState has not been mocked already. Which makes sense

But now the issue becomes what if I want both tests. I did find way around it but that does not let me use destrutured imports anymore.

I left a [follow up question regarding this](https://www.udemy.com/course/react-testing-with-jest-and-enzyme/learn/lecture/25645656#questions/15370428)

### Clearing Sate Controlled Field

```js
test("field i cleared aftr clicking submit", () => {
  const mockSetCurrentGuess = jest.fn();
  React.useState = jest.fn(() => ["", mockSetCurrentGuess]);

  const wrapper = setup();
  const submitButton = findByTestAttr(wrapper, "submit-button");

  const mockedEvent = { preventDefault: () => {} };
  submitButton.simulate("click", mockedEvent);
  expect(mockSetCurrentGuess).toHaveBeenCalledWith("");
});
```

### mockClear()

1. We we learn more about why it's necessary later

2. For now it doing it so are mock is not carrying results of the last test into the next one

## Things I am opinionated about

Why I think we should just do functional testing for react components

In videos 58, 59 we mock the `setState (setCurrentGuess) functions` to be just `jest.fn()`

But then test by simply checking if our mock is `called with the correct input`

ie when we update or clear the field

```js
// When we type train
expect(mockSetCurrentGuess).toHaveBeenCalledWith("train");
// When we clear
expect(mockSetCurrentGuess).toHaveBeenCalledWith("");
```

> Question: Why is "train" or "" the argument passed to the mock?

> Answer: Don't know yet. Need to under the `[tohavenCalled()`](https://jestjs.io/docs/expect#tohavebeencalled) family of functions better

This seems like poor tests, since we only check the input to the `useState()`. We are checking useState's implementation instead of app behaviour and I have pointed out in questions how this might breaking tests, ie causing false positive errors.

### Notes on Mocks

We ceasily mock and unmock Usestate for tests. See video 60, clearin state controlled field
