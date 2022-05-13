import { createSelector } from "@reduxjs/toolkit";

const getAppData = ({ appState }) => appState;
export const getCampaignList = () =>
  createSelector([getAppData], (data) => data?.cloneFilterList);

export const getAPIStatus = () =>
  createSelector([getAppData], ({ apiStatus }) => apiStatus);

export const getUserList = () =>
  createSelector([getAppData], ({ userData }) => userData);
