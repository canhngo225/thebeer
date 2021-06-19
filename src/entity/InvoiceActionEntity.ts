import internal from 'stream';
import * as types from '../actions/Types';
import { Invoice } from './Invoice';

export interface getInvoicesAction {
    type: typeof types.RETRIEVE_INVOICES;
    payload: Invoice[];
}

export interface getInvoiceAction {
    type: typeof types.GET_INVOICE;
    payload: Invoice;
}

export interface addInvoiceAction {
    type: typeof types.ADD_INVOICE;
    payload: Invoice;
}

export interface updateInvoiceAction {
    type: typeof types.UPDATE_INVOICE;
    payload: Invoice;
}

export interface deleteInvoiceAction {
    type: typeof types.DELETE_INVOICE;
    payload: string;
}

export interface searchInvoiceAction {
    type: typeof types.SEARCH_INVOICE;
    payload: Invoice[];
}

export interface getRevenueAction {
    type: typeof types.GET_REVENUE;
    payload: number;
}

export interface getExpenditureAction {
    type: typeof types.GET_EXPENDITURE;
    payload: number;
}


export type InvoiceActionTypes =
    | getInvoicesAction
    | getInvoiceAction
    | addInvoiceAction
    | updateInvoiceAction
    | deleteInvoiceAction
    |searchInvoiceAction
    | getExpenditureAction
    | getRevenueAction;

export type InvoiceActionsEntity = InvoiceActionTypes;