import React, { useState, useEffect, useContext } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';

import { AuthContext } from '../contexts/auth';

export default function Authenticated({ navigation, route }) {

    const [isDeauthenticating, setIsDeauthenticating] = useState(false)

    const { signOut, user, status } = useContext(AuthContext)

    useEffect(() => {

        if(status !== 2){
            navigation.navigate('Signin')
        }

    }, [status])

    const titleText = 'Welcome, ' + user.firstName + ' ' + user.lastName

    function handleSignOut() {

        if (!isDeauthenticating) {
            setIsDeauthenticating(true)
            signOut()
        }

    }

    return (
        <View style={styles.container}>
            <View style={styles.titleBox}>
                <Text style={styles.titleText}>{titleText}</Text>
            </View>
            <View style={styles.content}>
                <Text style={styles.contentText}>This is a simple exemple of a <Text style={styles.contentTextSpecial}>signup and signin</Text> code made using <Text style={styles.contentTextSpecial}>React Native</Text> and <Text style={styles.contentTextSpecial}>MongoDB</Text>.</Text>
                <TouchableOpacity style={styles.contentButtonLogout} onPress={() => handleSignOut()}>

                    <Text style={styles.contentButtonLogoutText}>{isDeauthenticating ? <ActivityIndicator color="#7e1ab0" /> : 'Click here to log out'}</Text>

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
        height: '20%',
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
    content: {
        height: '80%',
        padding: 15,
        paddingTop: 30
    },
    contentText: {
        fontSize: 20,
        lineHeight: 30
    },
    contentTextSpecial: {
        color: '#7e1ab0',
        fontWeight: 600
    },
    contentButtonLogout: {
        borderWidth: 1,
        padding: 20,
        paddingLeft: 30,
        borderRadius: 100,
        marginTop: 40,
        backgroundColor: '#fff',
        borderColor: '#57117a',
    },

    contentButtonLogoutText: {
        color: '#7e1ab0',
        fontSize: 20,
        fontWeight: 700,
        textAlign: 'center'
    },
})