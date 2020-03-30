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

export default function LocalBitcoin() {
  const [source,setSource] = useState('COP');
  const [names,setNames] = useState('Colombian Peso (COP)');
  const [loading,setLoading] = useState(false);
  const [buy,setBuy] = useState(0);
  const [sell,setSell] = useState(0);

  const currencies= [
    {id:'DZD',name:"Algerian Dinar (DZD)"},
    {id:'NAD',name:"Namibian Dollar (NAD)"},
    {id:'GHS',name:"Ghanaian Cedi (GHS)"},
    {id:'EGP',name:"Egyptian Pound (EGP)"},
    {id:'BGN',name:"Bulgarian Lev (BGN)"},
    {id:'XCD',name:"East Caribbean Dollar (XCD)"},
    {id:'PAB',name:"Panamanian Balboa (PAB)"},
    {id:'BOB',name:"Bolivian Boliviano (BOB)"},
    {id:'DKK',name:"Danish Krone (DKK)"},
    {id:'BWP',name:"Botswanan Pula (BWP)"},
    {id:'LBP',name:"Lebanese Pound (LBP)"},
    {id:'TZS',name:"Tanzanian Shilling (TZS)"},
    {id:'VND',name:"Vietnamese Dong (VND)"},
    {id:'AOA',name:"Angolan Kwanza (AOA)"},
    {id:'KHR',name:"Cambodian Riel (KHR)"},
    {id:'MYR',name:"Malaysian Ringgit (MYR)"},
    {id:'KYD',name:"Cayman Islands Dollar (KYD)"},
    {id:'LYD',name:"Libyan Dinar (LYD)"},
    {id:'UAH',name:"Ukrainian Hryvnia (UAH)"},
    {id:'JOD',name:"Jordanian Dinar (JOD)"},
    {id:'AWG',name:"Aruban Florin (AWG)"},
    {id:'SAR',name:"Saudi Riyal (SAR)"},
    {id:'XAG',name:"Silver (XAG)"},
    {id:'HKD',name:"Hong Kong Dollar (HKD)"},
    {id:'CHF',name:"Swiss Franc (CHF)"},
    {id:'GIP',name:"Gibraltar Pound (GIP)"},
    {id:'MRU',name:"Mauritanian Ouguiya (MRU)"},
    {id:'XAR',name:"XAR"},
    {id:'ALL',name:"Albanian Lek (ALL)"},
    {id:'XPD',name:"Palladium (XPD)"},
    {id:'BYN',name:"Belarusian Ruble (BYN)"},
    {id:'HRK',name:"Croatian Kuna (HRK)"},
    {id:'DJF',name:"Djiboutian Franc (DJF)"},
    {id:'SZL',name:"Swazi Lilangeni (SZL)"},
    {id:'THB',name:"Thai Baht (THB)"},
    {id:'XAF',name:"Central African CFA Franc (XAF)"},
    {id:'BND',name:"Brunei Dollar (BND)"},
    {id:'ISK',name:"Icelandic Kr\u00f3na (ISK)"},
    {id:'UYU',name:"Uruguayan Peso (UYU)"},
    {id:'NIO',name:"Nicaraguan C\u00f3rdoba (NIO)"},
    {id:'LAK',name:"Laotian Kip (LAK)"},
    {id:'SYP',name:"Syrian Pound (SYP)"},
    {id:'MAD',name:"Moroccan Dirham (MAD)"},
    {id:'MZN',name:"Mozambican Metical (MZN)"},
    {id:'PHP',name:"Philippine Piso (PHP)"},
    {id:'ZAR',name:"South African Rand (ZAR)"},
    {id:'NPR',name:"Nepalese Rupee (NPR)"},
    {id:'ZWL',name:"Zimbabwean Dollar (2009) (ZWL)"},
    {id:'NGN',name:"Nigerian Naira (NGN)"},
    {id:'CRC',name:"Costa Rican Col\u00f3n (CRC)"},
    {id:'AED',name:"United Arab Emirates Dirham (AED)"},
    {id:'GBP',name:"British Pound (GBP)"},
    {id:'MWK',name:"Malawian Kwacha (MWK)"},
    {id:'LKR',name:"Sri Lankan Rupee (LKR)"},
    {id:'DOP',name:"Dominican Peso (DOP)"},
    {id:'PKR',name:"Pakistani Rupee (PKR)"},
    {id:'HUF',name:"Hungarian Forint (HUF)"},
    {id:'BMD',name:"Bermudan Dollar (BMD)"},
    {id:'LSL',name:"Lesotho Loti (LSL)"},
    {id:'MNT',name:"Mongolian Tugrik (MNT)"},
    {id:'AMD',name:"Armenian Dram (AMD)"},
    {id:'UGX',name:"Ugandan Shilling (UGX)"},
    {id:'QAR',name:"Qatari Rial (QAR)"},
    {id:'XDR',name:"Special Drawing Rights (XDR)"},
    {id:'STN',name:"S\u00e3o Tom\u00e9 & Pr\u00edncipe Dobra (STN)"},
    {id:'JMD',name:"Jamaican Dollar (JMD)"},
    {id:'GEL',name:"Georgian Lari (GEL)"},
    {id:'SHP',name:"St. Helena Pound (SHP)"},
    {id:'AFN',name:"Afghan Afghani (AFN)"},
    {id:'SBD',name:"Solomon Islands Dollar (SBD)"},
    {id:'KPW',name:"North Korean Won (KPW)"},
    {id:'TRY',name:"Turkish Lira (TRY)"},
    {id:'BDT',name:"Bangladeshi Taka (BDT)"},
    {id:'YER',name:"Yemeni Rial (YER)"},
    {id:'XRP',name:"Ripple (XRP)"},
    {id:'HTG',name:"Haitian Gourde (HTG)"},
    {id:'XOF',name:"West African CFA Franc (XOF)"},
    {id:'MGA',name:"Malagasy Ariary (MGA)"},
    {id:'ANG',name:"Netherlands Antillean Guilder (ANG)"},
    {id:'LRD',name:"Liberian Dollar (LRD)"},
    {id:'RWF',name:"Rwandan Franc (RWF)"},
    {id:'NOK',name:"Norwegian Krone (NOK)"},
    {id:'MOP',name:"Macanese Pataca (MOP)"},
    {id:'SSP',name:"South Sudanese Pound (SSP)"},
    {id:'INR',name:"Indian Rupee (INR)"},
    {id:'MXN',name:"Mexican Peso (MXN)"},
    {id:'CZK',name:"Czech Koruna (CZK)"},
    {id:'TJS',name:"Tajikistani Somoni (TJS)"},
    {id:'TWD',name:"New Taiwan Dollar (TWD)"},
    {id:'BTN',name:"Bhutanese Ngultrum (BTN)"},
    {id:'COP',name:"Colombian Peso (COP)"},
    {id:'TMT',name:"Turkmenistani Manat (TMT)"},
    {id:'MUR',name:"Mauritian Rupee (MUR)"},
    {id:'IDR',name:"Indonesian Rupiah (IDR)"},
    {id:'HNL',name:"Honduran Lempira (HNL)"},
    {id:'XPF',name:"CFP Franc (XPF)"},
    {id:'FJD',name:"Fijian Dollar (FJD)"},
    {id:'ETB',name:"Ethiopian Birr (ETB)"},
    {id:'PEN',name:"Peruvian Sol (PEN)"},
    {id:'BZD',name:"Belize Dollar (BZD)"},
    {id:'ILS',name:"Israeli New Shekel (ILS)"},
    {id:'ETH',name:"Ethereum (ETH)"},
    {id:'GGP',name:"GGP"},
    {id:'MDL',name:"Moldovan Leu (MDL)"},
    {id:'XPT',name:"Platinum (XPT)"},
    {id:'BSD',name:"Bahamian Dollar (BSD)"},
    {id:'SEK',name:"Swedish Krona (SEK)"},
    {id:'JEP',name:"JEP"},
    {id:'AUD',name:"Australian Dollar (AUD)"},
    {id:'SRD',name:"Surinamese Dollar (SRD)"},
    {id:'CUP',name:"Cuban Peso (CUP)"},
    {id:'CLF',name:"Chilean Unit of Account (UF) (CLF)"},
    {id:'BBD',name:"Barbadian Dollar (BBD)"},
    {id:'KMF',name:"Comorian Franc (KMF)"},
    {id:'KRW',name:"South Korean Won (KRW)"},
    {id:'GMD',name:"Gambian Dalasi (GMD)"},
    {id:'LTC',name:"Litecoin (LTC)"},
    {id:'IMP',name:"IMP"},
    {id:'CUC',name:"Cuban Convertible Peso (CUC)"},
    {id:'CLP',name:"Chilean Peso (CLP)"},
    {id:'ZMW',name:"Zambian Kwacha (ZMW)"},
    {id:'XMR',name:"Monero (XMR)"},
    {id:'EUR',name:"Euro (EUR)"},
    {id:'CDF',name:"Congolese Franc (CDF)"},
    {id:'VES',name:"Venezuelan Bol\u00edvar (VES)"},
    {id:'KZT',name:"Kazakhstani Tenge (KZT)"},
    {id:'RUB',name:"Russian Ruble (RUB)"},
    {id:'TTD',name:"Trinidad & Tobago Dollar (TTD)"},
    {id:'OMR',name:"Omani Rial (OMR)"},
    {id:'BRL',name:"Brazilian Real (BRL)"},
    {id:'MMK',name:"Myanmar Kyat (MMK)"},
    {id:'PLN',name:"Polish Zloty (PLN)"},
    {id:'PYG',name:"Paraguayan Guarani (PYG)"},
    {id:'KES',name:"Kenyan Shilling (KES)"},
    {id:'SVC',name:"Salvadoran Col\u00f3n (SVC)"},
    {id:'MKD',name:"Macedonian Denar (MKD)"},
    {id:'AZN',name:"Azerbaijani Manat (AZN)"},
    {id:'TOP',name:"Tongan Pa\u02bbanga (TOP)"},
    {id:'MVR',name:"Maldivian Rufiyaa (MVR)"},
    {id:'VUV',name:"Vanuatu Vatu (VUV)"},
    {id:'GNF',name:"Guinean Franc (GNF)"},
    {id:'WST',name:"Samoan Tala (WST)"},
    {id:'IQD',name:"Iraqi Dinar (IQD)"},
    {id:'ERN',name:"Eritrean Nakfa (ERN)"},
    {id:'BAM',name:"Bosnia-Herzegovina Convertible Mark (BAM)"},
    {id:'SCR',name:"Seychellois Rupee (SCR)"},
    {id:'CAD',name:"Canadian Dollar (CAD)"},
    {id:'CVE',name:"Cape Verdean Escudo (CVE)"},
    {id:'KWD',name:"Kuwaiti Dinar (KWD)"},
    {id:'BIF',name:"Burundian Franc (BIF)"},
    {id:'PGK',name:"Papua New Guinean Kina (PGK)"},
    {id:'SOS',name:"Somali Shilling (SOS)"},
    {id:'SGD',name:"Singapore Dollar (SGD)"},
    {id:'UZS',name:"Uzbekistani Som (UZS)"},
    {id:'IRR',name:"Iranian Rial (IRR)"},
    {id:'CNY',name:"Chinese Yuan (CNY)"},
    {id:'SLL',name:"Sierra Leonean Leone (SLL)"},
    {id:'TND',name:"Tunisian Dinar (TND)"},
    {id:'GYD',name:"Guyanaese Dollar (GYD)"},
    {id:'NZD',name:"New Zealand Dollar (NZD)"},
    {id:'FKP',name:"Falkland Islands Pound (FKP)"},
    {id:'USD',name:"US Dollar (USD)"},
    {id:'CNH',name:"Chinese Yuan (offshore) (CNH)"},
    {id:'DASH',name:"Dash (DASH)"},
    {id:'KGS',name:"Kyrgystani Som (KGS)"},
    {id:'ARS',name:"Argentine Peso (ARS)"},
    {id:'RON',name:"Romanian Leu (RON)"},
    {id:'GTQ',name:"Guatemalan Quetzal (GTQ)"},
    {id:'RSD',name:"Serbian Dinar (RSD)"},
    {id:'BHD',name:"Bahraini Dinar (BHD)"},
    {id:'JPY',name:"Japanese Yen (JPY)"},
    {id:'SDG',name:"Sudanese Pound (SDG)"},
    {id:'XAU',name:"Gold (XAU)"}
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
                setSource(item.id)
                setNames(item.name)
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
          placeholder="Busca tu moneda"
          //place holder for the search input
          resetValue={false}
          //reset textInput Value with true and false state
          underlineColorAndroid="transparent"
          //To remove the underline from the android input
        />
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <ActivityIndicator size="large" color="#0000ff" animating={loading} />
        <Text style={styles.tabBarInfoText}> Ver ofertas en {names}</Text>
      
    
        <View style={styles.helpContainer}>
        <Button
          title="Calcular"
          onPress={()=>{
            setLoading(true)
            fetch('https://localbitcoins.com/buy-bitcoins-online/'+source+'/.json')
            .then((response) => response.json())
            .then((responseBuy) => {
                if (typeof(responseBuy.data) == 'undefined') {
                    alert('cambio no soportado no hay conexion de red')
                }else{
                    console.log(responseBuy.data.ad_list[0].data.temp_price)
                    setBuy(formatMoney(responseBuy.data.ad_list[0].data.temp_price))
                }
                fetch('https://localbitcoins.com/sell-bitcoins-online/'+source+'/.json')
                .then((response) => response.json())
                .then((responseSell) => {
                if (typeof(responseSell.data) == 'undefined') {
                    setLoading(false)
                    alert('cambio no soportado no hay conexion de red')
                }else{
                    console.log(responseSell.data.ad_list[0].data.temp_price)
                    setSell(formatMoney(responseSell.data.ad_list[0].data.temp_price))
                    setLoading(false)
                }
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
        </View>
      </ScrollView>

      <View style={styles.tabBarInfoContainer}>
        <Text style={styles.tabBarInfoText}>compra {source}: ($) {buy} </Text>
        <Text style={styles.tabBarInfoText}>venta {source}: ($) {sell}</Text>
      </View>
    </View>
  );
}



LocalBitcoin.navigationOptions = {
  header: '',
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
