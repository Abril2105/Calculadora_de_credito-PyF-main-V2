import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Menu from "../components/Menu";
import Calculadora from "../components/Calculadora";
import SplashScreen from "../components/SplashScreen";
import Endeudamiento from "../components/Endeudamiento";

const Stack = createNativeStackNavigator();

const MainStack = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Stack.Screen name="SplashScreen" component={SplashScreen} />

                <Stack.Screen name="Menu" component={Menu} />

                <Stack.Screen name="Calculadora" component={Calculadora} />

                <Stack.Screen name="Endeudamiento" component={Endeudamiento} />
                
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default MainStack