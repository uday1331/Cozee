import React from 'react';
import { View, Button, Text } from 'react-native';
import CheckoutCard from '../components/CheckoutCard';

export default class Checkout extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            cartItem: {
                id : 1,
                uri : 'https://www.fantasticfurniture.com.au/medias/BTOBEDDBLOOOFABCHA-LIF-CONTAINER-original-FantasticFurniture-WF-Product-Detail?context=bWFzdGVyfGltYWdlcy9CVE9CRUREQkxPT09GQUJDSEF8MTE4NTAwfGltYWdlL2pwZWd8aW1hZ2VzL0JUT0JFRERCTE9PT0ZBQkNIQS9oOGIvaDUwLzkwNjA4MjMzMDIxNzQuanBnfDAwOTZiZTA2OTU0MjI1NDBkZWM1MGVhNjBkZjYxZjdjYmRkMGFiMGVjM2I3ZmEwYjAxMmI1YjVkNzU2YTEyNzU',
                name : 'Fancy King size bed',
                rating : 3.1,
                price : '$5,042 HKD'
            }
        }
    }

    render() {
        return(
            <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 24, marginTop: 20, marginLeft: 20 }}> Your Items </Text>
                <CheckoutCard imageUri={this.state.cartItem.uri} title={this.state.cartItem.name} />
                <View style={{ height: 250 }}></View>
                <Button 
                    style={{ position: 'absolute', bottom: 0 }}
                    title="Checkout"
                    onPress={() => Alert.alert('Simple Button pressed')} />
            </View>
        );
    }
}