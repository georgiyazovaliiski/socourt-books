import {ADD_BOOK, FETCH_BOOKS, GET_BOOKS, RECEIVE_ERROR} from "../constants/action-types";
import * as BookService from '../services/bookService'

const initialState = {
    books: [],
    isFetching: false,
    isError: false,
    error: '',
    searchTerm:'',
    genreFilter:''
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
        case RECEIVE_ERROR:
            return Object.assign({}, state, {
                isError: true,
                isFetching: false,
                error: action.error
            });
        default:
            return state;
    }
};
export default rootReducer;

function responseHandler(res){
    console.log(res);
}