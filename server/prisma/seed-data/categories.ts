export type SeedCategory = {
  name: string;
  slug: string;
  description: string;
  iconName: string;
};

export const CATEGORY_SEEDS: SeedCategory[] = [
  {
    name: "Demolition Hammers",
    slug: "demolition-hammers",
    description: "Heavy-duty drilling and breaking tools for concrete and masonry jobs.",
    iconName: "hammer",
  },
  {
    name: "Concrete Mixers",
    slug: "concrete-mixers",
    description: "Portable and site-grade mixers for finishing, masonry, and structural work.",
    iconName: "drum",
  },
  {
    name: "Plate Compactors",
    slug: "plate-compactors",
    description: "Compaction equipment for paving bases, trench refill, and landscaping.",
    iconName: "layers",
  },
  {
    name: "Generators",
    slug: "generators",
    description: "Power sources for sites without permanent electricity and emergency backup.",
    iconName: "zap",
  },
  {
    name: "Compressors",
    slug: "compressors",
    description: "Air equipment for pneumatic tools, paint jobs, and utility maintenance.",
    iconName: "wind",
  },
  {
    name: "Scaffolding And Towers",
    slug: "scaffolding-towers",
    description: "Safe access systems for facade work, finishing, and indoor repairs.",
    iconName: "building-2",
  },
  {
    name: "Welding Equipment",
    slug: "welding-equipment",
    description: "Inverters and accessories for metal fabrication and repair work.",
    iconName: "wrench",
  },
  {
    name: "Saws And Cutters",
    slug: "saws-cutters",
    description: "Cutting tools for metal, stone, reinforced concrete, and asphalt.",
    iconName: "disc-3",
  },
  {
    name: "Measuring Tools",
    slug: "measuring-tools",
    description: "Precision tools for layout, leveling, and quality control on site.",
    iconName: "ruler",
  },
];
