
import { Image, StatusBar, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Animated, { useSharedValue, withSpring, useAnimatedStyle, withDelay } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';

const WelcomeScreen = () => {
  const ring1Padding = useSharedValue(0);
  const ring2Padding = useSharedValue(0);
  
  const navigation = useNavigation();
  useEffect(() => {
        //  ring1Padding.value = 0;
        //  ring2Padding.value = 0;
        //  setTimeout(() =>ring1Padding.value = withSpring(ring1Padding.value + hp(5)), 100);
        //  setTimeout(() =>ring2Padding.value = withSpring(ring2Padding.value + hp(6)), 300);
        ring1Padding.value = withDelay(100, withSpring(hp(20))); // Delay for smooth animation
        ring2Padding.value = withDelay(300, withSpring(hp(15)));

        setTimeout(()=> navigation.navigate('Home'), 2500)
  }, []);

  // Animated styles
  const ring1Style = useAnimatedStyle(() => ({
    padding: ring1Padding.value,
  }));

  const ring2Style = useAnimatedStyle(() => ({
    padding: ring2Padding.value,
  }));

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f59e0b',
        paddingVertical: hp(2),
      }}
    >
      <StatusBar barStyle="light-content" backgroundColor="#000000" />

      {/* Outer Circle */}
      <Animated.View style={[styles.ring1, ring1Style]}>
        {/* Inner Circle */}
        <Animated.View style={[styles.ring2, ring2Style]}>
          {/* Image inside the inner circle */}
          <Image
            source={require('../../assets/images/foodplate.jpg')}
            style={{
              width: wp(45),
              height: wp(45),
              borderRadius: wp(50),
            }}
          />
        </Animated.View>
      </Animated.View>

      {/* Text below the circles */}
      <View style={{ flexDirection: 'column', alignItems: 'center', marginBottom: hp(1), marginTop: hp(4) }}>
        <Text
          style={{
            fontWeight: 'bold',
            color: 'white',
            letterSpacing: 1.5,
            fontSize: wp(12),
          }}
        >
          Foody
        </Text>
        <Text
          style={{
            fontWeight: '500',
            color: 'white',
            letterSpacing: 1.5,
            fontSize: wp(5),
          }}
        >
          Food is always right
        </Text>
      </View>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  ring1: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: wp(55),
    width: wp(80),
    height: wp(80),
    justifyContent: 'center',
    alignItems: 'center',
  },
  ring2: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: wp(40),
    width: wp(60),
    height: wp(60),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
