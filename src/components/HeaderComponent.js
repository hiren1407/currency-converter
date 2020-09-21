import React from 'react'
import {View,StyleSheet,Text} from 'react-native'

const HeaderComponent=({title})=>{
    return(
        <View style={styles.container}>
            <Text style={styles.textStyle}>{title}</Text>
        </View>
    )
}

const styles=StyleSheet.create({

    container:{
        backgroundColor:"blue",
        marginTop:30,
        height:60,
        justifyContent:"center"
    },
    textStyle:{
        
        alignSelf:"center",
        color:"white",
        fontSize:25

    }

})

export default HeaderComponent