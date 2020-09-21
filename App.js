import { createAppContainer} from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import HomeScreen from './src/screens/HomeScreen'
import ExchangeRateScreen from './src/screens/ExchangeRateScreen'


const navigator = createBottomTabNavigator(
  {
  Home:HomeScreen,
  ExchangeRate:ExchangeRateScreen

  },
  {
    tabBarOptions: {
      activeTintColor: 'blue',
      labelStyle: {
        alignSelf:"center",
        marginBottom:0,
        fontSize: 15,
      },
      style: {
        backgroundColor: '',
        marginTop:10,
        marginBottom:10
      },
    }
  }
  )

export default createAppContainer(navigator);
