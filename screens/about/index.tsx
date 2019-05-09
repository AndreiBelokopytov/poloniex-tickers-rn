import * as React from "react";
import { View, Button, StyleSheet } from "react-native";
import {
  NavigationScreenOptions,
  NavigationScreenProps
} from "react-navigation";

interface AboutScreenProps {}

export class AboutScreen extends React.Component<
  NavigationScreenProps & AboutScreenProps
> {
  static navigationOptions: NavigationScreenOptions = {
    title: "О приложении"
  };

  handleButtonClick = () => {
    this.props.navigation.navigate("Tickers");
  };

  render() {
    return (
      <View style={styles.root}>
        <Button title="Котировки" onPress={this.handleButtonClick} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    paddingHorizontal: 16
  }
});
