import React, { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { Card, CheckBox, Image } from "react-native-elements";
import { TouchableHighlight } from "react-native-gesture-handler";
import { Colors } from "../utils/colors";
import ShippingTypeCard from "./order/ShippingTypeCard";
import CurrentUserAddress from "./order/CurrentUserAddress";

export default function OrderRequest() {
  const [storePickup, setStorePickup] = useState(false);
  const [cash, setCash] = useState(true);

  return (
    <ScrollView>
      <View style={{ flex: 1, marginTop: 5 }}>
        <Text
          style={{
            fontSize: 18,
            color: Colors.InfoText,
            fontWeight: "bold",
            marginLeft: 15,
          }}
        >
          Método de entrega
        </Text>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <TouchableHighlight
            onPress={() => setStorePickup(false)}
            underlayColor="white"
          >
            <ShippingTypeCard
              img={require("../images/delivery.png")}
              title="Entrega a Domicilio"
              description="Recibe el pedido en la dirección de tu preferencia."
              selected={!storePickup}
            />
          </TouchableHighlight>

          <TouchableHighlight
            onPress={() => setStorePickup(true)}
            underlayColor="white"
          >
            <ShippingTypeCard
              img={require("../images/business.png")}
              title="Recoger en tienda"
              description="Recoge el producto en la ubicación del negocio."
              selected={storePickup}
            />
          </TouchableHighlight>
        </View>

        <CurrentUserAddress />
      </View>

      <View style={{ flex: 1, marginTop: 5 }}>
        <Text
          style={{
            fontSize: 18,
            color: Colors.InfoText,
            fontWeight: "bold",
            marginLeft: 15,
          }}
        >
          Método de pago
        </Text>

        <TouchableHighlight onPress={() => setCash(true)} underlayColor="white">
          <ShippingTypeCard
            img={require("../images/delivery.png")}
            title="Efectivo"
            description="Paga en efectivo al momento de recibir tu pedido."
            selected={cash}
          />
        </TouchableHighlight>

        <TouchableHighlight
          onPress={() => setCash(false)}
          underlayColor="white"
        >
          <ShippingTypeCard
            img={require("../images/business.png")}
            title="Pago con QR"
            description="Paga con código QR al momento de recibir tu pedido."
            selected={!cash}
          />
        </TouchableHighlight>
      </View>
    </ScrollView>
  );
}
