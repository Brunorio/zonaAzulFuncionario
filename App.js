import React from 'react';
import { createStackNavigator } from 'react-navigation';
import Venda from './src/components/Venda';
import Login from './src/components/Login';
import Multa from './src/components/Multa';

export default class App extends React.Component {
  render() {
    return (
      <AppNavigation />
    );
  }
}

const AppNavigation = createStackNavigator({
  Login: { screen: Login,
    navigationOptions: {
          header: null,
        }
  },
  Venda: { screen: Venda,
    navigationOptions: {
          header: null,
        }
  },
  Multa: { screen: Multa }
  
});
