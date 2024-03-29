import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../pages/HomeScreen";
import ProfileScreen from "../pages/ProfileScreen";
import DrawerNavigationHeader from "./DrawerNavigationHeader";
import CartScreen from "../pages/CartScreen";
import FlashProducts from "../pages/FlashProducts";
import Products from "../pages/Products";
import Ionicons from "react-native-vector-icons/Ionicons";

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function DrawerNavigator(props) {

  // console.log(props.navigation)
  const navigationData = props.navigation;

  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={HomeScreen}
                     options={
                       {
                         headerRight: (props) => <DrawerNavigationHeader data={{
                           navigator: navigationData,
                         }} />,
                         drawerIcon: ({ focused, size }) => (
                           <Ionicons
                             name="md-home"
                             size={size}
                             color={focused ? "#2780e3" : "#ccc"}
                           />
                         ),
                       }
                     }
      />
      <Drawer.Screen options={
        {

          drawerIcon: ({ focused, size }) => (
            <Ionicons
              name="person-circle-outline"
              size={size}
              color={focused ? "#2780e3" : "#ccc"}
            />
          ),
        }
      }
                     name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="Cart" component={CartScreen}
                     options={
                       {

                         drawerIcon: ({ focused, size }) => (
                           <Ionicons
                             name="cart-outline"
                             size={size}
                             color={focused ? "#2780e3" : "#ccc"}
                           />
                         ),
                       }
                     }
      />
      <Drawer.Screen name="Products" component={Products} options={
        {
          headerRight: (props) => <DrawerNavigationHeader data={{
            navigator: navigationData,
          }} />,
          drawerIcon: ({ focused, size }) => (
            <Ionicons
              name="list-circle-outline"
              size={size}
              color={focused ? "#2780e3" : "#ccc"}
            />
          ),
        }
      } />
      {/*<Stack.Screen name="Settings" component={Settings} />*/}
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;
