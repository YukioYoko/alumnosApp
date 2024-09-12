import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';

import Materia from '../components/materia'; // Asegúrate de que la ruta sea correcta

const Horario = ({ route }) => {
  const { url } = route.params; 
  const [nombre, setNombre] = useState('');
  const [carrera, setCarrera] = useState('');
  const [campus, setCampus] = useState('');
  const [ciclo, setCiclo] = useState('');
  const [horario, setHorario] = useState([]);
  const [error, setError] = useState(null); // Para manejar errores

  const colores = ['#4cd489', '#84eeba'];

  // Función para obtener los datos
  const buscarA = async () => {
    try {
      const response = await axios.get(url);
      const datos = response.data;

      setNombre(datos.nombre || '');
      
      // Asegúrate de que `carrera` es un array y accede al primer elemento
      const carreraData = datos.carrera[0];  // Accede al primer objeto en el array `carrera`
      setCarrera(carreraData.descripcion || '');
      setCampus(carreraData.escuela || '');
      setCiclo(carreraData.cicloIngreso || '');

      // Si tienes un horario en la respuesta, descoméntalo
      setHorario(datos.horario || []);
    } catch (error) {
      console.log(error);
      setError('No se pudieron cargar los datos. Inténtalo más tarde.');
    }
  };

  useEffect(() => {
    buscarA();
  }, [url]);

  // Validación para asegurarse de que los valores sean cadenas
  const carreraText = typeof carrera === 'string' ? carrera : JSON.stringify(carrera);
  const campusText = typeof campus === 'string' ? campus : JSON.stringify(campus);
  const cicloText = typeof ciclo === 'string' ? ciclo : JSON.stringify(ciclo);

  return (
    <View style={{ backgroundColor: '#d8dfdb', flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <View style={styles.header}>
            <View style={styles.container}>
              <View>
                <Image
                  source={require('../img/pp.png')}
                  style={styles.logo}
                />
                <View>
                  <Text style={[styles.variable, styles.bold]}>{nombre}</Text>
                </View>
                <View>
                  <Text style={styles.variable}>{carreraText}</Text>
                </View>
              </View>
              <View style={{ marginVertical: 10 }}>
                <Text style={styles.variable}>{campusText}</Text>
              </View>
              <Text style={[styles.variable, { marginTop: 0 }, styles.bold]}>{cicloText}</Text>
            </View>
            <View style={styles.horarioBg}>
              {error ? (
                <Text style={styles.errorText}>{error}</Text>
              ) : (
                <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
                  <View style={styles.materias_container}>
                    {horario.map((item, index) => renderMateria(item, index))}
                  </View>
                </ScrollView>
              )}
            </View>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#d8dfdb',
    paddingTop: 10,
    marginBottom: -15,
    gap: 4,
  },
  horarioBg: {
    backgroundColor: '#fff',
    height: '100%',
    marginTop: 30,
    marginBottom: 30,
    alignItems: 'center',
  },
  variable: {
    color: '#0b4223',
    fontSize: 18,
    textAlign: 'left',
    marginLeft:10, // Alinea el texto al centro
  },
  bold: {
    fontWeight: '800',
  },
  materias_container: {
    flexDirection: 'column',
    flexWrap: 'wrap', // Permitir que se envuelvan las materias
    justifyContent: 'space-between', // Espacio uniforme entre columnas
    paddingHorizontal: 10,
    paddingBottom: 30,
  },
  materiaContainer: {
    flex: 1, // Dejar que ocupe el ancho disponible sin especificar una altura fija
    marginBottom: 15, // Espacio entre las filas
  },
  scrollContainer: {
    flex: 1,
    paddingBottom: 25,
    borderRadius: 30,
    marginBottom: 20,
    marginTop: 30,
  },
  errorText: {
    color: 'red',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
  logoContainer: {
    marginBottom: 10,
  },
  container: {
    alignContent:'left',
    flexDirection:'ROW',
  },
  logo: {
    height: 70,
    width: 70,
    borderRadius: 35, // Redondea el logo para que se vea mejor
  },
});

export default Horario;
