export function trackEvent(event, properties = {}, channel = 'pherface:service') {
  const detail = { event, ...properties };
  window.dispatchEvent(new CustomEvent(channel, { detail }));
  if (Array.isArray(window.dataLayer)) window.dataLayer.push({ ...detail });
}
