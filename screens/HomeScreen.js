import * as React from 'react';
import {ActivityIndicator, Button,Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as WebBrowser from 'expo-web-browser';
import { MonoText } from '../components/StyledText';
import { useState } from 'react';
import * as Api from '../Api.js';

export default function HomeScreen() {
  const [price,setPrice] = useState(0);
  const [pircebtc,setPricebtc] = useState(0);
  const [Pricebtccop,setPricebtccop] = useState(0);
  const [date,setDate] = useState(0);
  const [localbtc,setLocalbtc] = useState(0);
  const [loading,setLoading] = useState(false);

  function formatMoney(number, decPlaces, decSep, thouSep) {
    decPlaces = isNaN(decPlaces = Math.abs(decPlaces)) ? 2 : decPlaces,
    decSep = typeof decSep === "undefined" ? "." : decSep;
    thouSep = typeof thouSep === "undefined" ? "," : thouSep;
    var sign = number < 0 ? "-" : "";
    var i = String(parseInt(number = Math.abs(Number(number) || 0).toFixed(decPlaces)));
    var j = (j = i.length) > 3 ? j % 3 : 0;
    
    return sign +
      (j ? i.substr(0, j) + thouSep : "") +
      i.substr(j).replace(/(\decSep{3})(?=\decSep)/g, "$1" + thouSep) +
      (decPlaces ? decSep + Math.abs(number - i).toFixed(decPlaces).slice(2) : "");
    }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        
        <View style={styles.helpContainer}>
        
        <Button
          title="Ver mercados"
          onPress={()=>{

            setLoading(true)
            fetch('https://api.kraken.com/0/public/Ticker?pair=XXBTZEUR')
            .then((response) => response.json())
            .then((responseKraken) => {
                console.log('kraken: ',responseKraken)
                fetch('http://data.fixer.io/api/latest?access_key='+Api.getApi()+'&base=EUR&symbols=COP,BTC')
                .then((response) => response.json())
                .then((responseFixer) => {
                  console.log('fixerio: ',responseFixer)                  
                  let eur = 0;
                  let date = Date(parseInt(responseFixer.timestamp)*1000)
                  console.log(date)
                  eur =  parseFloat(responseFixer.rates['COP']).toFixed(2);
                  let btc = parseFloat(responseKraken.result['XXBTZEUR']['a'][0]);
                  let copbtc = eur * btc
                  setPrice(formatMoney(eur,2,',','.'))
                  setPricebtc(formatMoney(btc,2,',','.'))
                  setPricebtccop(formatMoney(copbtc,2,',','.'))
                  setDate(date)
                  setLoading(false)
                })
                .catch((error) =>{
                  console.error(error);
                  alert('cambio no soportado no hay conexion de red')
                  setLoading(false)
                });
                
            })
            .catch((error) =>{
              console.error(error);
              alert('cambio no soportado no hay conexion de red')
              setLoading(false)
            });
          }} 
        />
        <ActivityIndicator size="large" color="#0000ff" animating={loading} />
        </View>
      
      </ScrollView>

      <View style={styles.tabBarInfoContainer}>
        <Text style={styles.tabBarInfoText}>Eur to COP: (€) {price}</Text>
        <Text style={styles.tabBarInfoText}>Eur to BTC: (€) {pircebtc}</Text>
        <Text style={styles.tabBarInfoText}>COP to BTC: ($) {Pricebtccop}</Text>
        <Text style={styles.tabBarDateText}>{date?date:''}</Text>
      </View>
    </View>
  );
}



HomeScreen.navigationOptions = {
  header: null,
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 25,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
