import Enzyme, { shallow, ShallowWrapper } from "enzyme";
import EnzymeAdapter from "@wojtekmaj/enzyme-adapter-react-17";
import App from "./App";

Enzyme.configure({ adapter: new EnzymeAdapter() });

/**
 * Factory function to create a ShallowWrapper for a component
 * @param {*} component
 * @returns {ShallowWrapper}
 */
const setup = (component) => shallow(component);

const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-test='${val}']`);
};

test("renders without err", () => {
  // create shallow wrapper for APP
  const wrapper = setup(<App />);
  // find elements with the sepecified attribute
  const appComponent = findByTestAttr(wrapper, "app-component");
  // find returns all elements that match
  //we should have exactly one match
  expect(appComponent.length).toBe(1);
});

test("renders increment button", () => {
  const wrapper = setup(<App />);
  const incrBtn = findByTestAttr(wrapper, "increment-button");
  expect(incrBtn.length).toBe(1);
});

test("renders counter display", () => {
  const wrapper = setup(<App />);
  const cntDisplay = findByTestAttr(wrapper, "counter-display");
  expect(cntDisplay.length).toBe(1);
});

test("counter display starts at 0", () => {
  const wrapper = setup(<App />);
  const count = findByTestAttr(wrapper, "count").text(); //returns string
  expect(count).toBe("0");
});

// Here we will test that it increments the counter display,
// ie: test behaviour/functionality
// And NOT test the state,
//ie that it increments counter state (NOT test implementation)
test("clicking button increments counter display", () => {
  const wrapper = setup(<App />);
  const incrBtn = findByTestAttr(wrapper, "increment-button");
  incrBtn.simulate("click");
  const count = findByTestAttr(wrapper, "count").text();
  expect(count).toBe("1");
});
