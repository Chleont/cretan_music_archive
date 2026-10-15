import { Suspense } from "react";
import MusiciansContent from "@/components/musiciansContent";

export default function MusiciansPage() {
  return (
    <Suspense fallback={null}>
      <MusiciansContent />
    </Suspense>
  );
}