import * as types from '../actions/Types';
import { ProductInvoice } from './ProductInvoice';

export interface getListImportProductAction {
    type: typeof types.GET_LIST_IMPORT_PRODUCT;
    payload: ProductInvoice[];
}

export interface getListExportProductAction {
    type: typeof types.GET_LIST_EXPORT_PRODUCT;
    payload: ProductInvoice[];
}


export type ProductInvoiceActionTypes =
    | getListImportProductAction
    | getListExportProductAction;

export type ProductInvoiceActionsEntity = ProductInvoiceActionTypes;