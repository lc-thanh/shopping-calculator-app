import React, {useState} from 'react';
import {Table} from 'antd';
// import {Backup_AddItemModal} from "../Modal/Backup_AddItemModal";
import data, {people} from "../../data_controller";
import AddItemFormInModel from "../Modal/AddItemFormInModel";
import UpdateItemFormInModel from "../Modal/UpdateItemFormInModel";

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
        onFilter: (value, record) => people[record.name].indexOf(value) === 0,
        sorter: (a, b) => people[a.name].length - people[b.name].length,
        sortDirections: ['descend'],
    },
    {
        title: 'Giá',
        dataIndex: 'cost',
        // defaultSortOrder: 'descend',
        sorter: (a, b) => a.cost - b.cost,
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
                text: 'New York',
                value: 'New York',
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
        defaultSortOrder: 'ascend',
        sorter: (a, b) => a.add_date < b.add_date,
    },
    {
        title: 'Chức năng',
        render: (_, record) => (
            <UpdateItemFormInModel formName={'update-form-'+record.key} defaultName={record.name} defaultItem={record.item} defaultCost={record.cost} defaultNote={record.note}/>
        )
    }
];

const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
};

const TableItems = () => {
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    const onSelectChange = (newSelectedRowKeys) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    const sum_data = () => data.reduce((accumulator, object) => accumulator + object.cost, 0)
    const sum_person = (person) => data.reduce((accumulator, object) => accumulator + (object.name === person ? object.cost : 0), 0)
    const formatter = new Intl.NumberFormat('vi', {
        style: 'currency',
        currency: 'VND',
    })

    return (
        <div>
            <div style={{
                paddingBottom: 10,
                fontSize: 16,
                display: "flex",
                justifyContent: "space-evenly"
            }}>
                <div><b>Tổng thiệt hại: </b><i style={{color: 'red'}}>{formatter.format(sum_data())}</i></div>
                <div>Chia mỗi người: <i style={{color: 'red'}}>{formatter.format(sum_data() / 3)}</i></div>
            </div>
            <div style={{
                paddingBottom: 10,
                fontSize: 16,
                display: "flex",
                justifyContent: "space-evenly"
            }}>
                <div>Thành chi: <i style={{color: 'blueviolet'}}>{formatter.format(sum_person(people.thanh))}</i></div>
                <div>Hà chi: <i style={{color: 'blueviolet'}}>{formatter.format(sum_person(people.ha))}</i></div>
                <div>An chi: <i style={{color: 'blueviolet'}}>{formatter.format(sum_person(people.an))}</i></div>
            </div>
            <div style={{
                alignItems: "start",
                marginBottom: 20,
                width: "min-content"
            }}>
                {/*<Backup_AddItemModal/>*/}
                <AddItemFormInModel />
            </div>
            <Table rowSelection={rowSelection} columns={columns} dataSource={data} onChange={onChange}/>
        </div>
    );
}
export default TableItems;