import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { categoryData } from '../constants'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { CachedImage } from '../helpers/image';

const Categories = ({ categories, activeCategory, handleChangeCategory }) => {
  return (
    <Animated.View entering={FadeInDown.duration(500).springify()}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        // style = {{flexDirection: 'row', gap: 16}}
        contentContainerStyle={{ paddingHorizontal: 15 }}>
        {
          categories.map((cat, index) => {
            let isActive = cat.strCategory === activeCategory;
            let activeButtonClass = {
              backgroundColor: isActive ? '#fbbf24' : 'rgba(0, 0, 0, 0.1)'
            };
            return (
              <TouchableOpacity
                key={index}
                onPress={() => handleChangeCategory(cat.strCategory)}
                style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', gap: 4, marginRight: 17 }}>

                <View style={[{ borderRadius: 9999, padding: 6 }, activeButtonClass]}>
                  {/* <Image
                    source={{ uri: cat.strCategoryThumb }}
                    style={{ width: hp(6), height: hp(6), borderRadius: 9999 }} /> */}

                  <CachedImage
                    uri={cat.strCategoryThumb}
                    style={{ width: hp(6), height: hp(6), borderRadius: 9999 }} />
                </View>

                <Text style={{ color: '#4B5563', fontSize: hp(1.6) }}>
                  {cat.strCategory}
                </Text>

              </TouchableOpacity>
            )
          })
        }
      </ScrollView>
    </Animated.View>
  )
}

export default Categories

const styles = StyleSheet.create({})