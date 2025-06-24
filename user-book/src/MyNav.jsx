import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect, useState } from 'react'
import { Button, Container, Nav, Navbar } from 'react-bootstrap'
import Login from './Login'
function MyNav() {
    let [showModal, setShowModal] = useState(false)
    let [showLoginButton, setShowLoginButton] = useState(true)
    let [isLoggedIn, setIsLoggedIn] = useState(false)
    let [firstName,setFirstName] = useState('')
    useEffect(()=> {
        let token = localStorage.getItem('token')
        if(token) {
            setShowLoginButton(false)
            setFirstName(localStorage.getItem('firstName'))
            setIsLoggedIn(true)
        }
    },[isLoggedIn])
    function doLogout() {
        localStorage.setItem('token', '')
        if(token) {
            setShowLoginButton(false)
            setIsLoggedIn(true)
        }
    }
    
    return (
        <Container fluid>
            <Navbar bg="dark" data-bs-theme="dark">
                <Navbar.Brand> Book Store</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href= '/home'>Home</Nav.Link>
                    <Nav.Link href= '/about'>About Us</Nav.Link>
                    <Nav.Link href= '/contact'>Contact</Nav.Link>
                </Nav>
                <Navbar.Text>
                    {
                    showLoginButton && 
                    <Button variant="primary" style={{ marginRight: '150px' }} onClick= { ()=> setShowModal(true)}>Login / SignUp</Button>
                    }

                    {
                    !showLoginButton && 
                    <div>
                        <span>Welcome{firstName}</span> <Button variant="primary" style={{ marginRight: '150px' }} onClick= {doLogout}>Log out</Button>
                    </div>
                    }

                </Navbar.Text>
            </Navbar>
            {
                showModal &&  <Login></Login>
            }
        </Container>
    )
}
export default MyNav