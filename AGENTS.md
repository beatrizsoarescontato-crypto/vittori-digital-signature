<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->
- Service-line copy lives in `src/content/servicos.ts` and renders through `ServicePage`; public pages wrap in `SiteShell` (nav, footer, reveal). Why: one source of truth for the client's exact texts.
- Contacts and proof flags (`SHOW_PROOF`, etc.) live in `src/lib/contato.ts`; empty email/Instagram hide themselves. Why: placeholders must never show invented data.
- Portfolio content lives in `src/content/portfolio.ts` and opens bundled screenshot/media previews in an accessible dialog, never outbound client-site links. Why: visitors inspect work without leaving Vittori or depending on client-site availability.
- Internal price documents and legal review notes stay outside the public app and client imports. Why: confidential costs and unverified operational claims must not be exposed as public content.
- Eagerly prebundle the portfolio Radix primitives and the 3D/animation libraries (three, R3F, drei, gsap, Embla) in Vite while preserving the template's React deduplication. Why: late dependency discovery can mix optimized React generations in an already open preview and crash hooks.
- Home services use Embla without pinning vertical scroll; Embla handles touch only, mouse/pen drag drives its engine through captured Pointer Events; intelligence pages omit public simulators. Why: legacy mouse-event dragging failed in the owner's browser, and the owner wants a compact product presentation.
- The portal remains in the single `StageCanvas`; `EntryGate` renders accessible controls, measures their safe zone and keeps the site inert until entry completes. The root establishes phase before paint; scene resources warm before controls activate. Interior V is points only. Why: prevent entry flash, overlap, shader hitch and parallel scenes.
- The ambient soundtrack is synthesized with Web Audio in `src/lib/ambientAudio.ts`, started only by a visitor click. Why: browsers block autoplay and no licensed music file exists yet.
- One fixed full-viewport 3D stage (`StageCanvas`, mounted in `SiteShell`) sits behind every public page; sections use translucent backgrounds so the scene shows through, and the monument's scroll path lives in its keyframes. Why: the site must feel like one continuous immersive universe, not a hero animation followed by static blocks.
- Internal reading/demo containers use measured `data-stage-zone` bounds; section fallback uses `data-stage-section`. World-plane projection and damped choreography protect reading after formation, never change the portal or peak. Why: real content bounds, not section padding, determine safe composition.
- All CTAs go through `Btn` (`vbtn` primary/secondary, `vlink`) and icon controls use `vicon`; text sizes use the `t-label/t-title/t-body/t-meta` scale. Why: one consistent premium button and type system instead of per-component styles.
- Contextual returns live in tested `navContexto`; products return to the home intelligence section, with one link inside content. Hash scrolling waits for stable layout and skips history events. Historical intelligence/comece URLs redirect to the home section/official WhatsApp. Why: no duplicate pages or broken public URLs.
- Route-driven reveals subscribe inside ScrollRevealController, not SiteShell; the shell resets on hot refresh. Why: changing nested hook signatures must not retain an incompatible mounted shell.
- Structured plan limits in service content drive ServicePage and concrete regression tests. Why: commercial deliverables must not drift.
- Intelligence contracting constraints and contextual demo links live in `src/content/inteligencia.ts`, rendered through product-only helpers. Why: keep both modalities consistent without changing conventional service pages.
- The compact home sequence shows three portfolio previews; the catalogue remains complete. Why: reduce duplication without losing real media.

- Subdirectories may have their own `AGENTS.md` (e.g. `src/components/three/`); read it before changing files there.
