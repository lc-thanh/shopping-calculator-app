import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import AddItemForm from "../Form/AddItemForm";

export const Backup_AddItemModal = () => {
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const showModal = () => {
        setOpen(true);
    };
    const handleOk = () => {
        setConfirmLoading(true);
        setTimeout(() => {
            setOpen(false);
            setConfirmLoading(false);
        }, 2000);
    };
    const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpen(false);
    };
    return (
        <>
            <Button type="primary" onClick={showModal}>
                Thêm Item
            </Button>
            <Modal
                title="Thêm Item"
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                // footer={[
                //     <Button form="add_item_form" key="submit" htmlType="submit">
                //         Submit
                //     </Button>
                // ]}
            >
                <p><i>Thêm cmm đồ vào đây đi!</i></p>
                <AddItemForm />
            </Modal>
        </>
    );
};
