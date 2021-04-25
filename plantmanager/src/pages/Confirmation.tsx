import { useNavigation, useRoute } from '@react-navigation/core';
import React, { useState } from 'react';
import { 
  KeyboardAvoidingView,
  Platform,
  SafeAreaView, 
  StyleSheet, 
  Text, 
  TextInput, 
  View 
} from 'react-native';

import Button from '../components/Button';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface Params {
  title: string;
  subtitle: string;
  buttonTitle: string;
  icon: 'smile' | 'hug',
  nextScreen: string;
}

const emojis = {
  hug: '😍',
  smile: '😃'
}


const Confirmation = () => {
  const navigation = useNavigation();
  const routes = useRoute();

  const {
    title,
    subtitle, 
    buttonTitle,
    icon,
    nextScreen
  } = routes.params as Params;

  function handleModeOn() {
    navigation.navigate(nextScreen)
  }

  return(
    <SafeAreaView style={styles.container}>
     
        <Text style={styles.emoji}>
          {emojis[icon]}
        </Text>

        <Text style={styles.title}>{title}</Text>

        <Text style={styles.subtitle}>{subtitle}</Text>

        <View style={styles.btn}>
          <Button title={buttonTitle} onPress={handleModeOn}/>
        </View>
    </SafeAreaView>
  );
}

export default Confirmation;

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
  },
  emoji:{
    fontSize: 78,
    marginBottom: 64,
  },
  title:{
    fontSize: 22,
    lineHeight: 38,
    textAlign: 'center',
    color: colors.heading,
    fontFamily: fonts.heading,
  },
  subtitle: {
    fontFamily: fonts.text,
    textAlign: 'center',
    fontSize: 17,
    paddingVertical: 10,
    color: colors.heading,
    marginBottom: 40,
  },
  btn:{
    width: '100%',
    paddingHorizontal: 50,
  }
})