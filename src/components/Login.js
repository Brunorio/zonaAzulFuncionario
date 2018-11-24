import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import LoginForm from './LoginForm';

const caminhoLogo = require('../imgs/logoE.png');

export default class Login extends Component {
	render() {
		return (

			<View style={styles.container}>
 
        <View style={styles.logoContainer}>
          <Image
          source={caminhoLogo}
          style={styles.logo}
          />
          <View style={styles.corpoTitulo}>
            <Text style={styles.titulo}>ZONA AZUL INTELIGENTE</Text>
          </View>
        </View>

        <LoginForm navigation={this.props.navigation} />

      </View>

		);
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'stretch',
    padding: 10,
    backgroundColor: '#2D68C4'
  },

  logoContainer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  logo: {
    width: 150,
    height: 150
  },


  corpoTitulo: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8

  },

  titulo: {
    fontWeight: 'bold',
    fontSize: 36,
    color: '#fff',
    alignItems: 'center',
    textAlign: 'center',
    textShadowColor: 'black',
    textShadowOffset: { width: 1, height: 2 }
  },

  btnContainer: {

    flexDirection: 'row',
    justifyContent: 'center',
    padding: 5
  },
  btnAnother: {
    color: '#fff',
    fontSize: 25,
    marginTop: 5,
    textShadowColor: 'black',
    textShadowOffset: { width: 1, height: 2 }
  }

});
