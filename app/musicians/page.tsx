import { Suspense } from "react";
import MusicianSelection from "@/components/musicians/musician-selection";

export default function MusiciansPage() {
  return (
    <Suspense fallback={null}>
      <MusicianSelection />
    </Suspense>
  );
}
