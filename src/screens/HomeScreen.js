import React,{useEffect,useState} from'react'
import {View,StyleSheet,Picker,Text,TextInput,TouchableOpacity} from 'react-native'
import { FontAwesome } from '@expo/vector-icons'; 
import HeaderCompoenent from '../components/HeaderComponent'
import axios from 'axios';
import { SimpleLineIcons } from '@expo/vector-icons'; 




const HomeScreen=()=>{

    const [currencies,setCurrencies]=useState([])
    const [fromCurrency,setFromCurrency]=useState("USD")
    const [toCurrency,setToCurrency]=useState("INR")
    const [result,setResult]=useState("")
    const [selectedValue, setSelectedValue] = useState("");

    useEffect(()=>{
        axios
          .get("http://api.openrates.io/latest")
          .then(response => {
            const currencyAr = ["EUR"];
            for (const key in response.data.rates) {
              
              currencyAr.push(key);
              
            }
            setCurrencies(currencyAr)
          })
          .catch(err => {
            console.log("oppps", err);
          });
    
    },[])

    useEffect(()=>{
      convertHandler(selectedValue)
    })

    const convertHandler = (value) => {
        
        if (fromCurrency!== toCurrency) {
          axios
            .get(
              `http://api.openrates.io/latest?base=${
                fromCurrency
              }&symbols=${toCurrency}`
            )
            .then(response => {
              const result =
                value* response.data.rates[toCurrency];
              setResult(result.toFixed(2));
              
            })
            .catch(error => {
              console.log("Opps", error.message);
            });
        } else {
          console.log("error")
        }
      };

      const switchValue=()=>{
          var to=fromCurrency;
          var from=toCurrency;
          setToCurrency(to)
          setFromCurrency(from)
          

      }


    return(
        <View>
            <HeaderCompoenent title="Currency Converter"/>
            <View style={{flexDirection:"row",marginTop:20,marginLeft:10}}>
            <Text style={{flex:1,fontSize:25,fontWeight:"bold",marginTop:20}}>From</Text>
            <Picker
            style={{flex:1,marginTop:15}}
            selectedValue={fromCurrency}
            onValueChange={(itemValue,itemIndex)=>setFromCurrency(itemValue)}
            >
                {currencies.map(cur=>(
                    <Picker.Item label={cur} value={cur} key={cur}/>
                ))}
                

            </Picker>
            <TextInput 
            style={{flex:1,marginLeft:10,height:40,borderBottomWidth:1,borderColor:"gray",marginTop:20,marginRight:10,textAlign:"center",fontSize:25}} 
            autoCorrect={false} 
            placeholder="Amount"
            keyboardType="numeric"
            onChangeText={val=>{
                setSelectedValue(val)
                // convertHandler(val)
                
            }}
            value={selectedValue}
            />

            </View>
            <View style={{flexDirection:"row"}}>
            <Text style={{flex:1,fontSize:25,fontWeight:"bold",marginTop:20,marginLeft:10}}>To</Text>
            <Picker
            style={{flex:1,marginTop:15}}
            selectedValue={toCurrency}
            onValueChange={(itemValue,itemIndex)=>setToCurrency(itemValue)}
            >
                {currencies.map(cur=>(
                    <Picker.Item label={cur} value={cur} key={cur}/>
                ))}
                

            </Picker>
            <Text style={{flex:1,marginTop:25,marginLeft:20,fontSize:25,textAlign:"center"}}>{result}</Text>
            </View>
            <View style={{justifyContent:"center",alignItems:"center",marginTop:40}}>
                <TouchableOpacity onPress={()=>switchValue()}>
                    <SimpleLineIcons name="refresh" size={40} color="black" />
                </TouchableOpacity>
            </View>
            
            
            
        </View>
    )

}

HomeScreen.navigationOptions={
    title:"Home",
    tabBarIcon:<FontAwesome name="home" size={20} color="black" />
}

const styles=StyleSheet.create()

export default HomeScreen

