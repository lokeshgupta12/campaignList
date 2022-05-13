import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchComponent from "../index";
const renderComponent = (props) => render(<SearchComponent {...props} />);
const searchProps = {
  onChange: jest.fn(),
  onStartDateChange: jest.fn(),
  onEndDateChange: jest.fn(),
};

test("Should render component ", () => {
  renderComponent(searchProps);
  expect(screen).toBeTruthy();
});

test("When Enter Test value In search box", () => {
  renderComponent(searchProps);

  const searchInput = screen.queryByPlaceholderText("Search By Name");
  userEvent.type(searchInput, "test");

  expect(searchInput.value).toBe("test");
});

test("Check Start Date present in Document", () => {
  renderComponent(searchProps);

  const startDateNode = screen.getByTestId("start-date-test-id");
  expect(startDateNode).toBeInTheDocument();
});

test("Check End Date present in Document", () => {
  renderComponent(searchProps);

  const endDateNode = screen.getByTestId("end-date-test-id");
  expect(endDateNode).toBeInTheDocument();
});
