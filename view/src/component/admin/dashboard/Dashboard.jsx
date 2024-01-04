import { Outlet } from "react-router-dom";
import DashNav from "../navbar/Navbar";
import SideBar from "../sidebar/Sidebar";
import bckgrnd from '../image/regBackground.jpeg'


export default function Dashboard() {
    return (
        <div className="justify-content-between">
            <DashNav />
            <div style={{ display: "flex", flexDirection: "row" }}>
                <div>
                    <SideBar />
                </div>
                {/* <div style={{ overflowX: "scroll" , backgroundImage:`url(${bckgrnd})` }}> */}
                <div style={{overflowX:'scroll', width:'100%'}}> 
                    <Outlet />
                </div>
            </div>
        </div>
    )
}