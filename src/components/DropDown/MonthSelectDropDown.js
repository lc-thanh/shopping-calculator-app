import React, {useState} from 'react';
import {DownOutlined} from '@ant-design/icons';
import {DatePicker, Dropdown, Space, Typography} from 'antd';
import {useDispatch} from "react-redux";
import {setDateRange} from "../tableItems/tableItemsSlice";

const {RangePicker} = DatePicker;
const items = [
    {
        key: '1',
        label: 'Chọn theo tháng',
    },
    {
        key: '2',
        label: 'Khoảng thời gian',
    },
];

const MonthSelectDropDown = () => {
    const dispatch = useDispatch()
    const [selectedKey, setSelectedKey] = useState('1')
    const onClick = ({key}) => {
        console.log(`Clicked on item ${key}`)
        setSelectedKey(key)
    }
    const onChangeMonthPicker = (value, dateString) => {
        console.log('Selected Time: ', value);
        console.log('Formatted Selected Time: ', dateString);
        console.log(Number(dateString.split('/')[1]))

        const year = dateString.split('/')[1]
        const month = dateString.split('/')[0]
        const getDaysInMonth = (year, month) => new Date(year, month, 0).getDate()

        if (value === null) {
            dispatch(setDateRange([]))
        } else {
            dispatch(setDateRange([`${month}/01/${year} 00:00:00`, `${month}/${getDaysInMonth(year, month)}/${year} 23:59:59`]))
        }
    };
    // const onOkRangePicker = (value) => {
    //     console.log('onOk: ', value);
    //     console.log(new Date(value[0]))
    // };
    const onChangeRangePicker = (value, dateString) => {
        console.log('Selected Time: ', value);

        const start_year = dateString[0].split('/')[2]
        const start_month = dateString[0].split('/')[1]
        const start_day = dateString[0].split('/')[0]

        const end_year = dateString[1].split('/')[2]
        const end_month = dateString[1].split('/')[1]
        const end_day = dateString[1].split('/')[0]

        if (value === null) {
            dispatch(setDateRange([]))
        } else {
            dispatch(setDateRange([`${start_month}/${start_day}/${start_year} 00:00:00`, `${end_month}/${end_day}/${end_year} 23:59:59`]))
        }
    }

    return (
        <Space direction="vertical" align="end">
            <Dropdown
                menu={{
                    items,
                    selectable: true,
                    defaultSelectedKeys: ['1'],
                    onClick,
                }}
                placement="bottom"
            >
                <Typography.Link>
                    <Space>
                        {(selectedKey === '1') && "Chọn theo tháng"}
                        {(selectedKey === '2') && "Chọn khoảng thời gian"}
                        <DownOutlined/>
                    </Space>
                </Typography.Link>
            </Dropdown>
            {(selectedKey === '1') && (
                <DatePicker placeholder="Chọn Tháng" onChange={onChangeMonthPicker} format="MM/YYYY"
                            renderExtraFooter={() => 'Hiển thị kết quả theo tháng'} picker="month"/>
            )}
            {(selectedKey === '2') && (
                <RangePicker
                    // showTime={{
                    //     format: 'HH:mm',
                    // }}
                    format="DD/MM/YYYY"
                    onChange={onChangeRangePicker}
                    // onOk={onOkRangePicker}
                />
            )}
        </Space>
    );
}
export default MonthSelectDropDown;