import React, {useEffect, useState} from 'react';
import {Table, Space, Button, message, Spin} from 'antd';
// import {Backup_AddItemModal} from "../Modal/Backup_AddItemModal";
import {people} from "../../data_controller";
import AddItemFormInModel from "../Modal/AddItemFormInModel";
import UpdateItemFormInModel from "../Modal/UpdateItemFormInModel";
import {useDispatch, useSelector} from "react-redux";
import {
    fetchItems,
    selectItemsData,
    selectStatus,
    selectSumBill,
    selectOnePersonBill
} from "./tableItemsSlice";
import DeletePopconfirm from "../Popconfirm/DeletePopconfirm";
// import data from '../../data.json'

const formatter = new Intl.NumberFormat('vi', {
    style: 'currency',
    currency: 'VND',
})
const date_formatter = (date) => {
    const [day, month, year] = date.split('/')
    return month + '/' + day + '/' + year
}

const columns = [
    {
        title: 'Người mua',
        dataIndex: 'name',
        render: (_, {name}) => (
            <span>{people[name]}</span>
        ),
        filters: [
            {
                text: people["thanh"],
                value: people["thanh"],
            },
            {
                text: people.ha,
                value: people.ha,
            },
            {
                text: people.an,
                value: people.an,
            },
            {
                text: 'Submenu',
                value: 'Submenu',
                children: [
                    {
                        text: 'Green',
                        value: 'Green',
                    },
                    {
                        text: 'Black',
                        value: 'Black',
                    },
                ],
            },
        ],
        // specify the condition of filtering result
        // here is that finding the name started with `value`
        onFilter: (value, record) => {
            // console.log(people[record.name])
            return people[record.name].indexOf(value) === 0
        },
        sorter: (a, b) => people[a.name].length - people[b.name].length,
        sortDirections: ['descend'],
    },
    {
        title: 'Giá',
        dataIndex: 'cost',
        // defaultSortOrder: 'descend',
        render: (_, {cost}) => (
            <span>{formatter.format(cost)}</span>
        ),
        sorter: (a, b) => a.cost - b.cost,
        align: "right",
    },
    {
        title: 'Tên hàng',
        dataIndex: 'item',
        filters: [
            {
                text: 'Rau',
                value: 'rau',
            },
            {
                text: 'Thịt',
                value: 'Thịt',
            },
        ],
        onFilter: (value, record) => record.item.toLowerCase().includes(value.toLowerCase()),
    },
    {
        title: 'Ghi chú',
        dataIndex: 'note',
    },
    {
        title: 'Ngày thêm',
        dataIndex: 'add_date',
        defaultSortOrder: 'descend',
        sorter: (a, b) => {
            const date_a = new Date(date_formatter(a.add_date))
            const date_b = new Date(date_formatter(b.add_date))
            return date_a - date_b
        },
    },
    {
        title: 'Chức năng',
        render: (_, record) => (
            <UpdateItemFormInModel formName={'update-form-' + record.key} defaultName={record.name}
                                   defaultItem={record.item} defaultCost={record.cost} defaultNote={record.note}/>
        ),
        align: "center",
    }
];

const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
};

const TableItems = () => {
    const items_data = useSelector(selectItemsData)
    const sumBill = useSelector(selectSumBill)
    const onePersonBill = useSelector(selectOnePersonBill)
    // const items_data = data
    const table_status = useSelector(selectStatus)
    const dispatch = useDispatch()
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [loading, setLoading] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();

    useEffect(() => {
        dispatch(fetchItems())
    }, [dispatch])

    useEffect(() => {
        console.log(table_status)

        switch (table_status) {
            case "loading-fetch": {
                setLoading(true)
                break
            }

            case 'fetch-success': {
                setLoading(false)
                messageApi.open({
                    type: 'success',
                    content: 'Lấy dữ liệu thành công!',
                    style: {
                        marginLeft: 200
                    },
                });
                break
            }

            case 'fetch-fail': {
                setLoading(false)
                messageApi.open({
                    type: 'error',
                    content: 'Không lấy được dữ liệu',
                    style: {
                        marginLeft: 200
                    },
                });
                break
            }

            case 'add-success': {
                messageApi.open({
                    type: 'success',
                    content: 'Thêm hóa đơn thành công!',
                    style: {
                        marginLeft: 200
                    },
                });
                break
            }

            case 'add-fail': {
                messageApi.open({
                    type: 'error',
                    content: 'Thêm thất bại',
                    style: {
                        marginLeft: 200
                    },
                });
                break
            }

            case 'delete-success': {
                messageApi.open({
                    type: 'success',
                    content: 'Xóa hóa đơn thành công!',
                    style: {
                        marginLeft: 200
                    },
                });
                break
            }

            case 'delete-fail': {
                messageApi.open({
                    type: 'error',
                    content: 'Xóa thất bại',
                    style: {
                        marginLeft: 200
                    },
                });
                break
            }

            default: {
                break
            }
        }
    }, [table_status])
    const startFetchItems = () => {
        dispatch(fetchItems())
    };
    const onSelectChange = (newSelectedRowKeys) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    const resetSelectedRowKeys = () => {
        setSelectedRowKeys([])
    }

    return (
        <div>
            {contextHolder}
            {items_data.length !== 0 ? (
                <>
                    <div style={{
                        paddingBottom: 10,
                        fontSize: 16,
                        display: "flex",
                        justifyContent: "space-evenly"
                    }}>
                        <div><b>Tổng thiệt hại: </b><i style={{color: 'red'}}>{formatter.format(sumBill)}</i></div>
                        <div>Chia mỗi người: <i style={{color: 'red'}}>{formatter.format(sumBill / 3)}</i></div>
                    </div>
                    <div style={{
                        paddingBottom: 10,
                        fontSize: 16,
                        display: "flex",
                        justifyContent: "space-evenly"
                    }}>
                        <div>Thành chi: <i style={{color: 'blueviolet'}}>{formatter.format(onePersonBill("thanh"))}</i>
                        </div>
                        <div>Hà chi: <i style={{color: 'blueviolet'}}>{formatter.format(onePersonBill("ha"))}</i></div>
                        <div>An chi: <i style={{color: 'blueviolet'}}>{formatter.format(onePersonBill("an"))}</i></div>
                    </div>
                </>
            ) : ''}
            <div style={{
                alignItems: "start",
                marginBottom: 20,
                width: "min-content"
            }}>
                <Space>
                    <Button type="primary" onClick={startFetchItems} loading={loading}>
                        Reload
                    </Button>
                    <AddItemFormInModel />
                    <DeletePopconfirm selectedRowKeys={selectedRowKeys} resetSelectedRowKeys={resetSelectedRowKeys} />
                </Space>
            </div>
            <Spin spinning={loading}>
                <Table rowSelection={rowSelection} columns={columns} dataSource={items_data} onChange={onChange}/>
            </Spin>
        </div>
    );
}
export default TableItems;