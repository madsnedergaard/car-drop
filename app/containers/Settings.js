import React from 'react';
import { StatusBar, StyleSheet, Text, View, Alert } from 'react-native';
import { Button, Icon, Input } from 'react-native-elements';
import MapView, { Marker } from 'react-native-maps';
import * as firebase from 'firebase';

import Title from '../components/Title';
import { colors } from '../utils';

class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
            email: '',
            password: ''
        }
    }
    
async signup(email, password) {
    try { 
        await firebase.auth().createUserWithEmailAndPassword(email, password);
        console.log('Account created');
        alert('Sådan, du er nu oprettet');
        this.setState({loggedIn: true});
        // Navigate to the Home page, the user is auto logged in
    } catch (error) {
        console.log(error.toString());
        alert(error.toString());
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
        alert(error.toString());
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
                        <View style={styles.signupContainer}>
                            <Input
                            placeholder='Email'
                            inputStyle={styles.input}
                            inputContainerStyle={styles.inputContainer}
                            onChangeText={(text) => this.setState({email: text})}
                            value={this.state.email}
                            />
                            <Input
                            placeholder='Password'
                            inputStyle={styles.input}
                            secureTextEntry={true}
                            inputContainerStyle={styles.inputContainer}
                            onChangeText={(text) => this.setState({password: text})}
                            value={this.state.password}
                            />
                        </View>
                        <Button buttonStyle={{ margin: 10, backgroundColor: colors.primary, borderRadius: 30}} title={'Login'} onPress={() => this.login(this.state.email, this.state.password)} />
                        <Title>ELLER</Title>
                        <Button buttonStyle={{ margin: 10, backgroundColor: colors.primary, borderRadius: 30}} title={'Signup'} onPress={() => this.signup(this.state.email, this.state.password)} />
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
    signupContainer: {
        alignItems: 'center',

    },
    inputContainer: {
        borderRadius: 30,
        marginTop: 10,
        marginLeft: 20,
        marginRight: 20,
        paddingLeft: 10,
        backgroundColor: colors.text
},
    input: {
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
