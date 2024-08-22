import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Animated, Easing } from "react-native";

const Loader = () => {
  const opacityValues = useRef([new Animated.Value(0), new Animated.Value(0), new Animated.Value(0)]).current;

  useEffect(() => {
    const fadeInOutAnimations = [];

    let accumulatedDelay = 0;

    for (let i = 0; i < opacityValues.length; i++) {
      const fadeInOutAnimation = Animated.loop(
        Animated.sequence([
          Animated.timing(opacityValues[i], {
            toValue: 1,
            duration: 400,
            easing: Easing.linear,
            delay: accumulatedDelay,
            useNativeDriver: true,
          }),
          Animated.timing(opacityValues[i], {
            toValue: 0,
            duration: 400,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
        ])
      );

      fadeInOutAnimations.push(fadeInOutAnimation);

      accumulatedDelay += 500;
    }

    fadeInOutAnimations.forEach(animation => animation.start());

    return () => {
      fadeInOutAnimations.forEach(animation => animation.stop());
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.loaderContainer}>
        {opacityValues.map((value, index) => (
          <Animated.View key={index} style={[styles.circle, { opacity: value, backgroundColor: index === 0 ? "green" : index === 1 ? "#A60303" : "#FAA916" }]} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FEEBE9",
  },
  loaderContainer: {
    flexDirection: "row",
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 25,
    marginHorizontal: 5,
  },
});

export default Loader;
