
import * as types from "../actions/Types";
import { ProductInvoice } from "../entity/ProductInvoice";
import { ProductInvoiceActionTypes } from "../entity/ProductInvoiceActionEntity";

const initialState: ProductInvoice[] = []


export const importProductReducer = (state = initialState, action: ProductInvoiceActionTypes): ProductInvoice[] => {
  
  switch (action.type) {
    case types.GET_LIST_IMPORT_PRODUCT:
      return action.payload
    
    default:
      return state;
  }
};

export const exportProductReducer = (state = initialState, action: ProductInvoiceActionTypes): ProductInvoice[] => {
  
  switch (action.type) {
    case types.GET_LIST_EXPORT_PRODUCT:
      return action.payload
    default:
      return state;
  }
};