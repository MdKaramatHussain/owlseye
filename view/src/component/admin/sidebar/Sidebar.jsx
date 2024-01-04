
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function SideBar() {
  const [show, setShow] = useState('none')
  const handleSubCategory = (show) => {
    if (show === 'block') {
      setShow('none');
    }
    else {
      setShow('block');
    }
  }

  return (
    <CDBSidebar textColor="#fff" backgroundColor="#333" >
      <CDBSidebarHeader prefix={<i className="fa fa-bars" />}>
        Menu Bar
      </CDBSidebarHeader>
      <div style={{ width: '100vh', height: '100vh', maxHeight: '90vh', overflowY: 'scroll', top: '0', bottom: '0' }}>
        {/* <div style={{width:'100%',maxHeight:'90vh', overflowY:'scroll', top:'0', bottom:'0'}}> */}
        <CDBSidebarContent>
          <CDBSidebarMenu>
            <Link to={''}>
              <CDBSidebarMenuItem icon='bi bi-house-door-fill'> Home</CDBSidebarMenuItem>
            </Link>
            <Link to={'/admin/userlist'}>
              <CDBSidebarMenuItem icon='bi bi-people-fill'> Users</CDBSidebarMenuItem>
            </Link>
            <CDBSidebarMenuItem icon='bi bi-car-front-fill' onClick={e => handleSubCategory(show)}> Vehicle</CDBSidebarMenuItem>

            <li style={{ display: show }}>
              <ul>
                <Link to={'/admin/vehicle/category'}>
                  <CDBSidebarMenuItem icon='bi bi-truck'>Category</CDBSidebarMenuItem>
                </Link>
              </ul>
              <ul>
                <Link to={'/admin/vehicle/company'}>
                  <CDBSidebarMenuItem icon='bi bi-tag-fill'>Company</CDBSidebarMenuItem>
                </Link>
              </ul>
              <ul>
                <Link to={'/admin/vehicle/model'}>
                  <CDBSidebarMenuItem icon='bi bi-truck-front'>Model</CDBSidebarMenuItem>
                </Link>
              </ul>
              <ul>
                <Link to={'#'}>
                  <CDBSidebarMenuItem icon='bi bi-truck'>Vehicle</CDBSidebarMenuItem>
                </Link>
              </ul>
            </li>
            <Link to={'/test'}>
              <CDBSidebarMenuItem icon="sticky-note">Test</CDBSidebarMenuItem>
            </Link>
            <CDBSidebarMenuItem icon="sticky-note">Garage</CDBSidebarMenuItem>
            {/*<CDBSidebarMenuItem icon="sticky-note">Retailers</CDBSidebarMenuItem>
            <CDBSidebarMenuItem icon="sticky-note">owner</CDBSidebarMenuItem>
            <CDBSidebarMenuItem icon="sticky-note">dealer</CDBSidebarMenuItem>
            <CDBSidebarMenuItem icon="sticky-note">offer</CDBSidebarMenuItem>
  <CDBSidebarMenuItem icon="sticky-note">Customers</CDBSidebarMenuItem> */}
          </CDBSidebarMenu>
        </CDBSidebarContent>
      </div>


      {/* <CDBSidebarFooter style={{ textAlign: 'center' }}>
        <div
          className="sidebar-btn-wrapper"
          style={{ padding: '20px 5px' }}
        >
          Sidebar Footer
        </div>
      </CDBSidebarFooter> */}
    </CDBSidebar>
  )
}