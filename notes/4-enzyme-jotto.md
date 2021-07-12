# Jotto App Testsing

1. Will have a BE to send the words

2. So we can test receiving data from server

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

## Plan

Order of testing

1. `Congrats` and `GuessedWords` components
2. `Input` and `App` components
3. After finishing the above 4 components
4. We can either use Context or Redux for global state
5. I will do both

## Tetsing Part 1: `Congrats` and `GuessedWords`

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
