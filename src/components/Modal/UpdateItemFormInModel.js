import React, { useState } from 'react';
import {Button, Form, Input, InputNumber, Modal, Radio} from 'antd';
const { TextArea } = Input;
const CollectionCreateForm = ({ open, onCreate, onCancel, formName, defaultName, defaultItem, defaultCost, defaultNote }) => {
    const [updateForm] = Form.useForm();

    return (
        <Modal
            open={open}
            title="Sửa hóa đơn"
            okText="Sửa"
            cancelText="Hủy"
            onCancel={() => {
                updateForm.resetFields();
                onCancel();
            }}
            onOk={() => {
                updateForm
                    .validateFields()
                    .then((values) => {
                        updateForm.resetFields();
                        onCreate(values);
                    })
                    .catch((info) => {
                        console.log('Validate Failed:', info);
                    });
            }}
        >
            <Form
                form={updateForm}
                layout="vertical"
                name={formName}
                initialValues={{
                    buyer: defaultName,
                    item: defaultItem,
                    cost: defaultCost,
                    note: defaultNote
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
const AddItemFormInModel = ({ formName, defaultName, defaultItem, defaultCost, defaultNote }) => {
    const [open, setOpen] = useState(false);
    const onCreate = (values) => {
        console.log('Received values of form: ', {...values, formName});
        setOpen(false);
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