import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

const Materia = ({ crn, clave_materia, nombre_materia, seccion, creditos, hora, dias, edificio, aula, profesor, fecha_i, fecha_fin, color }) => {
    
    const [visible, setVisible] = useState(false);
    const fechaInicio = fecha_i.split(' ')[0];
    const fechaFin = fecha_fin.split(' ')[0];

    return (
        <TouchableOpacity onPress={() => setVisible(!visible)}>
            <View style={[styles.container, { backgroundColor: color }]}>
                <View style={styles.header}>
                  <Text style={styles.nombre_mat}>{nombre_materia}</Text>
                </View>
                <View style={styles.header}>
                    <Text style={styles.hora}>{hora}</Text>
                    <Text style={styles.dias}>{dias}</Text>
                </View>
                <Text>NRC: {crn}</Text>

                {/* Mostrar detalles solo si está visible */}
                {visible && (
                    <View style={styles.detailsContainer}>
                        <Text style={styles.detailsText}>Clave: {clave_materia}</Text>
                        <Text style={styles.detailsText}>Sección: {seccion}</Text>
                        <Text style={styles.detailsText}>Créditos: {creditos}</Text>
                        <Text style={styles.detailsText}>Profesor: {profesor}</Text>
                        <Text style={styles.detailsText}>Edificio: {edificio}, Aula: {aula}</Text>
                        <Text style={styles.detailsText}>Fechas: {fechaInicio} - {fechaFin}</Text>
                    </View>
                )}
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 10, // para separar los items
        padding: 10,
        borderRadius: 20,
        gap: 5,
        shadowColor: "gray",
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    hora: {
        color: '#0b4223',
    },
    nombre_mat: {
        fontWeight: 'bold',
        marginBottom: 10,
    },
    header:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    dias: {
        color: 'gray',
        fontWeight: 'bold',
        letterSpacing: 3,
    },
    detailsContainer: {
        marginTop: 10,
        padding: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
    },
    detailsText: {
        marginBottom: 5,
        fontSize: 14,
    }
});

export default Materia;
