import {
  FirebaseDB,
  Firebase,
  FirebaseStorage
} from "../../constants/firebase";

export const GET_PRODUCTS = "GET_PRODUCTS";
export const FETCH_ERROR = "FETCH_ERROR";
export const UPLOAD_PRODUCTS = "UPLOAD_PRODUCTS";
export const GET_ORDERS = 'GET_ORDERS';

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
                img: data.displayImage,
                company: data.company,
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
          category: values.categories.join(" "),
          company:values.company,
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
                category: values.categories.join(" "),
                company:values.company,
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

async function getProduct(id){
  if(id){
    let productRef = FirebaseDB.collection('products').doc(id);
    try{
      let snap = await productRef.get();
      let data = snap.data();
      console.log(snap);
      console.log(data);
      if(data){
        let product = {
          id: snap.id,
          title: data.title,
          img: data.displayImage,
          description: data.description,
          category: data.category,
          price: data.price,
        }
        return product;
      }else {
        console.log('exit');
        return;
      }

    }catch(e){
      console.log(e.message);
      return  null}
  }
}

export function getOrders(id) {
  return async dispatch => {
    if(Firebase === null){
      return (dispatch({
        type:GET_ORDERS,
        data:null
      }));
    }
    try{
      let orderRef = FirebaseDB.collection('orders');
      let orders = [];
      await orderRef.onSnapshot(snapshot => {
        snapshot.docChanges().map(change => {
          if(change.type === "added"){
            let index = orders.findIndex(e=> e.id === change.doc.id)
            if(index === -1){
              console.log('here');
              let id = change.doc.id;
              let data = change.doc.data();
              let productIds = data.products.split(',');
              let products = [];
              productIds.map(async id => {
                let product = await getProduct(id);
                console.log(product);
                products.push(product);
              })
              orders.push({
                id: id,
                products: products
              })
            }
          }else if(change.type === 'modified'){
            let index = orders.findIndex(e=> e.id === change.doc.id)
            if(index !== -1){
              let id = change.doc.id;
              let data = change.doc.data();
              let productIds = data.products.split(',');
              let products = [];
              productIds.map(async id => {
                if(id) {
                  let product = await getProduct(id);
                  products.push(product);
                }
              })
              orders[index] = {
                id: id,
                products: products
              }
            }
          }
          if(orders.length === snapshot.size && snapshot.size !== 0)
          {
            dispatch({
              type:GET_ORDERS,
              data: orders,
            })
          }
        })


      })



    }catch(e){
      dispatch({
        type:FETCH_ERROR,
        data:e.message,
      })
    }
  }
}