import React from 'react';
import { View, Button } from 'react-native';
import { styles } from '../App';

const goToDesignScreen = ({ navigation }) => {
    navigation.navigate('Design');
}

const InitDesign = (props) => {
    return(
        <View style={styles.container}>
            <Button 
                title="Start Design"
                onPress={() => {goToDesignScreen(props)}} />
        </View>
    );
}

export default InitDesign;