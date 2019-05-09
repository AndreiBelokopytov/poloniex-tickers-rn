import * as React from "react";
import { Animated, StyleSheet, Text } from "react-native";

interface TickersTableCellProps {
  width: number;
  text: string;
}

export class TickersTableCell extends React.PureComponent<
  TickersTableCellProps
> {
  animated = new Animated.Value(0);

  state = {
    textUpdated: false
  };

  componentWillMount(): void {
    this.animated = new Animated.Value(0);
  }

  componentDidUpdate(prevProps: TickersTableCellProps) {
    if (this.props.text !== prevProps.text) {
      Animated.sequence([
        Animated.timing(this.animated, {
          toValue: 100,
          duration: 500
        }),
        Animated.timing(this.animated, {
          toValue: 0,
          duration: 200
        })
      ]).start();
    }
  }

  render() {
    let { width, text } = this.props;

    const interpolateBg = this.animated.interpolate({
      inputRange: [0, 100],
      outputRange: ["rgba(255, 255, 255, 1)", "rgba(101, 222, 123, 0.3)"]
    });

    const animatedStyle = {
      backgroundColor: interpolateBg
    };

    return (
      <Animated.View style={[{ width }, styles.cell, animatedStyle]}>
        <Text>{text}</Text>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  cell: {
    paddingHorizontal: 12,
    paddingVertical: 12,
  }
});
