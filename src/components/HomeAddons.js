import Axios from 'axios'
import React from 'react'
import { FlatList, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native'
import MostBuyedCard from './MostBuyedCard'
import MostViewedCard from './MostViewedCard'

export default class HomeAddons extends React.Component{
    state={
        mostBuyed:[],
        mostViewed:[],
        refState: false
    }
    _onRefresh=()=>{
        this.setState({refState: true})
        Axios.get("http://18.216.5.45:8080/mostbuyed")
        .then((res)=>{
            this.setState({
                mostBuyed: res.data
            })
        })
        Axios.get("http://18.216.5.45:8080/mostviewed")
        .then((res)=>{
            this.setState({
                mostViewed: res.data
            }) 
        })
        this.setState({refState: false})
    }
    componentDidMount(){
        Axios.get("http://18.216.5.45:8080/mostbuyed")
        .then((res)=>{
            this.setState({
                mostBuyed: res.data
            })
        })
        Axios.get("http://18.216.5.45:8080/mostviewed")
        .then((res)=>{
            this.setState({
                mostViewed: res.data
            }) 
        })
    }
    render(){
        return(
            <ScrollView style={{marginVertical:5,marginHorizontal:5}} refreshControl={
                <RefreshControl onRefresh={this._onRefresh} refreshing={this.state.refState} />
            }>
                <Text style={styles.head}>Most Buyed Products</Text>
                <FlatList 
                    data={this.state.mostBuyed}
                    renderItem={({item})=>{
                        return(
                            <MostBuyedCard {...item} {...this.props} />
                        )
                    }}
                    keyExtractor={(item)=>item.id}
                    numColumns={1}
                />
                <Text style={styles.head}>Most Viewed Products</Text>
                <FlatList 
                    data={this.state.mostViewed}
                    renderItem={({item})=>{
                        return(
                            <MostViewedCard {...item} {...this.props} />
                        )
                    }}
                    keyExtractor={(item)=>item.id}
                    numColumns={1}
                />
            </ScrollView>
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