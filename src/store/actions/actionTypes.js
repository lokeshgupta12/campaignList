import { createAction } from "@reduxjs/toolkit";
import { FETCH_CAMPAIGN_LIST } from "./constant";
/**
 *  Action creator and type to fetch Campaign list
 */
export const fetchUserCampaignListCreator = createAction(FETCH_CAMPAIGN_LIST);
export const fetchUserCampaignTypeName = fetchUserCampaignListCreator().type;
