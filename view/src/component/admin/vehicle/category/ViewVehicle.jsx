// Required Modules
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Form, Image, Table } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import moment from 'moment';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function ViewVehicle() {
  // State variables
  const [data, setData] = useState([]);
  const [type, setType] = useState();
  const [desc, setDesc] = useState();
  const [photo, setPhoto] = useState();

  // View Modals
  const [show, setShow] = useState(false);

  const getdata = () => {
    axios.post('http://localhost:4000/api/admin/vehicle/category/list')
      .then(res => {
        console.log(res.data)
        setData(res.data)
      })
      .catch(err => {
        console.log('error in view vehicle category', err)
      })
  }

  const handleClose = () => {
    alert('Alert!!! Are you sure you want to cancle?')
    setShow(false);
  }
  const handleShow = () => setShow(true);

  const [catid, setCatid] = useState()
  const [catName, setCatName] = useState()
  const [catCapacity, setCatCapacity] = useState()
  const [addesOn, setAddedOn] = useState()
  const [catPhoto, setCatPhoto] = useState()
  const [search, setSearch] = useState('')
  const hanleUpdateData = (data) => {
    setCatid(data.v_id)
    setCatName(data.type)
    setCatCapacity(data.description)
    setAddedOn(data.added_on)
    setCatPhoto(data.photo)

    handleShow()

  }
  // Update Category
  const handleUpdate = () => {
    const formData = new FormData()
    formData.append('type', catName);
    formData.append('desc', catCapacity);
    formData.append('image', photo)
    axios.put('http://localhost:4000/api/admin/vehicle/category/vehicle/update/' + catid, formData)
      .then(res => {
        if (res.data.message === 'Successful') {
          setShow(false);
          getdata()
          alert('Category updated sucessfully!!!')
        }
        else {
          if (res.data.message === '"image" is not allowed') {
            alert('image is compulsary')
          }
          else {
            getdata()
            alert(res.data.message)
          }

        }

      })
      .catch(err => {
        console.log(err)
        setShow(false);
      })
  }

  // View Car
  useEffect(() => {
    getdata()
  }, [])
  return (
    <>
      <Card style={{ width: '30rem', height: '60vh' }}>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <div className='justify-content-between' style={{ display: 'flex', flexDirection: 'row' }}>
              <div>
                <strong> List Of Vehicle Category</strong>
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
                  <td>Capacity</td>
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
                        items.v_id.toString().toLowerCase().includes(search.toLowerCase()) ||
                        items.type.toString().toLowerCase().includes(search.toLowerCase()) ||
                        items.description.toString().toLowerCase().includes(search.toLowerCase()) 
                    )
                }).map((cat, index) => {
                    return (
                      <tr key={index}>
                        <td>{cat.v_id}</td>
                        <td>{cat.type}</td>
                        <td>{cat.description}</td>
                        <td>{moment(cat.added_on).format('DD-MM-YY')}</td>
                        <td>
                          <a href={`${cat.photo}`} target="_blank" >
                            <Image
                              width={'40px'}
                              height={'40px'}
                              src={cat.photo}
                            />
                          </a>
                        </td>
                        <td>
                          <h6 onClick={() => hanleUpdateData(cat)} size='lg' class="bi bi-pencil-square"></h6>
                        </td>

                      </tr>
                    )
                  })
                }

                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Vehicle Category ID: {catid}</Modal.Title>
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
                              placeholder={`${catid}  Read only`}
                              disabled
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <Form.Label>Type</Form.Label>
                          </td>
                          <td>
                            <Form.Control
                              style={{ border: 'none' }}
                              placeholder={catName}
                              type='text'
                              onChange={e => setCatName(e.target.value)}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <Form.Label>Capicity</Form.Label>
                          </td>
                          <td>
                            <Form.Control
                              style={{ border: 'none' }}
                              placeholder={catCapacity}
                              type='text'
                              onChange={e => setCatCapacity(e.target.value)}
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
                              placeholder={` ${moment(addesOn).format('DD-MM-YYYY')}  Read only`}
                              disabled
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <Form.Label>Photo</Form.Label>
                          </td>
                          <td>
                            <Form.Control
                              style={{ border: 'none', backgroundColor: 'white' }}
                              type='file'
                              onChange={e => setPhoto(e.target.files[0])}
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
                    <Button variant="success" onClick={e => handleUpdate(catid)}>
                      Save Changes
                    </Button>
                  </Modal.Footer>
                </Modal>
              </tbody>
            </Table>
          </ListGroup.Item>

        </ListGroup>
      </Card>
    </>
  )
}

