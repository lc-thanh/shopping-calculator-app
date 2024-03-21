import TableItems from "../components/tableItems/TableItems";
import {ShoppingCartOutlined} from "@ant-design/icons";
import React from "react";
import {Layout, theme} from "antd";

const {Header, Content, Footer} = Layout;

const ShoppingAppScreen = () => {
    const {
        token: {colorBgContainer},
    } = theme.useToken();

    return (
        <>
            <Header
                style={{
                    padding: 0,
                    background: colorBgContainer,
                    textAlign: 'center',
                    height: "max-content"
                }}
            >
                <h1 style={{
                    display: 'block',
                    margin: 10
                }}>
                    <ShoppingCartOutlined/> Shopping App
                </h1>
            </Header>
            <Content
                style={{
                    minHeight: "80vh",
                    margin: '24px 16px 0',
                    overflow: 'initial',
                }}
            >
                <div
                    style={{
                        padding: 24,
                        textAlign: 'center',
                        background: colorBgContainer,
                    }}
                >
                    <h2>Danh sách:</h2>
                    <TableItems/>
                </div>
            </Content>
            <Footer
                style={{
                    textAlign: 'center',
                }}
            >
                <span>Ant Design ©2023 Created by Ant UED</span>
                <br/>
                <span>App Created By: <a href={"https://www.facebook.com/lcthanh.kl/"} target="_blank"
                                         rel="noreferrer">ThanhKL</a></span>
            </Footer>
        </>
    )
}

export default ShoppingAppScreen