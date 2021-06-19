import './UIofAdminPage.css';
import { Layout, Menu } from "antd";
import { DesktopOutlined, SnippetsOutlined } from '@ant-design/icons';
import { Link, Redirect, Route, Switch, useRouteMatch } from "react-router-dom";
import HeaderComponent from "../components/HeaderComponent";
import FooterComponent from "../components/FooterComponent";
import AddProduct from '../components/product/AddProduct';
import ProductsList from '../components/product/ProductsList';
import UpdateProduct from '../components/product/UpdateProduct';
import InvoicesList from '../components/invoice/InvoicesList';
import AddInvoice from '../components/invoice/AddInvoice';
import HistoryProduct from '../components/HistoryProduct';
import UpdateInvoice from '../components/invoice/UpdateInvoice';
import Statistics from '../components/statistic/Statistics';
import ViewStatisticProduct from '../components/statistic/ViewStatisticProduct';

const { Sider, Content } = Layout;

const Admin = () => {
  let match = useRouteMatch();
  let keyNumber = "2";
  const setKeyNumber = (key: string) => {
    keyNumber = key;
  }

  return (
    <Layout style={{ minHeight: window.innerHeight }}>
      <Sider >
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={[keyNumber]} >
          <Menu.Item key="1" icon={<DesktopOutlined />} onClick={(e) => setKeyNumber(e.key)}>
            <Link to={`${match.path}/productsList`}>Products </Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<SnippetsOutlined />} onClick={(e) => setKeyNumber(e.key)}>
            <Link to={`${match.path}/invoicesList`}>Invoices </Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<SnippetsOutlined />} onClick={(e) => setKeyNumber(e.key)}>
            <Link to={`${match.path}/statistic`}>Statistics </Link>
          </Menu.Item>
        </Menu>
      </Sider>

      <Layout className="site-layout">
        <HeaderComponent />
        <Content style={{ margin: '16px 16px', padding: 18, minHeight: 360, backgroundColor: '#efdbff' }}>
          <Switch>
            <Route exact path={`${match.path}/addProduct`} component={() => <AddProduct />} />
            <Route exact path={`${match.path}/updateProduct`} component={() => <UpdateProduct />} />
            <Route exact path={`${match.path}/productsList`} component={() => <ProductsList keyNumber={(e: string) => setKeyNumber(e)} />} />
            
            <Route exact path={`${match.path}/viewHistoryProduct`} component={() => <HistoryProduct/>} />

            <Route exact path={`${match.path}/invoicesList`} component={() => <InvoicesList keyNumber={(e: string) => setKeyNumber(e)} />} />
            <Route exact path={`${match.path}/addInvoice`} component={() => <AddInvoice keyNumber={(e: string) => setKeyNumber(e)}/>} />
            <Route exact path={`${match.path}/updateInvoice`} component={() => <UpdateInvoice keyNumber={(e: string) => setKeyNumber(e)} />} />

            <Route exact path={`${match.path}/statistic`} component={() => <Statistics keyNumber={(e: string) => setKeyNumber(e)} />} />
            <Route exact path={`${match.path}/viewStatisticProduct`} component={() => <ViewStatisticProduct keyNumber={(e: string) => setKeyNumber(e)} />} />

            
            <Redirect to={`${match.path}/productsList`} />
          </Switch>
        </Content>
        <FooterComponent />
      </Layout>
    </Layout>

  );
};
export default Admin;