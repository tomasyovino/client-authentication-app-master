import { Layout, PersonalInfo, ChangePersonalInfo } from "../components"

const ProfileScreen = () => {
  return (
    <Layout displayHeader={true}>
      <PersonalInfo />
      <ChangePersonalInfo />
    </Layout>
  )
}

export default ProfileScreen