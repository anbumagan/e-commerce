import Axios from 'axios';
import React from 'react'
import { ActivityIndicator, FlatList, ScrollView, Text, View } from 'react-native'
import ProductCard from '../components/ProductCard';

export default class extends React.Component{
    state={
        product:[],
        Load: true
    }
    componentDidMount(){
        const { navigation } = this.props;  
        const category = navigation.getParam('category')
        var url = "http://18.216.5.45:8080/"+category+"";
        Axios.get(url)
        .then((res)=>{
            var arr=[]
            for(var i=0;i<res.data.length;i++){
                arr.push({
                    "id": res.data[i]._id,
                    "name": res.data[i].name,
                    "img": res.data[i].data,
                    "price": res.data[i].price,
                    "category": res.data[i].category
                })
            }
            this.setState({
                product: arr,
                Load: false
            })
        })
    }
    render(){
        if(this.state.Load === true){
            return(
                <View style={{flex:1,backgroundColor:'white',justifyContent:'center',alignContent:'center'}}>
                    <ActivityIndicator color="rgb(58, 117, 254)" size='large'>

                    </ActivityIndicator>
                </View>
            )
        }else{
        return(
            <View style={{flex:1,backgroundColor:'white'}}>
                <Text style={{
                    fontFamily:'Jost-SemiBold',
                    fontSize:20,
                    textTransform:'uppercase',
                    margin:10,
                    textAlign:'left'
                }}>{this.props.navigation.getParam('category')}</Text>
                <FlatList 
                    data={this.state.product}
                    renderItem={(item)=>{
                        return(
                            <ProductCard {...item}{...this.props}/>
                        )
                    }}
                    keyExtractor={(item)=>item.name}
                    numColumns={1}
                />
            </View>
        )}
    }
}