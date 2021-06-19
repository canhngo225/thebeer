import {Button, Col, Layout, Row} from "antd";
import { Link } from "react-router-dom";
import beer from "../assets/image.png";
import './Header.css';
const HeaderComponent = () =>{
    return(
        <Layout.Header className="site-layout-background" style={{padding: 0}}>
            <Row>
                <Col span="6" offset="1">
                    <Link className="webName" to="/admin/productsList">The B<img src={beer} height="8%" alt="ee"></img>r</Link>
                </Col>
                <Col span="4" offset="13">
                    <strong>Admin   </strong>
                    <Button ghost type="primary">Logout</Button>
                </Col>
            </Row>
        </Layout.Header>
    );
}

export default HeaderComponent;