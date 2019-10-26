import React from 'react';
import { Entypo } from '@expo/vector-icons';
import { View } from 'react-native';

const MarketButton = () => {
    return(
        <View style={{ flex: 1 }}>
            <Entypo name="shop" size={32} color="white" />
        </View>
    );
}

export default MarketButton;