import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  loginBtn: {
    backgroundColor: '#fff',
    alignSelf: 'stretch',
    alignItems: 'center',
    padding: 10,
    borderRadius: 25,
    marginTop: 5
  },

  entrar: {
    fontWeight: 'bold',
    fontSize: 25
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'stretch',
    width: null,
    padding: 10,
    backgroundColor: '#2D68C4'
  },
  modal: {
    backgroundColor: '#fff',
    borderRadius: 10,
    height: '40%',
    padding: 20,
    flexDirection: 'column'
  },
  extra: {
    flexDirection: 'row',
    flex: 3
  },
  headerModal: {
    flex: 3,
    justifyContent: 'center'
  },
  bodyModal: {
    flex: 4,
    justifyContent: 'center'
  },
  hideModal: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'center',
    padding: 5,
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 20,
    backgroundColor: '#2D68C4'
  },
  textConfirmModal: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#fff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  textApresentationModal: {
    fontSize: 20,
    textAlignVertical: 'center',
    textAlign: 'center',

  }

});
