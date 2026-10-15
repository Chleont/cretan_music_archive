import { Suspense } from "react";
import HomeContent from "@/components/homeContent";

export default function Home() {
  return (
    <Suspense fallback={null}>
      <HomeContent />
    </Suspense>
  );
}