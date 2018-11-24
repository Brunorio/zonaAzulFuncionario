import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { Icon } from 'react-native-elements';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Modal from 'react-native-modal';
import style from './../styles/common';

export default class Credito extends Component {

  state = {
    isDateTimePickerVisible: false,
  };
 
  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });
 
  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });
 
  _handleDatePicked = (date) => {
    this.setState({tempo: date.getHours() + ':' + date.getMinutes()})
    this._hideDateTimePicker();
  };



	constructor(props) {
        super(props);

        this.state = {           
            cpf: '',
            valor: '',           
            modalVisible: false,
            messageModal: '',
            colorIcon: '',
            typeIcon: '',
            tempo: ''
        };
    }

    goTo = () => {
        if (this.state.messageModal === 'Crédito adicionado com sucesso!') {
            this.props.navigation.navigate('Painel');
        } else {
            this.setState({ modalVisible: false });
        }
    }

    maskCPF = (cpf) => {
        let mascara;

        if (cpf.length === 12) {
            mascara = cpf.substr(0, 11);
            mascara += '-' + cpf[11];
            this.setState({ cpf: mascara });
        } else if (cpf.length < 15) {
            mascara = cpf.replace(/\D/g, '');
            mascara = cpf.replace(/(\d{3})(\d)/, '$1.$2');
            mascara = cpf.replace(/(\d{3})(\d)/, '$1.$2');
            mascara = cpf.replace(/(\d{3})(\d)/, '$1.$2');
            this.setState({ cpf: mascara });
        }            
    }


  	vender = () => {    
    const cpf = this.state.cpf;
    const tempo = this.state.tempo;
    const params = this.props.navigation.state.params;
    console.log(params);
    this.setState({cpf: ''});

    if (cpf === '' || tempo === '') {
        this.setState({ 
            messageModal: 'Nenhum dos campos podem ser vazios!', 
            modalVisible: true,
            colorIcon: '#EA4335',
            typeIcon: 'info-outline'
        });
        return;
    }



    fetch('http://192.168.122.1/bd2/php/credito.php', {
           method: 'post',
           headers: {

               'Content-Type': 'application/json'
           },
           body: JSON.stringify({
               cpf,
               tempo,
               id_funcionario: params.id
           })
       })
      .then((response) => response.json())
      .then((returnElement) => {       
        console.log(returnElement);
        if (returnElement.result === 'success') {
            this.setState({ 
                messageModal:'Tempo adicionado com sucesso!', 
                modalVisible: true,
                colorIcon: '#34A853',
                typeIcon: 'check-circle'
            });
        } else {
          this.setState({ 
                messageModal: 'Não foi encontrado um usuário com este CPF!', 
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
            <Text style={styles.venda}>Vendas Zona Azul</Text>
		      	<Text style={styles.label}> CPF</Text>
				    <TextInput
				        keyboardType={'numeric'}
				        style={styles.textInput}
				        value={this.state.cpf}
				        onChangeText={cpf => this.maskCPF(cpf)}
			      	/>

			      	<View style={{ flex: 1 }}>
                <TouchableOpacity style={style.loginBtn} onPress={this._showDateTimePicker}>
                  <Text style={style.entrar}>Tempo</Text>
                </TouchableOpacity>
                <DateTimePicker
                  mode={'time'}
                  isVisible={this.state.isDateTimePickerVisible}
                  onConfirm={this._handleDatePicked}
                  onCancel={this._hideDateTimePicker}
                />
              </View>
              <TouchableOpacity
                style={style.loginBtn}
                onPress={this.vender}
              >
                <Text style={style.entrar}>Finalizar</Text>
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
    marginTop: '25%'
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
      marginTop: '40%',
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
