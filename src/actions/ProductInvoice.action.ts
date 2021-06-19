
import { Dispatch } from "react";
import { ProductInvoiceActionsEntity } from "../entity/ProductInvoiceActionEntity";
import statisticDataService from "../services/Statistic.service";
import * as types from "./Types";
export const getExportProduct = (id: number
) => async (dispatch: Dispatch<ProductInvoiceActionsEntity>) => {
    try {
        const res = await statisticDataService.getExportProduct(id);
        dispatch({
            type: types.GET_LIST_EXPORT_PRODUCT,
            payload: res.data,
        });
        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};

export const getImportProduct = (id: number
) => async (dispatch: Dispatch<ProductInvoiceActionsEntity>) => {
    try {
        const res = await statisticDataService.getImportProduct(id);
        dispatch({
            type: types.GET_LIST_IMPORT_PRODUCT,
            payload: res.data,
        });
        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};