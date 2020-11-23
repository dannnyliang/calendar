import { head, last } from "ramda";

import { getDateList, getMonthList, getYearList } from "../helpers";

describe("helpers", () => {
  describe("getDateList", () => {
    it("should return a date list base on a give date", () => {
      const dateList1 = getDateList(new Date("2020-11-15"));
      expect(head(dateList1).toLocaleDateString()).toEqual(
        new Date("2020-11-01").toLocaleDateString()
      );
      expect(last(dateList1).toLocaleDateString()).toEqual(
        new Date("2020-12-12").toLocaleDateString()
      );

      const dateList2 = getDateList(new Date("2019-02-15"));
      expect(head(dateList2).toLocaleDateString()).toEqual(
        new Date("2019-01-27").toLocaleDateString()
      );
      expect(last(dateList2).toLocaleDateString()).toEqual(
        new Date("2019-03-09").toLocaleDateString()
      );
    });
  });

  describe("getMonthList", () => {
    it("should return a month list", () => {
      const monthList = getMonthList(new Date("2020-11-15"));

      expect(head(monthList).toLocaleDateString()).toEqual(
        new Date("2020-01-01").toLocaleDateString()
      );
      expect(last(monthList).toLocaleDateString()).toEqual(
        new Date("2020-12-01").toLocaleDateString()
      );
    });
  });

  describe("getYearList", () => {
    it("should return a year list", () => {
      const yearList1 = getYearList(new Date("2020-11-15"));
      expect(head(yearList1).toLocaleDateString()).toEqual(
        new Date("2019-01-01").toLocaleDateString()
      );
      expect(last(yearList1).toLocaleDateString()).toEqual(
        new Date("2030-01-01").toLocaleDateString()
      );

      const yearList2 = getYearList(new Date("2005-02-15"));
      expect(head(yearList2).toLocaleDateString()).toEqual(
        new Date("1999-01-01").toLocaleDateString()
      );
      expect(last(yearList2).toLocaleDateString()).toEqual(
        new Date("2010-01-01").toLocaleDateString()
      );
    });
  });
});
