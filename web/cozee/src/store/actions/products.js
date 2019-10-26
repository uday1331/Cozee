import {FirebaseDB, Firebase} from "../../constants/firebase";

export const GET_PRODUCTS = 'GET_PRODUCTS';
export const FETCH_ERROR = 'FETCH_ERROR';

export function getProducts() {
    return async dispatch => {
        if(Firebase === null){
            dispatch({
                type:GET_PRODUCTS,
                data:null
            })
        }
        try{
            let products = [];
            let productRef = await FirebaseDB.collection('products');
            await productRef.onSnapshot(snap => {
                snap.docChanges().map(change=> {
                    let data = change.doc.data();
                    if(change.type === "added"){
                        let index = products.findIndex(e =>
                            {return e.id === change.doc.id}
                        )
                        if(index === -1)
                        {
                            let product = {
                                title:data.title,
                                price: data.price,
                                description: data.description,
                                category: data.category,
                                img: data.displayImage,
                            }
                            products.push(product);
                        }
                    }else if(change.type === "modified"){
                        let index = products.findIndex(e =>
                            {return e.id === change.doc.id}
                        )
                        if(index !== -1)
                        {
                            let product = {
                                title:data.title,
                                price: data.price,
                                description: data.description,
                                category: data.category,
                                img: data.displayImage,
                            }
                            products[index] = product;
                        }
                    }
                });
                dispatch({
                    type:GET_PRODUCTS,
                    data:products
                })
            })
            console.log(productRef);
        }catch(e){
            dispatch({
                type:'FETCH_ERROR',
                data:e.message,
            })
        }
    }
}