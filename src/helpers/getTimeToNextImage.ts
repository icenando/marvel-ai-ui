import { formatDistanceStrict, intervalToDuration } from "date-fns";
import { useEffect, useState } from "react";

export const useGetTimeToNextImage = () => {
  let nextUpdate = new Date();
  nextUpdate.setHours(10, 1, 0);

  if (new Date() > nextUpdate) {
    nextUpdate = new Date(nextUpdate.getTime() + 24 * 60 * 60 * 1000);
  }

  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    setInterval(() => setNow(Date.now()), 1000);
  });

  const timetoNewImage = intervalToDuration({ start: now, end: nextUpdate });
  const hours = timetoNewImage.hours?.toString().padStart(2, "0");
  const minutes = timetoNewImage.minutes?.toString().padStart(2, "0");
  const seconds = timetoNewImage.seconds?.toString().padStart(2, "0");

  return `${hours}:${minutes}:${seconds}`;
};
