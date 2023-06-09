import { Button, Card, Form, Input } from 'antd';
import styles from '@/styles/Login.module.scss';
import request from 'graphql-request';
import {
  LoginMutationResponse,
  LoginMutationVariables,
  loginMutationDocument,
} from '@/infrastructure/graphql/documents/login';
import Cookies from 'js-cookie';
import { TOKEN_COOKIE_NAME } from '@/lib/auth';
import { useRouter } from 'next/router';

// @NOTE: handle errors better

export default function LoginPage() {
  const { push } = useRouter();

  const handleFinish = async (variables: LoginMutationVariables) => {
    try {
      const {
        login: { token },
      } = await request<LoginMutationResponse, LoginMutationVariables>({
        url: process.env.NEXT_PUBLIC_GQL_API_URL,
        document: loginMutationDocument,
        variables,
      });

      Cookies.set(TOKEN_COOKIE_NAME, token);
      push('/users');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.container}>
      <Card title="Login" className={styles.loginCard}>
        <Form name="login" onFinish={handleFinish} autoComplete="off">
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={false}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
