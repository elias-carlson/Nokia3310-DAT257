import {Button, Modal} from 'react-bootstrap'
import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Wizard from './Wizard'
import LoginForm from './LoginForm'
import UserAuth from './UserAuth'
import DownloadInstructions from './DownloadInstructions'

/**
 * Component for the Home/starting page 
 */
function HomeComponent() {
    const [showLogin, setShowLogin] = useState(false)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [showCreateModal, setShowCreateModal] = useState(false);

    //To show or hide the modal
    const handleCloseCreateModal = () => {
        setShowCreateModal(false);
    }
    const handleShowCreateModal = () => {
        setShowCreateModal(true);
    }

    //Makes sure that the whole page knows that the user is authenticated
    useEffect(() => {
        UserAuth.isUserAuthenticated().then((authenticated) => {
            setIsAuthenticated(authenticated)
        })
    })

    //Makes the user unauthenticated
    function logOut() {
        UserAuth.logOutUser()
        setShowLogin(false)
        setIsAuthenticated(false)
    }

    return (
        <div className="App">
            <div className='background-image'>
                <div className="blur" />
            </div>
            <header className="App-header">
                <a href='/'>
                    <img src="/hamncafet_logo.png" alt="Hamncafét logga" className="main_logo" />
                </a>

                <Router>
                    <Switch>
                        <Route exact path='/'>
                            <Button href="/guests">Boka bord</Button>
                            {!isAuthenticated && <Button className='login-btn' onClick={() => setShowLogin(true)}>🔑</Button>}
                            {isAuthenticated && <Button className='logout-btn' onClick={() => logOut()}>Logga ut</Button>}
                            {isAuthenticated && <Button className='bookings-btn' href='/bookings'>Se bokningar</Button>}

                            <div>
                                <Button variant="primary" className='contact-btn' onClick={() => handleShowCreateModal()}>Kontakt</Button>
                                <Modal show={showCreateModal} onHide={handleCloseCreateModal}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Kontakt</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <div> Har ni några frågor eller vill hellre boka via telefon eller mail? Tveka inte att kontakta oss!
                                            <br />
                                            <br />
                                            Telefon: <a href="tel:0304-570-07">0304-570 07</a>
                                            <br />
                                            Email: <a href="mailto:info@gullholmenshamncafe.se">info@gullholmenshamncafe.se</a>
                                        </div>
                                    </Modal.Body>
                                </Modal>
                            </div>

                            {showLogin ?
                                <LoginForm showLoginProp={showLogin} setShowLoginProp={setShowLogin} />
                                : null}

                        </Route>

                        <Route path='/guests'>
                            <Wizard />
                        </Route>
                    </Switch>
                </Router>
                <DownloadInstructions/>
            </header>
        </div>
    );
}

export default HomeComponent;