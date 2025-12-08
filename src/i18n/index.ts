export const LOCALES = ['es','en'] as const;
export type Locale = 'es' | 'en';
export const DEFAULT_LANG: Locale = 'es';

export function getLangFromUrl(url: URL): Locale {
  const m = url.pathname.match(/^\/(es|en)(\/|$)/i);
  if (m) return (m[1].toLowerCase()) as Locale;
  return DEFAULT_LANG;
}

// Nuevo sistema: bundles por idioma usando glob imports
const dictImports = {
  es: import.meta.glob('./es/*.json', { eager: true }) as Record<string, { default: any }>,
  en: import.meta.glob('./en/*.json', { eager: true }) as Record<string, { default: any }>,
};

function extractName(path: string) {
  return path.split('/').pop()!.replace('.json', '');
}

function buildManifest(locale: Locale) {
  const files = dictImports[locale];
  const manifest: Record<string, any> = {};
  for (const [path, mod] of Object.entries(files)) {
    manifest[extractName(path)] = (mod as any).default;
  }
  return manifest;
}

const cache = new Map<string, any>();

function deepMerge<T extends object>(...objects: T[]): T {
  const result: any = {};
  for (const obj of objects) {
    if (!obj) continue;
    for (const [k, v] of Object.entries(obj)) {
      if (v && typeof v === 'object' && !Array.isArray(v)) {
        result[k] = deepMerge(result[k] || {}, v as any);
      } else {
        result[k] = v;
      }
    }
  }
  return result;
}

function getByPath(obj: any, path: string) {
  return path.split('.').reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj);
}

function interpolate(template: string, vars?: Record<string, string | number>) {
  if (!vars) return template;
  return template.replace(/\{(\w+)\}/g, (_, k) => (vars[k] !== undefined ? String(vars[k]) : `{${k}}`));
}

// API extendida: loadT(lang, bundles?) con compatibilidad hacia atrás
export async function loadT(lang: Locale, bundles?: string[]) {
  if (!bundles) {
    // Combinar todos los bundles disponibles del idioma activo (compatibilidad con uso antiguo)
    const manifest = buildManifest(lang);
    const merged = deepMerge(...Object.values(manifest));
    const t = (path: string, vars?: Record<string, string | number>) => {
      let val = getByPath(merged, path);
      if (val === undefined) return path;
      if (typeof val === 'string') return interpolate(val, vars);
      return val;
    };
    return t as (path: string, vars?: Record<string, string | number>) => string | any;
  }

  const active = buildManifest(lang);
  const fallback = buildManifest(DEFAULT_LANG);

  const activeMerged = deepMerge(...bundles.map((b) => active[b] || {}));
  const activeCommon = active['common'] || {};
  const fallbackMerged = deepMerge(...bundles.map((b) => fallback[b] || {}));
  const fallbackCommon = fallback['common'] || {};

  const key = `${lang}::${bundles.join(',')}`;
  if (cache.has(key)) return cache.get(key);

  const t = (path: string, vars?: Record<string, string | number>) => {
    let val = getByPath(activeMerged, path);
    if (val === undefined) val = getByPath(activeCommon, path);
    if (val === undefined) val = getByPath(fallbackMerged, path);
    if (val === undefined) val = getByPath(fallbackCommon, path);
    if (val === undefined) return path;
    if (typeof val === 'string') return interpolate(val, vars);
    return val;
  };

  cache.set(key, t);
  return t as (path: string, vars?: Record<string, string | number>) => string | any;
}

