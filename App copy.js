import dayjs from "dayjs";
import { useEffect, useState } from "react";
import {
  Button,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { runPracticeDayjs } from "./src/practice-dayjs";
import { getCalendarColumns, getDayColor, getDayText } from "./src/util";
import {
  getStatusBarHeight,
  getBottomSpace,
} from "react-native-iphone-x-helper";
import { SimpleLineIcons } from "@expo/vector-icons";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const statusBarHeight = getStatusBarHeight(true);
const bottomSpace = getBottomSpace();

const columnSize = 35;
const borderSize = columnSize / 2;

const Column = ({
  text,
  color,
  opacity,
  disabled, //일부 영역 비활성화
  onPress,
  isSelected, // 선택한 날짜 체크
  // today, // 오늘날짜 체크
}) => {
  return (
    // <View
    //   style={{
    //     backgroundColor: today ? "#FF7878" : "transparent",
    //     borderRadius: borderSize,
    //   }}
    // >
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={{
        width: columnSize,
        height: columnSize,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: isSelected ? "#c2c2c2" : "transparent",
        borderRadius: borderSize,
      }}
    >
      <Text style={{ color, opacity }}>{text}</Text>
    </TouchableOpacity>
    // </View>
  );
};

const ArrowButton = ({ iconName, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ paddingHorizontal: 20, paddingVertical: 15 }}
    >
      <SimpleLineIcons name={iconName} size={15} color="#404040" />
    </TouchableOpacity>
  );
};

export default function App() {
  const now = dayjs();
  const columns = getCalendarColumns(selectedDate);
  const [selectedDate, setSelectedDate] = useState(now);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    // console.warn("A date has been picked: ", date);
    setSelectedDate(dayjs(date));
    hideDatePicker();
  };

  const onPressLeftArrow = () => {
    const newSelectedDate = dayjs(selectedDate).subtract(1, "month");
    setSelectedDate(newSelectedDate);
  };
  const onPressRightArrow = () => {
    const newSelectedDate = dayjs(selectedDate).add(1, "month");
    setSelectedDate(newSelectedDate);
  };

  const ListHeaderComponent = () => {
    const currentDateText = dayjs(selectedDate).format("YYYY.MM.DD");
    return (
      <View>
        {/* <YYYY.MM.DD. > */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ArrowButton iconName="arrow-left" onPress={onPressLeftArrow} />
          <TouchableOpacity onPress={showDatePicker}>
            <Text style={{ fontSize: 20, color: "#404040" }}>
              {currentDateText}
            </Text>
          </TouchableOpacity>
          <ArrowButton iconName="arrow-right" onPress={onPressRightArrow} />
        </View>

        {/* 일 ~ 토 */}
        <View style={{ flexDirection: "row" }}>
          {[0, 1, 2, 3, 4, 5, 6].map((day) => {
            const dayText = getDayText(day);
            const color = getDayColor(day);

            return (
              <Column
                key={`day-${day}`}
                text={dayText}
                color={color}
                opacity={1}
                disabled={true}
              />
            );
          })}
        </View>
      </View>
    );
  };

  const renderItem = ({ item: date }) => {
    const dateText = dayjs(date).get("date");
    const day = dayjs(date).get("day");
    const color = getDayColor(day);
    const isCurrentMonth = dayjs(date).isSame(selectedDate, "month");
    const onPress = () => {
      setSelectedDate(date); // 설정이 click 마다 바뀌게 한다.
    };
    const isSelected = dayjs(date).isSame(selectedDate, "date");
    const today = dayjs(date).isSame(dayjs(), "date");
    return (
      <Column
        text={dateText}
        color={color}
        opacity={isCurrentMonth ? 1 : 0.5}
        onPress={onPress}
        isSelected={isSelected}
        // today={today}
      />
    );
  };

  useEffect(() => {
    runPracticeDayjs();

    // console.log("columns", columns);
  }, []);
  useEffect(() => {
    console.log("changed", dayjs(selectedDate).format("YYYY.MM.DD"));
  }, [selectedDate]); // selectedDate가 바뀔 때마다 인지를 해달라는 useEfrect

  return (
    <View style={styles.container}>
      <FlatList
        data={columns}
        numColumns={7}
        renderItem={renderItem}
        ListHeaderComponent={ListHeaderComponent}
      />

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: bottomSpace, //*바텀 안전영역?
    // justifyContent: "flex-end", //*맨 밑에
    paddingTop: statusBarHeight,
    paddingBottom: bottomSpace, //*바텀 안전영역?
  },
});
