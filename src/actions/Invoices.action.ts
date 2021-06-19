import { message } from "antd";
import { Dispatch } from "react";
import { InvoiceActionsEntity } from "../entity/InvoiceActionEntity";
import invoiceDataService from "../services/Invoice.service";
import * as types from "./Types";
export const getAllInvoices = (
) => async (dispatch: Dispatch<InvoiceActionsEntity>) => {
  try {
    const res = await invoiceDataService.getAllInvoices();
    dispatch({
      type: types.RETRIEVE_INVOICES,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    message.error(err);
    return Promise.reject(err);
  }
};

export const addInvoice = (dataInvoice: {
  invoiceType: string,
  invoiceDate: string,
  productsTotal: number,
  moneyTotal: number,
  productInvoices: any[],
  isDeleted: number
}) => async (dispatch: Dispatch<InvoiceActionsEntity>) => {
  try {
    const res = await invoiceDataService.createInvoice(dataInvoice);
    dispatch({
      type: types.ADD_INVOICE,
      payload: res.data
    })
    message.success("Add invoice successfully!");
    return Promise.resolve(res.data);
  } catch (err) {
    message.error(err.response.data.message);
    return Promise.reject(err);
  };
}

export const getInvoice = (id: number
  ) => async (dispatch: Dispatch<InvoiceActionsEntity>) => {
    try {
      const res = await invoiceDataService.getInvoice(id);
      return Promise.resolve("success");
    } catch (err) {
      return Promise.reject(err.response.data.message);
    }
  };
  
  export const updateInvoice = (id: String, dataProduct: {
    invoiceType: string,
  invoiceDate: string,
  productsTotal: number,
  moneyTotal: number,
  productInvoices: any[],
  isDeleted: number
  }) => async (dispatch: Dispatch<InvoiceActionsEntity>) => {
    try {
      const res = await invoiceDataService.updateInvoice(Number(id), dataProduct);
  
      dispatch({
        type: types.UPDATE_INVOICE,
        payload: res.data,
      });
      message.success(res.data);
      return Promise.resolve(res.data);
    } catch (err) {
      message.error(err.response.data.message);
      return Promise.reject(err);
    }
  };

  export const deleteInvoice = (id: number
    ) => async (dispatch: Dispatch<InvoiceActionsEntity>) => {
      try {
        const res = await invoiceDataService.removeInvoice(id);
    
        dispatch({
          type: types.DELETE_INVOICE,
          payload: res.data,
        });
        message.success(res.data);
        return Promise.resolve(res.data);
      } catch (err) {
        message.error(err.response.data.message);
        return Promise.reject(err);
      }
    };

  export const getRevenue = () => async(dispatch: Dispatch<InvoiceActionsEntity>) => {
    try {
      const res = await invoiceDataService.getRevenue();
      return Promise.resolve(res.data);
    }
    catch(err){
      return Promise.reject(err);
    }
  }

  export const getExpenditure = () => async(dispatch: Dispatch<InvoiceActionsEntity>) => {
    try {
      const res = await invoiceDataService.getExpenditure();
      return Promise.resolve(res.data);
    }
    catch(err){
      return Promise.reject(err);
    }
  }