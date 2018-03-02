import React from 'react';
import { StatusBar, StyleSheet, Text, View, Alert } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import MapView, { Marker } from 'react-native-maps';
import * as firebase from 'firebase';

import { StackNavigator } from 'react-navigation';

import Settings from './containers/Settings';
import Home from './containers/Home';
import { colors } from './utils';

const RootStack = StackNavigator(
    {
        Home: {
            screen: Home
        },
        Settings: {
            screen: Settings,
            navigationOptions: ({ navigation }) => ({
                title: `Indstillinger`,
                headerRight: null
              }),
        }
    },
    {
        initialRouteName: 'Home',
        /* The header config from HomeScreen is now here */
        navigationOptions: ({ navigation }) => ({
            headerStyle: {
                backgroundColor: colors.background,
                borderBottomWidth: 0
            },
            headerRight: (
                <Icon
                name='settings'
                color={colors.text}
                size={18}
                containerStyle={{paddingRight: 10}}
                onPress={() => navigation.navigate('Settings')} />
            ),
            headerTintColor: colors.text,
            headerTitleStyle: {
                fontWeight: 'bold',
                fontFamily: 'Avenir Next',
                fontSize: 20,
                textAlign: 'center',
                flex: 2
            }
        }),
        cardStyle: {
            flex: 1,
            backgroundColor: colors.background,
            alignItems: 'center',
            padding: 0,
            paddingTop: 0
        }
    }
);

export default class App extends React.Component {
    render() {
        return <RootStack />;
    }
}
