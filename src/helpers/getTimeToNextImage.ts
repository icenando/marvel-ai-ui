import { intervalToDuration } from "date-fns";
import { useEffect, useState } from "react";

export const useGetTimeToNextImage = () => {
  let nextUpdate = new Date();
  nextUpdate.setHours(10, 1, 0);
  if (nextUpdate.getTime() < Date.now()) {
    nextUpdate = new Date(nextUpdate.getTime() + 24 * 60 * 60 * 1000);
  }

  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const intervalId = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(intervalId);
  });

  const timetoNewImage = intervalToDuration({ start: now, end: nextUpdate });
  const hours = (timetoNewImage.hours ?? 0).toString().padStart(2, "0");
  const minutes = (timetoNewImage.minutes ?? 0).toString().padStart(2, "0");
  const seconds = (timetoNewImage.seconds ?? 0).toString().padStart(2, "0");

  return `${hours}:${minutes}:${seconds}`;
};
