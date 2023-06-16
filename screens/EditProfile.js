import React from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Image,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import { MaterialIcons, Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const EditProfile = () => {
    const navigation = useNavigation();

    const onPressBack = () => {
        navigation.goBack();
    }

    const onPressSave = () => {
        console.log(`save button pressed`);
    }

    return (
        <>
            {/* <View style={styles.container}> */}
            <View style={styles.headerContainer}>
                <TouchableOpacity style={styles.backButton} onPress={onPressBack}>
                    <MaterialIcons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>

                <Text style={styles.headerTitle}>Edit Profile</Text>

                <TouchableOpacity style={styles.checkButton} onPress={onPressSave}>
                    <MaterialIcons name="check" size={24} color="white" />
                </TouchableOpacity>
            </View>

            <ScrollView>
                <View style={styles.profileContainer}>
                    <View style={styles.profileInfoContainer}>
                        <Text style={styles.profileNameText}>John Doe</Text>
                        <Text style={styles.profileEmailText}>johndoe@example.com</Text>
                    </View>

                    <View style={styles.profilePictureContainer}>
                        <Image
                            style={styles.profilePicture}
                            source={require('../assets/profilepicture.jpg')} // Replace with your own profile picture source
                        />
                    </View>
                </View>

                <View style={styles.infoContainer}>
                    <View style={styles.inputContainer}>
                        <MaterialIcons name='person' size={24} color="#888" style={styles.icon} />
                        <TextInput
                            style={styles.input}
                            placeholder='username'
                        // onChangeText={onChangeText}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Feather name='user' size={24} color="#888" style={styles.icon} />
                        <TextInput
                            style={styles.input}
                            placeholder='name'
                        // onChangeText={onChangeText}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <MaterialIcons name='description' size={24} color="#888" style={styles.icon} />
                        <TextInput
                            style={styles.input}
                            placeholder='tell us about yourself'
                            multiline
                        // onChangeText={onChangeText}
                        />
                    </View>
                </View>
                <View style={styles.observationContainer}>
                    <Text>
                        MY OBSERVATONS
                    </Text>
                </View>
            </ScrollView>

            {/* </View> */}
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 35,
    },
    headerContainer: {
        marginTop: 35,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 15,
        paddingHorizontal: 20,
        backgroundColor: 'white',
        elevation: 4, // Add elevation for border shadow (Android)
        shadowColor: '#000', // Add shadow properties for border shadow (iOS)
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    backButton: {
        padding: 5,
        marginRight: 10,
    },
    headerTitle: {
        flex: 1,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    checkButton: {
        padding: 5,
        backgroundColor: '#4CAF50',
        borderRadius: 5,
    },
    profileContainer: {
        flexDirection: 'row',
        width: '100%',
        paddingHorizontal: 40,
        paddingVertical: 40,
        backgroundColor: 'lightgrey',
        marginBottom: 30,
    },
    profileInfoContainer: {
        flex: 1,
        marginRight: 10,
    },
    profileNameText: {
        fontSize: 20,
        fontWeight: 600,
    },
    profilePictureContainer: {
        width: 80,
        alignItems: 'center',
        justifyContent: 'center',
    },
    profilePicture: {
        width: 80,
        height: 80,
        borderRadius: 50,
    },
    infoContainer: {
        alignItems: 'center',
        paddingLeft: 10,
        gap: 15,
        width: '90%',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#888',
        paddingBottom: 5,
        marginBottom: 20,
    },
    icon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        fontSize: 16,
    },
    text: {
        fontSize: 16,
        marginBottom: 10,
    },
    observationContainer: {
        backgroundColor: 'grey',
        width: '100%',
        alignItems: 'center',
        padding: 10,
    }
});

export default EditProfile;