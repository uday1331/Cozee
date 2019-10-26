import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Display from './Display';

const AppNavigator = createStackNavigator(
    {
        Display
    },
    {
        initialRouteName : 'Display'
    }

);

export default createAppContainer(AppNavigator);