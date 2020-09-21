import React,{useState,useEffect} from 'react'
import {View,StyleSheet,Text,TextInput,FlatList} from 'react-native'
import { FontAwesome } from '@expo/vector-icons'; 
import axios from 'axios';
import HeaderCompoenent from '../components/HeaderComponent'

const ExchangeRateScreen = () =>{

    useEffect(()=>{
        axios
          .get("http://api.openrates.io/latest?base=INR")
          .then(response => {
            const currencyAr = [];
            let counter=0
            for (const key in response.data.rates) {
                counter+=1
              
              currencyAr.push({'code':key,'rates':response.data.rates[key],'key':counter.toString()});
              
            }
            
            setCurrencies(currencyAr)
          })
          .catch(err => {
            console.log("oppps", err);
          });
    
    },[])

    const [value,setValue]=useState("1")
    const [currencies,setCurrencies]=useState([{'key':"0"}])
    const [rate,setRate]=useState(1)

    

    return(
        <>
            <HeaderCompoenent title="Exchange Rates"/>
            <View style={{flexDirection:"row",margin:30}}>
                <Text style={{fontSize:30,fontWeight:"bold",flex:1}}>INR</Text>
                <TextInput 
                style={{flex:1, borderBottomWidth:1,height:40,textAlign:"center"}}
                value={value}
                keyboardType="numeric"
                onChangeText={val=>{
                    setValue(val)
                    setRate(Number(val))
                }}
              />

            </View>
            <View style={{height:1,borderWidth:1,marginBottom:30}}/>
            <FlatList
                data={currencies}
                keyExtractor={item=>item.key}
                renderItem={({item})=>{
                    return(
                    <View style={{flexDirection:"row",paddingBottom:20}}>
                        <Text style={{flex:1,fontSize:20,marginLeft:40,fontWeight:"400"}}>{item.code}</Text>
                        <Text style={{flex:1,fontSize:20,fontWeight:"400"}}>{(item.rates*rate).toFixed(5)}</Text>
                    </View>
                    )
                }}
            />


        </>
    )
}

ExchangeRateScreen.navigationOptions={
    title:'Exchange Rates',
    tabBarIcon:<FontAwesome name="dollar" size={20} color="black" />
}

const styles=StyleSheet.create()

export default ExchangeRateScreen