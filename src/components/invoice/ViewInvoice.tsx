import "./Invoice.css";
import { Button, Modal, Table } from "antd";
import { Form } from "antd";
import { ColumnsType } from "antd/lib/table";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { AppState } from "../../store/Store";

const ViewInvoice = (props: any) => {
    const history = useHistory();
    const [isModalVisible, setIsModelVisible] = useState(props.visible);

    const handleReturn = () => {
        setIsModelVisible(false);
        props.onReturn(false);
    }

    const handleUpdate = () => {
        setIsModelVisible(false);
        props.onReturn(false);
        history.push("/admin/updateInvoice?invoiceID=" + props.ID);
    }

    const invoices = useSelector((state: AppState) => state.invoiceReducer);
    const invoice = invoices.find(invoice => invoice.invoiceId === props.ID);

    const products = useSelector((state: AppState) => state.productReducer);
    const formItemLayout = {
        labelCol: {
            span: 9, offset: 5
        },
        wrapperCol: {
            span: 7
        },
    }
    function getProduct(id: any) {
        return products.find(product => product.id === id)
    }
    const columnProducts: ColumnsType<any> = [
        {
            key: "id",
            title: "Product: Name--Unit",
            dataIndex: "productId",
            width: "40%",
            ellipsis: true,
            render: (id: any) => (
                <>
                    {getProduct(id)?.productName} -- {getProduct(id)?.unit}
                </>
            )

        },
        {
            key: "numberProduct",
            title: "Number(Case)",
            dataIndex: "numberProduct",
            width: "28%",
            ellipsis: true,
            align: "right"
        },
        {
            key: "moneyProduct",
            title: "Price (VND/Case)",
            dataIndex: "moneyProduct",
            width: "32%",
            ellipsis: true,
            align: "right",
            render: value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        },
    ];
    return (
        <Modal title="Invoice Infomation"
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
            {invoice && <Form {...formItemLayout} labelAlign="left" className="formAdd" onFinish={handleUpdate}

            >
                <Form.Item label="Invoice's Type" >
                    <text>{invoice.invoiceType}</text>
                </Form.Item>
                <Form.Item label="Date" >
                    <text>{invoice.invoiceDate}</text>
                </Form.Item>
                <Form.Item label="Number of products(Kind)" >
                    <text>{invoice.productsTotal}</text>
                </Form.Item>

                <Form.Item label="Total(VNĐ)" >
                    <text>{`${invoice.moneyTotal}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</text>
                </Form.Item>
                <Table dataSource={invoice.productInvoices} columns={columnProducts} bordered
                pagination={{
                    defaultPageSize: 4,
                    showSizeChanger: true,
                    pageSizeOptions: ["4", "8", "12", "20"],
                    showQuickJumper: true,
                    total: invoice.productInvoices.length,
                    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`
                  }}/>
            </Form>}
        </Modal>
    );
}
export default ViewInvoice;