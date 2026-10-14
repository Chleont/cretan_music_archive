"use client";

import { useRouter, useSearchParams } from "next/navigation";

type ArtistOption = {
  id: string;
  name: string;
};

type ArtistsDropdownProps = {
  artists: ArtistOption[];
  selectedId: string;
  ariaLabel: string;
};

export function ArtistsDropdown({
  artists,
  selectedId,
  ariaLabel,
}: ArtistsDropdownProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <select
      value={selectedId}
      aria-label={ariaLabel}
      className="w-full rounded-md border border-deep-grove/20 bg-white px-3 py-3 text-base font-bold text-deep-grove outline-none transition-colors focus:border-olive-leaf"
      onChange={(event) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("musician", event.target.value);
        router.push(`/musicians?${params.toString()}`);
      }}
    >
      {artists.map((artist) => (
        <option key={artist.id} value={artist.id}>
          {artist.name}
        </option>
      ))}
    </select>
  );
}
