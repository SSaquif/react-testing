import Enzyme, { shallow } from "enzyme";
import EnzymeAdapter from "@wojtekmaj/enzyme-adapter-react-17";
import App from "./App";

Enzyme.configure({ adapter: new EnzymeAdapter() });

test("renders without err", () => {
  // create shallow wrapper for APP
  const wrapper = shallow(<App />);
  // find elements with the sepecified attribute
  const appComponent = wrapper.find("[data-test='component-app']");
  // find returns all elements that match
  //we should have exactly one match
  expect(appComponent.length).toBe(1);
});

test("renders increment button", () => {});

test("renders counter display", () => {});

test("counter display starts at 0", () => {});

// Here we will test that it increments the counter display, ie: test behaviour/functionality
// And NOT test the state, ie that it increments counter state that is NOT test implementation
test("clicking button increments counter display", () => {});
