import React from 'react';
import { StatusBar, StyleSheet, Text, View, Alert } from 'react-native';
import { Button, Icon, Input } from 'react-native-elements';
import MapView, { Marker } from 'react-native-maps';
import * as firebase from 'firebase';

import Title from '../components/Title';
import { colors } from '../utils';

// Insert hardcoded credentials
// TODO: Find better way to handle authentication
const EMAIL = ''; 
const PASSWORD = '';


class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false
        }
    }
    
async signup(email, pass) {
    try {
        await firebase.auth().createUserWithEmailAndPassword(email, pass);
        console.log('Account created');
        alert('Sådan, du er nu oprettet');
        this.setState({loggedIn: true});
        // Navigate to the Home page, the user is auto logged in
    } catch (error) {
        console.log(error.toString());
    }
}
async login(email, pass) {
    try {
        await firebase.auth().signInWithEmailAndPassword(email, pass);
        console.log('Logged In!');
        alert('Du er nu logget ind');
        this.setState({loggedIn: true});
        // Navigate to the Home page
    } catch (error) {
        console.log(error.toString());
    }
}

    render() {
        return (
            <View style={styles.container}>
                { 
                    this.state.loggedIn ? 
                        <Title h4>Du er logget ind</Title> 
                    :
                    <View>
                        <Title h4>Du er ikke logget ind: </Title>
                        <Button buttonStyle={{ margin: 10, backgroundColor: colors.primary, borderRadius: 30}} title={'Signup'} onPress={() => this.signup(EMAIL, PASSWORD)} />
                    
                      
                        <Button buttonStyle={{ margin: 10, backgroundColor: colors.primary, borderRadius: 30}} title={'Login'} onPress={() => this.login(EMAIL, PASSWORD)} />
                    </View>
                }
            </View>
        );
    };
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        paddingTop: 0,
        alignSelf: 'stretch'
    },
    map: {
        flex: 1,
        marginTop: 10,
        marginBottom: 10,
        alignSelf: 'stretch'
    },
    cta: {
        backgroundColor: colors.primary,
        borderRadius: 30
    },
    ctaText: {
        fontFamily: 'Avenir Next',
        fontWeight: '600',
        fontSize: 20,
        color: colors.text
    },
    ctaWrapper: {
        alignSelf: 'stretch',
        margin: 20,
        marginBottom: 30
    }
});

export default Settings;
