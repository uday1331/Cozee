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
      let productRef = FirebaseDB.collection("products");
      productRef.onSnapshot(snap => {
        let products = []
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
                img: data.displayImage,
                company:data.company,
                rating: data.rating,
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
                img: data.displayImage,
                company: data.company,
                rating: data.rating,
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
    } catch (e) {
      console.log(e.message);
      dispatch({
        type: "FETCH_ERROR",
        data: e.message
      });
    }
  };
}

export function uploadProduct(values, base64) {
  return async dispatch => {
    if (Firebase === null) {
      dispatch({
        type: UPLOAD_PRODUCTS,
        data: null
      });
    }
    try {
      let id = await FirebaseDB.collection("products").doc().id;
      let url = await uploadFile(id, base64);
      console.log(url);
      let setProduct = await FirebaseDB.collection("products")
        .doc(id)
        .set({
          title: values.title,
          price: values.title,
          displayImage: url,
          description: values.description,
          category: values.categories.join(" ")
        });
    } catch (e) {
      console.log(e.message);
      dispatch({
        type: UPLOAD_PRODUCTS,
        data: e.message
      });
    }
  };
}

export function uploadFile(base64string, values) {
  return async dispatch => {
    if (Firebase === null) {
      dispatch({
        type: GET_PRODUCTS,
        data: null
      });
    }
    try {
      let id = await FirebaseDB.collection("products").doc().id;
      let storageRef = FirebaseStorage.ref("products");
      let imageLocation = await storageRef.child(id + "/displayImage");
      let arr = base64string.split(",");
      let url;
      base64string = arr[1];
      await imageLocation
        .putString(base64string, "base64")
        .then(function(snapshot) {
          url = snapshot.ref.getDownloadURL().then(async url => {
            await FirebaseDB.collection("products")
              .doc(id)
              .set({
                title: values.title,
                price: values.price,
                displayImage: url,
                description: values.description ? values.description : "",
                category: values.categories.join(" ")
              })
              .catch(e => console.log(e.message));
          });
        });
    } catch (e) {
      console.log(e.message);
      dispatch({
        type: "UPLOAD_ERROR",
        data: e.message
      });
    }
  };
}
