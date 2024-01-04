// Required Modules
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Form, Image, Table } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import moment from 'moment';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React from 'react'

function ViewModel() {
    // State variables
    const [data, setData] = useState([]);
    const [id, setId] = useState();
    const [name, setName] = useState();
    const [category, setCategory] = useState();
    const [company, setCompany] = useState();
    const [addedOn, setAddedOn] = useState();
    const [search, setSearch] = useState('');
    const [categoryData, setCategoryData] = useState([])
    const [companyData, setCompanyData] = useState([])
    const [categoryUpdate, setCategoryUpdate] = useState()
    const [companyUpdate, setCompanyUpdate] = useState()


    // View Modals
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
    }
    const handleShow = () => setShow(true);

    // Update Vehicle Model
    const handleUpdate = (id) => {
        axios.put(`http://localhost:4000/api/admin/vehicle/model/update/${id}`, { name, categoryUpdate, companyUpdate })
            .then(res => {
                getModel();
                handleClose()
                alert('Data Updated')
            })
            .catch(err => {
                console.log('Error In Handle Update Function ', err)
                alert('Error In Update Function')
            })
    }

    // To view details in modal
    const handleCompanyDetails = (cat) => {
        console.log('handleCompanyDetails', cat)
        setId(cat.ID);
        setName(cat.Name);
        setCategory(cat.Category);
        setCompany(cat.Company);
        setAddedOn(cat.added_on);
        setCategoryUpdate(cat.v_id);
        setCompanyUpdate(cat.vb_id)
        handleShow();


    }
    // To List the vehicle company
    const getcategory = () => {
        axios.post('http://localhost:4000/api/admin/vehicle/category/list')
            .then(res => {
                console.log('Category', res.data)
                setCategoryData(res.data)
            })
            .catch(err => {
                console.log('error in view vehicle category', err)
            })
    }
    // To list the vehicle Company
    const getCompany = () => {
        axios.post('http://localhost:4000/api/admin/vehicle/company/list')
            .then(res => {
                console.log('company', res.data)
                setCompanyData(res.data)
            })
            .catch(err => {
                console.log('error in view vehicle company', err)
            })
    }

    // View Company
    const getModel = () => {
        axios.post('http://localhost:4000/api/admin/vehicle/model/view')
            .then(res => {
                console.log('Model details ', res.data)
                setData(res.data)
            })
            .catch(err => {
                console.log('error in view vehicle category', err)
            })
    }
    const handleDelete = (id) => {
        console.log('We Are In handleDelete function and id:',id)
    }
    useEffect(() => {
        getModel()
        getcategory()
        getCompany()
    }, [])
    return (
        <div>
            <Card style={{ width: '37rem', height: '70vh' }}>
                <ListGroup variant="flush">
                    <ListGroup.Item>
                        <div className='justify-content-between' style={{ display: 'flex', flexDirection: 'row' }}>
                            <div>
                                <strong> List Of Vehicle Models Available</strong>
                            </div>
                            <div>
                                <Form.Control size='sm' type="text" placeholder='Search' onChange={e => setSearch(e.target.value)} />
                            </div>
                        </div>

                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Table>
                            <thead style={{ backgroundColor: 'black' }}>
                                <tr>
                                    <td>ID</td>
                                    <td>Category</td>
                                    <td>Company</td>
                                    <td>Name</td>
                                    <td>Added On</td>
                                    <td>Image</td>
                                    <td>Action</td>
                                </tr>
                            </thead>
                            <tbody style={{ fontSize: '90%' }}>
                                {
                                    data.filter((items) => {
                                        return (
                                            search.trim() === '' ||
                                            items.ID.toString().toLowerCase().includes(search.toLowerCase()) ||
                                            items.Category.toString().toLowerCase().includes(search.toLowerCase()) ||
                                            items.Company.toString().toLowerCase().includes(search.toLowerCase()) ||
                                            items.Name.toString().toLowerCase().includes(search.toLowerCase())
                                        )
                                    }).map((cat, index) => {
                                        return (
                                            <tr key={index + 1}>
                                                <td>{cat.ID}</td>
                                                <td>{cat.Category}</td>
                                                <td>{cat.Company}</td>
                                                <td>{cat.Name}</td>
                                                <td>{moment(cat.added_on).format('DD-MM-YY')}</td>
                                                <td>
                                                    <a href={`${cat.photo}`} target="_blank" >
                                                        <Image
                                                            width={'60px'}
                                                            height={'40px'}
                                                            src={cat.photo}
                                                        />
                                                    </a>
                                                </td>
                                                <td>

                                                    <h6 onClick={e => handleCompanyDetails(cat)} size='lg' class="bi bi-pencil-square"></h6>
                                                    <h6>
                                                        <i onClick={e => handleDelete(cat.ID)} class="bi bi-trash-fill"></i>
                                                    </h6>

                                                    <Modal show={show} onHide={handleClose} >
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
                                                                            <Form.Label>Category</Form.Label>

                                                                        </td>
                                                                        <td>
                                                                            <Form.Select onChange={e => setCategoryUpdate(e.target.value)}>
                                                                                <option selected disabled>{category}</option>
                                                                                {
                                                                                    categoryData.map((cat, index) => {
                                                                                        if (category !== cat.type) {
                                                                                            return (
                                                                                                <option key={index + 1} value={cat.v_id}>{cat.type}
                                                                                                </option>
                                                                                            )
                                                                                        }

                                                                                    })
                                                                                }
                                                                            </Form.Select>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            <Form.Label>Company</Form.Label>

                                                                        </td>
                                                                        <td>
                                                                            <Form.Select onChange={e => setCompanyUpdate(e.target.value)}>
                                                                                <option selected disabled>{company}</option>
                                                                                {
                                                                                    companyData.map((cat, index) => {
                                                                                        if (company !== cat.name) {
                                                                                            return (
                                                                                                <option key={index + 1} value={cat.vb_id}>{cat.name}</option>
                                                                                            )
                                                                                        }

                                                                                    })
                                                                                }
                                                                            </Form.Select>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            <Form.Label>Model Added On</Form.Label>

                                                                        </td>
                                                                        <td>
                                                                            <Form.Control
                                                                                style={{ border: 'none', backgroundColor: 'white' }}
                                                                                placeholder={` ${moment(addedOn).format('DD-MM-YYYY')}  Read only`}
                                                                                disabled
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
        </div>
    )
}

export default ViewModel
