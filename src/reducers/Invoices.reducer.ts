
import { Invoice } from "../entity/Invoice";
import { InvoiceActionTypes } from "../entity/InvoiceActionEntity";


const initialState: Invoice[] = []


const invoiceReducer = (state = initialState, action: InvoiceActionTypes): Invoice[] => {
  
  switch (action.type) {
    case "RETRIEVE_INVOICES":
      return action.payload
     
    case "ADD_INVOICE":
      return [...state, action.payload];

    case "UPDATE_INVOICE":
      return state.map(invoice => {
        if (invoice.invoiceId === action.payload.invoiceId) {
            return {
                ...invoice,
                ...action.payload
            };
        } else {
            return invoice;
        }
    })
    
    case "DELETE_INVOICE":
      return state.filter(({ invoiceId }) => invoiceId !== action.payload)

      case "SEARCH_INVOICE":
      return action.payload

    default:
      return state;
  }
};

export default invoiceReducer;