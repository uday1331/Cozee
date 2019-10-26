import React from "react";
import "antd/dist/antd.css";
import { Layout, Menu, Icon, Button } from "antd";
import { Link } from "react-router-dom";

const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;

class AppBar extends React.Component {
  state = {
    collapsed: false
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };
  render() {
    console.log("rendering");
    const { children } = this.props;
    return (
      <div className="AppBar">
        <Layout>
          <Sider
            breakpoint="lg"
            collapsedWidth="0"
            onBreakpoint={broken => {
              console.log(broken);
            }}
            onCollapse={(collapsed, type) => {
              console.log(collapsed, type);
            }}
          >
            <div
              className="logo"
              style={{
                color: "white",
                textAlign: "center",
                fontSize: 20,
                margin: 15
              }}
            >
              Cozee
            </div>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={["4"]}>
              <Menu.Item key="1">
                <Icon type="user" />
                <span className="nav-text">Profile</span>
                <Link to="/profile" />
              </Menu.Item>
              <SubMenu
                key="2"
                title={
                  <span>
                    <Icon type="shopping" />
                    <span>Products</span>
                  </span>
                }
              >
                <Menu.Item key="sub1">
                  <Link to="/products/add">
                    <Icon type="upload" />
                    <span className="nav-text">Add Product</span>
                  </Link>
                </Menu.Item>
                <Menu.Item key="sub2">
                  <Link to="/products/view">
                    <Icon type="table" />
                    <span className="nav-text">View Products</span>
                  </Link>
                </Menu.Item>
              </SubMenu>
              <Menu.Item key="3">
                <Link to="/sales">
                  <Icon type="book" />
                  <span className="nav-text">Sales</span>
                </Link>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Header
              style={{
                background: "#fff",
                padding: 0,
                textAlign: "center",
                display: "flex",
                verticalAlign: "middle"
              }}
            >
              <div
                style={{
                  fontSize: 30,
                  width: 1000,
                  textAlign: "center",
                  paddingLeft: 310
                }}
              >
                IDEA
              </div>
              <div
                style={{
                  size: 300,
                  paddingLeft: 300
                }}
              >
                <Button
                  type="primary"
                  size="large"
                  style={{ marginRight: 20, marginTop: 10 }}
                >
                  Logout
                </Button>
              </div>
            </Header>
            <Content style={{ margin: "24px 16px 0" }}>
              <div
                style={{ padding: 24, background: "#fff", minHeight: "100vh" }}
              >
                {children}
              </div>
            </Content>
          </Layout>
        </Layout>
      </div>
    );
  }
}

export default AppBar;
