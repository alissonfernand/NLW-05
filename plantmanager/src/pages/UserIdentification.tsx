import { useNavigation } from '@react-navigation/core';
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


const UserIdentification = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [name, setName] = useState<string>();

  const navigation = useNavigation();

  function handleInputBlur() {
    setIsFocused(false);

    setIsFilled(!!name);
  }

  function handleInputFocus() {
    setIsFocused(true);
  }

  function handleInputChange(value: string) {
    setIsFilled(!!value);

    setName(value);
  }

  function handleSubmit() {
    navigation.navigate('Confirmation');
  }

  return(
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <Text style={styles.emoji}>
          😀
        </Text>

        <Text style={styles.title}>Como podemos{'\n'} chamar você</Text>

        <TextInput 
            placeholder="Digite seu nome"
            onBlur={handleInputBlur}
            onChangeText={handleInputChange}
            onFocus={handleInputFocus}
            style={[
              styles.input,
              (isFocused || isFilled) && {borderColor: colors.green}
            ]} 
          />

        <View style={styles.btn}>
          <Button title="Confirmar" onPress={handleSubmit} />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default UserIdentification;

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
  },
  emoji:{
    fontSize: 44,
    paddingBottom: 24,
  },
  title:{
    fontSize: 24,
    lineHeight: 32,
    textAlign: 'center',
    color: colors.heading,
    fontFamily: fonts.heading,
  },
  input:{
    borderBottomWidth: 1,
    borderColor: colors.gray,
    color: colors.heading,
    width: '100%',
    marginTop: 50,
    padding: 10,
    textAlign: 'center'
  },
  btn:{
    width: '100%',
    marginTop: 40,
    paddingHorizontal: 20,
  }
})