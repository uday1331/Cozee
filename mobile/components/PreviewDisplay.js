import React from 'react';
import { View } from 'react-native';

const PreviewDisplay = () => {
    return(
        <View style={
            { 
                flex: 1, 
                height: 48, 
                borderWidth: 0.5, 
                borderColor: '#dddddd', 
                minWidth: 24, 
                marginRight: 8, 
                backgroundColor: 'white',
                opacity: 0.4
            }}>

        </View>
    );
}

export default PreviewDisplay;