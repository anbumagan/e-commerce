import React from 'react';
import { View } from 'react-native';
import Carousel from '../components/Carousel';
import Header from '../components/Header';
import HomeAddons from '../components/HomeAddons';
import CategoryScreen from './CategoryScreen';

export default class HomeScreen extends React.Component{
    render(){
        return(
            <View style={{backgroundColor:'white',flex:1}}>
                <Header {...this.props}/>
                <Carousel/>
                <CategoryScreen {...this.props} />
                <HomeAddons {...this.props} />
            </View>
        )
    }
}