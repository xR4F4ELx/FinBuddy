import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { enableScreens } from 'react-native-screens'; // Import and enable screens
import HomePage from './Pages/HomePage'; // Update the path to your HomePage
import CameraPage from "./Pages/CameraPage.jsx";
import DashboardPage from "./Pages/DashboardPage.jsx";

// Enable screens for better performance
enableScreens();

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="HomePage">
        <Tab.Screen name="HomePage" component={HomePage} />
        <Tab.Screen name="CameraPage" component={CameraPage} />
        <Tab.Screen name="DashboardPage" component={DashboardPage} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
