import DateView from "./components/DateView";
import MonthView from "./components/MonthView";
import YearView from "./components/YearView";
import { VIEW } from "./constant";

export function getViewComponent(currentView) {
  switch (currentView) {
    case VIEW.DATE:
      return DateView;
    case VIEW.MONTH:
      return MonthView;
    case VIEW.YEAR:
      return YearView;
  }
}

export function getLowerView(currentView) {
  switch (currentView) {
    case VIEW.DATE:
      return VIEW.DATE;
    case VIEW.MONTH:
      return VIEW.DATE;
    case VIEW.YEAR:
      return VIEW.MONTH;
  }
}

export function getHigherView(currentView) {
  switch (currentView) {
    case VIEW.DATE:
      return VIEW.MONTH;
    case VIEW.MONTH:
      return VIEW.YEAR;
    case VIEW.YEAR:
      return VIEW.YEAR;
  }
}
