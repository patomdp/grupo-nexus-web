# Guía de Deploy — Grupo Nexus Web

Deploy realizado el 2026-07-05 con el flujo `deploy-web` (sitio estático → GitHub → Vercel → subdominio Cloudflare).

## URLs

| Recurso | URL |
|---|---|
| Repositorio | https://github.com/patomdp/grupo-nexus-web |
| Producción (estable) | https://grupo-nexus-web.vercel.app |
| Alias del equipo | https://grupo-nexus-web-patricio-marianos-projects.vercel.app |
| Dominio propio | https://gruponexus.malawebs.com *(pendiente de registro DNS, ver abajo)* |
| Workflow de leads (n8n) | https://devn8n.malawebs.com/workflow/BZgweEaDaqqpM3Dd |
| Webhook de leads | https://devn8n.malawebs.com/webhook/nexus-auditoria |

## Pasos ejecutados

1. Sitio estático de 5 páginas en HTML/CSS/JS vanilla (sin build step).
2. `git init -b main` + commit inicial.
3. Repo público creado vía API de GitHub (`patomdp/grupo-nexus-web`) + push.
4. `npx vercel deploy --prod --yes` → producción HTTP 200.
5. Auto-deploy GitHub → Vercel: conectado automáticamente al vincular el proyecto (verificado con push posterior).
6. Dominio `gruponexus.malawebs.com` agregado al proyecto Vercel (pendiente DNS).
7. Workflow n8n `BZgweEaDaqqpM3Dd` activo: recibe el formulario de Auditoría Gratuita y guarda cada lead en la data table `nexus_leads` (probado con lead de test).

## Pendiente: DNS en Cloudflare

Crear en la zona `malawebs.com` (proxy **Disabled / nube gris** — con proxy naranja la verificación de Vercel falla):

```
Tipo:  CNAME
Nombre: gruponexus
Valor:  cname.vercel-dns.com
Proxy:  DNS only (gris)
```

(Alternativa recomendada por Vercel: registro `A gruponexus → 76.76.21.21`, también con nube gris.)

Tras crear el registro, Vercel verifica solo y emite SSL en 1–10 min. HTTP 000 / error SSL durante esos minutos es normal.

Con token de Cloudflare se puede automatizar:
```bash
CLOUDFLARE_API_TOKEN=<token> bash ../.claude/skills/deploy-web/scripts/setup-domain.sh gruponexus.malawebs.com grupo-nexus-web
```

## Auto-deploy

- Push a `main` → deploy a producción automático.
- Push a otra rama / PR → preview con URL propia.

Si se desconectara: `npx vercel git connect --yes` desde la carpeta del proyecto.

## Leads de la Auditoría Gratuita

El formulario de `propietarios.html` hace POST JSON a `https://devn8n.malawebs.com/webhook/nexus-auditoria`. El workflow normaliza el payload y lo inserta en la data table `nexus_leads` (proyecto personal de n8n). Backup local del workflow: `../workflows/BZgweEaDaqqpM3Dd_leads-auditoria-gruponexus.json`.

## Datos placeholder a reemplazar antes del lanzamiento real

- WhatsApp `5492230000000`, Instagram/Facebook `gruponexus.mdp`, mail `info@gruponexus.com.ar`.
- IDs de Google Analytics y Meta Pixel (comentados en `index.html`).
- Fotos de Unsplash → fotografía profesional propia.
