import { Layout, Form } from "../components"

const RegisterScreen = ({ registerForm }) => {
  return (
    <Layout>
      <Form data={registerForm} />
    </Layout>
  )
}

export default RegisterScreen