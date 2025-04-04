import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore"

const Profile = () => {

    const {getProfile} = useAuthStore();

    useEffect(() => {
        getProfile();
    })

  return (
    <div>Profile</div>
  )
}

export default Profile