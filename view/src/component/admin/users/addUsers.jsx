import Form from 'react-bootstrap/Form'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/esm/Button';
import logo from '../image/logo.jpeg'
import backLogo from '../image/regBackground.jpeg'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { State, City } from 'country-state-city';

function AddUsers() {
    // State Variables
    const [fname, setFname] = useState();
    const [lname, setLname] = useState();
    const [mobNo, setMobNo] = useState();
    const [altMobNo, setAltMobNo] = useState();
    const [email, setEmail] = useState();
    const [aid, setAid] = useState();
    const [dob, setDob] = useState();
    const [aadhar, setAadhar] = useState();
    const [pan, setPan] = useState();
    const [profileImg, setProfileImg] = useState();
    const [adhrFrntImg, setAdhrFrntImg] = useState();
    const [adhrBckImg, setAdhrBckImg] = useState();
    const [panFrntImg, setPanFrntImg] = useState();
    const [panBckImg, setPanBckImg] = useState();
    const [address, setAddress] = useState();
    const [state, setState] = useState();
    const [city, setCity] = useState();
    const [pin, setPin] = useState();

    // Variable for navigation
    const navigate = useNavigate();

    // Registration function
    const handleReg = (e) => {
        e.preventDefault();
        // const formData = new FormData()
        // formData.append('pin', pin);
        // formData.append('mobile_no', mobNo);
        // formData.append('admin_id', aid);
        // formData.append('alternate_mobile_no', altMobNo);
        // formData.append('email', email);
        // formData.append('first_name', fname);
        // formData.append('last_name', lname);
        // formData.append('address', address);
        // formData.append('state', state);
        // formData.append('city', city);
        // formData.append('DOB', dob);
        // formData.append('image', profileImg);
        // formData.append('image', adhrFrntImg);
        // formData.append('image', adhrBckImg);
        // formData.append('image', panFrntImg);
        // formData.append('image', panBckImg);
        // formData.append('aadhaar_no', aadhar);
        // formData.append('pan_no', pan);
        // // console.log(profileImg).
        // axios.post('http://localhost:4000/api/admin/user/reguser', formData)
        //     .then(res => {
        //         if (res.data.message === 'User Registration Successful') {
        //             alert(`${res.data.user} Please check you mail`)
        //             navigate('/admin/userlist')
        //         }
        //         else {
        //             alert(res.data)
        //         }
        //     })
        //     .catch(err => {
        //         console.log(err)
        //     })


    }

/// state city code 
const [allState, setAllState] = useState()
const [allCity, setAllCity] = useState()
const getAllStates = async () => {
    try {
        const states = await State.getStatesOfCountry('IN'); // 'IN' is the country code for India
        setAllState(states);
    } catch (err) {
        console.log(err);
    }
};

const handleStateChange = (e) => {
    const selectedState = e.target.value;
    
    if (selectedState) {
        const countryCode = 'IN';
        try {
            const stateCities = City.getCitiesOfState(countryCode, selectedState);
            setAllCity(stateCities);
        } catch (err) {
            console.log(err);
        }
    } else {
        setAllCity([]);
    }
};
useEffect(() => {
    getAllStates();
}, [])


    return (
        <div style={{ marginLeft: '15%', marginTop: '5.5%' }}>
            {/* display: 'block',  */}
            <div style={{ backgroundColor: 'white', height: '9vh', width: '80%', textAlign: 'center' }}>
                <span ><span style={{ fontSize: '200%' }}>Be A Part Of </span><img src={logo} alt='logo' width={'20%'}></img> </span>
            </div>
            <div>
                <Table striped bordered hover size='sm' style={{ width: '80%', fontSize: '83.5%', backgroundImage: `url(${backLogo})` }} >
                    <tbody  >
                        <tr>
                            <td>
                                <Form.Label>First Name:</Form.Label>
                            </td>
                            <td>
                                <Form.Control size='sm' type="text" placeholder="Enid" onChange={e => setFname(e.target.value)} />
                            </td>
                            <td>
                                <Form.Label>Last Name:</Form.Label>
                            </td>
                            <td>
                                <Form.Control size='sm' type="text" placeholder="David" onChange={e => setLname(e.target.value)} />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Form.Label>Mobile No</Form.Label>
                            </td>
                            <td>
                                <Form.Control size='sm' type="text" placeholder="9856253654" onChange={e => setMobNo(e.target.value)} />
                            </td>
                            <td>
                                <Form.Label>Alternate Mobile No</Form.Label>
                            </td>
                            <td>
                                <Form.Control size='sm' type="text" placeholder="7898564512" onChange={e => setAltMobNo(e.target.value)} />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Form.Label>email</Form.Label>
                            </td>
                            <td>
                                <Form.Control size='sm' type="email" placeholder="david@gmail.com" onChange={e => setEmail(e.target.value)} />
                            </td>

                            <td>
                                <Form.Label>Admin ID</Form.Label>
                            </td>
                            <td>
                                <Form.Control size='sm' type="text" placeholder="A-01" onChange={e => setAid(e.target.value)} />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Form.Label>Date Of Birth</Form.Label>
                            </td>
                            <td>
                                <Form.Control size='sm' type="date" placeholder="select DOB" onChange={e => setDob(e.target.value)} />
                            </td>
                            <td>
                                <Form.Label>Aadhar No.</Form.Label>
                            </td>
                            <td>
                                <Form.Control size='sm' type="text" placeholder="899562314586" onChange={e => setAadhar(e.target.value)} />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Form.Label>PAN No.</Form.Label>
                            </td>
                            <td>
                                <Form.Control size='sm' type="text" placeholder="BJHG7898H" onChange={e => setPan(e.target.value)} />
                            </td>
                            <td>
                                <Form.Label>Profile:</Form.Label>
                            </td>
                            <td>
                                {/* <input size='sm' type="file" onChange={e => setProfileImg(e.target.files[0])} /> */}
                                <Form.Control size='sm' type="file" onChange={e => setProfileImg(e.target.files[0])} />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Form.Label>Aadhar Photo Front Side</Form.Label>
                            </td>
                            <td>
                                <Form.Control size='sm' type="file" onChange={e => setAdhrFrntImg(e.target.files[0])} />
                            </td>
                            <td>
                                <Form.Label>Aadhar Photo Back Side</Form.Label>
                            </td>
                            <td>
                                <Form.Control size='sm' type="file" onChange={e => setAdhrBckImg(e.target.files[0])} />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Form.Label>PAN Photo Front Side</Form.Label>
                            </td>
                            <td>
                                <Form.Control size='sm' type="file" onChange={e => setPanFrntImg(e.target.files[0])} />
                            </td>
                            <td>
                                <Form.Label>PAN Photo Back Side</Form.Label>
                            </td>
                            <td>
                                <Form.Control size='sm' type="file" onChange={e => setPanBckImg(e.target.files[0])} />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Form.Label>Address</Form.Label>
                            </td>
                            <td>
                                {/* <FloatingLabel controlId="floatingTextarea2" label="Comments">
                                <Form.Control
                                    as="textarea"
                                    placeholder="81-Street, Habibganj"
                                    style={{ height: '100px' }}
                                />
                            </FloatingLabel> */}
                                <Form.Control size='sm' type="text" placeholder="Address" onChange={e => setAddress(e.target.value)} />
                            </td>
                            <td>
                                <Form.Label>State</Form.Label>
                            </td>
                            <td>
                                <Form.Control size='sm' type="text" placeholder="State" onChange={e => setState(e.target.value)} />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Form.Label>City</Form.Label>
                            </td>
                            <td>
                                <Form.Control size='sm' type="text" placeholder="City" onChange={e => setCity(e.target.value)} />
                            </td>
                            <td>
                                <Form.Label>pin</Form.Label>
                            </td>
                            <td>
                                <Form.Control size='sm' type="text" placeholder="462036" onChange={e => setPin(e.target.value)} />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                <Button size='sm' variant='success' style={{ width: '90%' }} onClick={handleReg}> Submit</Button>
                            </td>
                            <td colSpan={2}>
                                <Link to='/admin/userlist'>
                                    <Button size='sm' variant='danger' style={{ width: '90%' }}> Cancel</Button>
                                </Link>
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        </div>
    )
}
export default AddUsers;