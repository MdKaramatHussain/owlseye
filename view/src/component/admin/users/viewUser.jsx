import Table from "react-bootstrap/esm/Table";
import { Link, useParams } from "react-router-dom";
import { Form, Image } from 'react-bootstrap'
import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import Modal from 'react-bootstrap/Modal';

export default function ViewUser() {
    const { uid } = useParams();
    const [empdata, setEmpdata] = useState([]);
    const [show, setShow] = useState(true);

    const handleClose = () => setShow(false);
    useEffect(() => {
        axios.post('http://localhost:4000/api/admin/user/userdetail/' + uid)
            .then(response => {
                setEmpdata(response.data[0])
                console.log(response.data[0])
            })

            .catch(err => console.log(err));
    }, []);
    return (
        <div style={{ padding: '5%' }}>
            <Modal size="lg" show={show} onHide={handleClose}>
                <Link to={'/admin/userlist'}><Modal.Header closeButton>
                    <Modal.Title> Welcome: {empdata.first_name}</Modal.Title>
                </Modal.Header>
                </Link>
                <Modal.Body> <Table striped bordered hover size='xlg' style={{ width: '100%', fontSize: '83.5%' }} >
                    <tbody >
                        <tr>
                            <td>
                                <Form.Label>First Name:</Form.Label>
                            </td>
                            <td>
                                {empdata.first_name}
                            </td>
                            <td>
                                <Form.Label>Last Name:</Form.Label>
                            </td>
                            <td>
                                {empdata.last_name}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Form.Label>Mobile No</Form.Label>
                            </td>
                            <td>
                                {empdata.mobile_no}
                            </td>
                            <td>
                                <Form.Label>Alternate Mobile No</Form.Label>
                            </td>
                            <td>
                                {empdata.alternate_mobile_no}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Form.Label>email</Form.Label>
                            </td>
                            <td>
                                {empdata.email}
                            </td>

                            <td>
                                <Form.Label>Register Date</Form.Label>
                            </td>
                            <td>
                                {moment(empdata.register_date).format('DD/MM/YYYY')}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Form.Label>Date Of Birth</Form.Label>
                            </td>
                            <td>
                                {moment(empdata.dob).format('DD/MM/YYYY')}
                            </td>
                            <td>
                                <Form.Label>Aadhar No.</Form.Label>
                            </td>
                            <td>
                                {empdata.aadhaar_no}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Form.Label>PAN No.</Form.Label>
                            </td>
                            <td>
                                {empdata.pan_no}
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
                                </a>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Form.Label>Aadhar Photo Front Side</Form.Label>
                            </td>
                            <td>
                                <a href={`${empdata.aadhaar_photo_front_side}`} target="_blank" >
                                    <Image
                                        width={'40px'}
                                        height={'40px'}
                                        src={empdata.aadhaar_photo_front_side}
                                    />
                                </a>
                            </td>
                            <td>
                                <Form.Label>Aadhar Photo Back Side</Form.Label>
                            </td>
                            <td>
                                <a href={`${empdata.aadhaar_photo_back_side}`} target="_blank" >
                                    <Image
                                        width={'40px'}
                                        height={'40px'}
                                        src={empdata.aadhaar_photo_back_side}
                                    />
                                </a>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Form.Label>PAN Photo Front Side</Form.Label>
                            </td>
                            <td>
                                <a href={`${empdata.pan_photo_front_side}`} target="_blank" >
                                    <Image
                                        width={'40px'}
                                        height={'40px'}
                                        src={empdata.pan_photo_front_side}
                                    />
                                </a>
                            </td>
                            <td>
                                <Form.Label>PAN Photo Back Side</Form.Label>
                            </td>
                            <td><a href={`${empdata.pan_photo_back_side}`} target="_blank" >
                                <Image
                                    width={'40px'}
                                    height={'40px'}
                                    src={empdata.pan_photo_back_side}
                                />
                            </a>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Form.Label>Address</Form.Label>
                            </td>
                            <td>
                                {empdata.address}
                            </td>
                            <td>
                                <Form.Label>State</Form.Label>
                            </td>
                            <td>
                                {empdata.state}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Form.Label>City</Form.Label>
                            </td>
                            <td>
                                {empdata.city}
                            </td>
                            <td>
                                <Form.Label>pin</Form.Label>
                            </td>
                            <td>
                                {empdata.pin}
                            </td>
                        </tr>
                    </tbody>
                </Table>
                </Modal.Body>
            </Modal>

        </div>
    )
}