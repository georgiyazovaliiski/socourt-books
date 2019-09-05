import React from 'react';
import {Link} from "react-router-dom";
import {getBook, getBooks, login} from "../../actions";
import {connect} from "react-redux";
import $ from 'jquery';

class LoginForm extends React.Component{
    constructor(){
        super();

        this.Login = this.Login.bind(this)
     }

    Login(e) {
        e.preventDefault();
        let userData = {
            email: $('#email').val(),
            password: $('#password').val()
        }
        this.props.login(userData).then(this.props.history.push("/"))
    }
    render(){
        return (
            <div className={'book col-md-12'}>
                <form id={'loginform'} onSubmit={this.Login}>
                    <input type={'email'} name={'email'} id={'email'} placeholder={'Enter email...'}/>
                    <input type={'password'} name={'pass'} id={'password'} placeholder={'Enter pass...'}/>
                    <input type={'submit'}/>
                </form>
            </div>
        );
    };
}
const mapStateToProps = state => {
    return {
        jwt: state.jwt,
        isFetching: state.isFetching,
        error:state.error
    };
};

const mapDispatchToProps = dispatch => {
    return {
        login: (userData) =>  dispatch(login(userData))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);