import http from "../utils/Common";

const getAllInvoices = () => {
    return http.get("/invoices");
  };
  
  const getInvoice = (id: number) => {
    return http.get('/invoices/'+id);
  };
  
  const createInvoice = (data: object) => {
    return http.post("/invoices", data);
  };
  
  const updateInvoice = (id: number, data: object) => {
    return http.put('/invoices/'+id, data);
  };
  
  const removeInvoice = (id:number) => {
    return http.delete('/invoices/'+id);
  };

  const putProductToInvoice = (id:number, productID: number, numberProduct:number, moneyProduct: number) => {
    return http.put('/invoices/'+id+"/product/"+productID+"/number="+numberProduct+"/money="+moneyProduct);
  };

  const getRevenue = () => {
    return http.get("/invoices/revenue");
  }

  const getExpenditure = () => {
    return http.get("/invoices/expenditure");
  }

 
  
  
  const InvoiceService = {
    getAllInvoices,
    getInvoice,
    createInvoice,
    updateInvoice,
    removeInvoice,
    putProductToInvoice,
    getRevenue,
    getExpenditure,
  };
  
  export default InvoiceService;