import { useHistory, withRouter } from "react-router-dom";
import { Row, Col, Card, Statistic, Table, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { AppState } from "../../store/Store";
import { ColumnsType } from "antd/es/table";
import { getExportProduct, getImportProduct } from "../../actions/ProductInvoice.action";
const ViewStatisticProduct = (props: any) => {
    const dispatch = useDispatch();
    const url = window.location.href.split('=');
    const productID = url[1];
    const products = useSelector((state: AppState) => state.productDBReducer);
    const product = products.find(product => product.id == productID);

    const allRevenues = useSelector((state: AppState) => state.revenueReducer);
    const revenue = allRevenues.find(revenue => revenue.productId == Number(productID));

    const allExpenditures = useSelector((state: AppState) => state.expenditureReducer);
    const expenditure = allExpenditures.find(expenditure => expenditure.productId == Number(productID));


    const importProduct = useSelector((state: AppState) => state.importProductReducer);
    const exportProduct = useSelector((state: AppState) => state.exportProductReducer);
    const history = useHistory();
    const formItemLayout = {
        labelCol: {
            span: 9, offset: 1
        },
        wrapperCol: {
            span: 14
        },
    }
    const column: ColumnsType<any> = [
        {
            key: "type",
            title: "Type",
            dataIndex: "invoiceType",
            width: "15%",
            ellipsis: true,

            render: (type: string) => (
                <>
                    {type === "export" && <i style={{ color: '#c41d7f' }}>{type}</i>}
                    {type === "import" && <i style={{ color: '#7cb305' }}>{type}</i>}
                </>
            )
        },
        {
            key: "numberProduct",
            title: "Total number (Case)",
            dataIndex: "numberProduct",
            width: "30%",
            ellipsis: true,
            align: "right",
            sorter: (a: any, b: any) => a.numberTotal - b.numberTotal,
        },
        {
            key: "priceTotal",
            title: "Price (VND/Case)",
            dataIndex: "moneyProduct",
            width: "30%",
            ellipsis: true,
            align: "right",
            sorter: (a: any, b: any) => a.priceTotal - b.priceTotal,
            render: value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        },
    ]
    function handleBack() {
        history.push("/admin/statistic");
    }
    useEffect(() => {
        dispatch(getImportProduct(Number(productID)));
        dispatch(getExportProduct(Number(productID)));
    }, [dispatch, productID]);

    props.keyNumber("3");
    return (
        <>
            <p className="title">View import/export infomation of {product?.productName} -- {product?.unit}</p>
            <div className="site-statistic-card">
                {revenue && expenditure && <Row gutter={16}>
                    <Col span={8}>
                        <Card>
                            <Statistic
                                title="Total Revenue of Product"
                                value={revenue.priceTotal}
                                valueStyle={{ color: '#3f8600' }}
                                suffix="VND"
                            />
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card>
                            <Statistic
                                title="Total Expenditure of Product"
                                value={expenditure.priceTotal}
                                valueStyle={{ color: '#faad14' }}
                                suffix="VND"
                            />
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card>
                            <Statistic
                                title="Profits of Product"
                                value={revenue.priceTotal - expenditure.priceTotal}
                                valueStyle={{ color: '#cf1322' }}
                                suffix="VND"
                            />
                        </Card>
                    </Col>
                </Row>}
            </div>
            <Row>
                <Col span={11} >
                    <h3>List of sold products</h3>
                    <Table dataSource={exportProduct} columns={column} bordered
                        pagination={{
                            defaultPageSize: 5,
                            showSizeChanger: true,
                            pageSizeOptions: ["5", "10", "15", "20"],
                            showQuickJumper: true,
                            total: exportProduct.length,
                            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`
                        }} />

                </Col>
                <Col span={11} offset={2}>
                    <h3>List of import products</h3>
                    <Table dataSource={importProduct} columns={column} bordered
                        pagination={{
                            defaultPageSize: 5,
                            showSizeChanger: true,
                            pageSizeOptions: ["5", "10", "15", "20"],
                            showQuickJumper: true,
                            total: importProduct.length,
                            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`
                        }} />

                </Col>
            </Row>
            <Button htmlType="button" type="primary" onClick={handleBack}>Back</Button>
        </>
    );

}

export default withRouter(ViewStatisticProduct);