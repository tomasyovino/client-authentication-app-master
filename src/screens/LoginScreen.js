import { Layout, Form  } from '../components';

const LoginScreen = ({ loginForm }) => {
  return (
    <Layout>
      <Form data={loginForm} />
    </Layout>
  )
}

export default LoginScreen