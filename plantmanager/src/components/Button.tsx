import React from 'react';
import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import colors from '../styles/colors';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
}

const Button = ({title, ...rest} : ButtonProps) => {
  return(
    <TouchableOpacity
      style={styles.button}
      {...rest}
    >
      <Text style={styles.buttonText}>
        {title}
      </Text>
    </TouchableOpacity>
  )
}

export default Button;

const styles = StyleSheet.create({
  button: {
    height: 56,
    width: 56,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    backgroundColor: colors.green,
    paddingHorizontal: 10,
  },
  buttonText: {
    color: colors.white,
    fontSize: 24
  }
})