import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Torch from 'react-native-torch';
import RNShake from 'react-native-shake';

export default function App(){
    const [ toggle, setToggle ] = useState(false);

    const handleToggle = ()=> setToggle(oldToggle => !oldToggle);

    //liga o flash
    useEffect(()=>{
        toggle ? Torch.switchState(true) : Torch.switchState(false);
    },[toggle]);

    //quando chacoalhado aciona a function handleToggle
    useEffect(()=>{
        const shakeLantern = RNShake.addListener(()=>{
            handleToggle()
        });
        
        //acionado quando o component for desmontado
        return()=> shakeLantern.remove();
    },[]);

    return(
        <View style={toggle ? styles.backLight : styles.backDark}>
            <TouchableOpacity onPress={handleToggle}>
                <Image style={styles.image}
                    source={toggle 
                        ? require('./assets/lampL.jpg')
                        : require('./assets/lampD.jpg')}
                />
                <Image style={styles.image2}
                    source={toggle 
                        ? require('./assets/dioL.jpg')
                        : require('./assets/dioD.jpg')}
                />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    backLight:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    backDark:{
        flex:1,
        backgroundColor:'black',
        alignItems:'center',
        justifyContent:'center'
    },
    image:{
        resizeMode:'contain',
        alignSelf:'center'
    },
    image2:{
        resizeMode:'contain',
        alignSelf:'center'
    }
})