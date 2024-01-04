import Table from "react-bootstrap/esm/Table";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Form, Image} from 'react-bootstrap'
import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import Modal from 'react-bootstrap/Modal';

export default function UpdateUser() {
    const { uid } = useParams();
    const navigate = useNavigate();
    const [empdata, setEmpdata] = useState([]);
    const [show, setShow] = useState(true);
    // state for user update
    const [altMobNo, setAltMobNo] = useState();
    const [dob, setDob] = useState();
    const [profileImg, setProfileImg] = useState();
    const [address, setAddress] = useState();
    const [state, setState] = useState();
    const [city, setCity] = useState();
    const [pin, setPin] = useState();

    const handleClose = () => setShow(false);

    const handleUpdate = () => {
        const formData = new FormData();
        formData.append('alternate_mobile_no', altMobNo);
        formData.append('DOB', dob);
        formData.append('profile_photo', profileImg);
        formData.append('address', address);
        formData.append('state', state);
        formData.append('city', city);
        formData.append('pin', pin);
        axios.put('http://localhost:4000/api/admin/user//userupdate/' +uid, formData)
        .then(res => {
            console.log(res.data)
            if(res.data.message === 'Employee data updated successfully.'){
                navigate('/admin/userlist')
            }
        })
        .catch(err => {
            console.log('Error In handle Update of user: ', err)
        })
    }
    useEffect(() => {
        axios.post('http://localhost:4000/api/admin/user/userdetail/' + uid)
            .then(response => {
                setEmpdata(response.data[0])
                console.log(response.data[0])
            })

            .catch(err => console.log(err));
    }, []);
    return (

        <Modal show={show} onHide={handleClose}>
            <Link to={'/admin/userlist'}><Modal.Header closeButton>
                <Modal.Title> Welcome: {empdata.first_name} {empdata.last_name}</Modal.Title>
            </Modal.Header>
            </Link>
            <Modal.Body>
                <Table striped bordered hover style={{ width: '100%', fontSize: '83.5%' }} >
                    <tbody >
                        <tr>
                            <td>
                                <Form.Label>Mobile No</Form.Label>

                            </td>
                            <td>
                                {empdata.mobile_no} <br /> (read only)
                            </td>
                            <td>
                                <Form.Label>Alt. Mobile No</Form.Label>
                            </td>
                            <td>
                                <Form.Control type='text' placeholder={empdata.alternate_mobile_no} onChange={e => setAltMobNo(e.target.value)} />

                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Form.Label>email</Form.Label>
                            </td>
                            <td>
                                {empdata.email} <br /> (read only)
                            </td>

                            <td>
                                <Form.Label>Register Date</Form.Label>
                            </td>
                            <td>
                                {moment(empdata.register_date).format('DD/MM/YYYY')} <br /> (read only)
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Form.Label>Date Of Birth</Form.Label>
                            </td>
                            <td>
                                <Form.Control type='date' placeholder={moment(empdata.dob).format('DD/MM/YYYY')} onChange={e => setDob(e.target.value)} />
                            </td>
                            <td>
                                <Form.Label>Aadhar No.</Form.Label>
                            </td>
                            <td>
                                {empdata.aadhaar_no} <br /> (read only)
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Form.Label>PAN No.</Form.Label>
                            </td>
                            <td>
                                {empdata.pan_no} <br /> (read only)
                            </td>
                            <td>
                                <Form.Label>Profile:</Form.Label>
                            </td>
                            <td>
                                <a href={`${empdata.profile_photo}`} target="_blank" >
                                    <Image
                                        width={'40px'}
                                        height={'40px'}
                                        src={empdata.profile_photo}
                                    />
                                    <Form.Control type='file' onChange={e => setProfileImg(e.target.files[0])} />
                                </a>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Form.Label>Address</Form.Label>
                            </td>
                            <td>
                                <Form.Control type='text' placeholder={empdata.address} onChange={e => setAddress(e.target.value)} />
                            </td>
                            <td>
                                <Form.Label>State</Form.Label>
                            </td>
                            <td>
                                <Form.Control type='text' placeholder={empdata.state} onChange={e => setState(e.target.value)} />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Form.Label>City</Form.Label>
                            </td>
                            <td>
                                <Form.Control type='text' placeholder={empdata.city} onChange={e => setCity(e.target.value)} />

                            </td>
                            <td>
                                <Form.Label>pin</Form.Label>
                            </td>
                            <td>
                                <Form.Control type='text' placeholder={empdata.pin} onChange={e => setPin(e.target.value)} />

                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                <Link to={'/admin/userlist'}>
                                    <Button variant="danger" style={{ width: '100%' }} onClick={handleClose}>
                                        Close
                                    </Button>
                                </Link>
                            </td>
                            <td colSpan={2}>
                                <Button variant="success" style={{ width: '100%' }} onClick={handleUpdate}>
                                    Save Changes
                                </Button></td>
                        </tr>
                    </tbody>
                </Table>
            </Modal.Body>
        </Modal>
    )
}