import React, { useState } from "react";
import { Text, View } from "react-native";
import { Icon } from "react-native-elements";

export default function AddressPicker() {
  const [selectedAddress, setSelectedAddress] = useState(
    "Carrera 4 Diagonal 75#16"
  );
  const [addresses, setAddresses] = useState([
    "Carrera 4 Diagonal 75#16",
    "Transversal 35D sur #29-85",
  ]);
  return (
    <View style={{ flexDirection: "row", marginTop: 40, alignItems: "center" }}>
      <Icon name="map-pin" type="feather" color="#fff" size={32} />
      <Text style={{ color: "#fff", marginLeft: 8, fontSize: 16 }}>
        {selectedAddress}
      </Text>
    </View>
  );
}
