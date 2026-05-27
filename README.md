# IQCDL — International Quantum Computing Driving License

An immersive, AI-supported, conversion-focused web platform for the **International
Quantum Computing Driving License (IQCDL)** — the international certification that
takes individuals and organizations from *quantum-curious* to *quantum-ready*.

The site delivers three core experiences requested for the program:

1. **Readiness assessment** for AI-enabled quantum computing — an interactive,
   Mosca's-Theorem-based scoring engine that returns a readiness score and a
   recommended certification track.
2. **A transformation roadmap** — a phased *Assess → Plan → Implement → AI-enabled
   quantum advantage* journey, aligned to the EU PQC Roadmap (2026–2035).
3. **Training** for the **Foundation** (3-day) and **Practitioner** (5-day) levels,
   mapped to NIST / ISO/IEC / IEEE standards.

## Highlights

- **Immersive & fully animated** — animated quantum particle field (canvas),
  orbiting-qubit hero, scroll reveals and motion throughout (Framer Motion).
- **AI assistant ("Quantum Guide")** — *key-aware*: uses the live **Claude API**
  when `ANTHROPIC_API_KEY` is set, and automatically falls back to a built-in,
  rule-based guide (no key required) so it always works.
- **Multi-language with RTL** — full **English** and **Arabic** (right-to-left),
  plus French, Spanish, Chinese and German scaffolding that gracefully falls back
  to English for any untranslated string.
- **Role-based portal** — login with a role hierarchy: **Admin → Chapter Owner →
  Center → Trainer → Student**, each with its own dashboard.
- **Conversion-focused** — clear CTAs, free assessment funnel, pricing, social
  proof / standards trust strip, and the assistant on every page.

## Tech stack

- **Next.js 15** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS** (custom quantum design system) + **Framer Motion**
- **jose** for stateless JWT sessions; **lucide-react** for icons
- **@anthropic-ai/sdk** for the optional live AI assistant

## Getting started

```bash
pnpm install
cp .env.example .env.local   # optional: add ANTHROPIC_API_KEY for live AI
pnpm dev                     # http://localhost:3000
```

Production:

```bash
pnpm build && pnpm start
```

## Environment variables

| Variable            | Required | Purpose                                                         |
| ------------------- | -------- | --------------------------------------------------------------- |
| `AUTH_SECRET`       | prod     | Secret used to sign session JWTs (`openssl rand -base64 32`).    |
| `ANTHROPIC_API_KEY` | optional | Enables the **live** Claude-powered assistant; omit to use the built-in guide. |
| `ANTHROPIC_MODEL`   | optional | Override the Claude model (default `claude-sonnet-4-6`).          |
| `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN` | optional | Enable **shared, cross-device portal persistence** via Upstash Redis. When unset, the portal uses per-instance memory + per-browser localStorage. |

## Portal persistence

The portal (centers, students, trainers, exams, certificates, announcements)
is served through an auth-gated API (`/api/portal`) backed by a storage layer
in `src/lib/portal-server.ts`:

- **With Upstash Redis** (`UPSTASH_REDIS_REST_*` set) — state is shared across
  all users and devices. Create a free DB at console.upstash.com, copy the REST
  URL/token into the env, and it activates automatically.
- **Without it** — falls back to per-server-instance memory plus each browser's
  localStorage, which is perfect for the preview/demo.

Certificate verification (`/verify` and `GET /api/portal/verify?token=`) is
public and reads from the same store, so a tokenized certificate can be
verified from any device once Redis is configured.

## Demo portal accounts

The portal ships with demo accounts (one per role). On the login page you can also
click any role to sign in instantly. Password for all: `quantum`.

| Role          | Email               |
| ------------- | ------------------- |
| Administrator | `admin@iqcdl.org`   |
| Chapter Owner | `chapter@iqcdl.org` |
| Center        | `center@iqcdl.org`  |
| Trainer       | `trainer@iqcdl.org` |
| Student       | `student@iqcdl.org` |

> These are demonstration credentials for previewing each workspace. Replace
> `src/lib/auth.ts` with a real identity provider / database before production.

## Project structure

```
src/
  app/
    (marketing)/        # public site: home, programs, assessment, roadmap, standards
    login/              # portal login (role-based)
    dashboard/          # role-aware dashboards (protected by middleware)
    api/                # auth (login/logout/me) + assistant (key-aware)
  components/
    home/  sections/  visuals/  assessment/  assistant/  dashboard/  layout/  ui/
  i18n/                 # locale config + dictionaries (en, ar, fr, es, zh, de)
  lib/                  # auth (JWT + demo users), assistant knowledge base, cn()
  middleware.ts         # protects /dashboard/*
docs/source-materials/  # original IQCDL program PDFs
```

## Standards alignment

Curriculum and content map to NIST **FIPS 203 / 204 / 205** (ML-KEM, ML-DSA,
SLH-DSA), **ISO/IEC 4879** & TR 29144, **IEEE P7131 / P7132**, and the **EU PQC
Roadmap** with NIS2.

---

For educational purposes. IQCDL provides knowledge of quantum computing and
post-quantum cryptography but does not guarantee employment or specific outcomes.
