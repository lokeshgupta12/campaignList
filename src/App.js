import React, { useEffect } from "react";
import TableComponent from "./component/tableComponent";
import SearchComponent from "./component/searchComponent";
import { useDispatch, useSelector } from "react-redux";
import { fetchStatusSliceActions } from "./store/reducers/appSlice";
import { fetchUserCampaignListCreator } from "./store/actions";
import { getCampaignList, getUserList } from "./store/selectors";
import "./App.css";
import LoadingHoc from "./component/HOC/LoadingHoc";
import { checkJsonData, mapCampListData } from "./utils/helper";

function App() {
  const dispatch = useDispatch();
  const getCampaignsList = useSelector(getCampaignList());
  const getuserList = useSelector(getUserList());

  // useEffect for dispatch a action to get List of Users from API
  useEffect(() => {
    dispatch(fetchUserCampaignListCreator());
  }, [dispatch]);

  /**
   * AddCampaigns method to add campaign from global through browser console
   * @param array compaing data
   * @returns dispatch a action that add compaign in store
   */
  window.AddCampaigns = (arr) => {
    const validData = checkJsonData(arr);
    if (validData?.length > 0) {
      const campListData = mapCampListData(getuserList, validData);
      dispatch(fetchStatusSliceActions.addCampaignList(campListData));
    }
  };

  /**
   * onChange method filter data on behalf of character that we enter in search box
   * @param startDate, endDate, name
   * @returns set CampList
   */

  const onChange = (startDate, endDate, name) => {
    dispatch(
      fetchStatusSliceActions.filterRecordsData({ startDate, endDate, name })
    );
  };

  /**
   * dateChangeHandler when we select start date in calendar
   * @param startDate, endDate
   * @returns setStartDate
   */
  const dateChangeHandler = (startDate, endDate) => {
    dispatch(
      fetchStatusSliceActions.filterRecordByDate({ startDate, endDate })
    );
  };

  return (
    <div className="App">
      <LoadingHoc>
        <SearchComponent
          onChange={(startDate, endDate, name) =>
            onChange(startDate, endDate, name)
          }
          dateChangeHandler={dateChangeHandler}
        />
        <TableComponent list={getCampaignsList} />
      </LoadingHoc>
    </div>
  );
}

export default App;
