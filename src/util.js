import dayjs from "dayjs";
import {
  getBottomSpace,
  getStatusBarHeight,
} from "react-native-iphone-x-helper";

export const ItemWidth = 220;
export const statusBarHeight = getStatusBarHeight(true);
export const bottomSpace = getBottomSpace();

//  ios 시뮬레이터 키보드 on/off cmd + shift + k

export const fillEmptyColumns = (columns, start, end) => {
  const filledColumns = columns.slice(0);

  // 1. 첫날 이전 공백 채우기
  const startDay = dayjs(start).get("day");
  for (let i = 1; i <= startDay; i += 1) {
    const date = dayjs(start).subtract(i, "day");
    filledColumns.unshift(date); //* [1,2].unshift(0) = [0,1,2] 0을 앞으로 보낸다.
  }
  // 2. 마지막날 이후 공백 채우기
  const endDay = dayjs(end).get("day");
  /**
    0 -> 6
    1 -> 5
    2 -> 4
    endDay + ? = 6
   */
  for (let i = 1; i <= 6 - endDay; i += 1) {
    const date = dayjs(end).add(i, "day");
    filledColumns.push(date);
  }

  return filledColumns;
};
export const getCalendarColumns = (now) => {
  const start = dayjs(now).startOf("month");
  const end = dayjs(now).endOf("month");
  const endDate = dayjs(end).get("date");

  const columns = [];
  for (let i = 0; i < endDate; i += 1) {
    const date = dayjs(start).add(i, "day");
    columns.push(date);
  }

  const filledColumns = fillEmptyColumns(columns, start, end);
  return filledColumns;
};

/**
 * @param day 0 ~ 6
 * @return 일 ~ 월
 * */
const dayTexts = ["일", "월", "화", "수", "목", "금", "토"];
export const getDayText = (day) => {
  /* ex 1 */
  return dayTexts[day];

  /* ex 2 */
  // switch (day) {
  //   case 0:
  //     return "일";
  //   case 1:
  //     return "월";
  //   case 2:
  //     return "화";
  //   case 3:
  //     return "수";
  //   case 4:
  //     return "목";
  //   case 5:
  //     return "금";
  //   case 6:
  //     return "토";
  //   default:
  //     return "";
  // }
};

export const getDayColor = (day) => {
  /* ex 1 */
  return day === 0 ? "#e67639" : day === 6 ? "#5872d1" : "#2b2b2b";

  /* ex 2 */
  // switch (day) {
  //   case 0:
  //     return "#e67639";
  //   case 6:
  //     return "#5872d1";
  //   case 1:
  //   case 2:
  //   case 3:
  //   case 4:
  //   case 5:
  //   default:
  //     return "#2b2b2b";
  // }
};
