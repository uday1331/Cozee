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
                  <Icon type="upload" />
                  <span className="nav-text">Add Product</span>
                  <Link to="/createproduct"></Link>
                </Menu.Item>
                <Menu.Item key="sub2">
                  <Icon type="table" />
                  <span className="nav-text">View Products</span>
                </Menu.Item>
              </SubMenu>
              <Menu.Item key="3">
                <Icon type="book" />
                <span className="nav-text">Sales</span>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Header
              style={{
                background: "#fff",
                padding: 0,
                textAlign: "right"
              }}
            >
              <Button type="primary" size="Large" style={{ marginRight: 20 }}>
                Logout
              </Button>
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
