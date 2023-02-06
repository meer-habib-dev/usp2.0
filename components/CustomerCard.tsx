import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useCustomerOrder } from "../hooks/useCustomerOrder";
import { useTailwind } from "tailwind-rn/dist";
import { useNavigation } from "@react-navigation/native";
import { CustomerScreenNavigationProp } from "../screens/CustomerScreen";
import { Icon } from "@rneui/themed";
import { Card } from "@rneui/themed";
type Props = {
  userId: string;
  name: string;
  email: string;
};
const CustomerCard = ({ email, name, userId }: Props) => {
  const { loading, error, orders } = useCustomerOrder(userId);
  const tw = useTailwind();
  const navigation = useNavigation<CustomerScreenNavigationProp>();
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("MyModal", {
          userId: userId,
          name: name,
        })
      }
    >
      <Card containerStyle={tw("p-5 rounded-lg ")}>
        <View style={tw(`flex-row justify-between`)}>
          <View>
            <Text style={tw(`text-2xl font-bold `)}>{name}</Text>
            <Text style={[tw("text-sm"), { color: "#59C1CC" }]}>
              ID: {userId}
            </Text>
          </View>
          <View style={tw("flex-row items-center justify-end")}>
            <Text style={{ color: "#59C1CC" }}>
              {" "}
              {loading ? "Loading..." : `${orders.length} x `}
            </Text>
            <Icon
              style={tw("mb-5 ml-auto")}
              name="box"
              type="entypo"
              color={"#59C1CC"}
              size={50}
            />
          </View>
        </View>
        <Card.Divider />
        <Text>{email}</Text>
      </Card>
    </TouchableOpacity>
  );
};

export default CustomerCard;

const styles = StyleSheet.create({});
