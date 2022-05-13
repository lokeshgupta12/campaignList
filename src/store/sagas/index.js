import { all, call, spawn } from "redux-saga/effects";

import { fetchUserCampaignListWatcher } from "./appSaga";
export function* rootSaga() {
  /**
   *
   *  Register watchers
   *
   */
  const sagas = [fetchUserCampaignListWatcher];

  /**
   * keep everything (e.g., child tasks) alive
   *
   **/
  yield all(
    sagas.map((saga) =>
      spawn(function* () {
        while (true) {
          try {
            yield call(saga);
            break;
          } catch (e) {
            console.log("Error ", e);
          }
        }
      })
    )
  );
}
