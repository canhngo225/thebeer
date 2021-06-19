
import { Button, DatePicker, Form, InputNumber, Radio, Select, Space, Row, Col, Typography } from "antd";
import { useHistory, withRouter } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from "react";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { AppState } from "../../store/Store";
import { getAllProducts } from "../../actions/Products.action";
import { addInvoice } from "../../actions/Invoices.action";
const { Paragraph } = Typography;

const AddInvoice = (props: any) => {
  props.keyNumber("2");
  const history = useHistory();
  const dispatch = useDispatch();

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

  function handleBack() {
    history.push("/admin/invoicesList");
  }
  
  // const [productID, setProductID] = useState("");
  const [price, setPrice] = useState("");
  console.log("price ", price);
  const [show, setShow] = useState(false);
  function handleGetPrice(value: any) {
    const product = products.find((product) => product.id === value)
    product ? setPrice(String(product.buyPrice)) : setPrice("")
    setShow(true)
  }

  const findPrice = (values: any, id: string): number => {
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
    let price = 0;
    products.map((product: any) =>{
      price = values.invoiceType === "export"? findPrice(values, product.productId): product.moneyProduct;
      total = total + price * Number(products.find((productk: any) => productk.productId === product.productId).numberProduct)
    }
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
        "moneyProduct": values.invoiceType==="export"? findPrice(values, product.productId): product.moneyProduct,
        "isDeleted": 0,
        "invoiceType": values.invoiceType
      })

    )
    return data;
  }

  const handleSubmit = (values: any) => {
    Promise.resolve(dispatch(addInvoice({
      'invoiceType': values.invoiceType,
      'invoiceDate': String(values.invoiceDate.format("yyyy-MM-DD")),
      'productsTotal': values.products.length,
      'moneyTotal': totalPrice(values),
      'productInvoices': dataProducts(values),
      "isDeleted": 0,
    }))).then(
      () => history.push("/admin/invoicesList")
    )
  };

  

  const [maxNumber, setMaxNumber] = useState(0);
  const [type, setType] = useState("export");
  function handleGetMaxValue(value: any) {
    const product = products.find((product) => product.id === value)
    product ? setMaxNumber(product.stockNumber) : setMaxNumber(0)
  }

  
  return (
    <React.Fragment>
      <p className="title">Add New Invoice</p>
      <Form
        // {...formItemLayout} 
        labelAlign="left" className="formAdd" scrollToFirstError={{ inline: "start" }}
        onFinish={handleSubmit}
        colon={false}
        validateMessages={validateMessages}
        initialValues={{ invoiceType: "export" }}>
        <Row>
          <Col span="3" offset="4">
          </Col>
          <Col span="10">
          </Col>
        </Row>
        <Form.Item name="invoiceType" label="Type" rules={[{ required: true }]} style={{ paddingLeft: 115, }} 
        labelCol={{ span: 3, offset: 4 }} wrapperCol={{span: 10}}>
            <Radio.Group onChange={(e) => setType(e.target.value)}>
              <Radio value="export">EXPORT</Radio>
              <Radio value="import">IMPORT</Radio>
            </Radio.Group>

        </Form.Item>
        <Form.Item name="invoiceDate" label="Date" rules={[{ required: true }, { type: 'date' }]} style={{ paddingLeft: 118 }} 
        labelCol={{ span: 3, offset: 4 }} wrapperCol={{span: 5}}>
            <DatePicker style={{ width: '100%' }} />
        </Form.Item>


        <div style={{ paddingLeft: 300 }}>
          <Form.List name="products"  rules={[
            {
              validator: async (_, products) => {
                if (!products || products.length < 1) {
                  return Promise.reject(new Error('At least 1 product!'));
                }
              },
            },
          ]}>
            {(fields, { add, remove }, { errors }) => (
              <>
                {fields.map(field => (
                  <Space key={field.key} align="baseline">

                    {type === "export" && 
                    <>
                    <Form.Item
                    {...field}
                    label="Name"
                    name={[field.name, 'productId']}
                    fieldKey={[field.fieldKey, 'productId']}
                    rules={[{ required: true }]}
                    style={{marginLeft: 7}}
                    labelCol={{span: 13}}
                    wrapperCol = {{span: 10}}
                  >
                    <Select style={{ width: 200 , marginRight: 8}} onChange={handleGetMaxValue}>

                      {(products.map(product => (
                        <Select.Option value={product.id}>
                          {product.productName} --- {product.unit}
                        </Select.Option>
                      )))}
                    </Select>
                  </Form.Item>
                    <Form.Item
                      {...field}
                      label="Number"
                      name={[field.name, 'numberProduct']}
                      fieldKey={[field.fieldKey, 'numberProduct']}
                      rules={[{ required: true }, { type: "number", min: 0, max: Number(maxNumber) }]}
                      style={{ marginLeft: 20, width: 350 }}
                      labelCol={{span: 6, offset: 5}}
                      wrapperCol = {{span: 9}}
                    >
                      <InputNumber />
                    </Form.Item>
                    </>}
                    {type === "import" && 
                    <>
                    <Form.Item
                          {...field}
                          label="Name"
                          name={[field.name, 'productId']}
                          fieldKey={[field.fieldKey, 'productId']}
                          rules={[{ required: true }]}
                          style={{marginLeft: 7}}
                    labelCol={{span: 6}}
                    wrapperCol = {{span: 9, offset: 7}}
                        >
                          <Select style={{ width: 200 , marginRight: 8}} onChange={handleGetPrice} >

                            {(products.map(product => (
                              <Select.Option value={product.id} >
                                {product.productName} --- {product.unit}
                              </Select.Option>
                            )))}
                          </Select>
                        </Form.Item>
                    <Form.Item
                      {...field}
                      label="Number"
                      name={[field.name, 'numberProduct']}
                      fieldKey={[field.fieldKey, 'numberProduct']}
                      rules={[{ required: true }]}
                      style={{marginLeft: 50, width: 200}}
                      labelCol={{span: 9, offset: 3}}
                      wrapperCol = {{span: 9}}
                    >
                      <InputNumber/>
                    </Form.Item>
                    {show && <Form.Item
                    {...field}
                    label="Buy Price"
                    name={[field.name, 'moneyProduct']}
                    fieldKey={[field.fieldKey, 'moneyProduct']}
                    rules={[{ required: true }, { type: "number", min: 0, max: 999999999 }]}
                    style={{width: 200}}
                      labelCol={{span: 11 }}
                      wrapperCol = {{span: 9}}
                      initialValue={Number(price)}
                  >
                    {/* <Paragraph editable={{ onChange: setPrice}}>{price.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</Paragraph> */}
                    <InputNumber 
                    // defaultValue = {price} 
                    formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        parser={value => `${value}`.replace(/\$\s?|(,*)/g, '')}
                        />
                  </Form.Item>}
                  
                  </>
                    }

                    <MinusCircleOutlined onClick={() => remove(field.name)} />
                  </Space>
                ))}

                <Form.Item style={{marginLeft: 130}}>
                  <Button type="dashed" onClick={() => {add();setShow(false)}} icon={<PlusOutlined />} style={{width: 400}}>
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
          <Button htmlType="submit" type="primary" >Add</Button>
        </div>
      </Form>



    </React.Fragment>
  );
}


export default withRouter(AddInvoice);