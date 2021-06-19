import * as types from "../actions/Types"
import { HistoryProduct } from "../entity/HistoryProduct";
import { HistoryProductActionTypes } from "../entity/HisProductActionsEntity";

const initialState: HistoryProduct[] = [];


const historyProductReducer = (state = initialState, action: HistoryProductActionTypes): HistoryProduct[] => {
  
  switch (action.type) {
    case types.RETRIEVE_HISTORY_PRODUCT:
      return action.payload

    default:
      return state;
  }
};

export default historyProductReducer;