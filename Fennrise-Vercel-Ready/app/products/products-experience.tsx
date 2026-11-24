import Link from "next/link";
import { ExperienceFooter } from "../components/ExperienceChrome";
import s from "../company-editorial.module.css";

export default function ProductsExperience() {
  return <main className={s.page} id="page-top">
    <header className={s.mast}><h1>Products from Fennrise</h1><p>Make a photo album today, or explore the tools we’re developing for writing, research and daily planning.</p></header>
    <section className={s.section} id="albums">
      <div className={s.split}>
        <div><h2>Albums</h2><p>Choose a layout, add your photos and edit each slide. Download your finished album as a set of images.</p><Link className={s.link} href="/albums">Open Albums</Link></div>
        <Link href="/albums" aria-label="Explore album designs"><img className={s.art} src="/albums/featured/sunday-film.webp" width="1800" height="750" alt="Three pages from the Sunday Film photo album" /></Link>
      </div>
    </section>
    <section className={s.section} id="star"><div className={s.split}><h2>STAR</h2><div><span className={s.status}>In development</span><p>We’re building an assistant you can use to explore a question, outline a draft or work through a research topic in conversation.</p></div></div></section>
    <section className={s.section} id="fenn"><div className={s.split}><h2>Fenn</h2><div><span className={s.status}>In development</span><p>Fenn brings goals, habits and reminders into a daily plan so you can see what needs attention and make time for it.</p></div></div></section>
    <section className={s.section}><div className={s.split}><h2>Software for your business</h2><div><p>Studio designs websites and Forge builds custom software for businesses.</p><Link className={s.link} href="/services">Explore our services</Link></div></div></section>
    <ExperienceFooter />
  </main>;
}
