import React from 'react';
import { View, Text} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

//import screens
import DesignScreen from './screens/DesignScreen';

class Details extends React.Component {
    render() {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Details Screen</Text>
        </View>
      );
    }
}

const AppNavigator = createBottomTabNavigator(
    {
        Design: DesignScreen,
        Details : Details
    },
    {
        initialRouteName : 'Design'
    }

);

export default createAppContainer(AppNavigator);