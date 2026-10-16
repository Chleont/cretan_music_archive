import { Suspense } from "react";
import MusiciansContent from "@/components/musiciansContent";

export default function MusiciansPage() {
  return (
    // TODO: Create intermediate page that obligates user to select musician as overlay on the first visit to the page.
    // after user can select from dropdown. Overlay should have images of musicians and their names only.
    <Suspense fallback={null}>
      <MusiciansContent />
    </Suspense>
  );
}