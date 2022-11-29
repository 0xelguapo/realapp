import { startOfDay, format, endOfDay, isSameDay } from "date-fns";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RRule } from "rrule";
import { fetchReminders, selectAllReminders } from "../redux/reminders-slice";

export default function useReminders(activeDate) {
  let activeDateObj = new Date(activeDate);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchReminders());
  }, []);

  const allReminders = useSelector(selectAllReminders);

  const remindersOfDate = allReminders.reduce((acc, el) => {
    const ruleObj = RRule.fromString(el.recurRule);
    const arrayOfDaysBetween = ruleObj.between(
      startOfDay(activeDateObj),
      endOfDay(activeDateObj),
      true
    );
    if (arrayOfDaysBetween.length > 0) {
      if (
        format(new Date(arrayOfDaysBetween[0]), "L, d") ===
          format(activeDateObj, "L, d") &&
        !isSameDay(activeDateObj, new Date(el.updatedAt))
      ) {
        acc.push(el);
      }
    }
    return acc;
  }, []);

  return { allReminders, remindersOfDate };
}
