import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import { selectAuth } from '../redux/auth/slices';
import LoginScreen from '../screens/Login';
import RegisterScreen from '../screens/Register';
import HomeScreen from '../screens/Home';
import { Movie } from '../core/interfaces/Movies';
import { DetailScreen } from '../screens/Detail';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import theme from '../core/theme/theme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ProfileScreen from '../screens/Profile';
import { returnIconNameByScreen, returnScreenNameByRouteName } from '../utils';
import SearchScreen from '../screens/Search';

export type RootStackParams = {
  HomeScreen: undefined;
  DetailScreen: Movie;
};

const Tab = createBottomTabNavigator();
const Auth = createNativeStackNavigator();
const Root = createNativeStackNavigator();

const TabStack = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarLabel: returnScreenNameByRouteName[route.name],
        tabBarIcon: ({ color, size }) => {
          return <MaterialCommunityIcons name={returnIconNameByScreen[route.name]} size={size} color={color} />;
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false, tabBarStyle: { backgroundColor: theme.colors.black } }}
      />
      <Tab.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{ tabBarStyle: { backgroundColor: theme.colors.black } }}
      />
      <Tab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{ tabBarStyle: { backgroundColor: theme.colors.black } }}
      />
    </Tab.Navigator>
  );
};

const AuthStack = () => {
  return (
    <Auth.Navigator>
      <Auth.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Auth.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
    </Auth.Navigator>
  );
};

export default function NavContainer() {
  const token = useSelector(selectAuth);
  return (
    <NavigationContainer>
      <Root.Navigator screenOptions={{ headerShown: false }}>
        {token ? (
          <>
            <Root.Screen name="Home" component={TabStack} />
            <Root.Screen name="DetailScreen" component={DetailScreen} />
          </>
        ) : (
          <>
            <Root.Screen name="LoginScreen" component={AuthStack} />
          </>
        )}
      </Root.Navigator>
    </NavigationContainer>
  );
}
