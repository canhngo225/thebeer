import http from "../utils/Common";

const getHistoryProductById = (id: number) => {
    return http.get("/historyproducts/"+id);
  };

  const HistoryProductService = {
      getHistoryProductById,
  };

  export default HistoryProductService;