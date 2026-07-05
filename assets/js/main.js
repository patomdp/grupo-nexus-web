/* Grupo Nexus — interacciones del sitio */

// ---------- Navegación móvil ----------
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
}

// ---------- Filtros de propiedades ----------
// Cada card lleva data-attributes; los filtros ocultan las que no coinciden.
function setupFilters(formId, gridId, emptyId) {
  const form = document.getElementById(formId);
  const grid = document.getElementById(gridId);
  const empty = document.getElementById(emptyId);
  if (!form || !grid) return;

  const apply = () => {
    const selects = form.querySelectorAll('select');
    const checks = form.querySelectorAll('input[type="checkbox"]:checked');
    let visible = 0;

    grid.querySelectorAll('.prop-card').forEach((card) => {
      let show = true;

      selects.forEach((sel) => {
        const val = sel.value;
        if (!val) return;
        const attr = card.dataset[sel.name];
        if (sel.name === 'personas' || sel.name === 'ambientes') {
          if (Number(attr) < Number(val)) show = false;
        } else if (sel.name === 'precio') {
          if (Number(attr) > Number(val)) show = false;
        } else if (attr !== val) {
          show = false;
        }
      });

      checks.forEach((chk) => {
        if (card.dataset[chk.name] !== '1') show = false;
      });

      card.style.display = show ? '' : 'none';
      if (show) visible++;
    });

    if (empty) empty.style.display = visible === 0 ? 'block' : 'none';
  };

  form.addEventListener('change', apply);
  form.addEventListener('reset', () => setTimeout(apply, 0));
}

setupFilters('filtros-alojamiento', 'grid-alojamiento', 'sin-resultados');
setupFilters('filtros-estudiantes', 'grid-estudiantes', 'sin-resultados-est');

// ---------- Auditoría Gratuita → sistema interno (n8n) ----------
const WEBHOOK_AUDITORIA = 'https://devn8n.malawebs.com/webhook/nexus-auditoria';

const auditForm = document.getElementById('form-auditoria');
if (auditForm) {
  auditForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const status = document.getElementById('auditoria-status');
    const btn = auditForm.querySelector('button[type="submit"]');
    const data = Object.fromEntries(new FormData(auditForm).entries());
    data.origen = 'web-auditoria-gratuita';
    data.fecha = new Date().toISOString();

    btn.disabled = true;
    btn.textContent = 'Enviando…';
    status.className = 'form-status';

    try {
      const res = await fetch(WEBHOOK_AUDITORIA, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('HTTP ' + res.status);
      status.textContent =
        '✅ ¡Recibimos tu solicitud! En breve te enviaremos por correo una estimación de rentabilidad y una invitación para coordinar una visita.';
      status.className = 'form-status ok';
      auditForm.reset();
    } catch (err) {
      status.textContent =
        'No pudimos enviar el formulario. Probá de nuevo en unos minutos o escribinos por WhatsApp.';
      status.className = 'form-status err';
    } finally {
      btn.disabled = false;
      btn.textContent = 'Solicitar mi auditoría gratuita';
    }
  });
}

// ---------- Año dinámico en el footer ----------
document.querySelectorAll('[data-year]').forEach((el) => {
  el.textContent = new Date().getFullYear();
});
