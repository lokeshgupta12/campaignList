import React, { useState } from "react";
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";
import "./styles.css";
import "react-datepicker/dist/react-datepicker.css";
import {
  PLACEHOLDER_TEXT,
  START_DATE_TEST_ID,
  END_DATE_TEST_ID,
} from "../../common/constant";

const SearchComponent = ({ onChange, dateChangeHandler }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  /**
   * Passing startDate, endDate and search name to the parent AppComponent
   * @param startDate, endDate, $event
   */
  const onChangeHandler = (event) => {
    const { value } = event?.target;
    onChange(startDate, endDate, value);
  };

  /**
   * Render Close Icon In DatePicker
   * @param OnClick
   */
  const CloseButton = ({ onClick }) => (
    <button
      type="button"
      className="close closeIcon"
      aria-label="Close"
      onClick={onClick}
    >
      <span aria-hidden="true">&times;</span>
    </button>
  );

  /**
   * Custom Input for DatePicker
   */
  const CustomInput = React.forwardRef(
    ({ value, onClick, handleReset, placeholderText, testId }, ref) => (
      <div className="react-datepicker__input-container">
        <input
          type="text"
          value={value}
          data-testid={testId}
          className="form-control date-picker react-datepicker-ignore-onclickoutside"
          onClick={onClick}
          ref={ref}
          readOnly
          placeholder={placeholderText}
        />
        {value && <CloseButton onClick={handleReset} />}
      </div>
    )
  );
  return (
    <div className="form-inline search-header">
      <div className="row">
        <div className="col-xs-8">
          <div className="row">
            <div className="col-xs-4">
              <DatePicker
                className="form-control"
                selected={startDate}
                onSelect={(startDate) => {
                  setStartDate(startDate);
                  dateChangeHandler(startDate, endDate);
                }}
                customInput={
                  <CustomInput
                    handleReset={() => {
                      setStartDate("");
                      dateChangeHandler("", endDate);
                    }}
                    placeholderText={PLACEHOLDER_TEXT.START_DATE}
                    testId={START_DATE_TEST_ID}
                  />
                }
              />
            </div>
            <div className="col-xs-4">
              <DatePicker
                className="form-control date-picker"
                selected={endDate}
                onSelect={(endDate) => {
                  setEndDate(endDate);
                  dateChangeHandler(startDate, endDate);
                }}
                customInput={
                  <CustomInput
                    handleReset={() => {
                      setEndDate("");
                      dateChangeHandler(startDate, "");
                    }}
                    placeholderText={PLACEHOLDER_TEXT.END_DATE}
                    testId={END_DATE_TEST_ID}
                  />
                }
                minDate={new Date(startDate)}
              />
            </div>
            <div className="col-xs-4">&nbsp;</div>
          </div>
        </div>
        <div className="col-xs-4 margin-bottom">
          <div className="input-group pull-right">
            <input
              type="text"
              className="form-control"
              id="name"
              onChange={($event) => onChangeHandler($event)}
              placeholder={PLACEHOLDER_TEXT.SEARCH_INPUT}
            />
            <div className="input-group-btn">
              <button className="btn btn-primary" type="submit" disabled>
                <i className="glyphicon glyphicon-search"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

SearchComponent.propTypes = {
  onChange: PropTypes.func.isRequired,
  dateChangeHandler: PropTypes.func.isRequired,
};
export default SearchComponent;
