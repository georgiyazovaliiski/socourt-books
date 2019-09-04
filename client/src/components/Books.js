import React from 'react'
import Book from './Book';
import {connect} from "react-redux";
import {getBooks} from "../actions/index";
import Form from "./Form";

class Books extends React.Component {
    handleSubmit(e) {
        e.preventDefault()
    }
    componentDidMount() {
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
                            <Book key={book._id} bookId={book._id} name={book.name} genre={book.genre.name}/>
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
        books: () => dispatch(getBooks())
    }
};

export default connect(mapStateToProps)(Books);