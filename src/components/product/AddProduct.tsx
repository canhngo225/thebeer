
import { Button, Col, Form, Input, InputNumber, Radio } from "antd";
import { useHistory, withRouter } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { addProduct } from "../../actions/Products.action";
import React, { useEffect } from "react";
import TextArea from "antd/lib/input/TextArea";
import './Product.css'
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
const AddProduct = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    function handleBack() {
        history.push("/admin/productsList");
    }

    useEffect(() =>{
        document.getElementById("productName")?.focus();
    },[]
    );
    const handleSubmit = (values: any) => {

        Promise.resolve(dispatch(addProduct({
            'productName': String(values.productName.toUpperCase()),
            'buyPrice': Number(values.buyPrice),
            'sellPrice': Number(values.sellPrice),
            'factoryAddress': String(values.factoryAddress),
            'unit': String(values.unit)
        }))).then(
            () => history.push("/admin/productsList")
        )

    }

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
        <React.Fragment>
            <text className="title">Add New Product</text>
            <Form {...formItemLayout} labelAlign="left" className="formAdd" onFinish={handleSubmit} colon={false} 
                validateMessages={validateMessages}
                initialValues={{ unit: "Can" }}>
                <Form.Item name="productName"  label="Product's Name" rules={[{ required: true }, { type: 'string', min: 0, max: 100 }]} >
                    <Input id="productName"/>
                </Form.Item>
                <Form.Item name="unit" label="Unit" rules={[{ required: true }]}>
                    <Radio.Group >
                        <Radio value="Can">Can</Radio>
                        <Radio value="Bottle">Bottle</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item name="factoryAddress" label="Factory's Address" rules={[{ type: 'string', min: 0, max: 100 }]} >
                    <TextArea showCount maxLength={100} rows={3} />
                </Form.Item>
                <Col offset="7" style={{ marginBottom: '10px', color: "#fa8c16" }}> Product's Price (VNĐ per Case) </Col>
                <Form.Item name="buyPrice" label="Buy Price" rules={[{ type: 'number', min: 0, max: 999999999 }]}>
                    <InputNumber
                        formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
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
                    <Button htmlType="reset" style={{ marginLeft: '20px', marginRight: '20px' }}>Clear</Button>
                    <Button htmlType="submit" type="primary" >Add</Button>
                </div>

            </Form>
        </React.Fragment>
    );
}


export default withRouter(AddProduct);