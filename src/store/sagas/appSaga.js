import { takeEvery, call, put } from "redux-saga/effects";
import { fetchStatusSliceActions, FetchEnumStatus } from "../reducers";
import { fetchUserCampaignTypeName } from "../actions";
import data from "./mockList";
import { mapCampListData } from "../../utils/helper";
import { USER_API_URL } from "../../common/constant";
/**
 * saga watcher to fetch the Camp List
 */
export function* fetchUserCampaignListWatcher() {
  yield takeEvery(fetchUserCampaignTypeName, fetchCampaignListWorker);
}
/**
 * worker function to send the api call to get all Campaign LIst
 */
export function* fetchCampaignListWorker() {
  yield put(fetchStatusSliceActions.update(FetchEnumStatus.FETCHING));
  try {
    const apiUrl = USER_API_URL;
    const response = yield call(fetch, apiUrl);

    const responseData = yield response.json();
    const campList = mapCampListData(responseData, data.data);
    yield put(
      fetchStatusSliceActions.setCampaignList({
        campaignList: campList,
        cloneFilterList: campList,
        userData: responseData,
      })
    );
    yield put(fetchStatusSliceActions.update(FetchEnumStatus.SUCCESS));
  } catch (error) {
    yield put(fetchStatusSliceActions.update(FetchEnumStatus.FAILED));
  }
}
