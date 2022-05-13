import React from "react";
import { useSelector } from "react-redux";
import { getAPIStatus } from "../../../store/selectors";
import { FetchEnumStatus } from "../../../store/reducers";
import "./styles.css";

const LoadingHoc = ({ children }) => {
  const fetchAPIStatus = useSelector(getAPIStatus());
  return (
    <>
      {fetchAPIStatus === FetchEnumStatus?.FETCHING && (
        <div className="coverSpin"></div>
      )}
      {children}
    </>
  );
};

export default LoadingHoc;
