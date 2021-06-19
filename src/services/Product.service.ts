import http from "../utils/Common";

  const getAllProducts = () => {
    return http.get("/products");
  };

  const getAllProductsInDB= () => {
    return http.get("/products/all");
  };
  
  const getProduct = (id: number) => {
    return http.get('/products/'+id);
  };

  const getProductInDB = (id: number) => {
    return http.get('/products/all'+id);
  };
  
  const createProduct = (data: object) => {
    return http.post("/products", data);
  };
  
  const updateProduct = (id: number, data: object) => {
    return http.put('/products/'+id, data);
  };
  
  const removeProduct = (id:number) => {
    return http.delete('/products/'+id);
  };

  const searchProduct = (name:String) => {
    return http.get('/products/searchProducts/'+name);
  };
  
  
  const ProductService = {
    getAllProducts,
    getProduct,
    createProduct,
    updateProduct,
    removeProduct,
    searchProduct,
    getProductInDB,
    getAllProductsInDB,
  };
  
  export default ProductService;