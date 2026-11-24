import Link from "next/link";
import s from "../company-editorial.module.css";

export default function HomeExperienceSections() {
  return <div className={s.homeIndex}>
    <section className={s.section} id="products">
      <div className={s.split}>
        <div><h2>Our products</h2><Link href="/products" className={s.link}>Explore STAR and Fenn</Link></div>
        <div>
          <Link href="/albums" className={s.entry}><h3 className={s.name}>Albums</h3><p>Arrange photos from your camera roll into a carousel you can download and share.</p></Link>
          <Link href="/products#star" className={s.entry}><h3 className={s.name}>STAR</h3><p>An assistant for writing, research and working through questions.</p></Link>
          <Link href="/products#fenn" className={s.entry}><h3 className={s.name}>Fenn</h3><p>A place to plan your day and keep track of longer projects.</p></Link>
        </div>
      </div>
    </section>
    <section className={s.section} id="services">
      <div className={s.split}>
        <div><h2>Work with Fennrise</h2><Link className={s.link} href="/services">Explore our services</Link></div>
        <div>
          <Link className={s.entry} href="/services#studio"><h3 className={s.name}>Studio</h3><p>Website design and development, from the first layout through launch.</p></Link>
          <Link className={s.entry} href="/services#forge"><h3 className={s.name}>Forge</h3><p>Custom software for the day-to-day work behind a business.</p></Link>
        </div>
      </div>
    </section>
    <section className={s.section} id="roadmap">
      <div className={s.split}>
        <h2>What we’re working on</h2>
        <dl className={s.fact}>
          <div><dt>Available now</dt><dd>Albums, Fennrise Studio and Fennrise Forge</dd></div>
          <div><dt>In development</dt><dd>STAR, our assistant for conversation and creation</dd></div>
          <div><dt>Coming next</dt><dd>The main Fenn planning app</dd></div>
          <div><dt>Longer term</dt><dd>A connected family of Fennrise products</dd></div>
        </dl>
      </div>
    </section>
  </div>;
}
