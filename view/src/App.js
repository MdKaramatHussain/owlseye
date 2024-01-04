import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Dashboard from './component/admin/dashboard/Dashboard';
import Home from './component/admin/dashboard/home';
import Users from './component/admin/users/users';
import AddUsers from './component/admin/users/addUsers';
import Test from './component/admin/testfile';
import ViewUser from './component/admin/users/viewUser';
import Category from './component/admin/vehicle/category/Category';
import Company from './component/admin/vehicle/company/Company';
import UpdateUser from './component/admin/users/update';
import Model from './component/admin/vehicle/model/Model';
import Login from './component/login/Login';
import axios from 'axios';

function App() {
  axios.defaults.withCredentials = true
  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route path='/login' element={<Login/>}></Route>
          <Route path='/' element={<Dashboard/>} >
            <Route path='' element={<Home/>}></Route>
            <Route path='/admin/userlist' element={<Users/>}></Route>
            <Route path='/admin/adduser' element={<AddUsers/>}></Route>
            <Route path='/admin/userdetails/:uid' element={<ViewUser/>}></Route>
            <Route path='/admin/user/update/:uid' element={<UpdateUser/>}></Route>
            <Route path='/admin/vehicle/category' element={<Category/>}></Route>
            <Route path='/admin/vehicle/company' element={<Company/>}></Route>
            <Route path='/admin/vehicle/model' element={<Model/>}></Route>
            <Route path='/test' element={<Test />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
