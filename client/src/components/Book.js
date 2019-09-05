import React from 'react';
import {Link} from "react-router-dom";

class Book extends React.Component{

    // componentDidMount() {
    //     fetch(`http://localhost:5000/api/books/${this.props.bookId}`)
    //         .then(res=>res.json())
    //         .then(book => this.setState({book} ))
    // }

    render(){
        return (
            <div className={'book col-md-3'}>
                <Link to={`/book/`+this.props.dataKey}><h4>{this.props.name}</h4></Link>
            </div>
        );
    };
}

export default Book;