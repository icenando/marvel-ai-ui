import styles from "./archive.module.scss";
import { EventsResult } from "@/types/types";
import { fetchAllEvents, getEventsCount } from "@/api/db";
import ArchiveImages from "@/components/ArchiveImages";
// import { getTimeToNextImage } from "@/helpers/getTimeToNextImage";

const Archive = async () => {
  const bucketName = process.env.BUCKET_NAME;

  const totalEvents = await getEventsCount();
  if (!totalEvents) {
    throw "failed to get total events count";
  }

  const marvelEvents = (await fetchAllEvents()) as EventsResult[];

  return (
    <div className={styles.archive}>
      <p className={styles.archive__title}>ARCHIVE</p>
      <ArchiveImages
        bucketName={bucketName}
        showTimeToNewImage={marvelEvents.length < totalEvents}
        events={marvelEvents}
      />
    </div>
  );
};

export default Archive;
