import { Card, Form, Input, Button } from 'antd';
import styles from '@/styles/Login.module.scss';

export interface LoginFormProps {
  handleFinish: (loginPayload: any) => void;
}

export const LoginForm = ({ handleFinish }: LoginFormProps) => {
  return (
    <Card title="Login" className={styles.loginCard}>
      <Form name="login" onFinish={handleFinish} autoComplete="off" data-testid="LoginForm.Form">
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input placeholder="email" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password placeholder="password" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={false}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};
