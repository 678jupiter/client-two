import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "@rneui/themed";
import { Ionicons } from "@expo/vector-icons";
import { fetchOrders } from "../Redux/orderActions";
import { useDispatch, useSelector } from "react-redux";

const drivers = [
  {
    name: "Amy Farha",
    avatar_url:
      "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
    subtitle: "AZ12AQW",
  },
  {
    name: "Chris Jackson",
    avatar_url:
      "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
    subtitle: "19HWR5",
  },
];

const ReadyForPickUp = ({ navigation }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    let isCancelled = false;
    dispatch(fetchOrders());
    return () => {
      isCancelled = true;
    };
  }, [dispatch]);

  const restaurantOrders = useSelector(
    (state) => state.orders.restaurantOrders
  );
  if (restaurantOrders.length === 0) {
    return (
      <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
        <ActivityIndicator size="large" color={colors.colors} />
      </View>
    );
  }
  const i = restaurantOrders.data;
  const result = i.filter((item) => item.attributes.status === "Ready");
  //console.log(result);
  if (result.length !== 0) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(39, 39, 39, 1)",
          paddingTop: 20,
        }}
      >
        <View style={{ marginLeft: 100, marginRight: 100, flex: 0.05 }}>
          <Text style={{ color: "white", fontSize: 22, fontWeight: "800" }}>
            Ready
          </Text>
        </View>
        <View style={{ flex: 0.8 }}>
          <ScrollView
            style={{
              marginTop: 10,
              marginLeft: 100,
              marginRight: 100,
              flex: 0.8,
            }}
          >
            {result.map((l, i) => (
              <View key={i}>
                <TouchableOpacity
                  style={{ backgroundColor: "white", flex: 1 }}
                  key={i}
                  onPress={() =>
                    navigation.navigate("readyForPickUpDetailed", {
                      totalPaid: l.attributes.amount,
                      createdAt: l.attributes.createdAt,
                      dish: l.attributes.dishes,
                      orderNumber: l.attributes.mpesaReceiptNumber,
                      status: l.attributes.status,
                      userName: l.attributes.userName,
                      orderId: l.id,
                      customermobilenumber: l.attributes.customermobilenumber,
                    })
                  }
                  //onPress={() => console.log(l)}
                >
                  <View
                    style={{
                      alignItems: "center",
                      justifyContent: "space-between",
                      flexDirection: "row",
                      marginTop: 6,
                    }}
                  >
                    <Text
                      style={{
                        color: "black",
                        fontSize: 20,
                        fontWeight: "500",
                        marginLeft: 10,
                      }}
                    >
                      {l.attributes.userName}
                    </Text>
                    <Text style={{ marginRight: 10 }}>
                      {l.attributes.status}
                    </Text>
                  </View>
                  <View
                    style={{
                      alignItems: "center",
                      justifyContent: "space-between",
                      flexDirection: "row",
                      marginTop: 6,
                    }}
                  >
                    <Text style={{ marginLeft: 10, paddingBottom: 10 }}>
                      {l.attributes.mpesaReceiptNumber}
                    </Text>
                    <Text style={{ marginRight: 10, paddingBottom: 10 }}>
                      {l.attributes.publishedAt}
                    </Text>
                  </View>
                </TouchableOpacity>
                <View
                  style={{ margin: 6, backgroundColor: "rgba(39, 39, 39, 1)" }}
                ></View>
              </View>
            ))}
          </ScrollView>
        </View>

        <View style={{ flex: 0.3 }}>
          <ScrollView horizontal>
            {drivers.map((item, i) => (
              <Card containerStyle={{ width: 150, height: 150 }} key={i}>
                <View style={{ position: "relative", alignItems: "center" }}>
                  <Image
                    style={{
                      width: "100%",
                      height: 80,
                    }}
                    resizeMode="contain"
                    source={{
                      uri: "https://avatars0.githubusercontent.com/u/32242596?s=460&u=1ea285743fc4b083f95d6ee0be2e7bb8dcfc676e&v=4",
                    }}
                  />
                  <Text>{item.name}</Text>
                  <Text>Arriving</Text>
                  <Text>{item.subtitle}</Text>
                </View>
              </Card>
            ))}
          </ScrollView>
        </View>
      </View>
    );
  } else {
    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
          backgroundColor: "rgba(39, 39, 39, 1)",
          paddingTop: 20,
        }}
      >
        <Text style={{ color: "white", fontSize: 40 }}>No Ready Orders.</Text>
      </View>
    );
  }
};

export default ReadyForPickUp;

const styles = StyleSheet.create({
  subtitleView: {
    flexDirection: "column",
    alignSelf: "flex-end",
    justifyContent: "center",
    alignContent: "flex-end",
  },
  ratingImage: {
    height: 19.21,
    width: 100,
  },
  ratingText: {
    paddingLeft: 10,
    color: "grey",
  },
});
