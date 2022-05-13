import moment from "moment";
import { UNKOWN_USER, BUDGET_SYMBOL, INVALID_DATA } from "../common/constant";

// Whenever anything changes in startDate, EndDate this function call and set Campaign Data accordingly
const filterRecordsByDate = (startDate, endDate, campList) => {
  let filteredData = [];
  if (!startDate && !endDate) {
    filteredData = campList;
  } else if (startDate && !endDate) {
    filteredData = campList.filter((rowData) =>
      moment(rowData.startDate).isSameOrAfter(startDate)
    );
  } else if (!startDate && endDate) {
    filteredData = campList.filter((rowData) =>
      moment(rowData.endDate).isSameOrBefore(endDate)
    );
  } else if (startDate && endDate) {
    filteredData = campList.filter(
      (rowData) =>
        moment(rowData.startDate).isSameOrAfter(startDate) &&
        moment(rowData.endDate).isSameOrBefore(endDate)
    );
  }
  return filteredData;
};

// Filter Records
const filterRecords = (startDate, endDate, campaignList, name) => {
  const filteredRecord = filterRecordsByDate(startDate, endDate, campaignList);
  let filteredData = [];
  if (!!name) {
    filteredData = filteredRecord.filter((rowData) => {
      const nameLowecase = rowData?.username?.toLowerCase();
      return nameLowecase.indexOf(name.toLowerCase()) !== -1;
    });
  } else {
    filteredData = filteredRecord;
  }
  return filteredData;
};

const convertToCurrencySystem = (labelValue) =>
  Math.abs(Number(labelValue)) >= 1.0e9
    ? (Math.abs(Number(labelValue)) / 1.0e9).toFixed(2) +
      BUDGET_SYMBOL.B +
      BUDGET_SYMBOL.USD
    : // Six Zeroes for Millions
    Math.abs(Number(labelValue)) >= 1.0e6
    ? (Math.abs(Number(labelValue)) / 1.0e6).toFixed(2) +
      BUDGET_SYMBOL.M +
      BUDGET_SYMBOL.USD
    : // Three Zeroes for Thousands
    Math.abs(Number(labelValue)) >= 1.0e3
    ? (Math.abs(Number(labelValue)) / 1.0e3).toFixed(2) +
      BUDGET_SYMBOL.K +
      BUDGET_SYMBOL.USD
    : Math.abs(Number(labelValue));

// check dates, is Valid Or Not
const checkJsonData = (arr) => {
  let validData = [];
  let invalidData = [];
  arr.forEach((element) => {
    const { startDate, endDate } = element;
    if (
      moment(startDate, "MM/DD/YYYY").isValid() &&
      moment(endDate, "MM/DD/YYYY").isValid() &&
      moment(startDate).isSameOrBefore(endDate)
    ) {
      validData.push(element);
    } else {
      invalidData.push(element);
    }
  });
  if (invalidData.length > 0) {
    console.log(INVALID_DATA, invalidData);
  }
  return validData;
};

// common method for mapping userData and CampListData
const mapCampListData = (userData, campData) =>
  campData.map((rowdata) => {
    const index = userData.findIndex(
      (resData) => resData.id === rowdata.userId
    );
    return {
      id: rowdata.id,
      userid: rowdata.userId,
      startDate: rowdata.startDate,
      endDate: rowdata.endDate,
      budget: rowdata.Budget,
      name: rowdata.name,
      username: index >= 0 ? userData[index].username : UNKOWN_USER,
    };
  });

export {
  filterRecordsByDate,
  filterRecords,
  convertToCurrencySystem,
  checkJsonData,
  mapCampListData,
};
