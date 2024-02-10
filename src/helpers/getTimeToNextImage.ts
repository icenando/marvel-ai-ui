"use server";

import moment from "moment";

export const getTimeToNextImage = () => {
  let nextUpdate = moment().hour(10).minute(1).second(0);
  if (moment().isAfter(nextUpdate)) {
    nextUpdate.add(1, "days");
  }

  const timetoNewImage = moment.duration(nextUpdate.diff(moment()));

  const hour = timetoNewImage.hours();
  const minute = timetoNewImage.minutes();

  if (!hour && !minute) return `Generating new image...`;

  const hoursText = hour <= 1 ? `${hour} hour` : `${hour} hours`;
  const minutesText = minute <= 1 ? `${minute} minute` : `${minute} minutes`;
  const formattedTime = `${hoursText} ${minutesText}`;

  return `New image in\n${formattedTime}`;
};
