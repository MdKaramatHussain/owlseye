import { Button, Form } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import InputGroup from 'react-bootstrap/InputGroup';
import { useState } from 'react';
import axios from 'axios'

export default function AddVehicle() {
    // State variables
    const [vid, setVid] = useState();
    const [type, setType] = useState();
    const [desc, setDesc] = useState();
    const [photo, setPhoto] = useState();

    // Add Category
    const handleAddCategory = () =>{
        const formData = new FormData();
        formData.append('v_id', vid);
        formData.append('type', type);
        formData.append('description', desc);
        formData.append('image', photo);
        axios.post('http://localhost:4000/api/admin/vehicle/category/add', formData)
        .then(response => {
            if(response.data.message === 'Vehicle category added'){
                alert('Vehicle category added Sucessfully')
            }
            else{
                alert(response.data.message)
            }
        })
        .catch(err => {
            console.log('error', err)
        })
    }
    return (
        <>
            <Card style={{ width: '20rem', height: '60vh' }}>
                <ListGroup variant="flush">
                    <ListGroup.Item><strong>Add Category</strong></ListGroup.Item>
                    <ListGroup.Item>
                        <InputGroup className="mb-3">
                            <InputGroup.Text>ID </InputGroup.Text>
                            <Form.Control type='text' placeholder='V-01' onChange={e => setVid(e.target.value)} />
                        </InputGroup>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <InputGroup className="mb-3">
                            <InputGroup.Text>Vehicle Type </InputGroup.Text>
                            <Form.Control type='text' placeholder='Car' onChange={e => setType(e.target.value)} />
                        </InputGroup>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <InputGroup className="mb-3">
                            <InputGroup.Text>Capicity</InputGroup.Text>
                            <Form.Control type='text' placeholder='5 Person' onChange={e => setDesc(e.target.value)}/>
                        </InputGroup>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <InputGroup className="mb-3">
                            <Form.Control type='file' onChange={e => setPhoto(e.target.files[0])} /> 
                        </InputGroup>
                    </ListGroup.Item>
                    <ListGroup.Item><Button size='sm' variant="success" style={{width:'100%'}} onClick={handleAddCategory}> + Add </Button></ListGroup.Item>
                </ListGroup>
            </Card>
        </>
    )
}

