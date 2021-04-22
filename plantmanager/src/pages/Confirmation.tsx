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


const Confirmation = () => {
  return(
    <SafeAreaView style={styles.container}>
     
        <Text style={styles.emoji}>
          😄
        </Text>

        <Text style={styles.title}>Prontinho</Text>

        <Text style={styles.subtitle}> Agora vamos começar a cuidar das suas plantinhas com muito cuidado.</Text>

        <View style={styles.btn}>
          <Button title="Confirmar" />
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