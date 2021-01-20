import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, Text, Alert, Linking } from 'react-native';
import Header from '../Header';
import { Order } from '../types';
import OrderCard from '../OrderCard';
import { RectButton } from 'react-native-gesture-handler';
import { confirmDelivery } from '../api';

type Props = {
    route: {
        params: {
            order: Order;
        }
    }
}

function OrderDetails({ route }: Props) {
  const order = route.params.order;
  const navigation = useNavigation();

    const handleOnCancel = () => {
        navigation.navigate('Orders');
    }

    const handleConfirmDelivery = () => {
        confirmDelivery(order.id)
        .then(() => {
            Alert.alert(`Pedido ${order.id} confirmado com sucesso!`);
            navigation.navigate('Orders');
        })
        .catch(() => {
            Alert.alert(`Houve um erro ao confirmar o pedido ${order.id}`);
        })
    }

    const handleStartNavigation = () => {
      Linking.openURL(`https://www.google.com/maps/dir/Av.+Jo%C3%A3o+Naves+de+%C3%81vila,+1331+-+Loja1224,+Uberl%C3%A2ndia+-+MG,+38405-140/R.+Haia+-+Tibery,+Uberl%C3%A2ndia+-+MG,+38405-112/@-18.9024982,-48.257697,15z/data=!3m1!4b1!4m13!4m12!1m5!1m1!1s0x94a445f250ddcd35:0x235c089940adab4d!2m2!1d-48.2607052!2d-18.9100794!1m5!1m1!1s0x94a44580a7a9a5a9:0xa0eed3157afdfd86!2m2!1d-48.2380673!2d-18.9059485`);
    }

  return (
      <>
        <Header />
        <View style={styles.container}>
            <OrderCard order={order} />
            <RectButton style={styles.button}>
                <Text style={styles.buttonText} onPress={handleStartNavigation}>INICIAR NAVEGAÇÃO</Text>
            </RectButton>
            <RectButton style={styles.button}>
                <Text style={styles.buttonText} onPress={handleConfirmDelivery}>CONFIRMAR ENTREGA</Text>
            </RectButton>
            <RectButton style={styles.button} onPress={handleOnCancel}>
                <Text style={styles.buttonText}>CANCELAR</Text>
            </RectButton>
        </View>
      </>
  );
}

const styles = StyleSheet.create({
    container: {
      paddingRight: '5%',
      paddingLeft: '5%'
    },
    button: {
      backgroundColor: '#DA5C5C',
      flexDirection: 'row',
      borderRadius: 10,
      marginTop: 40,
      alignItems: 'center',
      justifyContent: 'center'
    },
    buttonText: {
      paddingTop: 15,
      paddingBottom: 15,
      paddingLeft: 50,
      paddingRight: 50,
      fontWeight: 'bold',
      fontSize: 18,
      color: '#FFF',
      letterSpacing: -0.24,
      fontFamily: 'OpenSans_700Bold'
    }
  });

export default OrderDetails;
