import * as React from "react";
import { View, Text } from "react-native";
import {
  NavigationScreenOptions,
  NavigationScreenProps
} from "react-navigation";

interface TickersScreenProps {}

export class TickersScreen extends React.Component<
  NavigationScreenProps & TickersScreenProps
> {
  static navigationOptions: NavigationScreenOptions = {
    title: "Котировки"
  };

  render() {
    return (
      <View>
        <Text>Котировки</Text>
      </View>
    );
  }
}
