import React, { useEffect } from "react";
import { DualAxes } from "@ant-design/charts";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../store/Store";
import { getHistoryProductById } from "../actions/Historyproducts.action";
import { Button } from "antd";
import { useHistory } from "react-router";

const HistoryProduct: React.FC = () => {
    const url = window.location.href.split('=');
    const productID = url[1];
    const dispatch = useDispatch();
    const historyproducts = useSelector((state: AppState) => state.historyProductReducer);
    const products = useSelector((state: AppState) => state.productReducer);
    const product = products.find(product => product.id == productID);
    const history = useHistory();
    console.log(historyproducts);
    var today = new Date();
    var day = today.getFullYear() + "-" +("0"+ (today.getMonth() + 1)).slice(-2) + "-" + today.getDate();
    console.log(day);
    console.log(product);
    useEffect(() => {
        dispatch(getHistoryProductById(Number(productID)));
}, [dispatch])
function addToday(historyproducts: any[]){
    const historyProduct = historyproducts.find(product => product.updateDate == day);
    console.log(historyProduct);
    (historyProduct===undefined) && product && historyproducts.push({
        "id": "0",
        "productId": product.id,
        "productName": product.productName,
        "factoryAddress": product.factoryAddress,
        "buyPrice": product.buyPrice,
        "sellPrice": product.sellPrice,
        "soldNumber": product.soldNumber,
        "stockNumber": product.stockNumber,
        "unit": product.unit,
        "updateDate": day,
    })
    return historyproducts;

}
var config = {
    data: [addToday(historyproducts), addToday(historyproducts)],
    //data: [historyproducts, historyproducts],
    xField: 'updateDate',
    yField: ['buyPrice', 'sellPrice'],
    yAxis: {
        buyPrice: { min: 100000 },
        sellPrice: { min: 100000 }
    },
    metryOptions: [
        {
            geometry: 'line',
            color: '#5B8FF9',
            point: {
                shape: 'circle',
                size: 4,
                style: {
                    opacity: 0.5,
                    stroke: '#5AD8A6',
                    fill: '#fff',
                },
            }
        },
        {
            geometry: 'line',
            color: '#5AD8A6',
            point: {
                shape: 'circle',
                size: 4,
                style: {
                    opacity: 0.5,
                    stroke: '#5AD8A6',
                    fill: '#fff',
                },
            }
        },
    ],
}

return (
    <React.Fragment>
        {historyproducts && product && (<>
            <p className="title">History Price of {product.productName}</p>
            <DualAxes {...config}></DualAxes>
        </>)
        }
        <Button htmlType="button" onClick={e => { history.push("/admin/productsList") }} style={{ marginTop: 20 }}>Back</Button>
    </React.Fragment>
);
}
export default HistoryProduct;