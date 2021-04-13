import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { Link, useHistory } from 'react-router-dom';
import bar from "../images/icons/Group 33072.png"
import { Form, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { FormControl } from '@material-ui/core';
// import logOut from "../Login/LoginManager"
import { UserContext } from '../../App';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));
const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    const history = useHistory()
    const changeState = (data) => {
        history.push(data)

    }
    const LogOut = () => {
        const user = {
            name: "",
            email: ""
        }
        setLoggedInUser(user)
    }
    const LogIn = () => {
        history.push("/login")
    }
    return (
        <div>
            <Navbar bg="#00F7F7" expand="sm" >
                <Navbar.Brand className="mx-5" href="/"><img style={{ height: "30px", borderRadius: "10px" }} src={bar} alt="" /></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    {/* className="mx-5" className="" */}
                    <Nav className="ml-auto g-3">
                        <Nav.Link onClick={() => changeState("/home")}>Home</Nav.Link>
                        <Nav.Link onClick={() => changeState("/orders")}>Orders</Nav.Link>
                        <Nav.Link onClick={() => changeState("/admin")}>Admin</Nav.Link>
                        <Nav.Link onClick={() => changeState("/deals")}>Deals</Nav.Link>
                        {
                            loggedInUser.email ? <Nav.Link className="btn btn-success outline-success btn-sm bg-light" onClick={LogOut}>{loggedInUser.name}</Nav.Link> : <Nav.Link className="btn btn-success outline-success btn-sm bg-light" onClick={LogIn}>LogIn</Nav.Link>
                        }

                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
};

export default Header;