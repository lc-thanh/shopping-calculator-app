import React, {useEffect, useState} from 'react';
import {Button, Form, Input, InputNumber, Modal, Radio, Space} from 'antd';
import {useDispatch, useSelector} from "react-redux";
import {fetchItems, selectStatus, updateItemSaga} from "../tableItems/tableItemsSlice";
const { TextArea } = Input;
const CollectionCreateForm = ({ open, loading, onCreate, onCancel, formName, defaultName, defaultItem, defaultCost, defaultNote }) => {
    const [updateForm] = Form.useForm();

    const startUpdateItem = () => {
        updateForm
            .validateFields()
            .then((values) => {
                // updateForm.resetFields();
                onCreate(values);
            })
            .catch((info) => {
                console.log('Validate Failed:', info);
            });
    }

    return (
        <Modal
            open={open}
            title="Sửa hóa đơn"
            // okText="Sửa"
            // cancelText="Hủy"
            onCancel={() => {
                updateForm.resetFields();
                onCancel();
            }}
            // onOk={() => {
            //     updateForm
            //         .validateFields()
            //         .then((values) => {
            //             updateForm.resetFields();
            //             onCreate(values);
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
                        onClick={startUpdateItem}
                    >
                        Sửa
                    </Button>
                </Space>
            ]}
        >
            <Form
                form={updateForm}
                layout="vertical"
                name={formName}
                initialValues={{
                    name: defaultName,
                    item: defaultItem,
                    cost: defaultCost,
                    note: defaultNote
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
    );
};
const AddItemFormInModel = ({ formName, defaultName, defaultItem, defaultCost, defaultNote }) => {
    const updateStatus = useSelector(selectStatus)
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (updateStatus === 'loading-update') {
            setLoading(true)
        }
        if (updateStatus === 'update-success') {
            setLoading(false)
            setOpen(false)
            dispatch(fetchItems())
        }
        if (updateStatus === 'update-fail') {
            setLoading(false)
        }
    }, [updateStatus])

    const onCreate = (values) => {
        dispatch(updateItemSaga({...values, formName}))
        console.log('Received values of form: ', {...values, formName});
    };

    return (
        <div>
            <Button
                // type="primary"
                onClick={() => {
                    setOpen(true);
                }}
            >
                Sửa
            </Button>
            <CollectionCreateForm
                open={open}
                loading={loading}
                onCreate={onCreate}
                onCancel={() => {
                    setOpen(false);
                }}
                formName={formName}
                defaultName={defaultName}
                defaultItem={defaultItem}
                defaultCost={defaultCost}
                defaultNote={defaultNote}
            />
        </div>
    );
};
export default AddItemFormInModel;