import React from 'react'
import {getOrders} from "../store/actions/products";
import {connect} from 'react-redux'
import {Card, List} from "antd";
import Product from "./Product";

class Orders extends React.Component{
    componentDidMount() {
        this.props.getOrders("9gRo2xMlAwDsZt8IVZdi");
    }

    render() {
        const {orders} = this.props.products;
        return(
            <>
            {
                orders.map(order => {
                    return <Card title={"Order ID (9gRo2xMlAwDsZt8IVZdi) "}>
                        <List
                            grid={{ gutter: 16, column: 4 }}
                            dataSource={order.products}
                            renderItem={item => (
                                <List.Item>
                                    <Product product={item}/>
                                </List.Item>
                            )}
                        />,
                    </Card>
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