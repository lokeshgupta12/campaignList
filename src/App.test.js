import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { getStore } from "./store";
import App from "./App";

const store = getStore();
test("should render app component", () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  expect(screen).toBeTruthy();
});
