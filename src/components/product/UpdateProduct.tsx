
import { Button, Col, Form, Input, InputNumber, Select } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, withRouter } from "react-router-dom";
import { updateProduct } from "../../actions/Products.action";
import { AppState } from "../../store/Store";
import './Product.css';

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 3, offset: 7 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 7 }
    },
}
const UpdateProduct = (props: any) => {
    const url = window.location.href.split('=');
    const productID = url[1];
    const dispatch = useDispatch();
    const products = useSelector((state: AppState) => state.productReducer);
    const product = products.find(product => product.id == productID);

    const history = useHistory();

    function handleBack() {
        props.history.push("/admin/productsList");
    }

    const handleUpdate = (values: any) => {
        Promise.resolve(dispatch(updateProduct(productID, {
            'productName': String(values.productName.toUpperCase()),
            'buyPrice': Number(values.buyPrice),
            'sellPrice': Number(values.sellPrice),
            'factoryAddress': String(values.factoryAddress),
            'unit': String(values.unit)
        }))).then(
            () => history.push("/admin/productsList")
        )

    }

    useEffect(() =>{
        document.getElementById("productName")?.focus();
    },[]);

    const validateMessages = {
        required: 'Please input ${label}!',
        types: {
            email: '${label} is not a valid email!',
            number: '${label} is not a valid number!',
        },
        number: {
            range: '${label} must be between ${min} and ${max}',
        },
    };
    return (
        <>
            <p className="title">Update Product</p>
            {product && <Form {...formItemLayout} labelAlign="left" className="formAdd" onFinish={handleUpdate} colon={false}
                validateMessages={validateMessages}
                initialValues={product}
            >
                <Form.Item name="productName" label="Product's Name" rules={[{ required: true }, { type: 'string', min: 0, max: 50 }]} >
                    <Input id="productName"/>
                </Form.Item>


                <Form.Item name="unit" label="Unit" rules={[{ required: true }]}>
                    <Select>
                        <Select.Option value="Can" >Can</Select.Option>
                        <Select.Option value="Bottle">Bottle</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item name="factoryAddress" label="Factory's Address" rules={[{ type: 'string', min: 0, max: 100 }]}>
                    <TextArea showCount maxLength={100} rows={3} />
                </Form.Item>
                <Col offset="7" style={{ marginBottom: '10px', color: "#fa8c16" }}> Product's Price (VNĐ per Case) : </Col>
                <Form.Item name="buyPrice" label="Buy Price" rules={[{ type: 'number', min: 0, max: 999999999 }]}>
                    <InputNumber formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        parser={value => `${value}`.replace(/\$\s?|(,*)/g, '')}
                        style={{ width: 150 }} />

                </Form.Item>
                <Form.Item name="sellPrice" label="Sell Price" rules={[{ type: 'number', min: 0, max: 999999999 }]}>
                    <InputNumber formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        parser={value => `${value}`.replace(/\$\s?|(,*)/g, '')}
                        style={{ width: 150 }} />
                </Form.Item>
                <div style={{ textAlign: "center" }}>
                    <Button htmlType="button" style={{ backgroundColor: 'grey', }} onClick={handleBack}>Back</Button>
                    <Button htmlType="reset" style={{ marginLeft: '20px', marginRight: '20px' }}>Reset</Button>
                    <Button htmlType="submit" type="primary" >Update</Button>
                </div>

            </Form>}
        </>
    );
}

export default withRouter(UpdateProduct);