(() => {
  const params = new URLSearchParams(location.search);
  const design = ['arch', 'olive', 'arabesque'].includes(params.get('design')) ? params.get('design') : 'arch';
  document.documentElement.dataset.design = design;
  document.addEventListener('DOMContentLoaded', () => {
    if (params.get('lang') === 'ar') setLanguage('ar');
    const localizeNames = () => {
      const ar = document.documentElement.lang === 'ar';
      document.querySelectorAll('[data-config="groomName"]').forEach(el => el.textContent = ar ? 'حسام' : weddingConfig.groomName);
      document.querySelectorAll('[data-config="brideName"]').forEach(el => el.textContent = ar ? 'نجاح' : weddingConfig.brideName);
      document.querySelector('.hero-venue').innerHTML = ar ? 'Family Park <span>٢٠ · ١١ · ٢٠٢٦ &nbsp; / &nbsp; ٥–٧ مساءً</span>' : 'Family Park <span>20 · 11 · 2026 &nbsp; / &nbsp; 5–7 PM</span>';
    };
    localizeNames();
    new MutationObserver(localizeNames).observe(document.documentElement, {attributes: true, attributeFilter: ['lang']});
    // Preserve the selected design when guests share the invitation.
    const publicLink = new URL(weddingConfig.publicUrl);
    publicLink.searchParams.set('design', design);
    if (params.get('lang') === 'ar') publicLink.searchParams.set('lang', 'ar');
    weddingConfig.publicUrl = publicLink.href;
  });
})();
