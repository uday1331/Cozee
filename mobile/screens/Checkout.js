import React from 'react';
import { View, Button, Text } from 'react-native';
import CheckoutCard from '../components/CheckoutCard';
import {addOrder} from "../store/actions/products";

class Checkout extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            cartItem: [{
                id : '9gRo2xMlAwDsZt8IVZdi',
                uri : 'https://www.fantasticfurniture.com.au/medias/BTOBEDDBLOOOFABCHA-LIF-CONTAINER-original-FantasticFurniture-WF-Product-Detail?context=bWFzdGVyfGltYWdlcy9CVE9CRUREQkxPT09GQUJDSEF8MTE4NTAwfGltYWdlL2pwZWd8aW1hZ2VzL0JUT0JFRERCTE9PT0ZBQkNIQS9oOGIvaDUwLzkwNjA4MjMzMDIxNzQuanBnfDAwOTZiZTA2OTU0MjI1NDBkZWM1MGVhNjBkZjYxZjdjYmRkMGFiMGVjM2I3ZmEwYjAxMmI1YjVkNzU2YTEyNzU',
                name : 'Fancy King size bed',
                rating : 3.1,
                price : '$5,042 HKD'
            }]
        }
    }

    render() {
        let ids = this.state.cartItem.map(item => item.id);
        return(
            <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 24, marginTop: 20, marginLeft: 20 }}> Your Items </Text>
                <CheckoutCard imageUri={this.state.cartItem.uri} title={this.state.cartItem.name} />
                <View style={{ height: 250 }}></View>
                <Button 
                    style={{ position: 'absolute', bottom: 0 }}
                    title="Checkout"
                    onPress={() => {
                        this.props.addOrder(ids);
                        Alert.alert('Order place')
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