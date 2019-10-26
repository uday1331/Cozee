import React from 'react';
import Product from "./Product";

class ViewProduct extends React.Component{
    render() {
        const products = [];
        return(
           <div style={{display:'flex'}}>
               {
                   products.map(product => {
                        return <Product product={product}/>
                   })
               }
           </div>
        );
    }
}

export default ViewProduct;