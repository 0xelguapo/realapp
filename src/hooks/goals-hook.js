import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectAllGoals, fetchGoals, resetGoals } from "../redux/goals-slice";
import { startOfDay, endOfDay, format, isToday } from "date-fns";
import { RRule } from "rrule";

export default function useGoals(activeDate) {
  const dispatch = useDispatch();

  const allGoals = useSelector(selectAllGoals);

  useEffect(() => {
    dispatch(fetchGoals());
  }, []);

  useEffect(() => {
    const handleResetGoals = async () => {
      const arrayOfGoalIds = allGoals.reduce((acc, el) => {
        if (!isToday(new Date(el.updatedAt))) {
          acc.push(el.id);
        }
        return acc;
      }, []);
      if (arrayOfGoalIds.length > 0) {
        const response = await dispatch(resetGoals(arrayOfGoalIds)).unwrap();
      }
    };
    handleResetGoals();
  }, [allGoals]);

  const goalsOfDay = allGoals.reduce((acc, el) => {
    const ruleObj = RRule.fromString(el.recurRule);
    const arrayOfDaysBetween = ruleObj.between(
      startOfDay(new Date(activeDate)),
      endOfDay(new Date(activeDate)),
      true
    );

    if (arrayOfDaysBetween.length > 0) {
      if (
        format(new Date(arrayOfDaysBetween[0]), "L, d") ===
        format(new Date(activeDate), "L, d")
      ) {
        acc.push(el);
      }
    }
    return acc;
  }, []);

  const getGoalIncrementAmount = (timesPerDay) => {
    let timeInt = parseInt(timesPerDay);
    return timeInt > 5 ? Math.round(timeInt * 0.25).toString() : "1";
  };

  return { allGoals, goalsOfDay, getGoalIncrementAmount };
}
