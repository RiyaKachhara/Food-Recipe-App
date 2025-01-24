import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { CachedImage } from '../helpers/image'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome'
import HeartIcon from 'react-native-vector-icons/AntDesign'
import ClockIcon from 'react-native-vector-icons/Feather'
import UserIcon from 'react-native-vector-icons/Ionicons'
import FireIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Stack from 'react-native-vector-icons/Octicons'
import { useNavigation } from '@react-navigation/native';
import axios from 'react-native-axios'
import Loading from '../components/loading';
import YouTubeIframe from 'react-native-youtube-iframe';
import Animated, { FadeInDown, FadeIn  } from 'react-native-reanimated';


const RecipeDetailScreen = (props) => {
    let item = props.route.params
    const [isFavourite, setIsFavourite] = useState(false);
    const navigation = useNavigation();
    const [meal, setMeal] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getMealData(item.idMeal)
    }, [])

    const getMealData = async (id) => {

        try {
            const response = await axios.get(`https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`);

            if (response && response.data) {
                setMeal(response.data.meals[0])
                setLoading(false);
            }
        } catch (err) {
            console.log('error: ', err.message);
        }
    }

    const ingredientsIndexes = (meal) => {
        if (!meal) return [];
        let indexes = [];
        for (let i = 1; i <= 20; i++) {
            if (meal['strIngredient' + i]) {
                indexes.push(i);
            }
        }
        return indexes;
    }

    const getYoutubeVideoId = url =>{
        const regex = /[?&]v=([^&]+)/;
        const match = url.match(regex);
        if(match && match[1]){
            return match[1];
        }
        return null;
    }

    return (

        <ScrollView
            style={{ backgroundColor: 'white', flex: 1 }}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 30 }}
        >
            <StatusBar barStyle="light-content" />

            {/* recipe image */}
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <CachedImage
                    uri={item.strMealThumb}
                    style={{ width: wp(98), height: hp(50), borderRadius: 35, borderBottomLeftRadius: 40, borderBottomRighRadius: 40, marginTop: 4 }}
                    sharedTransitionTag = {item.strMeal}
                />
            </View>



            <Animated.View entering = {FadeIn.delay(200).duration(1000)}style={styles.TopBar}>
                {/* back button */}
                <TouchableOpacity style={styles.LeftButton} onPress={() => navigation.goBack()}>
                    <Icon name="chevron-left" size={hp(3.5)} strokeWidth={4.5} color="#fbbf24" />
                </TouchableOpacity>

                {/* Heart Button */}
                <TouchableOpacity style={styles.HeartButton} onPress={() => setIsFavourite(!isFavourite)}>
                    <HeartIcon name="heart" size={hp(3.5)} strokeWidth={4.5} color={isFavourite ? "red" : "gray"} />
                </TouchableOpacity>
            </Animated.View>

            {/* meal description */}
            {
                loading ? (
                    <Loading size="large" style={{ marginTop: 32 }} />
                ) : (
                    <View
                        style={{
                            paddingHorizontal: 16,
                            // flexDirection: 'row',
                            // justifyContent: 'space-between',
                            paddingTop: 32,
                        }}>

                        {/* name and area */}
                        <Animated.View entering ={FadeInDown.duration(700).springify().damping(12)} style={{ marginBottom: 8 }}>
                            <Text style={{ fontSize: hp(3), fontWeight: 'bold', flex: 1, color: '#374151', marginBottom: 8 }}>
                                {meal.strMeal}
                            </Text>
                            <Text style={{ fontSize: hp(2), fontWeight: 'medium', flex: 1, color: '#6B7280', marginBottom: 5 }}>
                                {meal.strArea}
                            </Text>
                        </Animated.View>

                        {/* misc */}
                        <Animated.View entering ={FadeInDown.delay(100).duration(700).springify().damping(12)} style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                            <View style={{ display: 'flex', borderRadius: 9999, backgroundColor: '#fcd34d', padding: 8 }}>
                                <View style={{ height: hp(6.5), width: hp(6.5), backgroundColor: 'white', borderRadius: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <ClockIcon name="clock" size={hp(4)} strokeWidth={2.5} color="#525252" />
                                </View>
                                <View style={{ display: 'flex', alignItems: 'center', paddingVertical: 8, gap: 4 }}>
                                    <Text style={{ fontSize: hp(2), fontWeight: 'bold', color: '#374151' }}>
                                        35
                                    </Text>
                                    <Text style={{ fontSize: hp(1.3), fontWeight: 'bold', color: '#374151' }}>
                                        Mins
                                    </Text>
                                </View>
                            </View>

                            <View style={{ display: 'flex', borderRadius: 9999, backgroundColor: '#fcd34d', padding: 8 }}>
                                <View style={{ height: hp(6.5), width: hp(6.5), backgroundColor: 'white', borderRadius: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <UserIcon name="people" size={hp(4)} strokeWidth={2.5} color="#525252" />
                                </View>
                                <View style={{ display: 'flex', alignItems: 'center', paddingVertical: 8, gap: 4 }}>
                                    <Text style={{ fontSize: hp(2), fontWeight: 'bold', color: '#374151' }}>
                                        03
                                    </Text>
                                    <Text style={{ fontSize: hp(1.3), fontWeight: 'bold', color: '#374151' }}>
                                        Servings
                                    </Text>
                                </View>
                            </View>

                            <View style={{ display: 'flex', borderRadius: 9999, backgroundColor: '#fcd34d', padding: 8 }}>
                                <View style={{ height: hp(6.5), width: hp(6.5), backgroundColor: 'white', borderRadius: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <FireIcon name="fire" size={hp(4)} strokeWidth={2.5} color="#525252" />
                                </View>
                                <View style={{ display: 'flex', alignItems: 'center', paddingVertical: 8, gap: 4 }}>
                                    <Text style={{ fontSize: hp(2), fontWeight: 'bold', color: '#374151' }}>
                                        103
                                    </Text>
                                    <Text style={{ fontSize: hp(1.3), fontWeight: 'bold', color: '#374151' }}>
                                        Cal
                                    </Text>
                                </View>
                            </View>

                            <View style={{ display: 'flex', borderRadius: 9999, backgroundColor: '#fcd34d', padding: 8 }}>
                                <View style={{ height: hp(6.5), width: hp(6.5), backgroundColor: 'white', borderRadius: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Stack name="stack" size={hp(4)} strokeWidth={2.5} color="#525252" />
                                </View>
                                <View style={{ display: 'flex', alignItems: 'center', paddingVertical: 8, gap: 4 }}>
                                    <Text style={{ fontSize: hp(2), fontWeight: 'bold', color: '#374151' }}>

                                    </Text>
                                    <Text style={{ fontSize: hp(1.3), fontWeight: 'bold', color: '#374151' }}>
                                        Easy
                                    </Text>
                                </View>
                            </View>
                        </Animated.View>

                        {/* ingredients */}
                        <Animated.View entering ={FadeInDown.delay(200).duration(700).springify().damping(12)} style={{ marginBottom: 16, marginTop: 16 }}>
                            <Text style={{ fontSize: hp(2.5), fontWeight: 'bold', flex: 1, color: '#374151', marginBottom: 16 }}>
                                Ingredients
                            </Text>
                            <View style={{ marginBottom: 8, marginLeft: 12 }}>
                                {
                                    ingredientsIndexes(meal).map(i => {
                                        return (
                                            <View key={i} style={{ flexDirection: 'row', marginRight: 16 }}>
                                                <View style={{ height: hp(1.5), width: hp(1.5), backgroundColor: '#fcd34d', borderRadius: 9999, marginBottom: 15, marginRight: 12 }} />
                                                <View style={{ flexDirection: 'row', marginRight: 8 }}>
                                                    <Text style = {{fontWeight: '800', color: '#4B5563' ,marginRight: 8, fontSize : hp(1.7)}}>{meal['strMeasure' + i]}</Text>
                                                    <Text style = {{fontWeight: '500', color: '#6B7280', fontSize : hp(1.7)}}>{meal['strIngredient' + i]}</Text>
                                                </View>
                                            </View>
                                        )
                                    })
                                }
                            </View>
                        </Animated.View>
                        
                        {/* instructions */}
                        <Animated.View entering ={FadeInDown.delay(300).duration(700).springify().damping(12)} style={{ marginBottom: 16 }}>
                            <Text style={{ fontSize: hp(2.5), fontWeight: 'bold', flex: 1, color: '#374151', marginBottom: 16 }}>
                                Instructions
                            </Text>
                            <Text style = {{fontSize: hp(1.6), color :'#4B5563'}}>
                                {
                                    meal.strInstructions
                                }
                            </Text>
                        </Animated.View>

                        {/* recipe video */}
                        {
                            meal.strYoutube && (
                                <Animated.View entering ={FadeInDown.delay(400).duration(700).springify().damping(12)} style = {{marginBottom: 16}}>
                                    <Text style={{ fontSize: hp(2.5), fontWeight: 'bold', flex: 1, color: '#374151', marginBottom: 16 }}>
                                        Recipe Video
                                    </Text>
                                    <View>
                                        <YouTubeIframe
                                            videoId = {getYoutubeVideoId(meal.strYoutube)}
                                            height= {hp(30)}/>
                                    </View>
                                </Animated.View>
                            )
                        }
                    </View>
                )
            }

        </ScrollView>
    )
}

export default RecipeDetailScreen

const styles = StyleSheet.create({
    TopBar: {
        width: '100%',
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 28,
        paddingHorizontal: 16,

    },
    LeftButton: {
        padding: 10,
        borderRadius: 50,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
    },
    HeartButton: {
        padding: 10,
        borderRadius: 50,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
    }

})