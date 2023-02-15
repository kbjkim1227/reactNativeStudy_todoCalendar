import React from "react";
import { TextInput, TouchableOpacity, View } from "react-native";
import { bottomSpace, ItemWidth } from "./util";
import { AntDesign } from "@expo/vector-icons";

export default ({ value, onChangeText, placeholder, onPressAdd }) => {
  return (
    <View
      style={{
        width: ItemWidth,
        paddingBottom: bottomSpace,
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        style={{
          flex: 1,
          padding: 5,
          //   paddingBottom: 7, // 바텀만 변경할 때 이렇게 덮어씌어도 좋다. 적용하기 위해서는 전체설정 밑에 두어야한다.
        }}
      />
      <TouchableOpacity onPress={onPressAdd} style={{ padding: 5 }}>
        <AntDesign name="plus" size={18} color="#595959" />
      </TouchableOpacity>
    </View>
  );
};
