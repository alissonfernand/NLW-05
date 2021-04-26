import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Platform, Alert, ScrollView } from 'react-native';

import { useNavigation, useRoute } from '@react-navigation/core';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { SvgFromUri } from 'react-native-svg';
import DateTimePicker, {Event} from '@react-native-community/datetimepicker'

import waterdrop from '../assets/waterdrop.png';
import Button from '../components/Button';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { format, isBefore } from 'date-fns';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { PLantProps, savePlant } from '../libs/storage';

interface Params {
  plant: PLantProps;
}

const PlantSave = () => {
  const route = useRoute();
  const { plant } = route.params as Params;

  const navigation = useNavigation();

  const [selectedDateTime, setSelectedDateTime] = useState( new Date() );
  const [showDatePicker, setShowDatePicker] = useState(Platform.OS === 'ios');

  function handleChangeTime(event: Event, dateTime: Date |  undefined) {
    if(Platform.OS === 'android') {
      setShowDatePicker(oldValue => !oldValue);
    }

    if(dateTime && isBefore(dateTime, new Date())){
      setSelectedDateTime(new Date());
      return Alert.alert('Escolha uma hora futura!');
    }

    if(dateTime) {
      setSelectedDateTime(dateTime);
    }
  }

  function handleOpenDatePickerForAndroid() {
    setShowDatePicker(oldValue => !oldValue);
  } 

  async function handleSave() {
    try {
      await savePlant({
        ...plant,
        dateTimeNotification: selectedDateTime,
      })

      navigation.navigate('Confirmation', {
        title: 'Tudo Certo',
        subtitle: 'Fique tranquilo que sempre vamos lembrar você de cuidar da sua plantinha com bastante amor.',
        buttonTitle: 'Muito obrigado :D',
        icon: 'hug',
        nextScreen: 'MyPlant',
      });
    } catch (error) {
      Alert.alert('Não foi possível salvar');
    }
  }

  return(
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      <View style={styles.container}>
          <View style={styles.plantInfo}>
            <SvgFromUri uri={plant.photo} height={150} width={150} />

            <Text style={styles.plantName}>{plant.name}</Text>

            <Text style={styles.plantAbout}>
              {plant.about}
            </Text>
          </View>

          <View style={styles.controller}>
            <View style={styles.tipContainer}>
              <Image source={waterdrop} style={styles.tipImage} />
              <Text style={styles.tipText}>{plant.water_tips}</Text>
            </View>

            <Text style={styles.alertLabel}>Escolha o melhor horário para ser lembrado:</Text>

            {showDatePicker && 
              <DateTimePicker 
                value={selectedDateTime}
                mode="time"
                display="spinner"
                onChange={handleChangeTime}
              />
            }

            {
              Platform.OS === 'android' && (
                <TouchableOpacity
                  style={styles.dateTimePickerButton}
                  onPress={handleOpenDatePickerForAndroid}
                >
                  <Text style={styles.dateTimePickerText}>
                    {`Mudar ${format(selectedDateTime, 'HH:mm')}`}
                  </Text>
                </TouchableOpacity>
              )
            }

            <Button title="Cadastrar planta" onPress={handleSave} />
          </View>
      </View>
    </ScrollView>
  );
}

export default PlantSave;

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: colors.shape,
  },
  plantInfo:{
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.shape,
  },
  plantName:{
    fontFamily: fonts.heading,
    fontSize: 24,
    color: colors.heading,
    marginTop: 15,
  },
  plantAbout:{
    fontFamily: fonts.text,
    fontSize: 17,
    color: colors.heading,
    marginTop: 10,
    textAlign: 'center',
  },
  controller:{
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: getBottomSpace() || 20,
  },
  tipContainer:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.blue_light,
    padding: 20,
    borderRadius: 20,
    position: 'relative',
    bottom: 80,
  },
  tipImage:{
    width: 56,
    height: 56,
  },
  tipText:{
    flex: 1,
    marginLeft: 20,
    fontFamily: fonts.text,
    color: colors.blue,
    fontSize: 17,
    textAlign: 'justify'
  },
  alertLabel:{
    textAlign: 'center',
    fontFamily: fonts.complement,
    color: colors.heading,
    fontSize:12,
    marginBottom: 5,
  },
  dateTimePickerButton: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 40,
  },
  dateTimePickerText:{
    color: colors.heading,
    fontSize: 24,
    fontFamily: fonts.text
  }
})