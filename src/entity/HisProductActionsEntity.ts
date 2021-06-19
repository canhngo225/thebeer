import * as types from '../actions/Types';
import { HistoryProduct } from './HistoryProduct';

export interface getHistoryProductAction {
    type: typeof types.RETRIEVE_HISTORY_PRODUCT;
    payload: HistoryProduct[];
}




export type HistoryProductActionTypes = |getHistoryProductAction;

export type HistoryProductActionsEntity = HistoryProductActionTypes;