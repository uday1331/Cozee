import {GET_ORDERS, GET_PRODUCTS} from "../actions/products";

export const initialState= {
    products:[],
    orders:[],
}

export default (state = initialState, action) => {
    switch(action.type){
        case GET_PRODUCTS:
            return{
                ...state,
                products: action.data,
            }
        case GET_ORDERS:
            return {
                ...state,
                orders: action.data,
            }
        default:
            return{
                ...state,
            }
    }
}