import React from 'react'
import Book from './Book';
import {connect} from "react-redux";
import {getBook, getBooks} from "../actions/index";
import Form from "./Form";
import {Link} from "react-router-dom";

class Books extends React.Component {
    constructor(){
        super()

        this.displayWholeBook = this.displayWholeBook.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(getBooks());
    }

    displayWholeBook(e){
        console.log('Works: ')
        console.log(e.target._id);
        this.props.dispatch(getBook(e.target._id))
    }

    displayAllBooks(){
        this.props.dispatch(getBooks());
    }

    render(){
        return (
            <div className={'row'}>
                    <div className={'col-md-12'}>
                        <Form/>
                    </div>
                    {this.props.isFetching ? (<h1>Loading</h1>) : null}
                    {this.props.books.length > 0 ? (this.props.books.map((book) => (
                        <Book key={book._id} dataKey={book._id} name={book.name}/>
                        ))
                    ) : null}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
            books: state.books,
            isFetching: state.isFetching,
            error:state.error
    };
};

const mapDispatchToProps = dispatch => {
    return {
        books: () => dispatch(getBooks()),
        selectBook: (id) => dispatch(getBook(id))
    }
};

export default connect(mapStateToProps)(Books);