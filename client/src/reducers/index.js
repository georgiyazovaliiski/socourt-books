import {
    ADD_BOOK,
    FETCH_BOOKS,
    FETCH_BOOK,
    GET_BOOKS,
    RECEIVE_ERROR,
    GET_BOOK,
    FETCH_JWT, GET_JWT
} from "../constants/action-types";
import * as BookService from '../services/bookService'

const initialState = {
    books: [],
    isFetching: false,
    isError: false,
    error: '',
    searchTerm:'',
    genreFilter:'',
    selectedBook: null,

    jwt:''
};
function rootReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_BOOKS:
            return Object.assign({}, state, {
                isFetching: true,
                books: {},
                isError: false,

            });
        case GET_BOOKS:
            return Object.assign({}, state, {
                books: action.books,
                isFetching: false,
                isError: false
            });
        case GET_BOOK:
            return Object.assign({}, state, {
                selectedBook: action.book,
                isFetching: false,
                isError: false
            });
        case RECEIVE_ERROR:
            return Object.assign({}, state, {
                isError: true,
                isFetching: false,
                error: action.error
            });
        case FETCH_BOOK:
            return Object.assign({}, state, {
                isFetching: true,
                book: {},
                isError: false
            });
        case FETCH_JWT:
            return Object.assign({}, state, {
                isFetching: true,
                jwt: '',
                isError: false
            });
        case GET_JWT:{
            return Object.assign({}, state, {
                isFetching: false,
                jwt: action.jwt,
                isError: false
            })};
        default:
            return state;
    }
};
export default rootReducer;

function responseHandler(res){
    console.log(res);
}