
import { Card, Form, Input, Button, Switch, Radio } from 'antd';
import request from 'graphql-request';
import { useRouter } from 'next/router';
import styles from '@/styles/CreateUser.module.scss';
import { createUserMutationDocument } from '@/infrastructure/graphql/documents/users';

export default function CreateUserPage() {
  const { push } = useRouter();

  const handleFinish = async (user: any) => {
    try {
      await request<unknown, any>({
        url: process.env.NEXT_PUBLIC_GQL_API_URL,
        document: createUserMutationDocument,
        variables: {
          user,
        },
      });

      push('/users');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.container}>
      <Card title="Create user" className={styles.userCard}>
        <Form name="user" onFinish={handleFinish} autoComplete="off">
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

          <Form.Item
            label="First name"
            name="firstName"
            rules={[{ required: true, message: 'Please input your first name!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Last name"
            name="lastName"
            rules={[{ required: true, message: 'Please input your last name!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Image URL"
            name="image"
            rules={[{ required: true, message: 'Please input your image URL!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Is admin" valuePropName="isAdmin">
            <Switch />
          </Form.Item>

          <Form.Item name="gender" label="Gender">
            <Radio.Group>
              <Radio value="M">Male</Radio>
              <Radio value="F">Female</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={false}>
              Create
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
