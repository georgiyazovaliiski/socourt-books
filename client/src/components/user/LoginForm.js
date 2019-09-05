import React from 'react';
import {Link} from "react-router-dom";

class LoginForm extends React.Component{
    constructor(){
        super();

        this.Login = this.Login.bind(this)
     }

    Login(e){
        e.preventDefault();
    }

    render(){
        return (
            <div className={'book col-md-12'}>
                <form onSubmit={this.Login}>
                    <input type={'email'} name={'email'} placeholder={'Enter email...'}/>
                    <input type={'password'} name={'pass'} placeholder={'Enter pass...'}/>
                    <input type={'submit'}/>
                </form>
            </div>
        );
    };
}

export default LoginForm;