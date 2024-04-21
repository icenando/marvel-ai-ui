"use client";

import Image from "next/image";
import { EventsResult } from "@/types/types";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import styles from "./ArchiveImages.module.scss";

enum SortBy {
  EVENT_ID,
  START_OLDEST,
  START_NEWEST,
  END_OLDEST,
  END_NEWEST,
}

interface ArchiveImagesProps {
  bucketName: string | undefined;
  showTimeToNewImage: boolean;
  events: EventsResult[];
}

const ArchiveImages: FC<ArchiveImagesProps> = ({
  bucketName,
  showTimeToNewImage,
  events,
}) => {
  const [sortBy, setSortBy] = useState<SortBy>(SortBy.EVENT_ID);
  const [sortedEvents, setSortedEvents] = useState<EventsResult[]>([]);

  useEffect(() => {
    let newEvents = [...events]; // Cloning the events array
    switch (sortBy) {
      case SortBy.START_OLDEST:
        newEvents = newEvents.sort(
          (a, b) => Date.parse(a.start) - Date.parse(b.start)
        );
        break;
      case SortBy.START_NEWEST:
        newEvents = newEvents.sort(
          (a, b) => Date.parse(b.start) - Date.parse(a.start)
        );
        break;
      case SortBy.END_OLDEST:
        newEvents = newEvents.sort(
          (a, b) => Date.parse(a.end) - Date.parse(b.end)
        );
        break;
      case SortBy.END_NEWEST:
        newEvents = newEvents.sort(
          (a, b) => Date.parse(b.end) - Date.parse(a.end)
        );
        break;
      default:
        newEvents = newEvents.reverse();
    }
    setSortedEvents(newEvents);
  }, [events, sortBy]);

  const thumbs_section = sortedEvents.map(event => {
    const { id, imgUrl, description, title } = event;

    return (
      <Link href={`archive/${id}`} key={id}>
        <div className={styles.title}>{title}</div>
        <Image
          src={`${bucketName}/${imgUrl}`}
          alt={description}
          priority
          className={styles.image}
          height={350}
          width={350}
        />
      </Link>
    );
  });

  return (
    <>
      <div className={styles.options}>
        <select
          className={styles.sortBy}
          onChange={e => setSortBy(Number(e.target.value) as SortBy)}
        >
          <option value={SortBy.EVENT_ID}>Event ID</option>
          <option value={SortBy.START_OLDEST}>Start date — oldest first</option>
          <option value={SortBy.START_NEWEST}>Start date — most recent</option>
          <option value={SortBy.END_OLDEST}>End date — oldest first</option>
          <option value={SortBy.END_NEWEST}>End date — most recent</option>
        </select>
      </div>
      <div className={styles.thumbs_section}>
        {showTimeToNewImage && (
          <div className={styles.thumbs_section_coming_next}>
            New image everyday at 10am UTC
          </div>
        )}
        {thumbs_section}
      </div>
    </>
  );
};

export default ArchiveImages;
