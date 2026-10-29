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
- Home services use Embla for horizontal dragging and arrow navigation without pinning vertical scroll; the WhatsApp demo belongs only to the attendant product row. Why: browsing services must not trap page scrolling or associate the demo with unrelated products.
- The portal is part of the single `StageCanvas` scene (3D VITTORI + star, dissolve and camera dive driven by `stageScroll.dive`); `EntryGate` only renders the two buttons and hides `.site-layer` via `html[data-phase]`. The interior V is particles + eclipse only, never a solid mesh. Why: one visual architecture, no HTML curtain or competing scenes.
- The ambient soundtrack is synthesized with Web Audio in `src/lib/ambientAudio.ts`, started only by a visitor click. Why: browsers block autoplay and no licensed music file exists yet.
- One fixed full-viewport 3D stage (`StageCanvas`, mounted in `SiteShell`) sits behind every public page; sections use translucent backgrounds so the scene shows through, and the monument's scroll path lives in its keyframes. Why: the site must feel like one continuous immersive universe, not a hero animation followed by static blocks.
- The 3D "VITTORI" uses a subset typeface JSON (`vittoriFont.json`, letters V I T O R only) generated from Cormorant Garamond SemiBold. Why: keeps the brand serif in 3D without shipping a full font file; regenerate it if the word changes.
