import React from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'
import CategoryCard from '../components/CategoryCard'

const category = [
    {
        "id":1,
        "title": "mobiles",
        "data": require("../../assets/icons/Mobiles.png")
    },{
        "id":2,
        "title": "laptops",
        "data": require("../../assets/icons/Laptop.png")
    },{
        "id":3,
        "title": "televisions",
        "data": require("../../assets/icons/Tv.png")
    },{
        "id":4,
        "title": "Audio",
        "data": require("../../assets/icons/Audio.png")
    },{
        "id":5,
        "title": "tracker",
        "data": require("../../assets/icons/Tracker.png")
    },{
        "id":6,
        "title": "power bank",
        "data": require("../../assets/icons/power-bank.png")
    },{
        "id":7,
        "title": "other"
    }
]

export default class CategoryScreen extends React.Component{
    render(){
        return(
            <View>
                <Text style={styles.head}>Shop by category</Text>
                <FlatList
                    data={category}
                    renderItem={(item)=>{
                        return(
                            <CategoryCard {...item}{...this.props}/>
                            )
                    }}
                    keyExtractor={(item) => item.id}
                    numColumns={4}
                />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    head:{
        fontFamily:"Jost-SemiBold",
        textAlign:'center',
        padding:10,
        fontSize:18
    }
})