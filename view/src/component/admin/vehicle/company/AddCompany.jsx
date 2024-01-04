
import { Button, Form } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import InputGroup from 'react-bootstrap/InputGroup';
import { useState } from 'react';
import axios from 'axios'

export default function AddCompany() {
    // State variables
    const [vbid, setVbid] = useState();
    const [name, setName] = useState();
    const [logo, setLogo] = useState();

    // Add Category
    const handleAddCompany = () => {
        const formData = new FormData();
        formData.append('vb_id', vbid);
        formData.append('name', name);
        formData.append('logo', logo);
        axios.post('http://localhost:4000/api/admin/vehicle/company/add', formData)
            .then(response => {
                if (response.data.message === 'Vehicle category added') {
                    alert('Vehicle category added Sucessfully')
                }
                else {
                    alert(response.data.message)
                }
            })
            .catch(err => {
                console.log('error', err)
            })
    }
    return (
        <>
            <Card style={{ width: '20rem', height: '66vh' }}>
                <ListGroup variant="flush">
                    <ListGroup.Item className="mb-2 mt-2"><strong>Add Company</strong></ListGroup.Item>
                    <ListGroup.Item>
                        <InputGroup className="mb-2 mt-2">
                            <InputGroup.Text>ID </InputGroup.Text>
                            <Form.Control type='text' placeholder='eg:- Vb-01' onChange={e => setVbid(e.target.value)} />
                        </InputGroup>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <InputGroup className="mb-2 mt-2">
                            <InputGroup.Text>Company </InputGroup.Text>
                            <Form.Control type='text' placeholder='eg:- Audi' onChange={e => setName(e.target.value)} />
                        </InputGroup>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <InputGroup className="mb-2 mt-2">
                            <Form.Control type='file' onChange={e => setLogo(e.target.files[0])} />
                        </InputGroup>
                    </ListGroup.Item >
                    <ListGroup.Item className="mb-2 mt-2"><Button size='sm' variant="success" style={{ width: '100%' }} onClick={handleAddCompany}> + Add </Button></ListGroup.Item>
                </ListGroup>
            </Card>
        </>
    )
}
