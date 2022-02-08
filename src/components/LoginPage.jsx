import React, { useState, useEffect } from 'react';
import {
    Button,
    TextField,
    Grid,
    Typography,
} from "@material-ui/core";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase-config'
import axios from 'axios'
import Alert from '@mui/material/Alert';
import {useNavigate} from 'react-router-dom'
import User from '../classes/User'


export default function  LoginPage (props){

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [alertMessage, setAlertMessage] = useState("")

    let navigate = useNavigate()

    const handleEmailChange = e => {
        setEmail(e.target.value );
    };

    const handlePasswordChange = e => {
        setPassword(e.target.value);
    };

    // login to app
    const login = async () => {
        try {
            // check if the user exists in the app's database through his email
            let returnedUser = await axios.get(`/User/`+email)
            console.log(returnedUser)
            // if user exists then let him sign in through firbase and update app if sign in succeeded and alert error message to user otherwise
            if(returnedUser.data.length != 0){
                try{
                    const result = await signInWithEmailAndPassword(auth, email, password)
                    console.log('returnedUser: '+returnedUser)
                    const user = returnedUser.data[0]
                    console.log('user: '+user)
                    const userObj = new User(user.username, user.email,"", user.phone, user.countryCode, user.pokemonImg)
                    userObj._id = user._id
                    await props.updateLoggedInUser(userObj)
                    navigate('/')
                }catch(error){
                    setAlertMessage(error.message)
                }
            }else{
                setAlertMessage('This Email does not exist, please check again!')
            }
            
        } catch (e) {
            console.log(e.message)
        }
    }

        return (
            <div className="LoginPage">

                <Grid container justify="center" alignItems="center" style={{paddingTop:"10%"}}>
                    <Grid item xs={6}>
                        <Grid container direction="column" spacing={2} justify="center" alignItems="center" >
                            <Grid item style={{width:"50%"}}>
                                <Typography component="h1" variant="h5" style={{textAlign: 'left'}}>Sign in</Typography>
                            </Grid>
                            <Grid item xs={12} style={{paddingLeft: 0, paddingRight: 0}} style={{width:"50%"}}>
                                <TextField placeholder="Email"
                                    fullWidth
                                    size="normal"
                                    name="email"
                                    variant="outlined"
                                    value={email}
                                    onChange={handleEmailChange}
                                    sx={6}
                                    required></TextField>
                            </Grid>
                            <Grid item style={{width:"50%"}}>
                                <TextField type="password"
                                    placeholder="Password"
                                    fullWidth
                                    name="password"
                                    variant="outlined"
                                    value={password}
                                    onChange={handlePasswordChange}
                                    required></TextField>
                            </Grid>
                            <Grid item style={{width:"50%"}}>
                                <Button variant="contained"
                                    color="primary"
                                    type="submit"
                                    className="button-block"
                                    size="normal"
                                    style={{width:"100%"}}
                                    onClick={login}
                                >Login</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                {alertMessage!=""? <Alert variant="filled" severity="error">{alertMessage}</Alert> : null}
            </div>
        );
}