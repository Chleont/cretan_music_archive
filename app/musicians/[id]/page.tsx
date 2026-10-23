import { Suspense } from "react";
import { notFound } from "next/navigation";
import MusiciansContent from "@/components/musicians/musiciansContent";
import { getMusicians } from "@/lib/translations";

export const dynamicParams = false;

export function generateStaticParams() {
  return getMusicians("el").map((musician) => ({ id: musician.id }));
}

export default async function MusicianPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (!getMusicians("el").some((musician) => musician.id === id)) {
    notFound();
  }

  return (
    <Suspense fallback={null}>
      <MusiciansContent id={id} />
    </Suspense>
  );
}
