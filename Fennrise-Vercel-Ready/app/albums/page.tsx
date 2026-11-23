import type { Metadata } from "next";
import { ExperienceFooter } from "../components/ExperienceChrome";
import AlbumDesk from "./AlbumDesk";

export const metadata: Metadata = {
  title: "Albums — Fennrise",
  description:
    "Turn your photos into a downloadable carousel with Fennrise's album layouts.",
  alternates: { canonical: "/albums" },
  openGraph: {
    title: "Albums — Fennrise",
    url: "/albums",
    images: ["/albums/sunday-film.webp"],
  },
};

export default function AlbumsPage() {
  return (
    <main id="page-top">
      <AlbumDesk />
      <ExperienceFooter />
    </main>
  );
}
