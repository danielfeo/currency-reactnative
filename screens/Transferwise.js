import * as React from 'react';
import { ActivityIndicator, Button,Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Input } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import SearchableDropdown from 'react-native-searchable-dropdown';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as WebBrowser from 'expo-web-browser';
import { MonoText } from '../components/StyledText';
import { useState } from 'react';
import * as Api from '../Api.js';

export default function Transferwise() {
  const [source,setSource] = useState('EUR');
  const [target,setTarget] = useState('COP');
  const [rate,setRate] = useState(0);
  const [loading,setLoading] = useState(false);
  const currencies= 		
		[
            {id:'AED',name:'AED'},
            {id:'ARS',name:'ARS'},
            {id:'AUD',name:'AUD'},
            {id:'BDT',name:'BDT'},
            {id:'BGN',name:'BGN'},
            {id:'BRL',name:'BRL'},
            {id:'BWP',name:'BWP'},
            {id:'CAD',name:'CAD'},
            {id:'CHF',name:'CHF'},
            {id:'CLP',name:'CLP'},
            {id:'COP',name:'COP'},
            {id:'CNY',name:'CNY'},
            {id:'CRC',name:'CRC'},
            {id:'CZK',name:'CZK'},
            {id:'DKK',name:'DKK'},
            {id:'EGP',name:'EGP'},
            {id:'EUR',name:'EUR'},
            {id:'GBP',name:'GBP'},
            {id:'GEL',name:'GEL'},
            {id:'GHS',name:'GHS'},
            {id:'HKD',name:'HKD'},
            {id:'HRK',name:'HRK'},
            {id:'HUF',name:'HUF'},
            {id:'IDR',name:'IDR'},
            {id:'ILS',name:'ILS'},
            {id:'INR',name:'INR'},
            {id:'JPY',name:'JPY'},
            {id:'KES',name:'KES'},
            {id:'KRW',name:'KRW'},
            {id:'LKR',name:'LKR'},
            {id:'MAD',name:'MAD'},
            {id:'MXN',name:'MXN'},
            {id:'MYR',name:'MYR'},
            {id:'NGN',name:'NGN'},
            {id:'NOK',name:'NOK'},
            {id:'NPR',name:'NPR'},
            {id:'NZD',name:'NZD'},
            {id:'PEN',name:'PEN'},
            {id:'PHP',name:'PHP'},
            {id:'PKR',name:'PKR'},
            {id:'PLN',name:'PLN'},
            {id:'RON',name:'RON'},
            {id:'RUB',name:'RUB'},
            {id:'SEK',name:'SEK'},
            {id:'SGD',name:'SGD'},
            {id:'THB',name:'THB'},
            {id:'TRY',name:'TRY'},
            {id:'TZS',name:'TZS'},
            {id:'UAH',name:'UAH'},
            {id:'UGX',name:'UGX'},
            {id:'USD',name:'USD'},
            {id:'UYU',name:'UYU'},
            {id:'VND',name:'VND'},
            {id:'XOF',name:'XOF'},
            {id:'ZAR',name:'ZAR'},
            {id:'ZMW',name:'ZMW'}
            ]
      



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
        <SearchableDropdown
          onTextChange={text => {
            if (typeof(item) !== 'undefined') {
                console.log(text)
            }
          }}
          onItemSelect={item =>{
            if (typeof(item) !== 'undefined') {
                setSource(item.name)
            }
          }}
          //onItemSelect called after the selection from the dropdown
          containerStyle={{ padding: 5 }}
          //suggestion container style
          textInputStyle={{
            //inserted text style
            padding: 12,
            borderWidth: 1,
            borderColor: '#ccc',
            backgroundColor: '#FAF7F6',
          }}
          itemStyle={{
            //single dropdown item style
            padding: 10,
            marginTop: 2,
            backgroundColor: '#FAF9F8',
            borderColor: '#bbb',
            borderWidth: 1,
          }}
          itemTextStyle={{
            //single dropdown item's text style
            color: '#222',
          }}
          itemsContainerStyle={{
            //items container style you can pass maxHeight
            //to restrict the items dropdown hieght
            maxHeight: '60%',
          }}
          items={currencies}
          //mapping of item array
          defaultIndex={'EUR'}
          //default selected item index
          placeholder="Moneda origen"
          //place holder for the search input
          resetValue={false}
          //reset textInput Value with true and false state
          underlineColorAndroid="transparent"
          //To remove the underline from the android input
        />
        <SearchableDropdown
          onTextChange={text => {
            if (typeof(item) !== 'undefined') {
                console.log(text)
            }
          }}
          onItemSelect={item =>{
            if (typeof(item) !== 'undefined') {
                setTarget(item.name)
            }
          }}
          //onItemSelect called after the selection from the dropdown
          containerStyle={{ padding: 5 }}
          //suggestion container style
          textInputStyle={{
            //inserted text style
            padding: 12,
            borderWidth: 1,
            borderColor: '#ccc',
            backgroundColor: '#FAF7F6',
          }}
          itemStyle={{
            //single dropdown item style
            padding: 10,
            marginTop: 2,
            backgroundColor: '#FAF9F8',
            borderColor: '#bbb',
            borderWidth: 1,
          }}
          itemTextStyle={{
            //single dropdown item's text style
            color: '#222',
          }}
          itemsContainerStyle={{
            //items container style you can pass maxHeight
            //to restrict the items dropdown hieght
            maxHeight: '60%',
          }}
          items={currencies}
          //mapping of item array
          defaultIndex={'COP'}
          //default selected item index
          placeholder="Moneda destino"
          //place holder for the search input
          resetValue={false}
          //reset textInput Value with true and false state
          underlineColorAndroid="transparent"
          //To remove the underline from the android input
        />
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.helpContainer}>
        <ActivityIndicator size="large" color="#0000ff" animating={loading} />
        <Text style={styles.tabBarInfoText}> {source} -> {target}</Text>
        <Button
          title="Calcular"
          onPress={()=>{
            setLoading(true)
            var misCabeceras = new Headers();
            misCabeceras.append("Authorization", "Bearer "+Api.getApiTrasfer());
            var miInit = { method: 'GET',
                           headers: misCabeceras,
                           cache: 'default' };
            fetch('https://api.sandbox.transferwise.tech/v1/rates?source='+source+'&target='+target,miInit)
            .then((response) => response.json())
            .then((responseTrasfer) => {
                setRate(responseTrasfer[0].rate)
                setLoading(false)
            })
            .catch((error) =>{
                console.error(error);
                alert('cambio no soportado no hay conexion de red')
                setLoading(false)
            });
          }} 
        />
        </View>
      </ScrollView>

      <View style={styles.tabBarInfoContainer}>
        <Text style={styles.tabBarInfoText}>Rate: {formatMoney(rate)} {target}</Text>
      </View>
    </View>
  );
}



Transferwise.navigationOptions = {
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
