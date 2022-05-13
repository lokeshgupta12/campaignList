import { createSlice } from "@reduxjs/toolkit";
import { filterRecordsByDate, filterRecords } from "../../utils/helper";

export const FetchEnumStatus = {
  FETCHING: "FETCHING",
  FAILED: "FAILED",
  SUCCESS: "SUCCESS",
};

const initialState = {
  campaignList: [],
  cloneFilterList: [],
  userData: [],
  apiStatus: null,
};

export const fetchStatusSlice = createSlice({
  name: "campaign",
  initialState,
  reducers: {
    /**
     *
     *  a property name gonna be the name of action
     *  its value is the reduce
     *
     *  If you need to define the param of the action, use PayloadAction<X> to define its type.
     *  In this use case, I need to an string param, so I define 'payloadAction<string' like below
     *
     **/
    update: (state, action) => {
      return {
        ...state,
        apiStatus: action.payload,
      };
    },
    setCampaignList: (state, action) => {
      return { ...state, ...action.payload };
    },
    addCampaignList: (state, action) => {
      const campList = [...state.campaignList, ...action.payload];
      const cloneList = [...state.cloneFilterList, ...action.payload];
      return { ...state, campaignList: campList, cloneFilterList: cloneList };
    },
    filterRecordByDate: (state, action) => {
      const { startDate, endDate } = action.payload;
      const { campaignList } = state;
      const filteredRecord = filterRecordsByDate(
        startDate,
        endDate,
        campaignList
      );
      return { ...state, cloneFilterList: filteredRecord };
    },
    filterRecordsData: (state, action) => {
      const { startDate, endDate, name } = action.payload;
      const { campaignList } = state;
      const filterRecordData = filterRecords(
        startDate,
        endDate,
        campaignList,
        name
      );
      return { ...state, cloneFilterList: filterRecordData };
    },
  },
});

export const fetchStatusSliceReducer = fetchStatusSlice.reducer;
export const fetchStatusSliceActions = fetchStatusSlice.actions;
