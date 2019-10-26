import React from 'react';
import { View, Text} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';

//import screens
import InitDesign from './screens/InitDesign';
import DesignScreen from './screens/DesignScreen';
import Marketplace from './screens/marketplace/Main';

class Details extends React.Component {
    render() {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Details Screen</Text>
        </View>
      );
    }
}

const DesignStack = createStackNavigator(
  {
    Init: InitDesign,
    Design: DesignScreen,
    Marketplace : {
      screen: Marketplace,
      navigationOptions: {
        title: "For the Bedroom"
      }
    }
  },
  {
    initialRouteName: 'Init'
  }
);

const AppNavigator = createMaterialTopTabNavigator(
    {
        Design: {
          screen: DesignStack,
          navigationOptions: {
            tabBarVisible: false
          }
        },
        Details : {
          screen: Details,
          navigationOptions: {
            tabBarVisible: false
          }
        }
    },
    {
        initialRouteName : 'Details',
        tabBarPosition: "bottom",
    }

);

export default createAppContainer(AppNavigator);