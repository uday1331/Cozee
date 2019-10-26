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
            await productRef.onSnapshot(async snap => {
                await Promise.all(snap.docChanges().map(change=> {
                    console.log(change);
                    if(change.type === "added"){
                        let data = change.doc.data();
                        let index = products.findIndex(e =>
                            {return e.id === change.doc.id}
                        )
                        if(index === -1)
                        {
                            let product = {
                                id: change.doc.id,
                                title:data.title,
                                price: data.price,
                                description: data.description,
                                category: data.category,
                                img: data.displayImage,
                            }
                            products.push(product);
                        }
                    }else if(change.type === "modified"){
                        let data = change.doc.data();
                        let index = products.findIndex(e =>
                            {
                                console.log(e.id);
                                console.log(change.doc.id);
                                return e.id === change.doc.id
                            }
                        )
                        console.log(index);
                        if(index !== -1)
                        {
                            console.log('modifying');
                            let product = {
                                id:change.doc.id,
                                title:data.title,
                                price: data.price,
                                description: data.description,
                                category: data.category,
                                img: data.displayImage,
                            };
                            products[index] = product;
                        }
                    }
                }));
                dispatch({
                    type:GET_PRODUCTS,
                    data:products
                })
            });
        }catch(e){
            dispatch({
                type:'FETCH_ERROR',
                data:e.message,
            })
        }
    }
}