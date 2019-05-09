import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
import {
  AboutScreen,
  TickersScreen
} from "./screens";

const AppNavigator = createStackNavigator({
  About: {
    screen: AboutScreen
  },
  Tickers: {
    screen: TickersScreen
  }
}, {
  initialRouteName: "About"
});

export default createAppContainer(AppNavigator);
