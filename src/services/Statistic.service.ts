import http from "../utils/Common";

  const getAllRevenue = () => {
    return http.get("/productInvoice/export");
  };

  const getAllExpenditure = () => {
    return http.get("/productInvoice/import");
  };

  const getExportProduct = (id: number) => {
    return http.get("/productInvoice/export/"+id);
  };

  const getImportProduct = (id: number) => {
    return http.get("/productInvoice/import/"+id);
  };
  
  
  
  const StatisticService = {
    getAllRevenue,
    getAllExpenditure,
    getExportProduct,
    getImportProduct,
  };
  
  export default StatisticService;