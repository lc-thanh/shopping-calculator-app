import { PlusOutlined } from '@ant-design/icons';
// import React, {useState} from 'react';
import {
    Button,
    Form,
    Input,
    InputNumber,
    Radio,
    Slider,
    Switch,
    Upload,
} from 'antd';
const { TextArea } = Input;
const normFile = (e) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};
const AddItemForm = () => {
    const [form] = Form.useForm()

    // const [componentDisabled, setComponentDisabled] = useState(true);
    return (
        <>
            <Form
                id="add_item_form"
                form={form}
                labelCol={{
                    span: 5,
                }}
                wrapperCol={{
                    span: 17,
                }}
                layout="horizontal"
                style={{
                    maxWidth: 600,
                }}
                // fields={fields}
            >
                <Form.Item id="buyer" label="Ai mua?">
                    <Radio.Group defaultValue={"ha"}>
                        <Radio value="thanh"> Thành </Radio>
                        <Radio value="ha"> Hà </Radio>
                        <Radio value="an"> An </Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item id="item_buy" label="Mua gì?">
                    <Input defaultValue="none" />
                </Form.Item>

                <Form.Item label="Mấy tiền?" value={1000}>
                    <InputNumber min={0} max={1000000000} />
                </Form.Item>
                <Form.Item label="Ghi chú">
                    <TextArea rows={4} />
                </Form.Item>
                <Form.Item label="Switch" valuePropName="checked">
                    <Switch />
                </Form.Item>
                <Form.Item label="Upload" valuePropName="fileList" getValueFromEvent={normFile}>
                    <Upload action="/upload.do" listType="picture-card">
                        <div>
                            <PlusOutlined />
                            <div
                                style={{
                                    marginTop: 8,
                                }}
                            >
                                Upload
                            </div>
                        </div>
                    </Upload>
                </Form.Item>
                <Form.Item label="Button">
                    <Button onClick={
                        () => {
                            const form = document.getElementById('add_item_form')

                            form.addEventListener("submit", function(e) {
                                e.preventDefault();
                                const data = new FormData(form);
                                for (const [name,value] of data) {
                                    console.log(name, ":", value)
                                }
                            })
                        }
                    }>Button</Button>
                </Form.Item>
                <Form.Item label="Reset">
                    <Button onClick={
                        () => {
                            form.resetFields()
                        }
                    }>Button</Button>
                </Form.Item>
                <Form.Item label="Slider">
                    <Slider />
                </Form.Item>
            </Form>
        </>
    );
};
export default AddItemForm;