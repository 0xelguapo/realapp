import { startOfDay, format, endOfDay, isSameDay } from "date-fns";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RRule } from "rrule";
import { handleClientAfterDeleteReminder } from "../redux/clients-slice";
import {
  deleteOneReminder,
  fetchReminders,
  selectAllReminders,
} from "../redux/reminders-slice";
import useNotifications from "./notification-hook";

export default function useReminders(activeDate = new Date(), fetch = true) {
  let activeDateObj = new Date(activeDate);
  const dispatch = useDispatch();
  const { handleDeleteNotification } = useNotifications();

  useEffect(() => {
    if (fetch) {
      dispatch(fetchReminders());
    }
  }, []);

  const allReminders = useSelector(selectAllReminders);

  const handleDeleteReminder = async (reminder) => {
    const notificationIds = reminder?.notificationId.split(",");
    const promises = notificationIds.map((notifId) =>
      handleDeleteNotification(notifId)
    );
    await Promise.all(promises);
    dispatch(deleteOneReminder(reminder.id));
    dispatch(
      handleClientAfterDeleteReminder({
        clientId: reminder.clientId,
        reminderId: reminder.id,
      })
    );
  };

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

  return { allReminders, remindersOfDate, handleDeleteReminder };
}
