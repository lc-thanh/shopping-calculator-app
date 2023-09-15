import React, {useEffect, useState} from 'react';
import {Button, Form, Input, InputNumber, message, Modal, Radio, Space} from 'antd';
import {useDispatch, useSelector} from "react-redux";
import {fetchItems, addItemSaga, selectStatus} from "../tableItems/tableItemsSlice";
const { TextArea } = Input;
const CollectionCreateForm = ({ open, onExit, onCancel }) => {
    const addStatus = useSelector(selectStatus)
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();

    const startAddItem = () => {
        form
            .validateFields()
            .then((values) => {
                // form.resetFields();
                dispatch(addItemSaga(values))
            })
            .catch((info) => {
                console.log('Validate Failed:', info);
            });
    }

    useEffect(() => {
        if (addStatus === 'loading-add') {
            setLoading(true)
        }
        if (addStatus === 'add-success') {
            setLoading(false)
            form.resetFields()
            onExit()
        }
        if (addStatus === 'add-fail') {
            setLoading(false)
        }
    }, [addStatus])

    return (
        <>
            {contextHolder}
            <Modal
                open={open}
                title="Thêm hóa đơn mới"
                // okText="Thêm"
                // cancelText="Hủy"
                onCancel={onCancel}
                // onOk={() => {
                //     form
                //         .validateFields()
                //         .then((values) => {
                //             // form.resetFields();
                //             dispatch(addItemSaga(values))
                //         })
                //         .catch((info) => {
                //             console.log('Validate Failed:', info);
                //         });
                // }}
                footer={[
                    <Space>
                        <Button
                            onClick={onCancel}
                        >Hủy</Button>
                        <Button
                            type="primary"
                            loading={loading}
                            onClick={startAddItem}
                        >
                            Thêm
                        </Button>
                    </Space>
                ]}
            >
                <Form
                    form={form}
                    layout="vertical"
                    name="form_in_modal"
                    initialValues={{
                        note: '',
                    }}
                >
                    <Form.Item
                        name="name"
                        label="Ai mua?"
                        rules={[
                            {
                                required: true,
                                message: 'Chọn đi!'
                            }
                        ]}
                    >
                        <Radio.Group buttonStyle="solid">
                            <Radio.Button value="thanh"> Thành </Radio.Button>
                            <Radio.Button value="ha"> Hà </Radio.Button>
                            <Radio.Button value="an"> An </Radio.Button>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item
                        name="item"
                        label="Mua gì?"
                        rules={[
                            {
                                required: true,
                                message: 'Điền đi! Đ được để trống!',
                            },
                        ]}
                    >
                        <Input
                            placeholder={"Đồ đã mua"}
                            spellCheck={false}
                        />
                    </Form.Item>

                    <Form.Item
                        name="cost"
                        label="Mấy tiền?"
                        rules={[
                            {
                                required: true,
                                message: 'Điền đi! Đ được để trống!',
                            },
                        ]}
                    >
                        <InputNumber
                            min={0}
                            max={1000000000}
                            formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                            style={{
                                width: "30%"
                            }}
                        />
                    </Form.Item>

                    <Form.Item name="note" label="Ghi chú">
                        <TextArea
                            rows={4}
                            spellCheck={false}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};
const AddItemFormInModel = () => {
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false);
    const onExit = () => {
        console.log('Thêm dữ liệu thành công!');
        setOpen(false);
        dispatch(fetchItems());
    };
    return (
        <div>
            <Button
                type="primary"
                onClick={() => {
                    setOpen(true);
                }}
            >
                Thêm Item
            </Button>
            <CollectionCreateForm
                open={open}
                onExit={onExit}
                onCancel={() => {
                    setOpen(false);
                }}
            />
        </div>
    );
};
export default AddItemFormInModel;