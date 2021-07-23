import React from "react";
import { StyleSheet } from "react-native";
import { useState } from "react/cjs/react.development";

import * as Yup from "yup";

import CategoryPickerItem from "../components/CategoryPickerItem";
import {
  AppForm,
  AppFormField,
  AppFormPicker,
  SubmitButton,
} from "../components/forms";
import FormImagePicker from "../components/forms/FormImagePicker";
import Screen from "../components/Screen";
import colors from "../config/colors";
import useLocation from "../hooks/useLocation";

const validationSchema = Yup.object().shape({
  address: Yup.string().required().min(1).label("Address"),
  price: Yup.number().required().min(1).max(10000).label("Price"),
  description: Yup.string().label("Description"),
  category: Yup.object().required().nullable().label("Category"),
  images: Yup.array(),
});

const categories = [
  {
    label: "Basketball",
    value: 1,
    backgroundColor: "orange",
    icon: "basketball",
  },
  {
    label: "Volleyball",
    value: 2,
    backgroundColor: colors.secondary,
    icon: "volleyball",
  },
  { label: "Tennis", value: 3, backgroundColor: colors.medium, icon: "tennis" },
  {
    label: "Football",
    value: 4,
    backgroundColor: "limegreen",
    icon: "football",
  },
  {
    label: "Badminton",
    value: 5,
    backgroundColor: "green",
    icon: "badminton",
  },
  {
    label: "Soccer",
    value: 6,
    backgroundColor: "tomato",
    icon: "soccer",
  },
];

function ListingEditScreen() {
  const location = useLocation();

  return (
    <Screen style={styles.container}>
      <AppForm
        initialValues={{
          address: "",
          price: "",
          description: "",
          category: null,
          images: [],
          userLocation: "",
        }}
        onSubmit={(values) => console.log(values, location)}
        validationSchema={validationSchema}
      >
        <FormImagePicker name="images" />
        <AppFormField maxLength={100} name="address" placeholder="Address" />
        <AppFormField
          keyboardType="numeric"
          maxLength={8}
          name="price"
          width={120}
          placeholder="Price"
        />
        <AppFormPicker
          items={categories}
          numberOfColumns={3}
          PickerItemComponent={CategoryPickerItem}
          name="category"
          placeholder="Category"
          width="50%"
        />
        <AppFormField
          maxLength={255}
          multiline
          name="description"
          numberOfLines={3}
          placeholder="Description"
        />
        <SubmitButton title="Post" />
      </AppForm>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});
export default ListingEditScreen;
