import {RECEIVE_ERROR, GET_BOOKS, FETCH_BOOKS, FETCH_BOOK, GET_BOOK} from "../constants/action-types";
import store from "../store"
import * as BookService from '../services/bookService'
export function receiveError(error) {
    return { type: RECEIVE_ERROR, error }
};

export function fetchBooks(){
    return {type: FETCH_BOOKS}
}

export function fetchBook(){
    return {type: FETCH_BOOK}
}

export function receiveBooks(books){
    return {type: GET_BOOKS, books}
}

export function receiveBook(book){
    return {type:GET_BOOK, book}
}

export const getBook = (id) =>{
    store.dispatch(fetchBook())
    return function(dispatch, getState) {
        return fetch(`http://localhost:5000/api/books/${id}`)
            .then(data => data.json())
            .then(data=>
            {
                console.log(data)
                if(data.message === 'Error'){
                    throw new Error('Not found.')
                }else{
                    dispatch(receiveBook(data))
                }
            }).catch((e)=>dispatch(receiveError(e)))
    }
}

export const getBooks = () => {
    store.dispatch(fetchBooks());
    return function(dispatch, getState) {
        return fetch(`http://localhost:5000/api/books`)
            .then(data => data.json())
            .then(data=>
            {
                if(data.message === 'Error'){
                    throw new Error('Not found.')
                }else{
                    dispatch(receiveBooks(data))
                }
            }).catch((e)=>dispatch(receiveError(e)))
    }
};


export const searchBooks = (name) => {
    store.dispatch(fetchBooks());
    return function(dispatch, getState) {
        return fetch(`http://localhost:5000/api/books/search`,
            {
                method:"POST",
                dataType: 'json',
                body: JSON.stringify({name: name}), // data can be `string` or {object}!
                headers:{
                    'Content-Type': 'application/json'
                }
            }
            )
            .then(data => data.json())
            .then(data=>
            {
                if(data.message === 'Error'){
                    throw new Error('Not found.')
                }else{
                    dispatch(receiveBooks(data))
                }
            }).catch((e)=>dispatch(receiveError(e)))
    }
};