import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Detail, Home} from 'pages';

const Stack = createStackNavigator();

const Routes = () => {
  const {Navigator, Screen} = Stack;
  return (
    <Navigator screenOptions={{headerShown: false}}>
      <Screen name="Home" component={Home} />
      <Screen name="Detail" component={Detail} />
    </Navigator>
  );
};

export default Routes;
