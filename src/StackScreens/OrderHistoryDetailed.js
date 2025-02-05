import React, { useState } from "react";
import {
  View,
  ScrollView,
  Pressable,
  StyleSheet,
  Image,
  Modal,
  SafeAreaView,
  Dimensions,
} from "react-native";
import { Text, Card, Button, Icon, ListItem } from "@rneui/themed";
import { Ionicons } from "@expo/vector-icons";
import { format } from "timeago.js";
import { Border } from "../../components";
import { AntDesign } from "@expo/vector-icons";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const OrderHistoryDetailed = ({ route, navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [featured, setFeatured] = useState(null);
  const {
    address,
    amount,
    customermobilenumber,
    courierName,
    dish,
    mpesaReceiptNumber,
    status,
    createdAt,
    userName,
    Oid,
    orderNumber,
    totalPaid,
    shipping,
    methodofPayment,
    methodofDelivery,
    verificationMessage,
  } = route.params;
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View
        style={{
          flex: 0.2,
          justifyContent: "center",
          alignContent: "center",
          width: windowWidth,
          flexDirection: "row",
          backgroundColor: "white",
        }}
      >
        <View
          style={{
            width: windowWidth / 2,
            justifyContent: "center",
            alignItems: "flex-start",
            alignContent: "center",
          }}
        >
          <Pressable
            onPress={() => navigation.goBack()}
            style={{ alignSelf: "flex-start" }}
          >
            <Ionicons
              name="arrow-back-sharp"
              size={24}
              color="black"
              style={{ marginLeft: 10, marginTop: 25 }}
            />
          </Pressable>
        </View>
        <View
          style={{
            width: windowWidth / 2,
            justifyContent: "center",
            alignItems: "flex-end",
            alignContent: "center",
          }}
        >
          <Text
            style={{
              marginTop: 30,
              marginRight: 20,
              color: "orange",
              fontSize: 20,
            }}
          >
            {status}
          </Text>
        </View>
      </View>

      <ScrollView style={{ flex: 0.45, backgroundColor: "white" }}>
        <View style={{ flex: 1 }}>
          <View style={{ flex: 0.15, height: 50, justifyContent: "center" }}>
            <ListItem bottomDivider>
              <ListItem.Content>
                <ListItem.Title style={{ fontFamily: "MontserratSemiBold" }}>
                  {userName}
                </ListItem.Title>
                <ListItem.Subtitle>{orderNumber}</ListItem.Subtitle>
              </ListItem.Content>

              <Pressable
                onPress={() =>
                  call({ number: `+254${customermobilenumber}`, prompt: false })
                }
              >
                <Ionicons
                  name="call-outline"
                  size={18}
                  color="black"
                  style={{ marginRight: 10, padding: 6 }}
                />
              </Pressable>

              <Text style={{ fontFamily: "MontserratSemiBold" }}>
                +254{customermobilenumber}
              </Text>
              <ListItem.Content>
                <View
                  style={{
                    alignSelf: "flex-end",
                  }}
                >
                  <ListItem.Title style={{ fontFamily: "MontserratSemiBold" }}>
                    {format(createdAt)}
                  </ListItem.Title>
                  <ListItem.Subtitle
                    style={{ fontFamily: "MontserratSemiBold" }}
                  >
                    {address}
                  </ListItem.Subtitle>
                </View>
              </ListItem.Content>
            </ListItem>
          </View>

          {/* {LIST} */}
          <View style={{ backgroundColor: "white" }}>
            <ScrollView style={{ flex: 1 }}>
              <View style={{ backgroundColor: "white" }}>
                {dish.length === 1 ? (
                  <Text style={{ marginLeft: 16, fontSize: 14 }}>
                    {dish.length} Item
                  </Text>
                ) : (
                  <Text style={{ marginLeft: 16, fontSize: 14 }}>
                    {dish.length} Items
                  </Text>
                )}
                <Border width={1} backgroundColor="grey" />
              </View>

              {dish.map((item, i) => (
                <Pressable
                  onPress={() => setFeatured(item) || setModalVisible(true)}
                  // onPress={() => console.log(item)}
                  key={i}
                  style={{
                    marginLeft: 15,
                    marginRight: 10,
                    borderBottomColor: "grey",
                    borderBottomWidth: 1,
                  }}
                >
                  <View
                    key={i}
                    style={{
                      backgroundColor: "white",
                      flexDirection: "row",
                      height: 40,
                      //  justifyContent: "space-around",
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        width: windowWidth / 2,
                      }}
                    >
                      <Text style={{ fontFamily: "MontserratSemiBold" }}>
                        {item.attributes.dishName}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        width: windowWidth / 4,
                      }}
                    >
                      <Text style={{ fontFamily: "MontserratSemiBold" }}>
                        KES{" "}
                        {(
                          (Number(item?.attributes?.dishPrice) +
                            Number(item?.attributes?.totalAddition)) *
                          item?.attributes?.quantity
                        )
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        .00
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        width: windowWidth / 2,
                      }}
                    >
                      <Text style={{ fontFamily: "MontserratSemiBold" }}>
                        Tap to view more
                      </Text>
                    </View>
                  </View>
                </Pressable>
              ))}
            </ScrollView>
          </View>
        </View>
      </ScrollView>

      <View
        style={{
          flex: 0.35,
          backgroundColor: "white",
        }}
      >
        <View style={{ marginLeft: 15 }}>
          <View
            style={{ flexDirection: "row", width: "50%", alignItems: "center" }}
          >
            <Text>Paid using </Text>

            <Text style={{ fontFamily: "MontserratSemiBold" }}>
              {methodofPayment}
            </Text>
            <Text
              onPress={() => setModalVisible2(true)}
              style={{ color: "blue" }}
            >
              {" "}
              {""}VERIFY
            </Text>
          </View>
        </View>
        <Card containerStyle={{ marginBottom: 2 }}>
          <View style={{ height: "100%" }}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={{ fontFamily: "MontserratSemiBold" }}>Shipping</Text>

              <Text style={{ fontFamily: "MontserratSemiBold" }}>
                KES {shipping.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                .00
              </Text>
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={{ fontFamily: "MontserratSemiBold" }}>Total</Text>
              <Text style={{ fontFamily: "MontserratSemiBold" }}>
                KES {totalPaid.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                .00
              </Text>
            </View>

            <Card.Divider />
          </View>
        </Card>
      </View>
      {/* <View style={{ flex: 0.2, height: "100%" }}>
        <Card></Card>
      </View> */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Pressable onPress={() => setModalVisible(!modalVisible)}>
              <AntDesign
                name="close"
                size={24}
                color="black"
                style={{
                  marginLeft: 20,
                  marginTop: 15,
                  alignSelf: "flex-start",
                }}
              />
            </Pressable>

            <View
              style={{
                flex: 0.3,
                backgroundColor: "white",
                marginLeft: 10,
                marginRight: 10,
              }}
            >
              <ScrollView>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View style={{ width: "50%" }}>
                    <Text style={styles.price}>
                      {featured?.attributes.dishName}
                    </Text>
                  </View>
                  <View
                    style={{
                      width: "15%",
                      alignItems: "center",
                    }}
                  >
                    <Text>KES</Text>
                  </View>
                  <View
                    style={{
                      width: "35%",
                      justifyContent: "flex-end",
                      alignItems: "flex-end",
                    }}
                  >
                    <Text>
                      {" "}
                      {featured?.attributes.dishPrice
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      .00
                    </Text>
                  </View>
                </View>

                {featured?.attributes?.cartModifiers?.map((item, i) => (
                  <View
                    key={i}
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <View style={{ width: "50%" }}>
                      <Text>{item.name}</Text>
                    </View>
                    <View
                      style={{
                        width: "15%",
                        alignItems: "center",
                      }}
                    >
                      <Text>KES</Text>
                    </View>
                    <View
                      style={{
                        width: "35%",
                        justifyContent: "flex-end",
                        alignItems: "flex-end",
                      }}
                    >
                      <Text>
                        {item?.value
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        .00
                      </Text>
                    </View>
                  </View>
                ))}

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      width: "25%",
                    }}
                  >
                    <Text style={styles.subtotalTitle}>Subtotal</Text>
                  </View>
                  <View style={{ width: "20%" }}>
                    <Text style={styles.title}>
                      {"x" + featured?.attributes?.quantity}
                    </Text>
                  </View>
                  <View
                    style={{
                      width: "25%",
                      justifyContent: "center",
                      alignContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text style={{ marginRight: 45 }}>KES</Text>
                  </View>
                  <View
                    style={{
                      width: "25%",
                      justifyContent: "flex-end",
                      alignItems: "flex-end",
                    }}
                  >
                    <Text style={styles.subtotalPrice}>
                      {(
                        (Number(featured?.attributes?.dishPrice) +
                          Number(featured?.attributes?.totalAddition)) *
                        featured?.attributes?.quantity
                      )
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      .00
                    </Text>
                  </View>
                </View>
              </ScrollView>
              {featured?.attributes?.SpecialInstructions !== "" ? (
                <View>
                  <Text>Special Instructions from {userName}</Text>
                  <Text>{featured?.attributes?.SpecialInstructions}</Text>
                </View>
              ) : null}
            </View>
          </View>
        </View>
      </Modal>
      <Modal animationType="slide" transparent={true} visible={modalVisible2}>
        <View style={styles.centeredView2}>
          <View style={styles.modalView2}>
            <Pressable onPress={() => setModalVisible2(!modalVisible2)}>
              <AntDesign
                name="close"
                size={24}
                color="black"
                style={{
                  marginLeft: 20,
                  marginTop: 15,
                  alignSelf: "flex-start",
                }}
              />
            </Pressable>

            <View
              style={{
                flex: 1,
                backgroundColor: "white",
                marginLeft: 10,
                marginRight: 10,
                height: 200,
                alignContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ fontFamily: "MontserratSemiBold" }}>
                Paid using {methodofPayment}
              </Text>
              <Text style={{ height: "100%", width: "80%" }}>
                {verificationMessage}
              </Text>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default OrderHistoryDetailed;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
  },
  modalView: {
    // marginTop: 20,
    backgroundColor: "white",
    borderRadius: 20,
    //padding: 35,
    width: windowWidth,
    height: windowHeight,
    // alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  centeredView2: {
    flex: 1,
    alignContent: "center",
    alignItems: "center",
  },
  modalView2: {
    // marginTop: 20,
    backgroundColor: "white",
    borderRadius: 20,
    //padding: 35,
    width: windowWidth / 2,
    height: windowHeight / 2,
    //alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
