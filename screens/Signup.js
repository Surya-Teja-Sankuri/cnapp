import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  Pressable,
  TextInput,
  Button,
  Alert,
  TouchableOpacity,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import Validator from "email-validator";
import { db, firebase } from "../firebase";

const Signup = (props) => {
  const LoginFormSchema = Yup.object().shape({
    email: Yup.string().email().required("An email is required"),
    password: Yup.string()
      .required()
      .min(6, "your password has to have atleast 8 characters"),
  });
  const onSignup = async (email, password, username) => {
    try {
      const authUser = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      console.log("created user", email, password);
      db.collection("users").doc(authUser.user.email).set({
        owner_uid: authUser.user.uid,
        username: username,
        email: authUser.user.email,
      });
    } catch (error) {
      Alert.alert("invalid username or password", error.message);
    }
  };

  return (
    <SafeAreaView
      style={{
        alignItems: "center",
        width: '100%',
        height: '100%',
        backgroundColor: "white",
      }}
    >
      <Formik
        initialValues={{
          username: "",
          email: "",
          password: "",
          confirmpassword: "",
        }}
        onSubmit={(values) => {
          onSignup(values.email, values.password, values.username);
        }}
        validationSchema={LoginFormSchema}
        validateOnMount={true}
      >
        {({ handleChange, handleBlur, handleSubmit, values, isValid }) => (
          <>
            <Text
              style={{
                color: "black",
                fontSize: 40,
                fontWeight: "bold",
                marginVertical: 100,
              }}
            >
              cNature
            </Text>

            <View
              style={{
                height: 500,
                width: 350,

                paddingTop: 1,
              }}
            >
              <Text
                style={{
                  color: "black",
                  fontSize: 13,
                  fontWeight: "bold",
                  marginBottom: 1,
                  marginLeft: 40,
                }}
              >
                Username
              </Text>
              <View
                style={[
                  styles.inputfield,
                  {
                    borderColor:
                      1 > values.password.length || values.password.length >= 2
                        ? "#ccc"
                        : "red",
                  },
                ]}
              >
                <TextInput
                  placeholderTextColor="#444"
                  placeholder="username"
                  autoCapitalize="none"
                  textContentType="username"
                  autoFocus={true}
                  onChangeText={handleChange("username")}
                  onBlur={handleBlur("username")}
                  value={values.username}
                />
              </View>
              <Text
                style={{
                  color: "black",
                  fontSize: 13,
                  fontWeight: "bold",
                  marginBottom: 1,
                  marginLeft: 40,
                }}
              >
                Email
              </Text>
              <View
                style={[
                  styles.inputfield,
                  {
                    borderColor:
                      values.email.length < 1 ||
                      Validator.validate(values.email)
                        ? "#ccc"
                        : "red",
                  },
                ]}
              >
                <TextInput
                  placeholderTextColor="#444"
                  placeholder="example@gmail.com"
                  autoCapitalize="none"
                  keyboardType="email-address"
                  textContentType="emailAddress"
                  autoFocus={true}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                />
              </View>
              <Text
                style={{
                  color: "black",
                  fontSize: 13,
                  fontWeight: "bold",
                  marginBottom: 1,
                  marginLeft: 40,
                }}
              >
                Password
              </Text>
              <View
                style={[
                  styles.inputfield,
                  {
                    borderColor:
                      1 > values.password.length || values.password.length >= 6
                        ? "#ccc"
                        : "red",
                  },
                ]}
              >
                <TextInput
                  placeholderTextColor="#444"
                  placeholder="********"
                  autoCapitalize="none"
                  autoCorrect={false}
                  secureTextEntry={true}
                  textContentType="password"
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                />
              </View>
              <Text
                style={{
                  color: "black",
                  fontSize: 13,
                  fontWeight: "bold",
                  marginBottom: 1,
                  marginLeft: 40,
                }}
              >
                Confirm Password
              </Text>
              <View
                style={[
                  styles.inputfield,
                  {
                    borderColor:
                      1 > values.confirmpassword.length ||
                      values.password == values.confirmpassword
                        ? "#ccc"
                        : "red",
                  },
                ]}
              >
                <TextInput
                  placeholderTextColor="#444"
                  placeholder="********"
                  autoCapitalize="none"
                  autoCorrect={false}
                  secureTextEntry={true}
                  textContentType="password"
                  onChangeText={handleChange("confirmpassword")}
                  onBlur={handleBlur("confirmpassword")}
                  value={values.confirmpassword}
                />
              </View>
              <Pressable
                titleSize={20}
                style={styles.button(isValid)}
                onPress={handleSubmit}
              >
                <Text style={styles.buttontext}>Signup</Text>
              </Pressable>
              <View style={styles.signupcont}>
                <Text>Don't have an account?</Text>
                <TouchableOpacity
                  onPress={() => props.navigation.goBack()}
                >
                  <Text
                    style={{
                      color: "#24ba9f",
                      fontWeight: "bold",
                      textDecorationLine: "underline",
                    }}
                  >
                    {" "}
                    Login
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        )}
      </Formik>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  wrapper: {
    marginTop: 80,
  },
  inputfield: {
    borderRadius: 25,
    padding: 12,
    backgroundColor: "#fff",
    marginBottom: 10,
    borderWidth: 1,
    width: "80%",
    marginLeft: 25,
  },
  signupcont: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    marginTop: 50,
  },
  button: (isValid) => ({
    backgroundColor: "#24ba9f",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 42,
    borderRadius: 25,
    width: "80%",
    marginLeft: 25,
    marginTop: 15,
  }),
  buttontext: {
    fontWeight: "600",
    color: "black",
    fontSize: 20,
  },
});

export default Signup;
