import * as types from '../actions/Types';
import { Product } from './Product';

export interface getProductsAction {
    type: typeof types.RETRIEVE_PRODUCTS;
    payload: Product[];
}

export interface getProductAction {
    type: typeof types.GET_PRODUCT;
    payload: Product;
}

export interface addProductAction {
    type: typeof types.ADD_PRODUCT;
    payload: Product;
}

export interface updateProductAction {
    type: typeof types.UPDATE_PRODUCT;
    payload: Product;
}

export interface deleteProductAction {
    type: typeof types.DELETE_PRODUCT;
    payload: string;
}

export interface searchProductAction {
    type: typeof types.SEARCH_PRODUCT;
    payload: Product[];
}

export interface getProductsDBAction {
    type: typeof types.RETRIEVE_PRODUCTS_DB;
    payload: Product[];
}


export type ProductActionTypes =
    | getProductsAction
    | getProductAction
    | addProductAction
    | updateProductAction
    | deleteProductAction
    | searchProductAction
    | getProductsDBAction;

export type ProductActionsEntity = ProductActionTypes;