import Button from 'react-bootstrap/Button'
import React, { useState, useRef } from 'react'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from 'react-router-dom'
import DownloadInstructions from './DownloadInstructions';
import StaffLogin from './StaffLogin'
import Wizard from './Wizard'

/**
 * Component for the Home page 
 */
function HomeComponent() {
    const [showLogin, setShowLogin] = useState(false)
    const [showContact, setShowContact] = useState(false)
    return (
        <div className="App">
            <div className='background-image'>
                <div className="blur" />
            </div>
            <header className="App-header">
                <img src="/hamncafet_logo.png" alt="Hamncafét logga" className="main_logo" />

                <Router>
                    <Switch>
                        <Route exact path='/'>
                            <Button href="/guests">Boka bord</Button>
                            <Button href="/bookings">Se bokningar</Button>
                            <Button className='login-btn' onClick={() => setShowLogin(true)}>🔑</Button>
                            <div>
                                <Button className='contact-btn' onClick={() => setShowContact(!showContact)}>Kontakt</Button>
                                {showContact ? 
                                <div class="card" className="contact-card">
                                    <div class="card-body">
                                        <div className="italictext">
                                            <em>Har ni några frågor eller vill hellre boka via telefon eller mail? Tveka inte att kontakta oss!<br />
                                            </em></div>
                                        <div>
                                            Telefon: <a href="tel:0304-570-07">0304-570 07</a> <br />
                                            Email: <a href="mailto:info@gullholmenshamncafe.se">info@gullholmenshamncafe.se</a></div>
                                    </div>
                                </div> : null}
                            </div>
                            <Modal show={showLogin} onHide={() => setShowLogin(false)}>
                            <Modal.Header closeButton>
                                <Modal.Title>Skriv in lösenord</Modal.Title>
                            </Modal.Header>
                            <Modal.Body className='Popup'>
                                <Form>
                                    <Form.Control 
                                        type='password'
                                        name='password'
                                    />
                                    <Button>
                                        Bekräfta	
                                    </Button>
                                </Form>
                            </Modal.Body>
                        </Modal>
                        <DownloadInstructions />
                        </Route>
                        <Route path='/guests'>
                            <Wizard/>
                        </Route>
                    </Switch>
                </Router>
                
            </header>
        </div>
    );
}

export default HomeComponent;