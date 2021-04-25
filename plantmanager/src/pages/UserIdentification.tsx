import { useNavigation } from '@react-navigation/core';
import React, { useState } from 'react';
import { 
  Alert,
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

import AsyncStorage from '@react-native-async-storage/async-storage';


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

  async function handleSubmit() {
    if(!name)
      return Alert.alert('Me diz como chamar você 😪')

    try {
      await AsyncStorage.setItem('@plantmanager:user', name);
      navigation.navigate('Confirmation', {
        title: 'Prontinho',
        subtitle: 'Agora vamos começar a cuidar das suas plantinhas com muito cuidado.',
        buttonTitle: 'Começar',
        icon: 'smile',
        nextScreen: 'PlantSelect',
      });
    } catch {
      return Alert.alert('Não foi possível salvar o seu nome')
    }
 
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