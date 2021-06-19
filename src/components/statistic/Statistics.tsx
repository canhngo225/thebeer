import { Statistic, Card, Row, Col, Table, Button } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getExpenditure, getRevenue } from '../../actions/Invoices.action';
import { getAllProductsDB } from '../../actions/Products.action';
import { getAllExpenditures, getAllRevenues } from '../../actions/Statistic.action';
import { AppState } from '../../store/Store';

const Statistics = (props: any) => {
    props.keyNumber("3");
    const dispatch = useDispatch();
    const history = useHistory();
    const [revenue, setRevenue] = useState(0);
    const [expenditure, setExpenditure] = useState(0);
    const [profits, setProfits] = useState(0);

    const allRevenues = useSelector((state: AppState) => state.revenueReducer);
    const allExpenditures = useSelector((state: AppState) => state.expenditureReducer);

    const products = useSelector((state: AppState) => state.productDBReducer);
    function getProduct(id: any) {
        return products.find(product => product.id === id)
    }
    useEffect(() => {
        dispatch(getAllProductsDB());

        Promise.resolve(dispatch(getRevenue())).then(
            (res) => {
                setRevenue(Number(res));
            }
        );
        Promise.resolve(dispatch(getExpenditure())).then(
            (res) => {
                setExpenditure(Number(res));
            }
        );
        dispatch(getAllRevenues());
        dispatch(getAllExpenditures());

        setProfits(revenue - expenditure);

    },[dispatch,revenue,expenditure,profits]);

    function handleViewById(id: any){
        history.push("/admin/viewStatisticProduct/?product_id="+String(id));
    }
    const columns: ColumnsType<any> = [
        {
            key: "id",
            title: "Product: Name--Unit",
            dataIndex: "productId",
            width: "40%",
            ellipsis: true,
            render: (id: any) => 
            <Button type="link" onClick={event => { handleViewById(id) }}>{getProduct(id)?.productName} -- {getProduct(id)?.unit}</Button>


        },
        {
            key: "numberTotal",
            title: "Total number (Case)",
            dataIndex: "numberTotal",
            width: "30%",
            ellipsis: true,
            align: "right",
            sorter: (a: any, b: any) => a.numberTotal - b.numberTotal,
        },
        {
            key: "priceTotal",
            title: "Total Price (VND)",
            dataIndex: "priceTotal",
            width: "30%",
            ellipsis: true,
            align: "right",
            sorter: (a: any, b: any) => a.priceTotal - b.priceTotal,
            render: value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        },
    ];

    return (
        <>
        <div className="site-statistic-card">
            <Row gutter={16}>
                <Col span={8}>
                    <Card>
                        <Statistic
                            title="Total Revenue"
                            value={revenue}
                            valueStyle={{ color: '#3f8600' }}
                            suffix="VND"
                        />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card>
                        <Statistic
                            title="Total Expenditure"
                            value={expenditure}
                            valueStyle={{ color: '#faad14' }}
                            suffix="VND"
                        />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card>
                        <Statistic
                            title="Profits"
                            value={profits}
                            valueStyle={{ color: '#cf1322' }}
                            suffix="VND"
                        />
                    </Card>
                </Col>
            </Row>
        </div>
        
        <h3>List of import products</h3>
        <Table dataSource={allExpenditures} columns={columns} bordered
                pagination={{
                    defaultPageSize: 5,
                    showSizeChanger: true,
                    pageSizeOptions: ["5", "10", "15", "20"],
                    showQuickJumper: true,
                    total: allExpenditures.length,
                    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`
                  }}/>
        <h3>List of sold products</h3>
        <Table dataSource={allRevenues} columns={columns} bordered
                pagination={{
                    defaultPageSize: 5,
                    showSizeChanger: true,
                    pageSizeOptions: ["5", "10", "15", "20"],
                    showQuickJumper: true,
                    total: allRevenues.length,
                    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`
                  }}/>
        </>
    );
}

export default Statistics;