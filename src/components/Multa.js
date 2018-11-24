import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, TextInput, Picker } from 'react-native';
import { Icon } from 'react-native-elements';
import Modal from 'react-native-modal';
import style from './../styles/common';

export default class Credito extends Component {

	constructor(props) {
        super(props);

        this.state = {           
            placa: '',          
            modalVisible: false,
            messageModal: '',
            colorIcon: '',
            typeIcon: '',
            estado: 'SP'
        };
    }

    goTo = () => {
        if (this.state.messageModal === 'Crédito adicionado com sucesso!') {
            this.props.navigation.navigate('Painel');
        } else {
            this.setState({ modalVisible: false });
        }
    }


  	multar = () => {    
    const placa = this.state.placa;
    const estado = this.state.estado;
    //const params = this.props.navigation.state.params;
    //console.log(params);
    this.setState({placa: ''});

    if (placa === '') {
        this.setState({ 
            messageModal: 'Defina uma Placa!', 
            modalVisible: true,
            colorIcon: '#EA4335',
            typeIcon: 'info-outline'
        });
        return;
    }



    fetch('http://192.168.122.1/bd2/php/multa.php', {
           method: 'post',
           headers: {

               'Content-Type': 'application/json'
           },
           body: JSON.stringify({
               placa,
               estado,
               id_funcionario: 30
           })
       })
      .then((response) => response.json())
      .then((returnElement) => {       
        console.log(returnElement);
        if (returnElement.result === 'success') {
            this.setState({ 
                messageModal:'Veículo está regular!', 
                modalVisible: true,
                colorIcon: '#34A853',
                typeIcon: 'check-circle'
            });
        } else if(returnElement.result === 'failed'){
        	this.setState({ 
                messageModal: 'Nenhum registro do veículo no sistema. O veículo pode estar IRREGULAR!', 
                modalVisible: true,
                colorIcon: '#EA4335',
                typeIcon: 'info-outline'
          });
        } else {
          this.setState({ 
                messageModal: 'O veículo está IRREGULAR, multa gerada automáticamente!', 
                modalVisible: true,
                colorIcon: '#EA4335',
                typeIcon: 'info-outline'
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }


	render() {
		return (
			<View style={styles.container} >
		        <Modal 
            isVisible={this.state.modalVisible} 
            backdropOpacity={0.4}
        >
            <View style={style.modal}>
                <View style={style.extra}>
                  <View style={style.headerModal} >
                      <Icon name={this.state.typeIcon} color={this.state.colorIcon} size={70} />
                  </View>
                  <View style={style.bodyModal}>
                      <Text style={style.textApresentationModal}>
                          {this.state.messageModal}
                      </Text>
                  </View>
                </View>
                <TouchableOpacity 
                    style={style.hideModal} 
                    onPress={this.goTo}
                    
                >
                  <Text style={style.textConfirmModal} >Ok</Text>
                </TouchableOpacity>
            </View>
        </Modal>
		 
		      	<ScrollView>    
            <Text style={styles.venda}>Fiscalização      Zona Azul</Text>
		      	<Text style={styles.label}> Placa</Text>
				    <TextInput
				     
				        style={styles.textInput}
				        value={this.state.placa}
				        onChangeText={result => this.setState({ placa: result })}
			      	/>
			      	<Picker
					  selectedValue={this.state.estado}
					  style={{ height: 50, width: '100%', color: '#fff', marginBottom: 45 }}
					  onValueChange={(itemValue, itemIndex) => this.setState({estado: itemValue})}>
					  <Picker.Item label="São Paulo" value="SP" />
					  <Picker.Item label="Rio de Janeiro" value="RJ" />
					</Picker>
              <TouchableOpacity
                style={style.loginBtn}
                onPress={this.multar}
              >
                <Text style={style.entrar}>Checar Veículo</Text>
              </TouchableOpacity>
		     	</ScrollView>
      		</View>
	      
		);
	}
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2D68C4',
    padding: 10
  },
  venda: {
    fontSize: 45,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
    marginTop: '5%'
  },
  titulo: {
    fontSize: 30,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 35,
    textShadowColor: 'black',
    textShadowOffset: { width: 1, height: 2 }
  },

  label: {
      marginTop: '30%',
      color: '#fff',
      fontSize: 21
  },

  textInput: {
    color: '#fff',
    alignSelf: 'stretch',
    padding: 10,
    marginBottom: 25,
    borderBottomColor: '#fff',
    borderBottomWidth: 1.4,
    fontSize: 25,
  }

});
