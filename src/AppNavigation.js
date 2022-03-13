import React from 'react';
import {TouchableOpacity, Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {navigationRef} from './RootNavigation';
import Home from './screens/Home';
import * as RootNavigation from './RootNavigation';
import Colors from './theme/colors';

const menuIcon = require('./assets/images/baseline_menu_white_24pt.png');
const searchIcon = require('./assets/images/baseline_search_white_24pt.png');

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  const onPressSearch = () => {
    alert('Clicked')
    // TODO
    // RootNavigation.navigate('Search');
  };

  return (
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerStyle: {backgroundColor: Colors.primary},
            headerTintColor: Colors.white,
            headerTitleStyle: {fontWeight: 'bold'},
          }}>
          <Stack.Group>
            <Stack.Screen
              name="Home"
              component={Home}
              options={{
                headerLeft: () => (
                  <TouchableOpacity onPress={() => alert('Clicked')}>
                    <Image source={menuIcon} />
                  </TouchableOpacity>
                ),
                headerRight: () => (
                  <TouchableOpacity onPress={(onPressSearch)}>
                    <Image source={searchIcon} />
                  </TouchableOpacity>
                ),
              }}
            />
          </Stack.Group>
          <Stack.Group screenOptions={{presentation: 'modal'}}>
            {/* Add full screen modals here */}
            {/* <Stack.Screen name="MyModal" component={ModalScreen} /> */}
          </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer>
  );
}
