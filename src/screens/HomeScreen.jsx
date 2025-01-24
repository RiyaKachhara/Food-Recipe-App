import { Image, ScrollView, StatusBar, StyleSheet, Text, TextInput, View } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import React, { useEffect, useState } from 'react'
import BellIcon from 'react-native-vector-icons/Fontisto';
import Icon from 'react-native-vector-icons/FontAwesome6'
import Categories from '../components/categories';
import axios from  'react-native-axios'
import Recipes from '../components/recipes';


const HomeScreen = () => {
  
  const [activeCategory, setActiveCategory] = useState('Dessert');
  const [categories, setCategories] = useState([])
  const [meals, setMeals] = useState([]);

  const [searchQuery, setSearchQuery] = useState('');
  

  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      searchMeals(searchQuery);
    } else {
      getRecipes(activeCategory); // Load category recipes when search query is empty
    }
  }, [searchQuery]);

  useEffect(() => {
    getCategories();
    getRecipes();
  },[])

  const handleChangeCategory = category => {
    getRecipes(category);
    setActiveCategory(category);
    setMeals([]);
  }

  const getCategories = async () =>{
    try{
      const response = await axios.get('https://themealdb.com/api/json/v1/1/categories.php');
      
      if(response && response.data){
        setCategories(response.data.categories)
      }
    }catch(err){
      console.log('error: ',err.message);
    }
  }

  const getRecipes = async (category = 'Dessert') =>{
    try{
      const response = await axios.get(`https://themealdb.com/api/json/v1/1/filter.php?c=${category}`);
     
      if(response && response.data){
        setMeals(response.data.meals)
      }
    }catch(err){
      console.log('error: ',err.message);
    }
  }

  const searchMeals = async (query) => {
    try {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
      );
      if (response && response.data) {
        setMeals(response.data.meals || []); // Set empty array if no results found
      }
    } catch (err) {
      console.log('Error in searchMeals:', err.message);
    }
  };

  return (
   
    <View style = {{flex: 1, backgroundColor: 'white'}}>
      <StatusBar barStyle="dark-content" />
      <ScrollView 
        showsVerticalScrollIndicator = {false}
        contentContainerStyle = {{paddingBottom: 50}}
        style = {{paddingTop: hp(2), marginBottom: hp(6)}}
      >
        {/* avatar and bell icon */}
        <View 
        style = {{
          marginHorizontal: wp(4),
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: hp(2),
        }}>
          <Image source = {require('../../assets/images/woman.png')} style = {{height : hp(5), width : hp(5.5)}} />
          <BellIcon name="bell" size={30} color="grey" />
        </View>

        {/* greetings and punchline */}
        <View style={{ marginHorizontal: wp(4), marginBottom: hp(2), marginTop: hp(2) }}>
          <Text style={{ fontSize: hp(2), color: '#4B5563' }}>Hello, Kashu!</Text>
          <View>
            <Text style = {{fontSize: hp(3.8), fontWeight: '500', color: '#4B5563' }}>Make your own food</Text>
          </View>
          <Text style = {{fontSize: hp(3.8), fontWeight: '500', color: '#4B5563'}}>
            stay at <Text  style = {{color: '#f59e0b'}}>home</Text>
          </Text>
        </View>
        
        <View
          style = {{
            marginHorizontal: 16,
            flexDirection: 'row',
            alignItems: 'center',
            borderRadius: 9999,
            backgroundColor: 'rgba(0,0,0,0.05)',
            padding: 6,
            marginBottom: 18
          }}>
            <TextInput
              placeholder = 'Search my recipe'
              placeholderTextColoe = {'grey'}
              style = {{fontSize: hp(1.7), flex: 1, marginBottom: 4, paddingLeft: 12, letterSpacing: 1.25, }}
              value={searchQuery}
              onChangeText={(text) => setSearchQuery(text)} 
            />
            <View style = {{backgroundColor : 'white', borderRadius: 9999, padding: 12}}>
              <Icon name= "magnifying-glass" size = {hp(2.5)} strokeWidth = {3} color = "gray"/> 
            </View>
        </View>
        {/* categories */}
        <View>
          {categories.length > 0 && <Categories categories = {categories} activeCategory = {activeCategory} handleChangeCategory = {handleChangeCategory}/>}
        </View>
        {/* recipes */}
        <View>
          <Recipes meals = {meals} categories = {categories}/>
        </View>
      </ScrollView>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})