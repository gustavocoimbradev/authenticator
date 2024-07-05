import React, { useState, useContext } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';

import md5 from "react-native-md5";
import { validate } from "react-email-validator";

import { AuthContext } from '../contexts/auth';

export default function Login({ navigation, route }) {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [validFirstName, setValidFirstName] = useState(true);
    const [validLastName, setValidLastName] = useState(true);
    const [validEmailAddress, setValidEmailAddress] = useState(true);
    const [validPassword, setValidPassword] = useState(true);
    const [buttonDisabled, setButtonDisabled] = useState(false);

    const { apiAddress, apiKey, apiDB } = useContext(AuthContext)

    // Validate the fields
    const validateFields = () => {

        let errors = 0;

        if (!firstName == '') {
            setValidFirstName(true);
        } else {
            errors++;
            setValidFirstName(false);
        }

        if (!lastName == '') {
            setValidLastName(true);
        } else {
            errors++;
            setValidLastName(false);
        }

        if (!emailAddress == '') {
            if (validate(emailAddress)) {

                const requestOptions = {
                    method: 'POST',
                    headers: {
                        "api-key": apiKey,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        "dataSource": "App",
                        "database": apiDB,
                        "collection": "users",
                        "filter": {
                            "emailAddress": emailAddress
                        }
                    }),
                    redirect: 'follow'
                };
                fetch(apiAddress + '/findOne', requestOptions)
                    .then(response => response.json())
                    .then(response => {
                        if (response.document !== null) {
                            errors++;
                            setValidEmailAddress(false);
                        } else {
                            setValidEmailAddress(true);
                        }
                    })
                    .catch(error => console.log('error', error));

            } else {
                errors++;
                setValidEmailAddress(false);
            }
        } else {
            errors++;
            setValidEmailAddress(false);
        }

        if (newPassword !== '' && repeatPassword !== '') {
            if (newPassword == repeatPassword) {
                setValidPassword(true);
            } else {
                errors++;
                setValidPassword(false);
            }
        } else {
            errors++;
            setValidPassword(false);
        }

        if(errors == 0){ return true; } else { return false; }

    }

    // Creathe the user account

    const createAccount = () => {

        setButtonDisabled(true);

        if (!validateFields()) {
            setButtonDisabled(false);
            return;
        }

        const requestOptions = {
            method: 'POST',
            headers: {
                "api-key": apiKey,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "dataSource": "App",
                "database": apiDB,
                "collection": "users",
                "document": {
                    "firstName": firstName,
                    "lastName": lastName,
                    "emailAddress": emailAddress,
                    "password": md5.hex_md5(newPassword)
                }
            }),
            redirect: 'follow'
        };
        fetch(apiAddress + '/insertOne', requestOptions)
            .then(response => response.json())
            .then(response => {
                if (response.insertedId.length > 0) {
                    navigation.navigate('Signin', {emailAddress: emailAddress});
                }
                setButtonDisabled(false);
            })
            .catch(error => console.log('error', error));

    }

    return (
        <View style={styles.container}>
            <View style={styles.titleBox}>
                <Text style={styles.titleText}>Sign up for free</Text>
            </View>
            <View style={styles.formBox}>
                <TextInput style={[styles.formField, validFirstName ? styles.formFieldNormal : styles.formFieldInvalid]} placeholder="First name" onChangeText={thisValue => { setFirstName(thisValue); setValidFirstName(true) }} value={firstName}></TextInput>
                <TextInput style={[styles.formField, validLastName ? styles.formFieldNormal : styles.formFieldInvalid]} placeholder="Last name" onChangeText={(thisValue) => { setLastName(thisValue); setValidLastName(true) }} value={lastName}></TextInput>
                <TextInput style={[styles.formField, validEmailAddress ? styles.formFieldNormal : styles.formFieldInvalid]} placeholder="E-mail address" onChangeText={(thisValue) => { setEmailAddress(thisValue); setValidEmailAddress(true) }} value={emailAddress}></TextInput>
                <TextInput style={[styles.formField, validPassword ? styles.formFieldNormal : styles.formFieldInvalid]} placeholder="Create a password" secureTextEntry={true} onChangeText={(thisValue) => { setNewPassword(thisValue); setValidPassword(true) }} value={newPassword}></TextInput>
                <TextInput style={[styles.formField, validPassword ? styles.formFieldNormal : styles.formFieldInvalid]} placeholder="Repeat your password" secureTextEntry={true} onChangeText={(thisValue) => { setRepeatPassword(thisValue); setValidPassword(true) }} value={repeatPassword}></TextInput>
                <TouchableOpacity style={[styles.formButtonPrimary, buttonDisabled ? styles.formButtonPrimaryDisabled : styles.formButtonPrimaryNormal]}>
                    <Text style={styles.formButtonPrimaryText} onPress={() => buttonDisabled ? '' : createAccount()}>{buttonDisabled ? <ActivityIndicator color="#7e1ab0" /> : 'Create account'}</Text>
                </TouchableOpacity>
                <Text style={styles.orText}>or</Text>
                <TouchableOpacity style={styles.formButtonSecondary} onPress={() => navigation.navigate('Signin')} >
                    <Text style={styles.formButtonSecondaryText}>Sign in</Text>
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
    formBox: {
        height: '80%',
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