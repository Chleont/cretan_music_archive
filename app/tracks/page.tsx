import { Suspense } from "react";
import TracksContent from "@/components/tracks/tracksContent";

export default function TracksPage() {
  return (
    <Suspense fallback={null}>
      <TracksContent />
    </Suspense>
  );
}