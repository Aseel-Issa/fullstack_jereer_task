import './App.css';
import React, { Component } from 'react';
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';
import RegistrationPage from './components/RegistrationPage'
import { BrowserRouter as Router, Route, Link as RouterLink, HashRouter, Routes } from 'react-router-dom'
import Link from "@material-ui/core/Link";
import { Button, Grid } from '@mui/material';
import { signOut } from 'firebase/auth'
import { auth } from './firebase-config'

class App extends Component {

  constructor() {
    super()
    // App should preserve a logged in status and the current logged in user
    this.state = {
      isLoggedIn: false,
      user: {}
    }
  }

  // update loged in user state
  updateLoggedInUser = async (user) => {
    await this.setState({
      isLoggedIn: true,
      user: user
    })
  }

  // signout from app by using firebase, and update state accordingly
  logout = async () => {
    try {
      let result = await signOut(auth)
      console.log(result)
      this.setState({
        isLoggedIn: false,
        user: {}
      })
    } catch (error) {
      console.log(error)
    }

  }

  render(){
    // if the user is not logged in show login component as default, and show sign in, and sign out buttons
    // else show the home component which populates the posts
    if (!this.state.isLoggedIn)
      return (
        <div className="App">
          <Router>
            <Grid container direction="row">
              <Grid item style={{ width: "70%" }}></Grid>
              <Grid item>
                <Button>
                  <Link to="/login" component={RouterLink} underline="none">Login</Link>
                </Button>
                <Button>
                  <Link to="/registration" component={RouterLink} underline="none">Sign up</Link>
                </Button>
              </Grid>
            </Grid>
            <Routes>
              <Route path="/" exact element={<LoginPage updateLoggedInUser={this.updateLoggedInUser}/>} />
              <Route path="/login" exact element={<LoginPage updateLoggedInUser={this.updateLoggedInUser}/>}  />
              <Route path="/registration" exact element={<RegistrationPage updateLoggedInUser={this.updateLoggedInUser} />} />
            </Routes>

          </Router>
        </div>
      );
    else
      {
        console.log("state user: "+JSON.stringify(this.state.user))
        return (
        <div className="App">
        <Router>
          <Grid container direction="row">
            <Grid item style={{ width: "85%" }}></Grid>
            <Grid item>
              <Button onClick={this.logout}>
                <Link underline="none">Sign out</Link>
              </Button>
            </Grid>
          </Grid>
          
            <Routes>
              <Route path="/" exact element={<HomePage user={this.state.user}/>} />
            </Routes>
          </Router>
        </div>
      )}
  }
}

export default App;
