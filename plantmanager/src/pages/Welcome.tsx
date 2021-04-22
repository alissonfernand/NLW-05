import React from 'react';
import { Image, Text, SafeAreaView, StyleSheet } from "react-native"

import watering from '../assets/watering.png';
import Button from '../components/Button';
import colors from '../styles/colors';

const Welcome = () => {
  return(
    <SafeAreaView style={styles.container}>
        <Text style={styles.title}>
          Gerencie {'\n'}
          suas plantas {'\n'}
          de forma fácil
        </Text>

        <Image style={styles.image} source={watering} />

        <Text style={styles.subtitle}>Não esqueça mais de regar suas {'\n'} plantas. Nós cuidamos de lembrar você{'\n'}  sempre que precisar</Text>

        <Button title=">" />
    </SafeAreaView>
  )
}

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingVertical: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    color: colors.heading,
  },
  image: {
    width: 292,
    height: 284,
  },
  subtitle: {
    fontSize: 17,
    lineHeight: 25,
    textAlign: 'center',
    color: colors.heading,
  }
})