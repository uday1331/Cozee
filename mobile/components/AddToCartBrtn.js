import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const AddToCartBtn = ({ cartCount }) => {
    return(
        <View style={{ flex: 1 }}>
            <MaterialIcons name="add-shopping-cart" size={38} color="white"/>
        </View>
    );
}

export default AddToCartBtn;