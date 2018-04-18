import React from 'react';
import { StatusBar, StyleSheet, Text, View, Alert } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import MapView, { Marker } from 'react-native-maps';
import * as firebase from 'firebase';
import Title from '../components/Title';
import { colors } from '../utils';

//const Home = props => {

// Initialize Firebase
var config = {
    apiKey: 'AIzaSyD4MoR58UdYhf91blKqo--X6JgfjC4rhwM',
    authDomain: 'car-drop.firebaseapp.com',
    databaseURL: 'https://car-drop.firebaseio.com',
    projectId: 'car-drop',
    storageBucket: 'car-drop.appspot.com',
    messagingSenderId: '1029496916097'
};
firebase.initializeApp(config);

const DELTA = 0.003;

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            initialLocation: {
                latitude: 55.687292,
                longitude: 12.562344,
                latitudeDelta: 0.1,
                longitudeDelta: 0.1
            },
            location: {
                isParked: false,
                latitude: null,
                longitude: null,
                latitudeDelta: DELTA,
                longitudeDelta: DELTA
            }
        };
        this.itemsRef = firebase.database().ref();
    }    

    listenForItems(itemsRef) {
        itemsRef.on('value', snap => {
            if (snap.val()) {
                console.log(snap.val());
                const updatedState = snap.val();
                this.setState( updatedState );                
            }
            console.log('STATE', this.state);
            //moveMap();
            // get children as an array
            // snap.forEach(child => {
            //     console.log(child.val());
            //     // items.push({
            //     //     title: child.val().title,
            //     //     _key: child.key
            //     // });
            //     items.push()
            // });

        });
    }
    componentDidMount() {
        this.listenForItems(this.itemsRef);
    }


    getLocation = (cb) => {
        // TODO: Check if we have permission
        navigator.geolocation.getCurrentPosition(
            (position) => {
                console.log(position);
                cb({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    error: null,
                  });
            },
            (error) => alert(error.message),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
          );
    }

    onParkCar = () => {        
        this.getLocation((userLocation => this.itemsRef.update({ location: {isParked: true, latitude: userLocation.latitude, longitude: userLocation.longitude, latitudeDelta: DELTA, longitudeDelta: DELTA} })));        
        //     // Get GPS location coordinates
        //     // Save to external DB somewhere (mongoLab maybe?)
        //     // long, lat, parked
        //     // Notify user of success
    };

    onPickUpCar = () => {
        this.itemsRef.update({ location: {isParked: false, latitude: null, longitude: null, latitudeDelta: DELTA, longitudeDelta: DELTA} });
        //     // Get GPS location coordinates
        //     // Save to external DB somewhere (mongoLab maybe?)
        //     // long, lat, parked
        //     // Notify user of success
    };


    render() {
        const { initialLocation, location } = this.state;
        console.log('render', location);
        return (
            <View style={styles.container}>
                <Title h2>Hvor f* er bilen?</Title>
                <MapView
                    style={styles.map}
                    showsUserLocation
                    followsUserLocation={!location.isParked}
                    // initialRegion={{
                    //     latitude: initialLocation.latitude,
                    //     longitude: initialLocation.longitude,
                    //     latitudeDelta: initialLocation.latitudeDelta,
                    //     longitudeDelta: initialLocation.longitudeDelta
                    // }}
                    region={{
                        latitude: location.latitude ? location.latitude : initialLocation.latitude,
                        longitude: location.longitude ? location.longitude : initialLocation.longitude,
                        latitudeDelta: location.latitudeDelta ? location.latitudeDelta : initialLocation.latitudeDelta,
                        longitudeDelta: location.longitudeDelta ? location.longitudeDelta : initialLocation.longitudeDelta
                    }}
                >
                {location.isParked ? 
                <Marker
                  coordinate={location}
                  title={'Le bil'}
                  description={'Her er bilen parkeret'}
                />
                : null}
                </MapView>
                { location.isParked ? 
                <Button
                    title="TA' BILEN"
                    buttonStyle={styles.cta}
                    containerViewStyle={styles.ctaWrapper}
                    textStyle={styles.ctaText}
                    onPress={this.onPickUpCar}
                />
                : 
                <Button
                    title="SÆT BILEN HER"
                    iconRight={{ name: 'location-on' }}
                    buttonStyle={styles.cta}
                    containerViewStyle={styles.ctaWrapper}
                    textStyle={styles.ctaText}
                    onPress={this.onParkCar}
                />
            }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
