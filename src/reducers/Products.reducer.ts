
import { Product } from "../entity/Product";
import { ProductActionTypes } from "../entity/ProductActionsEntity";
import * as types from "../actions/Types";

const initialState: Product[] = []


export const productReducer = (state = initialState, action: ProductActionTypes): Product[] => {
  
  switch (action.type) {
    case types.RETRIEVE_PRODUCTS:
      return action.payload
     
    case types.ADD_PRODUCT:
      return [...state, action.payload];

    case types.UPDATE_PRODUCT:
      return state.map(product => {
        if (product.id === action.payload.id) {
            return {
                ...product,
                ...action.payload
            };
        } else {
            return product;
        }
    })
    
    case types.DELETE_PRODUCT:
      return state.filter(({ id }) => id !== action.payload)

      case types.SEARCH_PRODUCT:
      return action.payload
    default:
      return state;
  }
};

export const productDBReducer = (state = initialState, action: ProductActionTypes): Product[] => {
  
  switch (action.type) {
    case types.RETRIEVE_PRODUCTS_DB:
      return action.payload
    default:
      return state;
  }
};