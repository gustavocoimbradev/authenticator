import React, { useState, useContext, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';

import { AuthContext } from '../contexts/auth';


export default function Login({ navigation, route }) {

    const [emailAddress, setEmailAddress] = useState('')
    const [password, setPassword] = useState('')

    const [isAuthenticating, setIsAuthenticating] = useState(false)
    const [incorrectCredentials, setIncorrectCredentials] = useState(false)

    const { signIn, status, user } = useContext(AuthContext)

    function handleSignIn() {
        setIncorrectCredentials(false)
        setIsAuthenticating(true)
        signIn(emailAddress, password)
    }

    useEffect(() => {

        if(status == 1){
            // Authenticating
        }

        if(status == 2){
            // Authenticated
            setIsAuthenticating(false)
        }

        if(status == 3){
            // Incorrect credentials
            setIncorrectCredentials(true)
            setIsAuthenticating(false)
        }

    }, [status])

    return (
        <View style={styles.container}>
            <View style={styles.titleBox}>
                <Text style={styles.titleText}>Welcome back</Text>
            </View>
            <View style={styles.formBox}>
                <TextInput style={[styles.formField, incorrectCredentials ? styles.formFieldInvalid : styles.formFieldNormal]} placeholder="E-mail address" onChangeText={(thisValue) => setEmailAddress(thisValue)} value={emailAddress}></TextInput>
                <TextInput style={[styles.formField, incorrectCredentials ? styles.formFieldInvalid : styles.formFieldNormal]} placeholder="Password" secureTextEntry={true} onChangeText={(thisValue) => setPassword(thisValue)} value={password}></TextInput>
                <TouchableOpacity style={[styles.formButtonPrimary, isAuthenticating ? styles.formButtonPrimaryDisabled : styles.formButtonPrimaryNormal]}>
                    <Text style={styles.formButtonPrimaryText} onPress={() => isAuthenticating ? '' : handleSignIn()}>{isAuthenticating ? <ActivityIndicator color="#7e1ab0" /> : 'Sign in'}</Text>
                </TouchableOpacity>
                <Text style={styles.orText}>or</Text>
                <TouchableOpacity style={styles.formButtonSecondary} onPress={() => navigation.navigate('Signup')}>
                    <Text style={styles.formButtonSecondaryText}>Sign up</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'column'
    },
    titleBox: {
        height: '40%',
        justifyContent: 'flex-end',
        backgroundColor: '#7e1ab0',
        paddingBottom: 29
    },
    titleText: {
        fontSize: 30,
        color: '#fff',
        fontWeight: 700,
        marginLeft: 20
    },
    formBox: {
        height: '60%',
        padding: 15,
        paddingTop: 30
    },

    orText: {
        textAlign: 'center',
        color: '#9e9e9e',
        fontSize: 17,
        fontWeight: 700,
        marginBottom: 20
    },
    formField: {
        borderWidth: 1,
        fontSize: 20,
        padding: 20,
        paddingLeft: 30,
        borderRadius: 100,
        marginBottom: 20
    },
    formFieldNormal: {
        backgroundColor: '#e8e8e8',
        borderColor: '#d9d9d9'
    },

    formFieldInvalid: {
        backgroundColor: '#f0d5d5',
        borderColor: '#d49d9d',
        color: '#cc3d3d',
    },
    formButtonPrimary: {
        borderWidth: 1,
        padding: 20,
        paddingLeft: 30,
        borderRadius: 100,
        marginBottom: 20
    },
    formButtonPrimaryNormal: {
        backgroundColor: '#7e1ab0',
        borderColor: '#57117a'
    },
    formButtonPrimaryDisabled: {
        padding: 23,
        backgroundColor: '#ecd2f9',
        borderColor: '#e2bcf5',
    },
    formButtonPrimaryText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 700,
        textAlign: 'center'
    },
    formButtonSecondary: {
        borderWidth: 1,
        padding: 20,
        paddingLeft: 30,
        borderRadius: 100,
        marginBottom: 20
    },
    formButtonSecondaryNormal: {
        backgroundColor: '#fff',
        borderColor: '#57117a',
    },
    formButtonSecondaryText: {
        color: '#7e1ab0',
        fontSize: 20,
        fontWeight: 700,
        textAlign: 'center'
    },
})