import { DeleteOutlined, EditOutlined, InfoOutlined, PlusOutlined, SearchOutlined, ClearOutlined } from "@ant-design/icons";
import { Button, Col, Input, notification, Popconfirm, Row, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, withRouter } from "react-router-dom";
import { AppState } from "../../store/Store";
import { deleteProduct, getAllProducts, getProduct, searchProduct } from "../../actions/Products.action";
import ViewProduct from "./ViewProduct";
import './Product.css';

const ProductsList = (props: any) => {
  props.keyNumber("1");

  const history = useHistory()
  const products = useSelector((state: AppState) => state.productReducer);
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("");

  const [visible, setVisible] = useState(false);
  const [idModal, setIdModal] = useState(0);

  useEffect(() => {
    dispatch(getAllProducts());

    
  }, [dispatch]);

  useEffect(() => {
    const timer = setTimeout(() => {
      Promise.resolve(dispatch(searchProduct(searchValue))).catch(
        ()=>dispatch(getAllProducts())
      )
    },500);
    return () => clearTimeout(timer);
  },[searchValue, dispatch]);

  const handleView = (ID: number) => {
    Promise.resolve(dispatch(getProduct(ID))).then(
      (res) => {
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

  const handleViewByName = (name: string) => {
    const product = products.find(product => product.productName === name);
    product && handleView(Number(product.id));
  }
  function handleChangeModal(newValue: boolean) {
    setVisible(newValue);
  }



  const handleEdit = (ID: number) => {
    Promise.resolve(dispatch(getProduct(ID))).then(
      (res) => {
        history.push("/admin/updateProduct?product_id=" + String(ID));
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
    Promise.resolve(dispatch(getProduct(ID))).then(
      () => {
        Promise.resolve(dispatch(deleteProduct(ID))).then(
          () => {
            history.push("/admin/productsList");
          }
        )

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

  const handleSearch = () => {
    dispatch(searchProduct(searchValue));
  }

  const handleClear = () => {
    setSearchValue("");
    dispatch(getAllProducts());

  }


  const column: ColumnsType<any> = [
    {
      key: "productName",
      title: "Name",
      dataIndex: "productName",
      width: "22%",
      ellipsis: true,
      sorter: (a: any, b: any) => a.productName.localeCompare(b.productName),
      render: (name: string) => <Button type="link" onClick={event => { handleViewByName(name) }}>{name.toUpperCase()}</Button>
    },
    {
      key: "unit",
      title: "Unit",
      dataIndex: "unit",
      width: "10%",
      ellipsis: true,
      filters: [
        { text: 'Can', value: 'Can' },
        { text: 'Bottle', value: 'Bottle' }
      ],

      onFilter: (value: any, record: any) => record.unit === value,
      render: (unit: string) => (
        <>
          {unit === "Can" && <i style={{ color: '#c41d7f' }}>{unit}</i>}
          {unit === "Bottle" && <i style={{ color: '#7cb305' }}>{unit}</i>}
        </>
      )
    },
    {
      title: "Price (VNĐ per Case)",
      children: [
        {
          key: "buyPrice",
          title: "Buy Price",
          dataIndex: "buyPrice",
          align: "right",
          width: "13%",
          ellipsis: true,
          sorter: (a: any, b: any) => a.buyPrice - b.buyPrice,
          render: value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        },
        {
          key: "sellPrice",
          title: "Sell Price",
          dataIndex: "sellPrice",
          align: "right",
          width: "13%",
          ellipsis: true,
          sorter: (a: any, b: any) => a.sellPrice - b.sellPrice,
          render: value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        }
      ],
    },
    {
      title: "Number of Products (Case)",
      children: [
        {
          key: "soldNumber",
          title: "Sold",
          dataIndex: "soldNumber",
          align: "right",
          width: "10%",
          ellipsis: true,
          sorter: (a: any, b: any) => a.soldNumber - b.soldNumber,
        },
        {
          key: "stockNumber",
          title: "In Stock",
          dataIndex: "stockNumber",
          align: "right",
          width: "10%",
          ellipsis: true,
          sorter: (a: any, b: any) => a.stockNumber - b.stockNumber,
        }
      ],
    },
    {
      title: "Actions",
      width: "14%",
      align: "center",
      render: (value: any) =>
        <>
          <Button icon={<InfoOutlined />} style={{ backgroundColor: 'pink' }} onClick={event => { handleView(value.id) }} />

          <Button icon={<EditOutlined />} style={{ margin: '0px 10px', backgroundColor: '#95de64' }} onClick={event => { handleEdit(value.id) }} />

          <Popconfirm title="Are you sure to delete?"
            onConfirm={() => handleDelete(value.id)}>
            <Button icon={<DeleteOutlined />} danger />
          </Popconfirm>

        </>

    }

  ]
  return (
    <>
      <Row style={{ marginBottom: 10 }} >
        <Col span={10}>
          <Input
            addonBefore="Search for Name"
            placeholder="Please input search text"
            //   onSearch={handleSearch}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </Col>
        <Col span={3} style={{ padding: "0px 10px" }}> <Button type="primary" icon={<SearchOutlined />} shape="circle" onClick={handleSearch} />
          <Button type="default" icon={<ClearOutlined />} shape="circle" onClick={handleClear} style={{ marginLeft: 5 }} /></Col>
        <Col span={4} offset={7}>
          <Button style={{ position: "absolute", right: "0px" }} type="primary" icon={<PlusOutlined />} onClick={() => { history.push("/admin/addProduct") }}>Add Product</Button>
        </Col>
      </Row>

      <Table
        rowKey={(record: any) => record.id}
        columns={column}
        dataSource={products}
        bordered
        pagination={{
          defaultPageSize: 5,
          showSizeChanger: true,
          pageSizeOptions: ["5", "10", "20", "50"],
          total: products.length,
          showQuickJumper: true,
          showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`

        }}
      />

      {visible && <ViewProduct visible={visible} ID={idModal} onReturn={handleChangeModal} />}
    </>
  );
}
export default withRouter(ProductsList);