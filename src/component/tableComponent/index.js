import React from "react";
import PropTypes from "prop-types";
import "./styles.css";
import { convertToCurrencySystem } from "../../utils/helper";
import { INACTIVE, ACTIVE, NO_RECORDS } from "../../common/constant";
const ReportPage = ({ list }) => {
  /**
   * Get current date
   * @returns {string}
   */
  const getCurrentDate = () => {
    const date = new Date();
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  };
  /**
   * active in-active label showing logic
   * @param startDate
   * @param endDate
   * @returns {boolean}
   */
  const checkActiveness = (startDate, endDate) =>
    Date.parse(startDate) <= Date.parse(getCurrentDate()) &&
    Date.parse(getCurrentDate()) <= Date.parse(endDate);

  /**
   * Budget value processing
   * @param budget
   * @returns {string}
   */
  const processBudgetInUSD = (budget) =>
    budget ? convertToCurrencySystem(budget) : "";
  /**
   * Render table data
   * @param list
   * @returns {*}
   */
  const processTableData = (list) =>
    list.map((rowData) => {
      const { startDate, endDate, id, name, username, budget } = rowData;
      const activeStatus = checkActiveness(startDate, endDate);
      return (
        <tr key={id}>
          <td>{name}</td>
          <td>{username}</td>
          <td>{startDate}</td>
          <td>{endDate}</td>
          <td>
            <span className={activeStatus ? "active" : "inActive"}></span>
            <span>{activeStatus ? ACTIVE : INACTIVE}</span>
          </td>
          <td>{processBudgetInUSD(budget)}</td>
        </tr>
      );
    });
  /**
   * Render table structure
   * @returns {*}
   */
  const renderTable = () => (
    <div className="table-container">
      <table className="table table-striped">
        <thead className="table-header">
          <tr>
            <th>Name</th>
            <th>User Name</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Active</th>
            <th>Budget (USD)</th>
          </tr>
        </thead>
        <tbody>{processTableData(list)}</tbody>
      </table>
    </div>
  );

  const renderBlankRecord = () => <div className="noRecords">{NO_RECORDS}</div>;
  return <div>{list?.length > 0 ? renderTable() : renderBlankRecord()}</div>;
};

ReportPage.propTypes = {
  list: PropTypes.array.isRequired,
};
export default ReportPage;
