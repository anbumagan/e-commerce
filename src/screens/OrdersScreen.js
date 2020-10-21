import React from 'react'
import { View } from 'react-native'
import Header from '../components/Header'

export default class OrdersScreen extends React.Component{
    render(){
        return(
            <View>
                <Header {...this.props}/>
            </View>
        )
    }
}
/**
 * <ScrollView style={{flex:1,backgroundColor:'white'}}>
                <Text>ADD ADDRESS AND PHONE NO</Text>
                <View style={{flexDirection:'row',justifyContent:'space-evenly'}}>
                    <View style={[styles.fieldSet,{width:(Dimensions.get('window').width-30)/2}]}>
                        <Text style={styles.legend}> first name </Text>
                        <TextInput
                        style={{width:(Dimensions.get('window').width-60)/2}}
                        value={this.state.email}
                        onChangeText={(text)=>{this.setState({email: text})}}
                        />
                    </View>
                    <View style={[styles.fieldSet,{width:(Dimensions.get('window').width-30)/2}]}>
                        <Text style={styles.legend}> last name </Text>
                        <TextInput
                        style={{width:(Dimensions.get('window').width-60)/2}}
                        value={this.state.email}
                        onChangeText={(text)=>{this.setState({email: text})}}
                        />
                    </View>
                </View>
                <View style={[styles.fieldSet,{width:(Dimensions.get('window').width-20)}]}>
                    <Text style={styles.legend}> address line 1 </Text>
                    <TextInput
                        value = {this.state.pass}
                        onChangeText = {(text)=>{this.setState({pass: text})}}
                    />
                </View>
                <View style={[styles.fieldSet,{width:(Dimensions.get('window').width-20)}]}>
                    <Text style={styles.legend}> address line 2(optional) </Text>
                    <TextInput
                        value = {this.state.pass}
                        onChangeText = {(text)=>{this.setState({pass: text})}}
                    />
                </View> 
                <View style={{flexDirection:'row',justifyContent:'space-evenly'}}>
                    <View style={[styles.fieldSet,{width:(Dimensions.get('window').width-30)/2}]}>
                        <Text style={styles.legend}> PIN code </Text>
                        <TextInput
                        style={{width:(Dimensions.get('window').width-60)/2}}
                        value={this.state.email}
                        onChangeText={(text)=>{this.setState({email: text})}}
                        />
                    </View>
                    <View style={[styles.fieldSet,{width:(Dimensions.get('window').width-30)/2}]}>
                        <Text style={styles.legend}> mobile no </Text>
                        <TextInput
                        style={{width:(Dimensions.get('window').width-60)/2}}
                        value={this.state.email}
                        onChangeText={(text)=>{this.setState({email: text})}}
                        />
                    </View>
                </View> 
            </ScrollView>


                fieldSet:{
        justifyContent:'center',
        alignSelf:'center',
        marginVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'grey'
    },
    legend:{
        position: 'absolute',
        top: -10,
        left: 10,
        backgroundColor: '#FFFFFF',
        color:'grey',
        fontFamily:'Jost-Regular'
    },
 */