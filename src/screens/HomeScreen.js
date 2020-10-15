import React from 'react';
import { View } from 'react-native';
import Carousel from '../components/Carousel';
import CategoryScreen from './CategoryScreen';

export default class HomeScreen extends React.Component{
    render(){
        return(
            <View style={{backgroundColor:'white',flex:1}}>
                <Carousel/>
                <CategoryScreen {...this.props} />
            </View>
        )
    }
}