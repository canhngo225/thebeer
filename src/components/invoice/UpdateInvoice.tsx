
import { Button, DatePicker, Form, InputNumber, Radio, Select, Space } from "antd";
import { useHistory, withRouter } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from "react";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { AppState } from "../../store/Store";
import { getAllProducts } from "../../actions/Products.action";
import moment from "moment";
import { updateInvoice } from "../../actions/Invoices.action";
const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 5, offset: 5 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 7 }
    },
}
const UpdateInvoice = (props: any) => {
    props.keyNumber("2");

    const url = window.location.href.split('=');
    const invoiceID = url[1];
    const history = useHistory();
    const dispatch = useDispatch();

    const invoices = useSelector((state: AppState) => state.invoiceReducer);
    const invoice = invoices.find(invoice => invoice.invoiceId == invoiceID);

    function handleBack() {
        history.push("/admin/invoicesList");
    }
    const findPrice = (values: any, id: string): number => {
        let price = 0;
        const product = products.find((product: any) => product.id === id)
        if (values.invoiceType === "export") {
            return product === undefined ? 0 : product.sellPrice;
        }
        else {
            return product === undefined ? 0 : product.buyPrice;
        }
    }
    function totalPrice(values: any) {
        let total = 0;
        const products = values.products;
        products.map((product: any) =>
            total = total + findPrice(values, product.productId) * Number(products.find((productk: any) => productk.productId === product.productId).numberProduct)
        )
        return total;
    }
    function dataProducts(values: any) {
        const products = values.products
        const data: any[] = [];
        products.map((product: any) =>
            data.push({
                "productId": product.productId,
                "numberProduct": Number(product.numberProduct),
                "moneyProduct": findPrice(values, product.productId),
                "isDeleted": 0,
                "invoiceType": values.invoiceType
            })

        )
        return data;
    }
    const dateFormat = 'yyyy-MM-DD';
    const handleSubmit = (values: any) => {

        Promise.resolve(dispatch(updateInvoice(invoiceID, {
            'invoiceType': values.invoiceType,
            'invoiceDate': String(values.invoiceDate),
            'productsTotal': values.products.length,
            'moneyTotal': totalPrice(values),
            'productInvoices': dataProducts(values),
            "isDeleted": 0,
        }))).then(
            () => history.push("/admin/invoicesList")
        )
    };

    const validateMessages = {
        required: 'Please input ${label}!',
        types: {
            email: '${label} is not a valid email!',
            number: '${label} is not a valid number!',
            date: '${label} is not a valid date!'
        },
        number: {
            range: '${label} must be between ${min} and ${max}',
        },
    };
    const products = useSelector((state: AppState) => state.productReducer);

    useEffect(() => {
        dispatch(getAllProducts());

    }, [dispatch])

    const [maxNumber, setMaxNumber] = useState(0);
    const [type, setType] = useState("export");
    function handleGetMaxValue(value: any) {
        const product = products.find((product) => product.id === value)
        product ? setMaxNumber(product.stockNumber) : setMaxNumber(0)
    }
    console.log(maxNumber);
    console.log(type);

    return (
        <React.Fragment>
            <p className="title">Update Invoice</p>
            {invoice && <Form {...formItemLayout} labelAlign="left" className="formAdd"
                onFinish={handleSubmit}
                colon={false}
                validateMessages={validateMessages}
                initialValues={invoice}>

                <Form.Item name="invoiceType" label="Type" rules={[{ required: true }]} style={{ paddingLeft: 115, }}>
                    <Radio.Group onChange={(e) => setType(e.target.value)}>
                        <Radio value="export">EXPORT</Radio>
                        <Radio value="import">IMPORT</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item name="invoiceDate" label="Date" rules={[{ type: 'date' }, { required: true }]} style={{ paddingLeft: 118 }}>
                    <DatePicker style={{ width: '100%' }} format={dateFormat} defaultValue={moment(String(invoice.invoiceDate), dateFormat)} />
                    <br />
                </Form.Item>


                <div style={{ paddingLeft: 300 }}>
                    <Form.List name="products" initialValue={invoice.productInvoices}
                        rules={[
                            {
                                validator: async (_, products) => {
                                    if (products.length < 1) {
                                        return Promise.reject(new Error('At least 1 product!'));
                                    }
                                },
                            },
                        ]}>
                        {(fields, { add, remove }, { errors }) => (
                            <>
                                {fields.map(field => (
                                    <Space key={field.key} align="baseline">
                                        <Form.Item
                                            noStyle
                                            shouldUpdate={(prevValues, curValues) =>
                                                prevValues.productId !== curValues.productId
                                            }
                                        >
                                            {() => (
                                                <Form.Item
                                                    {...field}
                                                    label="Name"
                                                    name={[field.name, 'productId']}
                                                    fieldKey={[field.fieldKey, 'productId']}
                                                    rules={[{ required: true }]}
                                                >
                                                    <Select style={{ width: 200 }} onChange={handleGetMaxValue}>

                                                        {(products.map(product => (
                                                            <Select.Option value={product.id}>
                                                                {product.productName} --- {product.unit}
                                                            </Select.Option>
                                                        )))}
                                                    </Select>
                                                </Form.Item>
                                            )}
                                        </Form.Item>
                                        {" "}
                                        {type === "export" && <Form.Item
                                            {...field}
                                            label="Number"
                                            name={[field.name, 'numberProduct']}
                                            fieldKey={[field.fieldKey, 'numberProduct']}
                                            rules={[{ required: true }, { type: "number", min: 0, max: Number(maxNumber) }]}
                                            style={{ marginLeft: 20, width: 350 }}
                                        >
                                            <InputNumber />
                                        </Form.Item>}
                                        {type === "import" && <Form.Item
                                            {...field}
                                            label="Number"
                                            name={[field.name, 'numberProduct']}
                                            fieldKey={[field.fieldKey, 'numberProduct']}
                                            rules={[{ required: true }]}
                                            style={{ marginLeft: 20, width: 350 }}
                                        >

                                            <InputNumber />
                                        </Form.Item>}
                                        <MinusCircleOutlined onClick={() => remove(field.name)} />
                                    </Space>
                                ))}

                                <Form.Item style={{ marginLeft: 215 }}>
                                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                        Add products
                                    </Button>
                                    <Form.ErrorList errors={errors} />
                                </Form.Item>
                            </>
                        )}
                    </Form.List>
                </div>
                <div style={{ textAlign: "center" }}>
                    <Button htmlType="button" style={{ backgroundColor: 'grey', }} onClick={handleBack}>Back</Button>
                    <Button htmlType="reset" style={{ marginLeft: '20px', marginRight: '20px' }}>Clear</Button>
                    <Button htmlType="submit" type="primary" >Update</Button>
                </div>
            </Form>
            }


        </React.Fragment>
    );
}


export default withRouter(UpdateInvoice);