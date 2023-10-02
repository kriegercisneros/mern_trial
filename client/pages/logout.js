import React, { Component } from 'react';
import getConfig from 'next/config';
import Router from 'next/router'

//below syntax simply establishes a class Logout and declares it as a react component
class Logout extends Component {
    //constructor() is a special method for creating and initializing objects from a class
    //you need to call super(), which brings all the attributes of the previous class down
    //this is good if we want to inherit class attributes, but not necessarily necessary 
    //for our purpose in this component, yet.  constructor and super are auto assigned in this case
    // constructor(){
    //     super()
    // }
    handleLogout = ()=>{
        //the arrow function defines the e handler (logout) which auto-binds 'this'
        //this accesses the apps runtime configuration
        const {publicRuntimeConfig } = getConfig();
        //look in next.config.js
        const apiUrl = publicRuntimeConfig.apiUrl

        fetch(`${apiUrl}/api/auth/logout`,{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
        })
        .then((resp)=>resp.json())
        .then(data=>{
            if(data.message){
                console.log(data.message);
                Router.push('/')
            }
        })
        .catch((error)=>{
            console.error('error during logout', error)
        });
    };
    render(){
        return(
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh', justifyContent: 'center' }}>
                <h2>Are you sure you want to logout?</h2>
                <button onClick={this.handleLogout}>Logout</button>
            </div>
        )
    }
}

export default Logout;