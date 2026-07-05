# Grupo Nexus — Sitio Web

Sitio oficial de **Grupo Nexus**, empresa de gestión integral de propiedades de Mar del Plata.

## Estructura

| Página | Sección |
|---|---|
| `index.html` | Inicio (hero, servicios, cómo trabajamos, beneficios, reseñas, contacto) |
| `alojamientos.html` | Quiero alojarme — catálogo temporario con filtros |
| `propietarios.html` | Rentabilizar mi propiedad — servicios, proceso, FAQ y **Auditoría Gratuita** |
| `estudiantes.html` | Alquileres estudiantiles (marzo–diciembre) con filtros |
| `nosotros.html` | Historia, valores, forma de trabajo y contacto |

## Stack

- HTML + CSS + JavaScript vanilla, sin build step.
- Filtros de propiedades en cliente (data-attributes + JS).
- Formulario de Auditoría Gratuita → webhook n8n (`/webhook/nexus-auditoria`) que registra los leads en el sistema interno.
- Analytics y Meta Pixel: placeholders comentados en `index.html`, listos para pegar los IDs reales.

## Datos pendientes de reemplazar

- WhatsApp: `5492230000000` (placeholder, buscar y reemplazar en todos los `.html`)
- Instagram/Facebook: `gruponexus.mdp`
- Email: `info@gruponexus.com.ar`
- Fotos: actualmente de Unsplash; reemplazar por fotografía profesional propia.

## Deploy

Producción en Vercel con auto-deploy: cada push a `main` publica automáticamente. Ver `GUIA-DEPLOY.md`.

---
Sitio desarrollado por [Malawebs](https://malawebs.com).
