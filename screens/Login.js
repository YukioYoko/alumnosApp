import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const Login = () => {
  const navigation = useNavigation();
  const [codigo, setCodigo] = useState('');
  const [nip, setNip] = useState('');

  // Función para manejar el login
  const handleLogin = () => {
    if (codigo.trim() === '' || nip.trim() === '') {
      Alert.alert('Error', 'Por favor, ingrese todos los campos');
      return; // Prevent further execution if fields are empty
    }
    axios.get('http://148.202.152.33/cucei/credenciales.php?codigo='+codigo+'&nip='+nip)
      .then(response => {
        const data = response.data;
        if (typeof data.respuesta === 'undefined') {
          // Navegar a la pantalla 'Horario' solo si el login es exitoso
          navigation.navigate('Horario', { url: 'http://148.202.152.33/cucei/credenciales.php?codigo=' + codigo + '&nip=' + nip });
          console.log(data.nombre, data.respuesta);
        } else {
          Alert.alert('Error', 'Credenciales incorrectas');
          console.log(data.nombre);
        }
      })
      .catch(error => {
        console.error(error);
        Alert.alert('Error', 'Hubo un problema con la conexión');
      });
  };

  return (
    <View style={{ backgroundColor: '#4044C9', flex: 1 }}>
      <SafeAreaView>
          <View style={styles.loginBg}>
          <View style={[styles.logoBg]}>
              <Image
                source={require('../img/udg.png')}
                style={styles.logo}
              />
            </View>
            <View style={styles.loginC}>
              <View style={styles.form}>
              <View>
                <Text>Código</Text>
                </View>
                <View style={[styles.form_input, styles.boxShadow]}>
                  <View>
                   <TextInput
                    placeholder='Ingrese Código'
                    inputMode='numeric'
                    value={codigo}
                    onChangeText={setCodigo}
                    style={styles.inputText}  // Añadí estilo para mejorar la apariencia del input
                  />
                  </View>
                  
                </View>
                <View>
                <Text>NIP</Text>
                </View>
                <View style={[styles.form_input, styles.boxShadow]}>
                  
                  <TextInput
                    placeholder='Ingrese NIP'
                    secureTextEntry
                    value={nip}
                    onChangeText={setNip}
                    style={styles.inputText}  // Añadí estilo para mejorar la apariencia del input
                  />
                </View>
                
                <TouchableOpacity 
                  style={[styles.loginButton, styles.boxShadow]}
                  onPress={handleLogin}    
                >
                  <Text style={{ color: 'white', fontSize: 20 }}>Login</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  logo: {
    height: 140,
    width: 100,

  },
  logoBg: {
    backgroundColor: 'white',
    width: 120,
    height: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderTopRightRadius:20,
    marginBottom: 40,
    marginTop:50,
  },
  loginBg: {
    backgroundColor: '#d8dfdb',
    height: '100%',
    marginTop: 0,
    alignItems: 'center',
  },
  loginC: {
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 60,
  },
  form: {
    marginTop: 20,
    width: '100%',
  },
  form_input: {
    backgroundColor: 'white',
    height: 75,
    width: '100%',
    borderRadius: 10,
    gap: 15,
    paddingLeft: 15,
    justifyContent: 'center',
    marginBottom: 40,
  },
  inputText: {
    fontSize: 16,  // Para hacer que el texto sea más legible
  },
  
  loginButton: {
    alignItems: 'center',
    backgroundColor: '#84eeba',
    height: 60,
    justifyContent: 'center',
    borderBottomEndRadius: 15,
    borderBottomLeftRadius: 15,
    borderTopLeftRadius: 15,
  }
});

export default Login;
