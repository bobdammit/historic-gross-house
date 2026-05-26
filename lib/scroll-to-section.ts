export function getSiteHeaderOffset() {
  if (typeof window === "undefined") {
    return 88;
  }

  const nav = document.querySelector<HTMLElement>("[data-site-header]");
  return nav ? Math.ceil(nav.getBoundingClientRect().height) : 88;
}

export function scrollToSiteSection(sectionId: string) {
  const section = document.getElementById(sectionId);
  if (!section) return;

  const offset = getSiteHeaderOffset();
  const top = window.scrollY + section.getBoundingClientRect().top - offset;

  window.scrollTo({
    top: Math.max(0, top),
    behavior: "smooth",
  });
}
