import { Suspense } from "react";
import TracksContent from "@/components/tracksContent";

export default function TracksPage() {
  return (
    <Suspense fallback={null}>
      <TracksContent />
    </Suspense>
  );
}