import { RECEIVE_ERROR, GET_BOOKS, FETCH_BOOKS } from "../constants/action-types";
import store from "../store"
import * as BookService from '../services/bookService'
export function receiveError(error) {
    return { type: RECEIVE_ERROR, error }
};

export function fetchBooks(){
    return {type: FETCH_BOOKS}
}

export function receiveBooks(books){
    return {type: GET_BOOKS, books}
}

export const getBooks = () => {
    store.dispatch(fetchBooks());
    return function(dispatch, getState) {
        return fetch(`http://localhost:5000/api/books`)
            .then(data => data.json())
            .then(data=>
            {
                console.log(data)
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
                body: JSON.parse(name), // data can be `string` or {object}!
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
                    console.log(data)
                    dispatch(receiveBooks(data))
                }
            }).catch((e)=>dispatch(receiveError(e)))
    }
};