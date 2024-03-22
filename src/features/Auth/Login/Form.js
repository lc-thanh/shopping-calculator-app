import React, {useState} from 'react';
import { Button, Checkbox, Form, Input } from 'antd';

const LoginForm = () => {
    // const [username, setUsername] = useState('')
    // const [password, setPassword] = useState('')

    const onFinish = (values) => {
        console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    // const onSubmitHandle = (e) => {
    //     // e.preventDefault()
    //     const login_user = {
    //         username: username,
    //         password: password,
    //     }
    //     console.log(login_user)
    // }

    return (
        <Form
            name="basic-login-form"
            labelCol={{
                span: 8,
            }}
            wrapperCol={{
                span: 16,
            }}
            style={{
                maxWidth: 600,
                width: 400,
                marginRight: 50,
                marginTop: 20,
            }}
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            // onSubmit={onSubmitHandle}
        >
            <Form.Item
                label="Username"
                name="username"
                rules={[
                    {
                        required: true,
                        message: 'Please input your username!',
                    },
                ]}
            >
                {/*<Input onChange={(target) => {setUsername(target.value)}}/>*/}
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                ]}
            >
                {/*<Input.Password onChange={(target) => {setPassword(target.value)}}/>*/}
                <Input.Password />
            </Form.Item>

            <Form.Item
                name="remember"
                valuePropName="checked"
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
            >
                <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
            >
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    )
};
export default LoginForm;