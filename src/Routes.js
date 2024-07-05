import React, {useContext} from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Authenticated from './pages/Authenticated';

const Stack = createNativeStackNavigator()

import { AuthContext } from './contexts/auth';

export default function Routes() {

    const { status } = useContext(AuthContext)

    let initialRouteName

    if(status == 2){
        initialRouteName = 'Authenticated'
    } else {
        initialRouteName = 'Signin'
    }

    return (
        <Stack.Navigator initialRouteName={initialRouteName}>

            <Stack.Screen

                name="Signin"
                component={Signin}
                options={{ headerShown: false }}
                initialParams={{ }}

            />

            <Stack.Screen
                name="Signup"
                component={Signup}
                options={{ headerShown: false, default: true }}
                initialParams={{ }}

            />

            <Stack.Screen
                name="Authenticated"
                component={Authenticated}
                options={{ headerShown: false }}
                initialParams={{ }}

            />

        </Stack.Navigator>
    )

}