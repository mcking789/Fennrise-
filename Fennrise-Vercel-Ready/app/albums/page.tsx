import type { Metadata } from "next";
import { ExperienceFooter } from "../components/ExperienceChrome";
import AlbumDesk from "./AlbumDesk";
import styles from "./albums.module.css";

export const metadata: Metadata = {
  title: "Albums — Fennrise",
  description: "Turn your photos into a downloadable carousel with Fennrise's album layouts.",
  alternates: { canonical: "/albums" },
  openGraph: { title: "Albums — Fennrise", url: "/albums", images: ["/albums/sunday-film.webp"] },
};

export default function AlbumsPage() {
  return <main id="page-top">
    <section className={styles.page}>
      <h1>Albums<span>.</span></h1>
      <p className={styles.intro}>Turn your photos into a carousel. Choose a layout to begin.</p>
      <AlbumDesk />
    </section>
    <ExperienceFooter />
  </main>;
}
