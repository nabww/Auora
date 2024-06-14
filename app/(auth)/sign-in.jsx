import { View, Text, ScrollView, Image, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormFIeld from "../components/FormFIeld";
import CustomButton from "../components/CustomButton";
import { Link, router } from "expo-router";
import { signIn, revokeAllSessions } from "../../lib/appwrite";

//sign in function
const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [IsSubmiting, setIsSubmiting] = useState(false);

  // const submit = async () => {
  //   if (!form.email || !form.password) {
  //     Alert.alert("Error", "Please fill in all required fields");
  //   }
  //   setIsSubmiting(true);
  //   // createUser();
  //   try {
  //     const result = await signIn(form.email, form.password);

  //     //set it to global state using context

  //     router.replace("/home");
  //   } catch (error) {
  //     Alert.alert("Error", error.message);
  //   } finally {
  //     setIsSubmiting(false);
  //   }
  // };

  const submit = async () => {
    try {
      // Check if email and password are provided
      if (!form.email || !form.password) {
        throw new Error("Please fill in all required fields");
      }
      setIsSubmiting(true);
      // Revoke all active sessions
      // await revokeAllSessions();
      const result = await signIn(form.email, form.password);
      router.replace("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      // Whether successful or not, reset the submit state
      setIsSubmiting(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full min-h-[85vh] justify-center px-4 my-6">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[115px] h-[35px] "
          />
          <Text className="text-2xl text-white text-semibold mt-10 font-psemibold">
            Log in to Aora
          </Text>
          <FormFIeld
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          <FormFIeld
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
          />

          <CustomButton
            title={"sign in"}
            handlePress={submit}
            isLoading={IsSubmiting}
            containerStyles="mt-7"
          />
          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Don't have an account?
            </Text>
            <Link
              href="/sign-up"
              className="text-lg font-psemibold text-secondary-100">
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
