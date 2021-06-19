import { message } from "antd";
import { Dispatch } from "react";
import { HistoryProductActionsEntity } from "../entity/HisProductActionsEntity";
import HistoryProductService from "../services/HistoryProduct.service";
import * as types from "../actions/Types"
export const getHistoryProductById = (id: number
    ) => async (dispatch: Dispatch<HistoryProductActionsEntity>) => {
      try {
        dispatch({
          type: types.RETRIEVE_HISTORY_PRODUCT,
          payload: [],
        });
        const res = await HistoryProductService.getHistoryProductById(id);
        dispatch({
            type: types.RETRIEVE_HISTORY_PRODUCT,
            payload: res.data,
          });
        return Promise.resolve("success");
      } catch (err) {
        message.info(err.response.data);
        return Promise.reject(err.response.data);
      }
    };