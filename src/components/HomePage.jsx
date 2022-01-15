import React, { useState, useEffect } from 'react';
import LoginPage from './LoginPage';
import RegistrationPage from './RegistrationPage'
import { BrowserRouter as Router, Route, Link as RouterLink, HashRouter, Routes } from 'react-router-dom'
import Link from "@material-ui/core/Link";
import { Button, Grid } from '@mui/material';
import {
  TextField,
  Typography
} from "@material-ui/core";
import axios from 'axios'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';

// Loads all the posts saved in the database regardless of their poster
const loadPosts = async function(setPostsList){
  console.log('in load posts')
  const results = await axios.get('http://localhost:3001/TextPost')
  const data = results.data
  // console.log(data)
  let posts = data.map(d => { return { user: d.user.username, text: d.text } })
  // console.log(posts)
  setPostsList(posts)
}


export default function HomePage(props) {

  const [post, setPost] = useState("")
  const [postsList, setPostsList] = useState("")

  // load posts from database only at first render
  useEffect(() => {
    loadPosts(setPostsList)
  }, []);

  // add the new post at the top of the existed list of posts
  const addNewPost = (post) => {
    let newPosts = [... postsList]
    newPosts.unshift(post)
    setPostsList(newPosts)
  }

  const handlePostChange = (e) => {setPost(e.target.value)}

  // create a new post with text attribute and user attribute which holds the poster's id
  const submit = async () => {
    const userID = props.user.user.user._id
    let newPost = {user: userID,
                    text: post}
    console.log(newPost)
    try {
      // save post to database
      await axios.post(`http://localhost:3001/TextPost`, newPost)
      // after the new post is saved in the database, update the client's posts list
      addNewPost({user: props.user.user.user.username,
                  text: post})
      
    } catch (e) {
        console.log(e.message)
    }
  }
    return (
      <div className='homePage'>
      <Grid container direction="column" spacing={2} justify="center" alignItems="center"  style={{paddingTop:"5%"}} >
        <Grid item style={{ width: "60%" }}>
        <Typography component="h1" variant="h5" style={{textAlign: 'center'}}>Welcome {props.user.user.user.username}!</Typography>
        </Grid>
        <Grid item style={{ width: "60%" }}>
        <Grid container direction="row" spacing={1}>
        <Grid item style={{ width: "80%" }}>
        <TextField placeholder="What's going on in your mind?"
                                    fullWidth
                                    size="normal"
                                    name="post"
                                    variant="outlined"
                                    value={post}
                                    onChange={handlePostChange}
                                    sx={6}
                                    ></TextField>
        </Grid>
        <Grid item style={{ width: '20%' }}>
        <Button variant="contained"
                                    color="primary"
                                    type="submit"
                                    className="button-block"
                                    size="large"
                                    style={{width:"100%"}}
                                    onClick={submit}
                                    style={{ height: "100%", width: '100%' }}
                                >Post</Button>
        </Grid>
        </Grid>
        </Grid>
        <Grid item className='postsSection' style={{ width: "60%" }}>
         <Grid container direction="column" spacing={2} >
          {postsList.length!=0? postsList.map(p => {return (
          <Grid item style={{ width: "100%" }}>
          <Card>
      <CardActionArea>
        <CardMedia
        style={{width: 'fit-content'}}
          component="img"
          height="200"
          image={require("../images/download.png")}
          alt="photo"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
          {p.user}
          </Typography>
          <Typography variant="body2" color="text.secondary">
          {p.text}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    </Grid>
          )}): null}
         </Grid>
        </Grid>
      </Grid>
      </div>
    )
}