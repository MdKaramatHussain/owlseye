
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../image/logo.jpeg'

export default function DashNav() {
    return (
        <>
            <Navbar sticky="top" className="bg-dark text-white" >
                <Container>
                    <Navbar.Brand href="">
                        <img
                            src={logo}
                            width="150%"
                            height="30vh"
                            className="d-inline-block align-top"
                            alt="Owlseye Logo"
                            
                        />
                    </Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text className='text-white'>
                           Welcome: <a href="#login" className='text-white'>Mark Otto</a>
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

        </>
    );
}

