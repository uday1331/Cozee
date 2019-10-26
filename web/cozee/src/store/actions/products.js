import {
  FirebaseDB,
  Firebase,
  FirebaseStorage
} from "../../constants/firebase";

export const GET_PRODUCTS = "GET_PRODUCTS";
export const FETCH_ERROR = "FETCH_ERROR";
export const UPLOAD_PRODUCTS = "UPLOAD_PRODUCTS";

export function getProducts() {
  return async dispatch => {
    if (Firebase === null) {
      dispatch({
        type: GET_PRODUCTS,
        data: null
      });
    }
    try {
      let products = [];
      let productRef = await FirebaseDB.collection("products");
      await productRef.onSnapshot(snap => {
        snap.docChanges().map(change => {
          let data = change.doc.data();
          if (change.type === "added") {
            let index = products.findIndex(e => {
              return e.id === change.doc.id;
            });
            if (index === -1) {
              let product = {
                title: data.title,
                price: data.price,
                description: data.description,
                category: data.category,
                img: data.displayImage
              };
              products.push(product);
            }
          } else if (change.type === "modified") {
            let index = products.findIndex(e => {
              return e.id === change.doc.id;
            });
            if (index !== -1) {
              let product = {
                title: data.title,
                price: data.price,
                description: data.description,
                category: data.category,
                img: data.displayImage
              };
              products[index] = product;
            }
          }
        });
        dispatch({
          type: GET_PRODUCTS,
          data: products
        });
      });
      console.log(productRef);
    } catch (e) {
      dispatch({
        type: "FETCH_ERROR",
        data: e.message
      });
    }
  };
}

export function uploadProduct (values, base64) {
  return async dispatch => {
    if(Firebase === null) {
      dispatch({
        type:UPLOAD_PRODUCTS,
        data:null
      })
    }
    try{
      let id = await FirebaseDB.collection("products").doc().id;
      let url = await uploadFile(id, base64);
      let setProduct = await FirebaseDB.collection("products").doc(id).set({
        title: values.title,
        price: values.title,
        displayImage: url,
        description: values.description,
        category: values.categories.join(' '),
      });
    }catch (e) {
      console.log(e.message);
      dispatch({
        type:UPLOAD_PRODUCTS,
        data:e.message,
      })
    }
  }
}

export function uploadFile(id, base64string) {
  return async dispatch => {
    if (Firebase === null) {
      dispatch({
        type: GET_PRODUCTS,
        data: null
      });
    }
    try {

      let storageRef = FirebaseStorage.ref("products");
      let imageLocation = await storageRef.child(id + "/displayImage");
      let arr = base64string.split(',')
      let url;
      base64string = arr[1];
      imageLocation.putString(base64string, "base64").then(function(snapshot) {
        console.log('uploaded');
        url = snapshot.ref.getDownloadURL();
        return url;
      })
    } catch (e) {
        console.log(e.message);
      dispatch({
        type: "UPLOAD_ERROR",
        data: e.message
      });
    }
  };
}
