import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {
    Button,
    Grid,
    Typography,
} from "@material-ui/core";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase-config'
import axios from 'axios'
import Autocomplete from '@mui/material/Autocomplete';
import {useNavigate} from 'react-router-dom'
import User from '../classes/User'

// Load the list of country codes and its calling codes from a third party API
const loadCodes = async function (setCodes) {
    const results = await axios.get('https://restcountries.com/v2/all?fields=alpha2Code,callingCodes')
    const data = results.data
    let codes = data.map(d => { return { value: d.callingCodes[0], label: d.alpha2Code + "-" + d.callingCodes[0] } })
    setCodes(codes)
}


export default function RegistrationPage(props) {

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [countryCode, setCountryCode] = useState("")
    const [phone, setPhone] = useState("")
    const [codes, setCodes] = useState([])

    let navigate = useNavigate()
    // Load country codes onlt at first render
    useEffect(() => {
        loadCodes(setCodes)
      }, []);

    const handleCountryCodeChange = (value) => {
        setCountryCode(value);
    };

    const handleUsernameChange = (e) => {
        setUsername(e.target.value)
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const handlePhoneChange = (e) => {
        setPhone(e.target.value)
    }

    // register a new user
    const register = async () => {
        try {
            // create a user on firebase with the auth object, entered email and password
            await createUserWithEmailAndPassword(auth, email, password)
            // if the user was successfully created, then create custom user object
            const ourUser = new User(username, email, password, countryCode, phone)
            // save user into database
            let savedUser = await axios.post(`/User`, ourUser)
            const returnedData = savedUser.data
            const user = new User(returnedData.username, returnedData.email, "", returnedData.phone, returnedData.countryCode)
            user._id = returnedData._id
            console.log(user)
            // appdate app that the user has been logged in 
            await props.updateLoggedInUser(user)
            navigate('/')
        } catch (e) {
            console.log(e.message)
        }

    }

    return (
        <div>
            <Grid container direction="column" justify="center" alignItems="center" spacing={2} style={{ paddingTop: "10%" }}>
                <Grid item style={{ width: "30%" }}>
                    <Typography component="h1" variant="h5" style={{ textAlign: 'left' }}>Sign up</Typography>
                </Grid>
                <Grid item style={{ width: "30%" }}>
                    <TextField
                        required
                        id="outlined-required"
                        label="Username"
                        value={username}
                        onChange={handleUsernameChange}
                        name="username"
                        fullWidth
                    />
                </Grid>
                <Grid item style={{ width: "30%" }}>
                    <TextField
                        required
                        id="outlined-required"
                        label="Email"
                        value={email}
                        onChange={handleEmailChange}
                        name="email"
                        fullWidth
                    />
                </Grid>
                <Grid item style={{ width: "30%" }}>
                    <TextField
                        required
                        id="outlined-password-input"
                        label="Password"
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                        name="password"
                        autoComplete="current-password"
                        fullWidth
                    />
                </Grid>
                <Grid item style={{ width: "30%" }}>
                    <Grid container direction="row" spacing={1}>
                        <Grid item style={{ width: "30%" }}>
                            <Box >
                                <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={codes}
      value={countryCode}
    onChange={(event, newValue) => {
        handleCountryCodeChange(newValue.value);
      }}
      renderInput={(params) => <TextField {...params} label="country code" />}
    />
                            </Box>
                            </Grid>
                        <Grid item style={{ width: "70%" }}>
                            <TextField
                                required
                                id="outlined-textarea"
                                label="Phone number"
                                value={phone}
                                onChange={handlePhoneChange}
                                name="phone"
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item style={{ width: "30%" }}>
                    <Button variant="contained"
                        color="primary"
                        type="submit"
                        className="button-block"
                        size="normal"
                        style={{ width: "100%" }}
                        onClick={register}
                    >Sign up</Button>
                </Grid>
            </Grid>
        </div>
    )

}