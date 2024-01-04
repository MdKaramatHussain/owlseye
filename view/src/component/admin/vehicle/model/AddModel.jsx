import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import InputGroup from 'react-bootstrap/InputGroup';
import { Button, Form } from 'react-bootstrap';


export default function AddModel() {
    const [category, setCategory] = useState([])
    const [company, setCompany] = useState([])
    const [cate, setCate] = useState()
    const [com, setCom] = useState()
    const [id, setId] = useState()
    const [name, setName] = useState()
    const [photo, setPhoto] = useState()
    const getcategory = () => {
        axios.post('http://localhost:4000/api/admin/vehicle/category/list')
            .then(res => {
                console.log(res.data)
                setCategory(res.data)
            })
            .catch(err => {
                console.log('error in view vehicle category', err)
            })
    }
    const getCompany = () => {
        axios.post('http://localhost:4000/api/admin/vehicle/company/list')
            .then(res => {
                console.log(res.data)
                setCompany(res.data)
            })
            .catch(err => {
                console.log('error in view vehicle company', err)
            })
    }

    const handleSubmit = () => {
        const formData = new FormData()
        formData.append('m_id', id)
        formData.append('v_id', cate)
        formData.append('vb_id', com)
        formData.append('model_name', name)
        formData.append('photo', photo)
        axios.post('http://localhost:4000/api/admin/vehicle/model/add', formData)
        .then(res => {
            console.log(res.data)
            if(res.data){
                alert('Car Model Added Succesfully')
            }
        })
        .catch(err => {
            console.log('Error in handle submit function ', err)
        })
    }
    useEffect(() => {
        getcategory();
        getCompany();
    }, [])
    return (
        <div>
            <Card style={{ width: '22rem', height: '70vh' }}>
                <Card.Body>
                    <ListGroup variant="flush">
                        <Card.Title>Add Model</Card.Title>
                        <ListGroup.Item>
                            <InputGroup className="mb-2">
                                <InputGroup.Text>Category </InputGroup.Text>
                                <Form.Select onChange={e => setCate(e.target.value)}>
                                    <option selected disabled>Select Category</option>
                                    {
                                        category.map((cat, index) => {
                                            return (
                                                <option key={index + 1} value={cat.v_id}>{cat.type}
                                                </option>
                                            )
                                        })
                                    }
                                </Form.Select>
                            </InputGroup>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <InputGroup className="mb-2">
                                <InputGroup.Text>Company </InputGroup.Text>
                                <Form.Select onChange={e => setCom(e.target.value)}>
                                    <option selected disabled>Select Company</option>
                                    {
                                        company.map((com, index) => {
                                            return (
                                                <option key={index + 1} value={com.vb_id}>{com.name}
                                                </option>
                                            )
                                        })
                                    }
                                </Form.Select>
                            </InputGroup>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <InputGroup className="mb-2">
                                <InputGroup.Text>ID </InputGroup.Text>
                                <Form.Control type='text' placeholder='eg:- M-01' onChange={e => setId(e.target.value)} />
                            </InputGroup>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <InputGroup className="mb-3">
                                <InputGroup.Text>Name </InputGroup.Text>
                                <Form.Control type='text' placeholder='eg:- Swift' onChange={e => setName(e.target.value)} />
                            </InputGroup>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <InputGroup className="mb-2">
                                <Form.Control type='file' onChange={e => setPhoto(e.target.files[0])} />
                            </InputGroup>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <InputGroup className="mb-2 justify-content-center">
                            <Button size='sm' variant="success" style={{ width: '90%' }} onClick={handleSubmit} > + Add </Button>
                            </InputGroup>
                        </ListGroup.Item>
                    </ListGroup>
                </Card.Body>
            </Card>
        </div>
    )
}
