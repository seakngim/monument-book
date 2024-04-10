import { Avatar, Button, Image, Space } from "antd";
import React, { useEffect } from "react";
import {
  DownloadOutlined,
  RotateLeftOutlined,
  RotateRightOutlined,
  SwapOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
} from "@ant-design/icons";
import UserProfileService from "../../redux/service/UserProfileService";
import { useDispatch, useSelector } from "react-redux";
import { setUserProfile } from "../../redux/slices/UserProfileSlice";
import { Link } from "react-router-dom";
const src =
  "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png";

function UserProfile() {
  const dispatch = useDispatch();
  const resuser = useSelector((state) => state.userprofile.userProfiles);
  console.log(resuser, "rewsuser");
  const onDownload = () => {
    fetch(src)
      .then((response) => response.blob())
      .then((blob) => {
        const url = URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.download = "image.png";
        document.body.appendChild(link);
        link.click();
        URL.revokeObjectURL(url);
        link.remove();
      });
  };
  const handleGetProfile = () => {
    UserProfileService.getUserProfile().then((res) => {
      console.log(res);
      dispatch(setUserProfile(res.data));
    });
  };
  useEffect(() => {
    handleGetProfile();
  }, []);
  return (
    <>
      {/* user profile image  */}
      <div className="bg-gray-600 w-[1000px] m-auto mt-10 shadow-slate-750 shadow-lg rounded-sm ">
        <div className="bg-gray-300  p-5">
          <div className="pb-2">
            <div className="flex justify-end">
              <Link to={"/"}>
                <Button>X</Button>
              </Link>
            </div>
            <h1 className="text-3xl font-bold ">My Profile</h1>
          </div>
          <div className="border-b pb-3 flex justify-between items-end border-gray-400 ">
            <Image
              width={200}
              height={200}
              className="rounded-sm"
              src={resuser.coverImg ? resuser.coverImg : src}
              preview={{
                toolbarRender: (
                  _,
                  {
                    transform: { scale },
                    actions: {
                      onFlipY,
                      onFlipX,
                      onRotateLeft,
                      onRotateRight,
                      onZoomOut,
                      onZoomIn,
                    },
                  }
                ) => (
                  <Space size={12} className="toolbar-wrapper">
                    <DownloadOutlined onClick={onDownload} />
                    <SwapOutlined rotate={90} onClick={onFlipY} />
                    <SwapOutlined onClick={onFlipX} />
                    <RotateLeftOutlined onClick={onRotateLeft} />
                    <RotateRightOutlined onClick={onRotateRight} />
                    <ZoomOutOutlined
                      disabled={scale === 1}
                      onClick={onZoomOut}
                    />
                    <ZoomInOutlined
                      disabled={scale === 50}
                      onClick={onZoomIn}
                    />
                  </Space>
                ),
              }}
            />
            <Link to={"/editProfile"}>
              <Button className="bg-blue-500 text-white">
                Edit User profile
              </Button>
            </Link>
          </div>
        </div>
        <div className=" text-white p-10">
          <div className="grid grid-cols-4 p-3">
            <div className="col-span-1">
              <p>Username :</p>
            </div>
            <div className="col-span-3">
              <p>{resuser.username}</p>
            </div>
          </div>
          <div className="grid grid-cols-4 p-3">
            <div className="col-span-1">
              <p>Email :</p>
            </div>
            <div className="col-span-3">
              <p>{resuser.email}</p>
            </div>
          </div>
          <div className="grid grid-cols-4 p-3">
            <div className="col-span-1">
              <p>Phone Number :</p>
            </div>
            <div className="col-span-3">
              <p>{resuser.phoneNum}</p>
            </div>
          </div>
          <div className="grid grid-cols-4 p-3">
            <div className="col-span-1">
              <p>Address :</p>
            </div>
            <div className="col-span-3">
              <p>{resuser.address ? resuser.address : "null"}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserProfile;
