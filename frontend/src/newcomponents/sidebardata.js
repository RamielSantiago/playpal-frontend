import {PiHouseLine} from 'react-icons/pi';
import { FaRegBookmark } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";

//Column
export const  sidebardata = [
    {
        title: "Home",
        icon: <PiHouseLine />,
        link: "/home"
    },
    {
        title: "Saved",
        icon: <FaRegBookmark />,
        link: "/saved"
    },
    {
        title: "Settings",
        icon: <IoSettingsOutline />,
        link: "/settings"
    }
]