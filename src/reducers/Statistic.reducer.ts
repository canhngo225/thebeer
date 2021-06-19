
import { Statistic } from "../entity/Statistic";
import { StatisticActionsEntity } from "../entity/StatisticActionEntity";
import * as types from "../actions/Types";

const initialState: Statistic[] = []


export const revenueReducer = (state = initialState, action: StatisticActionsEntity): Statistic[] => {
  
  switch (action.type) {
    case types.GET_LIST_REVENUE:
      return action.payload;
     
    default:
      return state;
  }
};

export const expenditureReducer = (state = initialState, action: StatisticActionsEntity): Statistic[] => {
  
  switch (action.type) {
     
    case types.GET_LIST_EXPENDITURE:
      return action.payload;

    default:
      return state;
  }
};