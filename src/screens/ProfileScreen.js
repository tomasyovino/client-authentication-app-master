import { Layout, PersonalInfo, ChangePersonalInfo } from "../components";
import { useState } from "react";
import { motion } from "framer-motion"
import user from "../data/user.json";
import info from "../data/info.container.json"

const ProfileScreen = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [ userInfo, setUserInfo ] = useState(null);

  const userInfoHandler = async (data) => {
    if(userInfo) {
      setUserInfo(null);
    } else {
      setUserInfo(data);
    };
    setIsVisible(!isVisible);
  };

  return (
    <Layout displayHeader={true} data={user}>
      <PersonalInfo user={user} isVisible={isVisible} userInfoHandler={userInfoHandler} info={info} motion={motion} />
      <ChangePersonalInfo user={user} info={userInfo} isVisible={isVisible} userInfoHandler={userInfoHandler} motion={motion} />
    </Layout>
  )
}

export default ProfileScreen