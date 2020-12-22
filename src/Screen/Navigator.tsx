import React, {useContext} from 'react';
import {Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {UserContext} from '../Context/User';
import SearchBar from '../Components/SearchBar';
import Loading from '../Components/Loading';

import Login from '../Screen/Login';
import PasswordReset from '../Screen/PasswordReset';
import Signup from '../Screen/Signup';

import MyFeed from '../Screen/MyFeed';
import Feeds from '../Screen/Feeds';
import FeedListOnly from '../Screen/FeedListOnly';
import Upload from '../Screen/Upload';
import Notification from '../Screen/Notification';
import Profile from '../Screen/Profile';
import CustomDrawer from '../Screen/Drawer';

const Stack = createStackNavigator();
const BottomTab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const LoginNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="PasswordReset" component={PasswordReset} />
    </Stack.Navigator>
  );
};

const MyFeedTab = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MyFeed"
        component={MyFeed}
        options={{title: 'SNS App'}}
      />
    </Stack.Navigator>
  );
};

const FeedsTab = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Feeds"
        component={Feeds}
        // 서치바 UI 이상
        // options={{
        //   header: () => <SearchBar />,
        // }}
      />
      <Stack.Screen
        name="FeedListOnly"
        component={FeedListOnly}
        options={{
          headerBackTitleVisible: false,
          title: '둘러보기',
          headerTintColor: '#292929',
        }}
      />
    </Stack.Navigator>
  );
};

const UploadTab = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Upload"
        component={Upload}
        options={{title: '사진 업로드'}}
      />
    </Stack.Navigator>
  );
};

const ProfileTab = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{title: 'Profile'}}
      />
    </Stack.Navigator>
  );
};

const MainTabs = () => {
  return (
    <BottomTab.Navigator tabBarOptions={{showLabel: false}}>
      <BottomTab.Screen
        name="MyFeed"
        component={MyFeedTab}
        options={{
          tabBarIcon: ({color, focused}) => (
            <Image
              source={
                focused
                  ? require('../Assets/Images/ic_home.png')
                  : require('../Assets/Images/ic_home_outline.png')
              }
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="Feeds"
        component={FeedsTab}
        options={{
          tabBarIcon: ({color, focused}) => (
            <Image
              source={
                focused
                  ? require('../Assets/Images/ic_search.png')
                  : require('../Assets/Images/ic_search_outline.png')
              }
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="Upload"
        component={UploadTab}
        options={{
          tabBarLabel: 'Third',
          tabBarIcon: ({color, focused}) => (
            <Image
              source={
                focused
                  ? require('../Assets/Images/ic_add.png')
                  : require('../Assets/Images/ic_add_outline.png')
              }
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="Notification"
        component={Notification}
        options={{
          tabBarIcon: ({color, focused}) => (
            <Image
              source={
                focused
                  ? require('../Assets/Images/ic_favorite.png')
                  : require('../Assets/Images/ic_favorite_outline.png')
              }
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={ProfileTab}
        options={{
          tabBarIcon: ({color, focused}) => (
            <Image
              source={
                focused
                  ? require('../Assets/Images/ic_profile.png')
                  : require('../Assets/Images/ic_profile_outline.png')
              }
            />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};

const MainNavigator = () => {
  return (
    <Drawer.Navigator
      drawerPosition="right"
      drawerType="slide"
      drawerContent={(props) => <CustomDrawer props={props} />}>
      <Drawer.Screen name="MainTabs" component={MainTabs} />
    </Drawer.Navigator>
  );
};

export default () => {
  const {isLoading, userInfo} = useContext<IUserContext>(UserContext);

  if (isLoading === false) {
    return <Loading />;
  }

  return (
    <NavigationContainer>
      {userInfo ? <MainNavigator /> : <LoginNavigator />}
    </NavigationContainer>
  );
};