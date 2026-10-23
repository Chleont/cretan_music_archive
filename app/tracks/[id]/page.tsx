import { Suspense } from "react";
import { notFound } from "next/navigation";
import TrackContent from "@/components/tracks/track-content";
import { getMusicians } from "@/lib/translations";

export const dynamicParams = false;

export function generateStaticParams() {
  return getMusicians("el").flatMap((musician) =>
    musician.tracks.map((track) => ({ id: track.id }))
  );
}

export default async function TrackPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (!getMusicians("el").some((musician) => musician.tracks.some((track) => track.id === id))) {
    notFound();
  }

  return (
    <Suspense fallback={null}>
      <TrackContent id={id} />
    </Suspense>
  );
}
