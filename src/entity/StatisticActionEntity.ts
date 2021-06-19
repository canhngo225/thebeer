import * as types from '../actions/Types';
import { Statistic } from './Statistic';

export interface getListExpenditureAction {
    type: typeof types.GET_LIST_EXPENDITURE;
    payload: Statistic[];
}

export interface getListRevenueAction {
    type: typeof types.GET_LIST_REVENUE;
    payload: Statistic[];
}


export type StatisticActionTypes =
    | getListExpenditureAction
    | getListRevenueAction;

export type StatisticActionsEntity = StatisticActionTypes;