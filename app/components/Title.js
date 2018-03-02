import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import { colors } from '../utils';

const styles = StyleSheet.create({
    title: {
        fontFamily: 'Avenir Next',
        textAlign: 'center',
        color: colors.text
    }
});

const Title = props => {
    
    if (props.h2) {
        return (
            <Text h2 style={styles.title}>
                {props.children}
            </Text>
        );        
    } else if (props.h3) {
        return (
            <Text h3 style={styles.title}>
                {props.children}
            </Text>
        );        
    } else if (props.h4) {
        return (
            <Text h4 style={styles.title}>
                {props.children}
            </Text>
        );        
    } else {
        return (
            <Text h2 style={styles.title}>
                {props.children}
            </Text>
        );        

    }
};
export default Title;
