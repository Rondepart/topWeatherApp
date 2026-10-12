export async function getIcon(name) {
  try {
    const module = await import(`../assets/weatherIcons/SVG/colored/${name}.svg`);
    return module.default;
  } catch {
    console.warn(`Missing weather icon: ${name}`);
    const module = await import("../assets/weatherIcons/SVG/colored/cloud-question.svg");
    return module.default;
  }
}