import React from 'react'
import { createSwitchNavigator, createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import LoginScreen from './LoginScreen'
import HomeScreen from './HomeScreen'
import SignUpScreen from './SignUpScreen'
import ProductScreen from './ProductScreen'
import { createDrawerNavigator } from 'react-navigation-drawer'
import OrdersScreen from './OrdersScreen'
import WishlistScreen from './WishlistScreen'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import DrawerScreen from './DrawerScreen'
import ProductDescScreen from './ProductDescScreen'
import LoadingScreen from './LoadingScreen'
import PlaceOrderScreen from './PlaceOrderScreen'
import DetailsScreens from './DetailsScreen'

const AuthNav = createStackNavigator({
    Load:{
        screen: LoadingScreen,
        navigationOptions:{
            headerShown: false
        }
    },
    Log:{
        screen: LoginScreen,
        navigationOptions:{
            headerShown: false
        }
    },
    Reg:{
        screen:SignUpScreen,
        navigationOptions:{
            headerShown:false
        }
    }
})
const drawerNav = createDrawerNavigator({
    Home: {
        screen:HomeScreen,
        navigationOptions:{
            headerShown: false
        }    
    },
    My_Orders:{
        screen:OrdersScreen,
        navigationOptions:{
            headerShown: false
        }    },
    My_Wishlist:{
        screen:WishlistScreen,
        navigationOptions:{
            headerShown:false
        }    
    }
    },
    {
        contentComponent: DrawerScreen
    })

const MainNav = createStackNavigator({
    drawer: {
        screen: drawerNav,
        navigationOptions:{
            headerShown:false
        }
    },
    Prod:{
        screen: ProductScreen,
        navigationOptions : ({navigation}) =>({
            headerTitle: <View><Text style={{textTransform:'uppercase',fontFamily:'Jost-Bold',fontSize:20,color:'grey'}}>Shop by category</Text></View>,
        })
    },
    ProdDesc:{
        screen: ProductDescScreen,
        navigationOptions:{
            headerShown:false
        }
    },
    Details:{
        screen: DetailsScreens,
    },
    PlaceOrder:{
        screen: PlaceOrderScreen
    }
})

const AllNav = createSwitchNavigator({
    Auth: AuthNav,
    Main: MainNav
}) 

const Nav = createAppContainer(AllNav)

export default class Navigation extends React.Component{
    render(){
        return(
            <Nav />
        )
    }
}