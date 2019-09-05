import React from 'react'
import Book from './Book';
import {connect} from "react-redux";
import {getBook, getBooks} from "../actions/index";
import Form from "./Form";
import {Link} from "react-router-dom";

class CurrBook extends React.Component {
    constructor(){
        super()
    }

    componentDidMount() {
        let gettingBook = this.props.location.pathname.split('/')[this.props.location.pathname.split('/').length-1]
        this.props.dispatch(getBook(gettingBook));
    }

    render(){
        return (
            <div className={'row'}>
                {this.props.isFetching ? (<h1>Loading</h1>) : null}
                {this.props.selectedBook ? (<div className={'currBook'}> <h1>{this.props.selectedBook.created_at}</h1>
                    <Link to={'/books'}>Back...</Link> </div>) : null}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        selectedBook: state.selectedBook,
        isFetching: state.isFetching,
        error:state.error
    };
};

const mapDispatchToProps = dispatch => {
    return {
        book: (id) => dispatch(getBook(id)),
    }
};

export default connect(mapStateToProps)(CurrBook);