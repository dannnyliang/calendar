import { VIEW } from "./constant";

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
