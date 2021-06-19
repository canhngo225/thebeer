import { DeleteOutlined, EditOutlined, InfoOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, notification, Popconfirm, Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, withRouter } from "react-router-dom";
import { AppState } from "../../store/Store";
import { getAllInvoices, getInvoice, deleteInvoice } from "../../actions/Invoices.action";
import ViewInvoice from "./ViewInvoice";



const InvoicesList = (props: any) => {
  props.keyNumber("2");

  const history = useHistory()
  const invoices = useSelector((state: AppState) => state.invoiceReducer);
  const dispatch = useDispatch();

  const [visible, setVisible] = useState(false);
  const [idModal, setIdModal] = useState(0);

  useEffect(() => {
    dispatch(getAllInvoices());

  }, [dispatch])

  function handleChangeModal(newValue: boolean) {
    setVisible(newValue);
  }

  const handleView = (ID: number) => {
    Promise.resolve(dispatch(getInvoice(ID))).then(
      () => {
        setVisible(true);
        setIdModal(ID);
      }
    ).catch(
      (err) => {
        const btn = (
      <Button type="primary" onClick={() => window.location.reload()}>
        Reload the page
      </Button>
    );
    notification["error"]({
      message: 'Error',
      description: err,
      btn,
    });
      }
    );
  }
  
  const handleEdit = (ID: number) => {
    Promise.resolve(dispatch(getInvoice(ID))).then(
      () => {
        history.push("/admin/updateInvoice?invoice_id=" + String(ID));
      }
    ).catch(
      (err) => {
        const btn = (
          <Button type="primary" onClick={() => window.location.reload()}>
            Reload the page
          </Button>
        );
        notification["error"]({
          message: 'Error',
          description: err,
          btn,
        });
          }
        );
  }

  const handleDelete = (ID: number) => {
    Promise.resolve(dispatch(getInvoice(ID))).then(
      () => Promise.resolve(dispatch(deleteInvoice(ID))).then(
        () => {
          history.push("/admin/invoicesList");
        }
      )
    ).catch(
      (err) => {
        const btn = (
          <Button type="primary" onClick={() => window.location.reload()}>
            Reload the page
          </Button>
        );
        notification["error"]({
          message: 'Error',
          description: err,
          btn,
        });
      }
    );
  }

  const column: ColumnsType<any> = [
    {
      key: "type",
      title: "Type",
      dataIndex: "invoiceType",
      width: "15%",
      ellipsis: true,
      filters: [
        { text: 'export', value: 'export' },
        { text: 'import', value: 'import' }
      ],

      onFilter: (value: any, record: any) => record.invoiceType === value,
      render: (type: string) => (
        <>
          {type === "export" && <i style={{ color: '#c41d7f' }}>{type}</i>}
          {type === "import" && <i style={{ color: '#7cb305' }}>{type}</i>}
        </>
      )
    },
    {
      key: "date",
      title: "Date",
      dataIndex: "invoiceDate",
      width: "20%",
      align: "right",
      ellipsis: true,
      sorter: (a: any, b: any) => Date.parse(a.invoiceDate) - Date.parse(b.invoiceDate)


    },

    {
      key: "productsTotal",
      title: "Number of products",
      dataIndex: "productsTotal",
      align: "right",
      width: "20%",
      ellipsis: true,
      sorter: (a: any, b: any) => a.productsTotal - b.productsTotal,

    },
    {
      key: "moneyTotal",
      title: "Total (VND)",
      dataIndex: "moneyTotal",
      align: "right",
      width: "20%",
      ellipsis: true,
      sorter: (a: any, b: any) => a.moneyTotal - b.moneyTotal,
      render: value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')


    },

    {
      title: "Actions",
      width: "25%",
      align: "center",
      render: (value: any) =>
        <>
          <Button icon={<InfoOutlined />} style={{ backgroundColor: 'pink' }} onClick={event => { handleView(value.invoiceId) }} />

          <Button icon={<EditOutlined />} style={{ margin: '0px 10px', backgroundColor: '#95de64' }} onClick={event => { handleEdit(value.invoiceId) }} />

          <Popconfirm title="Are you sure to delete?"
            onConfirm={() => handleDelete(value.invoiceId)}>
            <Button icon={<DeleteOutlined />} danger />
          </Popconfirm>

        </>

    }

  ]
  return (
    <>

      <Button style={{ float: "right", marginBottom: "8px" }} type="primary" icon={<PlusOutlined />} onClick={() => { history.push("/admin/addInvoice") }}>Add Invoice</Button>


      <Table
        rowKey={(record: any) => record.id}
        columns={column}
        dataSource={invoices}
        bordered
        pagination={{
          defaultPageSize: 5,
          showSizeChanger: true,
          pageSizeOptions: ["5", "10", "20", "50"],
          showQuickJumper: true,
          total: invoices.length,
          showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`

        }}
      />

      {visible && <ViewInvoice visible={visible} ID={idModal} onReturn={handleChangeModal} />}
    </>
  );
}
export default withRouter(InvoicesList);