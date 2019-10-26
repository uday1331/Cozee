import React from 'react';
import { View, Text} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

//import components
import Home from './screens/Home';


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
        Home: Home,
        Details : Details
    },
    {
        initialRouteName : 'Home'
    }

);

export default createAppContainer(AppNavigator);