import React from 'react';
import { View, Image, Text } from 'react-native';

const CheckoutCard = (props) => {
    return(
        <View style={{ height: 180, flex: 1, borderWidth: 0.5, borderColor: '#dddddd', marginHorizontal: 20, marginTop: 20 }}>
            <View style={{ flex: 3 }}>
                <Image source={{ uri: props.imageUri }}
                style={{ resizeMode: 'cover', flex: 1, width: null, height: null }}/>
            </View>
            <View style={{ flex: 1, paddingTop: 12, paddingHorizontal: 12 }}>
                <Text style={{ fontSize: 24, fontWeight: "bold" }}>{props.title}</Text>
                <Text style={{ fontSize: 16, fontWeight: "bold" }}>{props.price}</Text>
            </View>
        </View>
    );
}

export default CheckoutCard;