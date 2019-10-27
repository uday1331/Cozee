import React from 'react'
import {getOrders} from "../store/actions/products";
import {connect} from 'react-redux'
import {Card, List} from "antd";
import Product from "./Product";

const product = {
    title:'Minimalistic Cupboard',
    img:"https://firebasestorage.googleapis.com/v0/b/furnitureapp-292c6.appspot.com/o/products%2FoXVfnw2xggEbY6Wz2YmC%2FdisplayImage?alt=media&token=725a6ef1-b2d9-4b7d-bf92-0f74b9d5afd3",
    category:'Bedroom',
    price:'2799',
    description:'Put your stuff here',
}

class Orders extends React.Component{
    componentDidMount() {
        this.props.getOrders();
    }

    render() {
        const {orders} = this.props.products;
        console.log(orders);
        return(
            <>
            {
                orders.map(order => {
                    return (<Card title={"Order ID (" + order.id + ") "}>
                        <Product product={product} />
                    </Card>)
                })
            }
            </>

        )
    }
}

const mapStateToProps = (state) => {
    return{
        ...state,
    }
}

export default connect(mapStateToProps,{getOrders})(Orders);