import React, { useState } from "react";
import { View, Text, Button, FlatList } from "react-native";
import routes from "../common/routes";
import { useNavigation } from "@react-navigation/native";
import styles from "../style/styles";

const UsersList = ({ search }) => {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Radwa Nabil",
      username: "radwa",
      email: "Radwa@gmail.com",
      image: require("../assets/avatar/avatar2.png"),
      phone: "01124513211"
    },
    {
      id: 2,
      name: "Miriam Saeed",
      username: "Miriam",
      email: "miriam@gmail.com",
      image: require("../assets/avatar/avatar3.png"),
      phone: "01011241412"
    },
    {
      id: 3,
      name: "hamada Mohamed",
      username: "hamada",
      email: "hamada@gmail.com",
      image: require("../assets/avatar/avatar1.png"),
      phone: "01008457741"
    },
    {
      id: 4,
      name: "rima Mohammed",
      username: "riima",
      email: "rima@gmail.com",
      image: require("../assets/avatar/avatar3.png"),
      phone: "012987212645"
    },
    {
      id: 5,
      name: "Omer Mostafa",
      username: "Omer",
      email: "Omer@gmail.com",
      image: require("../assets/avatar/avatar1.png"),
      phone: "01224243411"
    },
  ]);

  const navigation = useNavigation();

  return (
    <>
      <FlatList
        style={styles.usersList}
        data={users.filter((user) => user.name.includes(search))}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.user}>
            <Text style={[styles.userText]}>{item.name}</Text>

            <Button
              title="Show More"
              onPress={() => {
                navigation.navigate(routes.details, item);
              }}
            />
          </View>
        )}
      />
    </>
  );
};
export default UsersList;