import React from 'react'
import {connect} from "react-redux";
import {searchBooks} from '../actions/index'
import store from '../store/index'

class ConnectedForm extends React.Component{
    constructor(){
        super()
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        // console.log(this.props.searchBook('Updateche'));
    }

    handleSubmit(e){
        e.preventDefault();

        let search = e.target['search'].value;

        this.props.searchBook(search);
    }

    render() {
        const {searchTerm} = this.props.searchTerm;
        console.log(searchTerm)
        return(
            <form onSubmit={this.handleSubmit}>
                <input type={'text'} name={'search'} id={'searchTerm'} placeholder={'search'}/>
                <input type={'submit'} />
            </form>
        )
    }
}

function mapStateToProps(state){
    return {
        books: state.books,
        isFetching: state.isFetching,
        error:state.error,
        searchTerm: state.searchTerm
    };
};

function mapDispatchToProps(dispatch) {
    return {
        searchBook: searchTerm => dispatch(searchBooks(searchTerm))
    };
}
let Form = connect(mapStateToProps, mapDispatchToProps)(ConnectedForm);
export default Form;