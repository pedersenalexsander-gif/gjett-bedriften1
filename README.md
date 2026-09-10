# Ofoten Rør

Full-stack Norwegian website, built in the requested gjett-bedriften1 repository.

## Pages
Home, services, about, history, staff, projects, gallery, contact, privacy, 3D showroom and protected inquiry inbox.

## Runtime
Vinext / React on Cloudflare Workers. D1 stores inquiries and per-IP rate limits. Three.js powers the interactive bathroom. GitHub Pages cannot execute the backend; the root index redirects to the Sites deployment.

## Configuration
Production environment is managed through Sites. Set ADMIN_EMAIL to the authorized inbox administrator. Set OPENAI_API_KEY as a server-side secret to enable real AI; OPENAI_MODEL defaults to gpt-4.1-mini. Without a key the chat explicitly identifies itself as predefined FAQ answers, not AI. No keys are shipped to browsers or GitHub. The contact form stores requests in the protected /innboks page, without automatic email delivery.

## Development
Use the package scripts and the checked-in pnpm lockfile. Generate schema changes with pnpm db:generate.

## Content
Original site: https://www.ofotenror.no/ (home, om-oss, galleri, kontakt), retrieved 2026-09-10. Employee names/photos are mapped from the original staff section. History uses the original company account (1983, store renovation 2018). Images are optimized copies from the original site, reused at the user's request. Gallery photos are described as inspiration, not invented named client references. Showroom geometry is illustrative, not a product catalog or measured replica.
