import React, { FC, useEffect, useState } from "react";
import EditProfileForm from "../components/EditProfileForm";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import { getUser } from "api/user";
import { useSelector } from "react-redux";

const EditProfile: FC = () => {
  const { user } = useSelector((store: any) => store.auth);

  const params = useParams();
  const { userId } = params;

  const [profileData, setProfileData] = useState<any>(null);
  const location = useLocation();
  const isNew = location?.state?.newUser ?? false;

  useEffect(() => {
    const fetchProfile = async () => {
      if (userId) {
        const profile = await getUser(userId);
        setProfileData(profile);
      }
    };

    userId && fetchProfile();
  }, [userId]);

  if (user._id !== userId) {
    console.log("No user found");
    return null;
  }

  return (
    profileData && <EditProfileForm profileData={profileData} isNew={isNew} />
  );
};

export default EditProfile;