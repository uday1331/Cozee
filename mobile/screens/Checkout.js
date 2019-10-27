import React from 'react';
import { View, Button, Text, Alert } from 'react-native';
import CheckoutCard from '../components/CheckoutCard';
import {addOrder} from "../store/actions/products";
import { connect } from "react-redux";

class Checkout extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            cartItem: [{
                id : 'oXVfnw2xggEbY6Wz2YmC',
                uri : 'https://firebasestorage.googleapis.com/v0/b/furnitureapp-292c6.appspot.com/o/products%2FoXVfnw2xggEbY6Wz2YmC%2FdisplayImage?alt=media&token=725a6ef1-b2d9-4b7d-bf92-0f74b9d5afd3',
                name : 'Minimalistic Cupboard',
                rating : 5,
                price : '$2799 HKD'
            }]
        }
    }

    render() {
        let ids = this.state.cartItem.map(item => item.id);
        return(
            <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 24, marginTop: 20, marginLeft: 20 }}> Your Items </Text>
                <CheckoutCard imageUri={this.state.cartItem[0].uri} title={this.state.cartItem[0].name} price={this.state.cartItem[0].price} />
                <View style={{ height: 250 }}></View>
                <Button 
                    style={{ position: 'absolute', bottom: 0 }}
                    title="Checkout"
                    onPress={() => {
                        this.props.addOrder(ids);
                        Alert.alert('Order placed.')
                    }} />
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return{
        ...state,
    }
}

export default connect(mapStateToProps, {addOrder})(Checkout)