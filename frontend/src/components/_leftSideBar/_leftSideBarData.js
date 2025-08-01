import {PiHouseLine} from 'react-icons/pi';
import { IoSettingsOutline } from "react-icons/io5";
import { MdLogout } from "react-icons/md";

//Column
export const  leftSideBarData = [
  {
    title: "Home",
    icon: <PiHouseLine />,
    link: "/home"
  },
  {
    title: "Settings",
    icon: <IoSettingsOutline />,
    link: "/settings"
  },
  {
    title: "Logout",
    icon: <MdLogout />,
    link: "logout"
  }
]