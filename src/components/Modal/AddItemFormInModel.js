import React, { useState } from 'react';
import {Button, Form, Input, InputNumber, Modal, Radio} from 'antd';
const { TextArea } = Input;
const CollectionCreateForm = ({ open, onCreate, onCancel }) => {
    const [form] = Form.useForm();
    return (
        <Modal
            open={open}
            title="Create a new collection"
            okText="Create"
            cancelText="Cancel"
            onCancel={onCancel}
            onOk={() => {
                form
                    .validateFields()
                    .then((values) => {
                        form.resetFields();
                        onCreate(values);
                    })
                    .catch((info) => {
                        console.log('Validate Failed:', info);
                    });
            }}
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
                    name="buyer"
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
                    // initialValue={'test'}
                >
                    <Input />
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
                    <InputNumber min={0} max={1000000000} />
                </Form.Item>
                <Form.Item name="note" label="Ghi chú">
                    <TextArea rows={4} />
                </Form.Item>
                {/*<Form.Item name="modifier" className="collection-create-form_last-form-item">*/}
                {/*    <Radio.Group>*/}
                {/*        <Radio value="public">Public</Radio>*/}
                {/*        <Radio value="private">Private</Radio>*/}
                {/*    </Radio.Group>*/}
                {/*</Form.Item>*/}
            </Form>
        </Modal>
    );
};
const AddItemFormInModel = () => {
    const [open, setOpen] = useState(false);
    const onCreate = (values) => {
        console.log('Received values of form: ', values);
        setOpen(false);
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
                onCreate={onCreate}
                onCancel={() => {
                    setOpen(false);
                }}
            />
        </div>
    );
};
export default AddItemFormInModel;