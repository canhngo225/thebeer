import { combineReducers } from "redux";
import {productReducer, productDBReducer} from "./Products.reducer";
import invoiceReducer from "./Invoices.reducer";
import historyProductReducer from "./Historyproducts.reducer";
import {revenueReducer, expenditureReducer} from "./Statistic.reducer";
import { exportProductReducer, importProductReducer } from "./ProductInvoice.reducer";
export default combineReducers({
    productReducer,
    productDBReducer,
    invoiceReducer,
    historyProductReducer,
    revenueReducer,
    expenditureReducer,
    exportProductReducer,
    importProductReducer
  });