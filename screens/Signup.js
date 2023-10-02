import { Ionicons } from "@expo/vector-icons";
import Validator from "email-validator";
import { Formik } from "formik";
import React, { useContext, useState } from "react";
import {
  Alert,
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import * as Yup from "yup";
import userContext from "../context/UserProvider";
import authService from "../firebase_services/auth";
import LoadingComponent from "../components/LoadingComponent";

const Signup = ({ navigation }) => {
  const signUpFormSchema = Yup.object().shape({
    email: Yup.string().email().required("An email is required"),
    password: Yup.string()
      .required()
      .min(6, "your password has to have atleast 8 characters"),
  });
  const { userDetails, setUserDetails } = useContext(userContext);

  const [isLoading, setIsLoading] = useState(false);

  const onSignup = async (email, password, username) => {
    setIsLoading(true);
    await authService
      .createAccount({ email, password, username })
      .then(async (user) => {
        const userdata = await authService.getUserInfo(user.email);
        setUserDetails(userdata);
      })
      .catch((error) => {
        Alert.alert(error.message);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>cNature</Text>
      <Formik
        initialValues={{ username: "", email: "", password: "" }}
        onSubmit={(values) =>
          onSignup(values.email, values.password, values.username)
        }
        validationSchema={signUpFormSchema}
        validateOnMount={true}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View>
            <View style={styles.inputContainer}>
              <Ionicons
                name="person"
                size={24}
                color="gray"
                style={styles.icon}
              />
              <TextInput
                placeholder="Username"
                onChangeText={handleChange("username")}
                value={values.username}
                style={styles.input}
                autoFocus
              />
            </View>
            <View
              style={[
                styles.inputContainer,
                {
                  borderColor:
                    values.email.length < 1 || Validator.validate(values.email)
                      ? "#ccc"
                      : "red",
                },
              ]}
            >
              <Ionicons
                name="mail"
                size={24}
                color="gray"
                style={styles.icon}
              />
              <TextInput
                placeholder="Email"
                onChangeText={handleChange("email")}
                value={values.email}
                keyboardType="email-address"
                textContentType="emailAddress"
                onBlur={handleBlur("email")}
                style={styles.input}
              />
            </View>
            <View
              style={[
                styles.inputContainer,
                {
                  borderColor:
                    values.password.length < 1 || values.password.length >= 6
                      ? "#ccc"
                      : "red",
                },
              ]}
            >
              <Ionicons
                name="lock-closed"
                size={24}
                color="gray"
                style={styles.icon}
              />
              <TextInput
                placeholder="Password"
                onChangeText={handleChange("password")}
                value={values.password}
                secureTextEntry
                style={styles.input}
              />
            </View>
            <TouchableOpacity
              style={{
                height: 50,
                padding: 10,
                backgroundColor: !isLoading ? "#3FCF01" : "#AEB0AD",
                borderRadius: 5,
                alignItems: "center",
                justifyContent: "center",
              }}
              disabled={isLoading}
              onPress={handleSubmit}
            >
              {isLoading ? <LoadingComponent /> : <Text>Sign Up</Text>}
            </TouchableOpacity>
          </View>
        )}
      </Formik>
      <View style={styles.signupcont}>
        <Text>Don't have an account?</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
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
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "white",
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    width: "80%",
    height: 50,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  button: {
    marginTop: 20,
    borderRadius: 20,
  },
  signupcont: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    marginTop: 20,
  },
});

export default Signup;
