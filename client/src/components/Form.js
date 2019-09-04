import React from 'react'
import {connect} from "react-redux";
import {searchBooks} from '../actions/index'
import store from '../store/index'

class ConnectedForm extends React.Component{
    componentDidMount() {
        console.log('MAIKA MU')
        console.log(this.props.searchBook('Updateche'));
    }

    render() {
        const {searchTerm} = this.props.searchTerm;
        console.log(searchTerm)
        return(
            <form onSubmit={this.handleSubmit}>
                <input type={'text'} name={'search'} onChange={this.handleChange} id={'searchTerm'} placeholder={'search'}/>
                <input type={'submit'} />
            </form>
        )
    }
}

const mapStateToProps = function(state){
    return {
        books: state.books,
        isFetching: state.isFetching,
        error:state.error,
        searchTerm: state.searchTerm
    };
};

function mapDispatchToProps(dispatch) {
    return {
        searchBook: book => dispatch(searchBooks(book))
    };
}
let Form = connect(mapStateToProps, mapDispatchToProps)(ConnectedForm);
export default Form;