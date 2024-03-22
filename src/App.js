import React from 'react';
import {
    ShoppingCartOutlined,
    YoutubeOutlined
} from '@ant-design/icons';
import {Layout, Menu} from 'antd';
import './App.css'
import {useLocation, useNavigate, Routes, Route} from "react-router-dom";
import ShoppingAppScreen from "./screens/shoppingApp";
import YoutubePrPlansManagerScreen from "./screens/youtubePrPlansManager";
import {Content} from "antd/es/layout/layout";

const {Sider} = Layout;

const App = () => {
    // const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();
    const selectedKey = useLocation().pathname

    const highlightMenu = () => {
        if (selectedKey === '/') {
            return ['1']
        } else if (selectedKey === '/youtube-pr-plans-manager') {
            return ['2']
        }
    }

    const menu_items = [
        {
            key: '1',
            icon: React.createElement(ShoppingCartOutlined),
            label: `Shopping App`,
            onClick: () => {
                navigate('/')
            }
        },
        {
            key: '2',
            icon: React.createElement(YoutubeOutlined),
            label: `YoutubePr Plans`,
            onClick: () => {
                navigate('/youtube-pr-plans-manager')
            }
        },
    ];

    return (
        <Layout hasSider>
            <Sider
                style={{
                    // overflow: 'auto',
                    // height: '100vh',
                    // position: 'fixed',
                    left: 0,
                    top: 0,
                    bottom: 0,
                }}
                // collapsible
                // collapsed={collapsed}
                // onCollapse={(value) => setCollapsed(value)}
                breakpoint="lg"
                collapsedWidth="0"
            >
                <div className="sider-logo" style={{
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                    marginTop: 30,
                    marginBottom: 40
                }}>
                    {/*<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">*/}
                    {/*    <g fill="#764ABC">*/}
                    {/*        <path*/}
                    {/*            d="M65.6 65.4c2.9-.3 5.1-2.8 5-5.8-.1-3-2.6-5.4-5.6-5.4h-.2c-3.1.1-5.5 2.7-5.4 5.8.1 1.5.7 2.8 1.6 3.7-3.4 6.7-8.6 11.6-16.4 15.7-5.3 2.8-10.8 3.8-16.3 3.1-4.5-.6-8-2.6-10.2-5.9-3.2-4.9-3.5-10.2-.8-15.5 1.9-3.8 4.9-6.6 6.8-8-.4-1.3-1-3.5-1.3-5.1-14.5 10.5-13 24.7-8.6 31.4 3.3 5 10 8.1 17.4 8.1 2 0 4-.2 6-.7 12.8-2.5 22.5-10.1 28-21.4z"/>*/}
                    {/*        <path*/}
                    {/*            d="M83.2 53c-7.6-8.9-18.8-13.8-31.6-13.8H50c-.9-1.8-2.8-3-4.9-3h-.2c-3.1.1-5.5 2.7-5.4 5.8.1 3 2.6 5.4 5.6 5.4h.2c2.2-.1 4.1-1.5 4.9-3.4H52c7.6 0 14.8 2.2 21.3 6.5 5 3.3 8.6 7.6 10.6 12.8 1.7 4.2 1.6 8.3-.2 11.8-2.8 5.3-7.5 8.2-13.7 8.2-4 0-7.8-1.2-9.8-2.1-1.1 1-3.1 2.6-4.5 3.6 4.3 2 8.7 3.1 12.9 3.1 9.6 0 16.7-5.3 19.4-10.6 2.9-5.8 2.7-15.8-4.8-24.3z"/>*/}
                    {/*        <path*/}
                    {/*            d="M32.4 67.1c.1 3 2.6 5.4 5.6 5.4h.2c3.1-.1 5.5-2.7 5.4-5.8-.1-3-2.6-5.4-5.6-5.4h-.2c-.2 0-.5 0-.7.1-4.1-6.8-5.8-14.2-5.2-22.2.4-6 2.4-11.2 5.9-15.5 2.9-3.7 8.5-5.5 12.3-5.6 10.6-.2 15.1 13 15.4 18.3 1.3.3 3.5 1 5 1.5-1.2-16.2-11.2-24.6-20.8-24.6-9 0-17.3 6.5-20.6 16.1-4.6 12.8-1.6 25.1 4 34.8-.5.7-.8 1.8-.7 2.9z"/>*/}
                    {/*    </g>*/}
                    {/*</svg>*/}
                    <svg width="60" viewBox="0 0 35 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g filter="url(#filter0_bd_131_2646)">
                            <path d="M19.45 6.69308L29.156 13.2558C29.3649 13.397 29.5361 13.5884 29.6546 13.8129C29.773 14.0373 29.835 14.288 29.835 14.5426C29.835 14.7972 29.773 15.0479 29.6546 15.2724C29.5361 15.4969 29.3649 15.6882 29.156 15.8295L19.45 22.3937C18.8237 22.8173 18.0878 23.0434 17.335 23.0434C16.5822 23.0434 15.8462 22.8173 15.2199 22.3937L5.51389 15.8295C5.30504 15.6882 5.1338 15.4969 5.01536 15.2724C4.89693 15.0479 4.83496 14.7972 4.83496 14.5426C4.83496 14.288 4.89693 14.0373 5.01536 13.8129C5.1338 13.5884 5.30504 13.397 5.51389 13.2558L15.2199 6.69308C15.8462 6.26946 16.5822 6.0434 17.335 6.0434C18.0878 6.0434 18.8237 6.26946 19.45 6.69308Z" fill="url(#paint0_linear_131_2646)"/>
                        </g>
                        <g filter="url(#filter1_bd_131_2646)">
                            <path d="M19.45 0.693076L29.156 7.25576C29.3649 7.39701 29.5361 7.58837 29.6546 7.81286C29.773 8.03734 29.835 8.28802 29.835 8.54262C29.835 8.79723 29.773 9.0479 29.6546 9.27239C29.5361 9.49687 29.3649 9.68823 29.156 9.82948L19.45 16.3937C18.8237 16.8173 18.0878 17.0434 17.335 17.0434C16.5822 17.0434 15.8462 16.8173 15.2199 16.3937L5.51389 9.82948C5.30504 9.68823 5.1338 9.49687 5.01536 9.27239C4.89693 9.0479 4.83496 8.79723 4.83496 8.54262C4.83496 8.28802 4.89693 8.03734 5.01536 7.81286C5.1338 7.58837 5.30504 7.39701 5.51389 7.25576L15.2199 0.693076C15.8462 0.269456 16.5822 0.043396 17.335 0.043396C18.0878 0.043396 18.8237 0.269456 19.45 0.693076Z" fill="url(#paint1_linear_131_2646)" shapeRendering="crispEdges"/>
                            <path d="M19.1699 1.10724L19.1699 1.10728L28.8759 7.66993C29.0162 7.76481 29.132 7.89387 29.2123 8.04617C29.2927 8.1985 29.335 8.36906 29.335 8.54262C29.335 8.71619 29.2927 8.88674 29.2123 9.03908C29.132 9.19138 29.0162 9.32043 28.8759 9.41532L19.1699 15.9795L19.1699 15.9796C18.6259 16.3475 17.9874 16.5434 17.335 16.5434C16.6825 16.5434 16.044 16.3475 15.5 15.9796L15.5 15.9795L5.794 9.41531C5.65371 9.32043 5.53794 9.19138 5.45759 9.03908L5.01536 9.27239L5.45759 9.03908C5.37722 8.88674 5.33496 8.71619 5.33496 8.54262C5.33496 8.36906 5.37722 8.19851 5.45759 8.04617L5.01536 7.81286L5.45759 8.04617C5.53793 7.89389 5.65368 7.76485 5.79395 7.66997C5.79397 7.66995 5.79398 7.66994 5.794 7.66993L15.5 1.10728L15.5 1.10724C16.044 0.739295 16.6825 0.543396 17.335 0.543396C17.9874 0.543396 18.6259 0.739294 19.1699 1.10724Z" stroke="url(#paint2_linear_131_2646)" shapeRendering="crispEdges"/>
                        </g>
                        <defs>
                            <filter id="filter0_bd_131_2646" x="0.834961" y="2.0434" width="33" height="29" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                                <feGaussianBlur in="BackgroundImageFix" stdDeviation="2"/>
                                <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_131_2646"/>
                                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                <feOffset dy="4"/>
                                <feGaussianBlur stdDeviation="2"/>
                                <feComposite in2="hardAlpha" operator="out"/>
                                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                                <feBlend mode="normal" in2="effect1_backgroundBlur_131_2646" result="effect2_dropShadow_131_2646"/>
                                <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_131_2646" result="shape"/>
                            </filter>
                            <filter id="filter1_bd_131_2646" x="0.834961" y="-3.9566" width="33" height="29" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                                <feGaussianBlur in="BackgroundImageFix" stdDeviation="2"/>
                                <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_131_2646"/>
                                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                <feOffset dy="4"/>
                                <feGaussianBlur stdDeviation="2"/>
                                <feComposite in2="hardAlpha" operator="out"/>
                                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                                <feBlend mode="normal" in2="effect1_backgroundBlur_131_2646" result="effect2_dropShadow_131_2646"/>
                                <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_131_2646" result="shape"/>
                            </filter>
                            <linearGradient id="paint0_linear_131_2646" x1="25.9804" y1="4.49669" x2="4.37554" y2="22.7541" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#06FF88"/>
                                <stop offset="0.4" stopColor="#107DE1"/>
                                <stop offset="0.855" stopColor="#E110A7"/>
                            </linearGradient>
                            <linearGradient id="paint1_linear_131_2646" x1="1.08496" y1="18.7434" x2="19.5679" y2="-7.25558" gradientUnits="userSpaceOnUse">
                                <stop stopColor="white" stopOpacity="0.2"/>
                                <stop offset="1" stopColor="white" stopOpacity="0.5"/>
                            </linearGradient>
                            <linearGradient id="paint2_linear_131_2646" x1="27.335" y1="18.7434" x2="13.9702" y2="-4.73231" gradientUnits="userSpaceOnUse">
                                <stop stopColor="white" stopOpacity="0"/>
                                <stop offset="1" stopColor="white"/>
                            </linearGradient>
                        </defs>
                    </svg>
                        <span style={{
                            fontSize: 25,
                            fontWeight: 'bold',
                            color: 'white',
                            marginRight: 10,
                            marginLeft: -10
                        }}>ThanhKL</span>

                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    selectedKeys={highlightMenu()}
                    items={menu_items}
                    style={{
                        display: "fixed"
                    }}
                />
            </Sider>
            <Layout
                className="site-layout"
                // style={(!collapsed) ? {
                //     marginLeft: 200,
                // } : {
                //     marginLeft: 0,
                // }}
                // style={{minWidth: "fit-content"}}
            >
                <Content
                    style={{
                        margin: '0 16px',
                    }}
                >
                    <Routes>
                        <Route path="/" element={<ShoppingAppScreen/>}/>
                        <Route path="/youtube-pr-plans-manager" element={<YoutubePrPlansManagerScreen/>}/>
                    </Routes>
                </Content>

            </Layout>
        </Layout>
    );
};

export default App;