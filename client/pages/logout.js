import React, { Component } from 'react';
import getConfig from 'next/config';

class Logout extends Component {
    constructor(){
        super()
    }
    handleLogout = ()=>{
        const {publicRuntimeConfig } = getConfig();
        const apiUrl = publicRuntimeConfig.apiUrl

        fetch(`${apiUrl}/api/auth/logout`,{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
        })
        .then((resp)=>{
            if(resp.ok){
                window.location.href = '/'
            }else {
                console.error('logout failed')
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