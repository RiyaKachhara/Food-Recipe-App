
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import MasonryList from '@react-native-seoul/masonry-list';
import { mealData } from '../constants';
import Animated, { FadeInDown } from 'react-native-reanimated';
import Loading from './loading';
import { CachedImage } from '../helpers/image';
import { useNavigation } from '@react-navigation/native';

const Recipes = ({ categories, meals }) => {
    
    const navigation = useNavigation();
    const RecipeCard = ({ item, index, navigation }) => {

        let isEven = index % 2 === 0
        return (
            <Animated.View entering={FadeInDown.delay(index * 100).duration(600).springify().damping(12)}>
                <Pressable 
                    style={{ width: '100%', display: 'flex', justifyContent: 'center', marginBottom: 16, paddingLeft: isEven ? 0 : 8, paddingRight: isEven ? 8 : 0 }}
                    onPress = {() => navigation.navigate('RecipeDetail', {...item})}>
                    {/* <Image
                        source={{ uri: item.strMealThumb }}
                        style={{ width: '100%', height: index % 3 === 0 ? hp(25) : hp(35), backgroundColor: 'rgba(0, 0, 0, 0.05)', borderRadius: 35 }}>
                    </Image> */}

                    <CachedImage
                        uri = { item.strMealThumb }
                        style={{ width: '100%', height: index % 3 === 0 ? hp(25) : hp(35), backgroundColor: 'rgba(0, 0, 0, 0.05)', borderRadius: 35 }}
                        sharedTransitionTag = {item.strMeal}
                    />

                    <Text style={{ fontSize: hp(1.5), fontWeight: '600', marginLeft: 20, color: '#4B5563' }}>
                        {
                            item.strMeal.length > 20 ? item.strMeal.slice(0, 20) + '...' : item.strMeal
                        }
                    </Text>
                </Pressable>
            </Animated.View>
        );
    };

    return (
        <View style={{ marginHorizontal: 16, marginTop: 12 }}>
            <Text style={{ marginBottom: 12, fontSize: hp(3), fontWeight: '600', color: '#4B5563' }}>Recipes</Text>
            <View>
                {
                    categories.length === 0 || meals.length === 0 ? (<Loading size = "large" style = {{marginTop: 80}}/>) : (
                        <MasonryList
                            data={meals}
                            keyExtractor={(item) => item.idMeal}
                            numColumns={2}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item, i }) => <RecipeCard item={item} index={i} navigation = {navigation}/>}
                            onEndReachedThreshold={0.1}
                        />
                    )
                }

            </View>
        </View>
    );
};

export default Recipes;
