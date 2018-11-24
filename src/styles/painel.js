import { StyleSheet } from 'react-native';

export default StyleSheet.create({

  container: {
    flex: 7,
    padding: 10,
    backgroundColor: '#2D68C4'
  },

  menu: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'row'
  },

  itemMenu: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'stretch'
  },

  itemMenuBorda: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'stretch'
  },

  borda: {
    borderRightWidth: 1,
    borderRightColor: 'gray'
  }

});
