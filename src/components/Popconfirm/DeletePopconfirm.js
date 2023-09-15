import React, {useEffect, useState} from 'react';
import { Button, Popconfirm, message } from 'antd';
import {useDispatch, useSelector} from "react-redux";
import {selectStatus} from "../tableItems/tableItemsSlice";
import {fetchItems, deleteItemsSaga} from "../tableItems/tableItemsSlice";
const DeletePopconfirm = ({ selectedRowKeys, resetSelectedRowKeys }) => {
    const deleteStatus = useSelector(selectStatus)
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();

    useEffect(() => {
        if (deleteStatus === 'loading-delete') {
            setConfirmLoading(true)
        }
        if (deleteStatus === 'delete-success') {
            setConfirmLoading(false)
            setTimeout(() => {
                dispatch(fetchItems())
            }, 500)
            setOpen(false)
            resetSelectedRowKeys()
        }
        if (deleteStatus === 'delete-fail') {
            setConfirmLoading(false)
            setOpen(false)
        }
    }, [deleteStatus])

    const hasSelected = selectedRowKeys.length > 0;
    const showPopconfirm = () => {
        setOpen(true);
    };
    const handleOk = () => {
        dispatch(deleteItemsSaga(selectedRowKeys))
    };
    const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpen(false);
    };
    return (
        <>
            {contextHolder}
            <Popconfirm
                title="Xác nhận"
                description="Bạn có muốn xóa các hóa đơn đã chọn?"
                cancelText={'Không'}
                okText={'Có'}
                open={open}
                onConfirm={handleOk}
                okButtonProps={{
                    loading: confirmLoading,
                    danger: true,
                }}
                onCancel={handleCancel}
            >
                <Button disabled={!hasSelected} onClick={showPopconfirm} danger>
                    Xóa
                </Button>
            </Popconfirm>
        </>
    );
};
export default DeletePopconfirm;