import { db } from "@/lib/firebaseConfig";
import {
  Timestamp,
  collection,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";

export interface tabeleOfContents {
  id: string;
  title: string;
}

export interface VolumeProps {
  name: string;
  id: string;
  publishedOn: Timestamp;
  tabeleOfContents: tabeleOfContents[];
}

const useVolumes = (novelId: string): VolumeProps[] => {
  const [volumes, setVolumes] = useState<VolumeProps[]>([]);
  const ref = query(
    collection(db, "Novels", novelId, "Volumes"),
    orderBy("timestamp", "asc")
  );

  useEffect(() => {
    async function getVolume() {
      const docs = await getDocs(ref);
      const volumeData: VolumeProps[] = [];
      docs.forEach((doc) => {
        const data = doc.data();
        volumeData.push({
          name: data.name,
          id: doc.id,
          publishedOn: data.timestamp,
          tabeleOfContents: data.tableContents,
        });
      });
      setVolumes(volumeData);
    }
    getVolume();
  }, [novelId, ref]);

  return volumes;
};

export default useVolumes;
