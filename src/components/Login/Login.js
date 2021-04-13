import React, { useContext, useState } from 'react';
import ReactDOM from 'react-dom';

import Button from '@material-ui/core/Button';
// import firebaseConfig from '../../firebase.config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
// const firebase = require("firebase/app");
// require("firebase/auth");
// require("firebase/firestore");
import firebase from "firebase/app";

import "firebase/auth";
import "firebase/firestore";
import { UserContext } from '../../App';
import Header from '../Header/Header';
import { useHistory, useLocation } from 'react-router';
import firebaseConfig from '../../firebase.config';


if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app(); // if already initialized, use that one
}



const Login = () => {
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };
    const [loggedInUser,setLoggedInUser]=useContext(UserContext)
    const  provider = new firebase.auth.GoogleAuthProvider();
    const logInWithGoogle=()=>{
        firebase.auth()
            .signInWithPopup(provider)
            .then((result) => {
                /** @type {firebase.auth.OAuthCredential} */
                const credential = result.credential;

                // This gives you a Google Access Token. You can use it to access the Google API.
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                const newUser={
                    name:user.displayName,
                    email:user.email
                
                }
                setLoggedInUser(newUser)
                history.replace(from);               
            })
            .catch((error) => {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                // ...
            });
        
    }
    console.log(loggedInUser)
    
    return (
        
        <div>
           {/* {
                loggedInUser? <p>Ok</p>: <p>Mara Khao</p>

            }
            else{ */}
                <div>
                <Header></Header>
                    <button onClick={logInWithGoogle}> <FontAwesomeIcon icon={faGoogle} /> Log In With Google </button>
                </div>
            {/* } */}
        </div>
    );
};

export default Login;