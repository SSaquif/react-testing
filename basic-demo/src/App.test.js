import App from "./App";
import Enzyme, { shallow } from "enzyme";
import EnzymeAdapter from "@wojtekmaj/enzyme-adapter-react-17";

Enzyme.configure({ adapter: new EnzymeAdapter() });

// test() is provided by Jest
test("renders without crashing", () => {
  const wrapper = shallow(<App />);
  // returns the html in our wrapper (App node)
  console.log(wrapper.debug());
  // Asserstions like expect are part of Jest
  // expect();
});

test("renders non-emty component without crashing", () => {
  const wrapper = shallow(<App />);
  // Asserstions like expect are part of Jest
  // The expect checks if any nodes exist in our shallow wrapper
  // If no nodes exist the wrapper is empty
  // Confusion: When I removed everything in App. It still passed test
  // Read up on the exists function a bit more in enzyme docs
  expect(wrapper.exists()).toBe(true);
});
