import { message } from "antd";
import { Dispatch } from "react";
import { StatisticActionsEntity } from "../entity/StatisticActionEntity";
import statisticDataService from "../services/Statistic.service";
import * as types from "./Types";
export const getAllExpenditures = (
) => async (dispatch: Dispatch<StatisticActionsEntity>) => {
  try {
    const res = await statisticDataService.getAllExpenditure();
    dispatch({
      type: types.GET_LIST_EXPENDITURE,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const getAllRevenues = (
) => async (dispatch: Dispatch<StatisticActionsEntity>) => {
  try {
    const res = await statisticDataService.getAllRevenue();
    dispatch({
      type: types.GET_LIST_REVENUE,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};



