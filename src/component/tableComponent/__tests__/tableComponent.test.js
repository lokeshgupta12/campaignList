import React from "react";
import { render, screen } from "@testing-library/react";
import ReportPage from "../index";
import data from "../../../store/sagas/mockList";
const renderComponent = (props) => render(<ReportPage {...props} />);

const tableProps = {
  list: data.data,
};

test("Should render table in document", () => {
  renderComponent(tableProps);
  const table = screen.getByRole(/table/i);
  expect(table).toBeInTheDocument();
});

test("Render blank Records when List is empty", () => {
  renderComponent({ list: [] });
  const noRecords = screen.getByText(/No Records/i);
  expect(noRecords).toBeInTheDocument();
});
