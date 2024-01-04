// Required Modules
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Form, Image, Table } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import moment from 'moment';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function ViewCompany() {
    // State variables
    const [data, setData] = useState([]);
    const [id, setId] = useState();
    const [name, setName] = useState();
    const [logo, setLogo] = useState();
    const [addedOn, setAddedOn] = useState();
    const [search, setSearch] = useState('');

    // View Modals
    const [show, setShow] = useState(false);

    const handleClose = () => {
        // alert('Alert!!! Are you sure you want to cancle?')
        setShow(false);
    }
    const handleShow = () => setShow(true);
    // Edit Company
    const handleUpdate = (id) => {
        const formData = new FormData();
        formData.append('name', name)
        formData.append('logo', logo)
        axios.put(`http://localhost:4000/api/admin/vehicle/company/update/${id}`, formData)
            .then(res => {
                if(res.data.message === 'Sucess'){
                    getCompany();
                    alert('Data Updated');
                    handleClose();
                }
                else{
                    alert('Data Not Updated')
                    handleClose();
                }
            })
            .catch(err => {
                console.log('Error In Updating Vehicle Company', err);
                alert('Error in updating vehicle company');
                handleClose();
            })
    }

    // To view details in modal
    const handleCompanyDetails = (cat) => {
        setId(cat.vb_id);
        setName(cat.name);
        setLogo(cat.logo);
        setAddedOn(cat.added_on);
        handleShow(cat);
    }


    // View Company
    const getCompany = () => {

        axios.post('http://localhost:4000/api/admin/vehicle/company/list')
            .then(res => {
                console.log(res.data)
                setData(res.data)
            })
            .catch(err => {
                console.log('error in view vehicle category', err)
            })
    }
    useEffect(() => {
        getCompany()
    }, [])
    return (
        <>
            <Card style={{ width: '30rem', height: '66vh' }}>
                <ListGroup variant="flush">
                    <ListGroup.Item>
                        <div className='justify-content-between' style={{display:'flex', flexDirection:'row'}}>
                            <div>
                                <strong> List Of Vehicle Company</strong>
                            </div>
                            <div>
                                <Form.Control size='sm' type="text" placeholder='Search' onChange={e => setSearch(e.target.value)} />
                            </div>
                        </div>

                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Table>
                            <thead>
                                <tr>
                                    <td>ID</td>
                                    <td>Type</td>
                                    <td>Added On</td>
                                    <td>Photo</td>
                                    <td>Action</td>

                                </tr>
                            </thead>
                            <tbody style={{ fontSize: '90%' }}>
                                {
                                    data.filter((items) => {
                                        return (
                                            search.trim() === '' ||
                                            items.vb_id.toString().toLowerCase().includes(search.toLowerCase()) ||
                                            items.name.toString().toLowerCase().includes(search.toLowerCase())
                                        )
                                    }).map((cat, index) => {
                                        return (
                                            <tr key={index + 1}>
                                                <td>{cat.vb_id}</td>
                                                <td>{cat.name}</td>
                                                <td>{moment(cat.added_on).format('DD-MM-YY')}</td>
                                                <td>
                                                    <a href={`${cat.logo}`} target="_blank" >
                                                        <Image
                                                            width={'60px'}
                                                            height={'40px'}
                                                            src={cat.logo}
                                                        />
                                                    </a>
                                                </td>
                                                <td>
                                                    <h6 onClick={e => handleCompanyDetails(cat)} size='lg' class="bi bi-pencil-square"></h6>

                                                    <Modal show={show} onHide={handleClose}>
                                                        <Modal.Header closeButton>
                                                            <Modal.Title>Vehicle Company ID: {id}</Modal.Title>
                                                        </Modal.Header>
                                                        <Modal.Body>
                                                            <Table>
                                                                <tbody>
                                                                    <tr>
                                                                        <td>
                                                                            <Form.Label>ID</Form.Label>

                                                                        </td>
                                                                        <td>
                                                                            <input
                                                                                style={{ border: 'none', backgroundColor: 'white' }}
                                                                                placeholder={`${id}  Read only`}
                                                                                disabled
                                                                            />
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            <Form.Label>Name</Form.Label>

                                                                        </td>
                                                                        <td>
                                                                            <Form.Control
                                                                                style={{ border: 'none' }}
                                                                                placeholder={name}
                                                                                type='text'
                                                                                onChange={e => setName(e.target.value)}
                                                                            />
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            <Form.Label>Vehicle Added On</Form.Label>

                                                                        </td>
                                                                        <td>
                                                                            <Form.Control
                                                                                style={{ border: 'none', backgroundColor: 'white' }}
                                                                                placeholder={` ${moment(addedOn).format('DD-MM-YYYY')}  Read only`}
                                                                                disabled
                                                                            />
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            <Form.Label>Logo</Form.Label>

                                                                        </td>
                                                                        <td>
                                                                            <Form.Control
                                                                                style={{ border: 'none', backgroundColor: 'white' }}
                                                                                type='file'
                                                                                onChange={e => setLogo(e.target.files[0])}
                                                                            />
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </Table>
                                                        </Modal.Body>
                                                        <Modal.Footer>
                                                            <Button variant="danger" onClick={handleClose}>
                                                                Cancel
                                                            </Button>
                                                            <Button variant="success" onClick={e => handleUpdate(id)}>
                                                                Save Changes
                                                            </Button>
                                                        </Modal.Footer>
                                                    </Modal>
                                                </td>

                                            </tr>
                                        )
                                    })
                                }

                            </tbody>
                        </Table>
                    </ListGroup.Item>
                </ListGroup>
            </Card>
        </>
    )
}
