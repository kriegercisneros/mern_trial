import React, { Component } from 'react';
import getConfig from 'next/config';


class Login extends Component {
    constructor(){
        super();
        this.state = {
            email: '',
            password: '',
            error: null,
        };
    }
    handleInputChange = (event) => {
        this.setState({ [event.target.name]: event.target.value});
    };

    handleLogin = () => {
        const { email, password } = this.state;
        const { publicRuntimeConfig } = getConfig();
        const apiUrl = publicRuntimeConfig.apiUrl;
        console.log(apiUrl)

        fetch(`${apiUrl}/api/auth/login`, {
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email:email, password:password}),
        })
        .then((resp)=>{
            if(resp.ok){
                console.log('login success');
            } else {
                console.error('Login failed')
            }
        })
        .catch((error)=>{
            console.error('error:', error)
        });
    };

    render(){
        const {email, password} = this.state;

        return(
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh', justifyContent: 'center' }}>
                <h2>Login</h2>
                <input
                    type="email"
                    name="email"
                    placeholder="email"
                    value={email}
                    onChange={this.handleInputChange}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="password"
                    value={password}
                    onChange={this.handleInputChange}
                />
                <button onClick={this.handleLogin}>Login</button>
            </div>
        );
    }
}

export default Login