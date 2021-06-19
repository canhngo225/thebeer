import { message} from "antd";
import { Dispatch } from "react";
import { ProductActionsEntity } from "../entity/ProductActionsEntity";
import productDataService from "../services/Product.service";
import * as types from "./Types";
export const getAllProducts = (
) => async (dispatch: Dispatch<ProductActionsEntity>) => {
  try {
    const res = await productDataService.getAllProducts();
    dispatch({
      type: types.RETRIEVE_PRODUCTS,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    message.error(err);
    return Promise.reject(err);
  }
};

export const getAllProductsDB = (
  ) => async (dispatch: Dispatch<ProductActionsEntity>) => {
    try {
      const res = await productDataService.getAllProductsInDB();
      dispatch({
        type: types.RETRIEVE_PRODUCTS_DB,
        payload: res.data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      message.error(err);
      return Promise.reject(err);
    }
  };

export const getProduct = (id: number
) => async () => {
  try {
    await productDataService.getProduct(id);
    return Promise.resolve("success");
  } catch (err) {
    return Promise.reject(err.response.data.message);
  }
};

export const getProductDB = (id: number
  ) => async () => {
    try {
      await productDataService.getProductInDB(id);
      return Promise.resolve("success");
    } catch (err) {
      return Promise.reject(err.response.data.message);
    }
  };

export const addProduct = (dataProduct: {
  productName: string,
  buyPrice: number,
  sellPrice: number,
  factoryAddress: string
  unit: String
}) => async (dispatch: Dispatch<ProductActionsEntity>) => {
  try {
    const res = await productDataService.createProduct(dataProduct);

    dispatch({
      type: types.ADD_PRODUCT,
      payload: res.data,
    });
    message.success("Product is created successfully!");
    return Promise.resolve(res.data);
  } catch (err) {
    message.error(err.response.data.message);
    return Promise.reject(err);
  }
};

export const updateProduct = (id: String, dataProduct: {
  productName: string,
  buyPrice: number,
  sellPrice: number,
  factoryAddress: string
  unit: String
}) => async (dispatch: Dispatch<ProductActionsEntity>) => {
  try {
    const res = await productDataService.updateProduct(Number(id), dataProduct);

    dispatch({
      type: types.UPDATE_PRODUCT,
      payload: res.data,
    });
    message.success(res.data);
    return Promise.resolve(res.data);
  } catch (err) {
    message.error(err.response.data.message);
    return Promise.reject(err);
  }
};

export const deleteProduct = (id: number
) => async (dispatch: Dispatch<ProductActionsEntity>) => {
  try {
    const res = await productDataService.removeProduct(id);

    dispatch({
      type: types.DELETE_PRODUCT,
      payload: res.data,
    });
    message.success(res.data);
    return Promise.resolve(res.data);
  } catch (err) {
    message.error(err.response.data.message);
    return Promise.reject(err);
  }
};

export const searchProduct = (name: String
) => async (dispatch: Dispatch<ProductActionsEntity>) => {
  try {
    const res = await productDataService.searchProduct(name.toUpperCase());

    dispatch({
      type: types.SEARCH_PRODUCT,
      payload: res.data,
    });
    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};