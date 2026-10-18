/**
 * Light / dark theme. Dark is the default and needs no attribute; light sets
 * data-theme="light" on <html>, which remaps the colour tokens in tokens.css.
 */

export type Theme = "dark" | "light";

export const THEME_STORAGE_KEY = "fc2015-theme";

/** Browser bar colour per theme: the page background of each. */
export const THEME_COLOR: Record<Theme, string> = { dark: "#0A0E17", light: "#FFFFFF" };

/**
 * Runs in <head> before first paint so a saved light theme never flashes dark.
 * ?theme=light or ?theme=dark in the URL wins and is saved, so a link can
 * open the site in either theme (handy for showing the client both).
 */
export const THEME_INIT_SCRIPT = `(function(){try{var k=${JSON.stringify(THEME_STORAGE_KEY)};var q=new URLSearchParams(location.search).get("theme");if(q==="light"||q==="dark"){localStorage.setItem(k,q)}var t=q||localStorage.getItem(k);if(t==="light"){document.documentElement.setAttribute("data-theme","light");var m=document.querySelector('meta[name="theme-color"]');if(m)m.setAttribute("content",${JSON.stringify(THEME_COLOR.light)})}}catch(e){}})();`;

export function readTheme(): Theme {
  return document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
}

export function applyTheme(theme: Theme) {
  const root = document.documentElement;
  if (theme === "light") root.setAttribute("data-theme", "light");
  else root.removeAttribute("data-theme");
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", THEME_COLOR[theme]);
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Private mode or blocked storage: the theme still applies for this page view.
  }
}
