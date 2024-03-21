import React from 'react';
import {DownOutlined} from '@ant-design/icons';
import {DatePicker, Dropdown, Space, Typography} from 'antd';
import {useDispatch, useSelector} from "react-redux";
import {
    selectDateRangeByMonth, selectDateRangeByRange,
    selectSelectedKey,
    setDateRangeByMonth,
    setDateRangeByRange,
    setSelectedKey
} from "./dateRangePickerSlice";
import dayjs from "dayjs";

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

const DropDown = () => {
    const dispatch = useDispatch()
    const selectedKey = useSelector(selectSelectedKey);
    const dateRangeByMonthString = useSelector(selectDateRangeByMonth);
    const dateRangeByRangeString = useSelector(selectDateRangeByRange);

    const onClick = ({key}) => {
        console.log(`Clicked on item ${key}`)
        dispatch(setSelectedKey(key))
    }
    const onChangeMonthPicker = (value, dateString) => {
        console.log('Selected Time: ', value);
        console.log('Formatted Selected Time: ', dateString);
        dispatch(setDateRangeByMonth(dateString))
    };

    const onChangeRangePicker = (value, dateString) => {
        console.log('Selected Time: ', value);
        console.log('Range Selected Time: ', dateString);
        dispatch(setDateRangeByRange(dateString))
    }

    const defaultDateRangeValue = () => {
        if (selectedKey === '1') {
            if (dateRangeByMonthString === '') {
                return false
            }
            return dayjs(String(dateRangeByMonthString), 'MM/YYYY')
        }
        if (selectedKey === '2') {
            if (dateRangeByRangeString[0] === '' && dateRangeByRangeString[1] === '') {
                return [false, false]
            }
            return [dayjs(String(dateRangeByRangeString[0]), "DD/MM/YYYY"), dayjs(String(dateRangeByRangeString[1]), "DD/MM/YYYY")]
        }
    }

    return (
        <Space direction="vertical" align="end">
            <Dropdown
                menu={{
                    items,
                    selectable: true,
                    defaultSelectedKeys: [selectedKey],
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
                <DatePicker
                    defaultValue={defaultDateRangeValue()}
                    placeholder="Chọn Tháng"
                    onChange={onChangeMonthPicker}
                    format="MM/YYYY"
                    renderExtraFooter={() => 'Hiển thị kết quả theo tháng'}
                    picker="month"
                />
            )}
            {(selectedKey === '2') && (
                <RangePicker
                    // showTime={{
                    //     format: 'HH:mm',
                    // }}
                    defaultValue={defaultDateRangeValue()}
                    format="DD/MM/YYYY"
                    onChange={onChangeRangePicker}
                />
            )}
        </Space>
    );
}
export default DropDown;