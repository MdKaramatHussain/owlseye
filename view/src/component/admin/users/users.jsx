import { useEffect, useState } from "react"
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import { Link } from "react-router-dom";
import moment from "moment";
import Pagination from 'react-bootstrap/Pagination';


// let active = 2;
// let items = [];
// for (let number = 1; number <= 5; number++) {
//     items.push(
//         <Pagination.Item key={number} active={number === active}>
//             {number}
//         </Pagination.Item>,
//     );
// }
export default function Users() {

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };



    const [empdata, setEmpdata] = useState([]);
    const [search, setSearch] = useState('Search');
    // const [stateChange, setStateChange] = useState();


    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const itemsToDisplay = empdata.slice(startIndex, endIndex);
    const totalPages = Math.ceil(empdata.length / itemsPerPage); // Calculate total pages

    // To view users
    const getdata = () => {
        axios.post('http://localhost:4000/api/admin/user/userlist')
            .then(response => {
                setEmpdata(response.data)
            })
            .catch(err => console.log(err));
    }

    // To Search
    const handleSearch = () => {
        axios.post('http://localhost:4000/api/admin/user/userfind/' + search)
            .then(response => {
                if (response.data.length > 0) {
                    setEmpdata(response.data)
                }
                else {
                    getdata()
                    alert("Alert No data Found");
                }

            })

            .catch(err => console.log(err));
    }
    // TO change status
    const handleChangeStatus = (uid, state) => {
        console.log(uid, state)
        axios.patch('http://localhost:4000/api/admin/user/status/' + uid + '/' + state)
            .then(res => {
                if (res.data.message === 'User Status Changed Successful') {
                    getdata()
                    alert('Status changed')
                }
                console.log(res.data)
            })
            .catch(err => {
                console.log('error in handle change status ', err)
            })
    }

    // To List Users
    useEffect(() => {
        getdata()
    }, []);

    return (
        <>
            <div style={{ padding: '3%' }}>
                <div style={{ padding: "1%", marginTop: "2%", marginBlockEnd: '2%' }}>
                    <div className="justify-content-between" style={{ display: 'flex', flexDirection: 'row', marginBottom: '3%' }}>
                        <div style={{ position: 'fixed' }}>
                            <Link to={'/admin/adduser'}>
                                <Button size='sm' variant="danger"> + Add </Button>
                            </Link>
                        </div>
                        <div className='d-flex' style={{ position: 'fixed', right: '4%' }} >
                            <div>
                                <Form.Control size='sm' type="text" placeholder={search} onChange={e => setSearch(e.target.value)} />
                            </div>
                            <div>
                                <Button size='sm' variant="danger" onClick={handleSearch}> search </Button>
                            </div>
                        </div>
                    </div>
                </div>
                <div >
                    <Table bordered>
                        <thead>
                            <tr>
                                <th>S.No</th>
                                <th>Name</th>
                                <th>Mobile</th>
                                <th>PAN</th>
                                <th>Profile Photo</th>
                                <th>Register Date</th>
                                <th>User Type</th>
                                <th>Status</th>
                                <th className="text-centre">Action</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                itemsToDisplay.map((user, index) => {
                                    return (
                                        <tr key={index + 1}>
                                            <td>
                                                {index + 1}
                                            </td>
                                            <td>
                                                {user.first_name}
                                            </td>
                                            <td>
                                                {user.mobile_no}
                                            </td>
                                            <td>
                                                {user.pan_no}
                                            </td>
                                            <td className="text-center">
                                                <a href={`${user.profile_photo}`} target="_blank">
                                                    <Image
                                                        width={'70px'}
                                                        height={'50px'}
                                                        src={user.profile_photo}
                                                    />
                                                </a>

                                            </td>
                                            <td>
                                                {moment(user.register_date).format('DD/MM/YY')}
                                            </td>
                                            <td>
                                                {user.user_role}
                                            </td>
                                            <td>
                                                {
                                                    user.status === 'Deactive' ? (
                                                        <Form.Check
                                                            type="switch"
                                                            onClick={e => handleChangeStatus(user.admin_id, 'Active')}
                                                        />
                                                    ) : (
                                                        <Form.Check
                                                            type="switch"
                                                            defaultChecked
                                                            onClick={e => handleChangeStatus(user.admin_id, 'Deactive')}
                                                        />
                                                    )


                                                }
                                            </td>
                                            <td className="text-center">
                                                <b>
                                                    <Link to={`/admin/userdetails/${user.admin_id}`}><i class="bi bi-eye-fill"></i></Link>
                                                    &#160;&#160;&#160;
                                                    <Link to={`/admin/user/update/${user.admin_id}`}><i class="bi bi-pencil-square"></i></Link>
                                                    &#160;&#160;&#160;
                                                    {/* <i class="bi bi-trash-fill"></i> */}
                                                </b>
                                            </td>
                                        </tr>
                                    )
                                })
                            }

                        </tbody>
                    </Table>
                    <div className="d-flex justify-content-center position-absolute bottom-0 end-0">
                        <Pagination>
                            {Array.from({ length: totalPages }, (_, index) => (
                                <Pagination.Item
                                    key={index + 1}
                                    active={currentPage === index + 1}
                                    onClick={() => handlePageChange(index + 1)}
                                >
                                    {index + 1}
                                </Pagination.Item>
                            ))}
                        </Pagination>
                    </div>

                </div>
            </div>

        </>
    )
}