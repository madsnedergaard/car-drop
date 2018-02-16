import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Icon } from 'react-native-elements';


const colors = {
  background: '#232855',
  primary: '#5FCC9C',
  primaryDark: '#215B63',
  primaryLight: '#AAFFC7',
  text: '#ffffff'
}

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Hvor fanden er bilen?!</Text>        
        <Text style={styles.image}>[MAP]</Text>
        <Button
        title='DROP BIL HER'
        iconRight={{name:'location-on'}}
        buttonStyle={styles.cta}
        containerViewStyle={styles.ctaWrapper}        
        textStyle={styles.ctaText}
      />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    padding: 20,
    paddingTop: 100,
  },
  title: {
    fontSize: 35,
    fontFamily: 'Avenir Next',
    textAlign: 'center',
    fontWeight: '700',
    color: colors.text
  },
  image: {
    fontSize: 10,
    color: colors.text,
    margin: 100
  },
  cta: {
    backgroundColor: colors.primary,
    borderRadius: 30,
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
  }
});
