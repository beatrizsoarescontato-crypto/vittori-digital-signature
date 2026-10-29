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
