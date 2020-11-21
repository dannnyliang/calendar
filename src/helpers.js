import {
  addDays,
  addYears,
  eachDayOfInterval,
  eachMonthOfInterval,
  eachYearOfInterval,
  endOfDecade,
  endOfWeek,
  endOfYear,
  startOfDecade,
  startOfMonth,
  startOfWeek,
  startOfYear,
  subYears,
} from "date-fns/fp";
import { evolve, pipe } from "ramda";

import { YEARVIEW_COLUMN } from "./constant";

export const weekList = pipe(
  (date) => ({
    start: startOfWeek(date),
    end: endOfWeek(date),
  }),
  eachDayOfInterval
)(new Date());

export function getDateList(date) {
  const weekdayCount = 7;
  const rowCount = 6;

  return pipe(
    startOfMonth,
    startOfWeek,
    (date) => ({
      start: date,
      end: addDays(weekdayCount * rowCount - 1, date),
    }),
    eachDayOfInterval
  )(date);
}

export function getMonthList(date) {
  return pipe(
    (date) => ({
      start: startOfYear(date),
      end: endOfYear(date),
    }),
    eachMonthOfInterval
  )(date);
}

export function getYearList(date) {
  const decadeWithStartCount = 10 + 1;
  const displayCount =
    (Math.floor(decadeWithStartCount / YEARVIEW_COLUMN) + 1) * YEARVIEW_COLUMN;

  return pipe(
    (date) => ({
      start: startOfDecade(date),
      end: endOfDecade(date),
    }),
    evolve({
      start: subYears(1),
      end: addYears(displayCount - decadeWithStartCount),
    }),
    eachYearOfInterval
  )(date);
}
