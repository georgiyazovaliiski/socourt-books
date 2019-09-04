import React from 'react';

class Book extends React.Component{

    // componentDidMount() {
    //     fetch(`http://localhost:5000/api/books/${this.props.bookId}`)
    //         .then(res=>res.json())
    //         .then(book => this.setState({book} ))
    // }

    render(){
        return (
            <div className={'book col-md-3'}>
                <h4>{this.props.name}</h4>
                <p>{this.props.genre}</p>
            </div>
        );
    };
}

export default Book;