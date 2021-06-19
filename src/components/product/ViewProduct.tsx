import { Button, Col, Modal } from "antd";
import { Form } from "antd";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { AppState } from "../../store/Store";

const ViewProduct = (props: any) => {
    const history = useHistory();
    const [isModalVisible, setIsModelVisible] = useState(props.visible);
    const handleReturn = () => {
        setIsModelVisible(false);
        props.onReturn(false);
    }
    const handleUpdate = () => {
        setIsModelVisible(false);
        props.onReturn(false);
        history.push("/admin/updateProduct?productID=" + props.ID);
    }

    const products = useSelector((state: AppState) => state.productReducer);
    const product = products.find(product => product.id === props.ID);

    const formItemLayout = {
        labelCol: {
            span: 9, offset: 2
        },
        wrapperCol: {
            span: 12
        },
    }
    return (
        <Modal title="Product Infomation"
            style={{ top: "10px" }}
            visible={isModalVisible}
            onCancel={handleReturn}
            footer={[
                <Button key="back" onClick={handleReturn}>
                    Return
                </Button>,
                <Button key="submit" type="primary" onClick={handleUpdate}>
                    Update
                </Button>]}>
            {product && <Form {...formItemLayout} labelAlign="left" className="formAdd" onFinish={handleUpdate}

            >
                <Form.Item label="Product's Name" >
                    <text>{product.productName}</text>
                </Form.Item>
                <Form.Item label="Unit" >
                    <text>{product.unit}</text>
                </Form.Item>
                <Form.Item label="Factory's Address" >
                    <text>{product.factoryAddress}</text>
                </Form.Item>
                <Col offset="3" style={{ marginBottom: '10px', color: "#fa8c16" }}> Product's Price (VNĐ per Case) : </Col>
                <Form.Item label="Buy Price" >
                    <text>{product.buyPrice}</text>
                </Form.Item>
                <Form.Item label="Sell Price" >
                    <text>{product.sellPrice}</text>
                </Form.Item>
                <Col offset="3" style={{ marginBottom: '10px', color: "#fa8c16" }}> Number of products (Case) : </Col>
                <Form.Item label="Sold " >
                    <text>{product.soldNumber}</text>
                </Form.Item>

                <Form.Item label="In Stock " >
                    <text>{product.stockNumber}</text>
                </Form.Item>
                <div style={{ textAlign: "center" }}>
                    <Button htmlType="button" type="link" onClick={e => { history.push("/admin/viewHistoryProduct?productID=" + props.ID) }}>View history price of product</Button>
                </div>
            </Form>}
        </Modal>
    );
}
export default ViewProduct;