export const PRODUCTS = [
  // --- TEXTILE CATEGORY ---
  {
    id: "tex-silk-saree-01",
    title: "Pure Mulberry Silk Saree",
    description: "Exquisite hand-woven mulberry silk saree featuring intricate Zari work and a luxurious drape. A masterpiece of traditional craftsmanship for high-end markets.",
    category: "Textile",
    image: "/product_images/textile/silk_saree_showroom.jpg",
    thumbnail: "/product_images/textile/silk_saree_listing.jpg",
    images: [
      "/product_images/textile/silk_saree_hero.jpg",
      "/product_images/textile/silk_saree_folded.jpg",
      "/product_images/textile/silk_saree_closeup.jpg"
    ],
    specs: {
      label1: "Fiber Content", value1: "100% Pure Silk", icon1: "Maximize2",
      label2: "Weave Technique", value2: "Handloom Jacquard", icon2: "Zap",
      label3: "Zari Type", value3: "Gold/Silver Plated", icon3: "Crown",
      label4: "Finish", value4: "Ultra-Soft Sheen", icon4: "ShieldCheck"
    },
    details: {
      origin: "Kanchipuram, Tamil Nadu",
      grade: "Export Premium",
      material: "Mulberry Silk",
      description: "Exquisite hand-woven mulberry silk saree featuring intricate Zari work and a luxurious drape. A masterpiece of traditional craftsmanship for high-end markets.",
      laboratoryReport: "Silk Mark Certified. Purity > 99%. Tensile strength: 35g/tex. Azoic-free dyes.",
      certifications: ["Silk Mark India", "ISO 9001:2015", "Handloom Mark"],
      leadTime: "30-45 Days",
      minOrder: "50 Units",
      stockStatus: "Pre-Order Only",
      shippingPorts: "Chennai / Tuticorin",
      hsnCode: "5007.20.10"
    }
  },
  {
    id: "tex-print-saree-01",
    title: "Hand-Block Printed Saree",
    description: "Premium fine-count cotton saree featuring authentic hand-block prints using natural dyes. Breathable, durable, and ethically produced.",
    category: "Textile",
    image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?q=80&w=800&auto=format&fit=crop",
    thumbnail: "/product_images/textile/print_saree_listing.jpg",
    images: [
      "/product_images/textile/print_saree_hero.jpg",
      "/product_images/textile/print_saree_motion.jpg",
      "/product_images/textile/print_saree_closeup.jpg"
    ],
    specs: {
      label1: "Fiber Content", value1: "100% Organic Cotton", icon1: "Leaf",
      label2: "Print Type", value2: "Dabu / Bagru Block", icon2: "Target",
      label3: "Dyeing", value3: "Natural Indigo/Roots", icon3: "Zap",
      label4: "Color Fastness", value4: "Grade 4 Standard", icon4: "ShieldCheck"
    },
    details: {
      origin: "Jaipur, Rajasthan",
      grade: "A-Grade Export",
      material: "Organic Cotton",
      description: "Premium fine-count cotton saree featuring authentic hand-block prints using natural dyes. Breathable, durable, and ethically produced.",
      laboratoryReport: "Color fastness: Grade 4. Shrinkage < 2%. Zero chemical residues detected.",
      certifications: ["GOTS Certified", "OEKO-TEX 100", "Fair Trade"],
      leadTime: "15-20 Days",
      minOrder: "200 Units",
      stockStatus: "Ready Stock",
      shippingPorts: "Mundra / Nhava Sheva",
      hsnCode: "5208.51.10"
    }
  },
  {
    id: "tex-dye-saree-01",
    title: "Artisan Dyed Saree",
    description: "High-quality yarn-dyed and piece-dyed sarees with superior color depth and consistency. Vibrant hues designed for longevity.",
    category: "Textile",
    image: "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?q=80&w=800&auto=format&fit=crop",
    thumbnail: "/product_images/textile/dyed_saree_listing.jpg",
    images: [
      "/product_images/textile/dyed_saree_hero.jpg",
      "/product_images/textile/dyed_saree_folded.jpg",
      "/product_images/textile/dyed_saree_closeup.jpg"
    ],
    specs: {
      label1: "Fiber Content", value1: "95% Cotton / 5% Lycra", icon1: "Maximize2",
      label2: "Weave", value2: "Twill / Piece Dyed", icon2: "Zap",
      label3: "Weight", value3: "180 GSM", icon3: "Dumbbell",
      label4: "Pilling", value4: "Grade 4 Resistance", icon4: "ShieldCheck"
    },
    details: {
      origin: "Surat, Gujarat",
      grade: "Industrial Grade A",
      material: "Cotton Blend",
      description: "High-quality yarn-dyed and piece-dyed sarees with superior color depth and consistency. Vibrant hues designed for longevity.",
      laboratoryReport: "Rubbing fastness: 4.5. Pilling resistance: Grade 4. Weight: 180 GSM.",
      certifications: ["ISO 14001", "REACH Compliant", "SA8000"],
      leadTime: "25-30 Days",
      minOrder: "1000 Meters",
      stockStatus: "Available",
      shippingPorts: "Hazira / Mumbai",
      hsnCode: "5209.41.10"
    }
  },
  {
    id: "tex-garment-fab-01",
    title: "Combed Cotton Fabrics",
    description: "Versatile and durable fabrics engineered for mass garment production. Smooth finish and easy care for global retail standards.",
    category: "Textile",
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=800&auto=format&fit=crop",
    thumbnail: "/product_images/textile/garment_fabric_listing.jpg",
    images: [
      "/product_images/textile/garment_fabric_hero.jpg",
      "/product_images/textile/garment_fabric_rolls.jpg",
      "/product_images/textile/garment_fabric_closeup.jpg"
    ],
    specs: {
      label1: "Fiber Content", value1: "100% Combed Cotton", icon1: "Leaf",
      label2: "Weave", value2: "Plain / Poplin", icon2: "Target",
      label3: "Tear Strength", value3: "20N Minimum", icon3: "Dumbbell",
      label4: "Weight", value4: "125 - 140 GSM", icon4: "Maximize2"
    },
    details: {
      origin: "Ahmedabad, Gujarat",
      grade: "Standard Export",
      material: "Combed Cotton",
      description: "Versatile and durable fabrics engineered for mass garment production. Smooth finish and easy care for global retail standards.",
      laboratoryReport: "Tear strength: 20N. pH range: 6.0-7.5. Dimensional stability: +/- 3%.",
      certifications: ["BCI Member", "WRAP Certified", "ISO 9001"],
      leadTime: "20-25 Days",
      minOrder: "5000 Meters",
      stockStatus: "In Stock",
      shippingPorts: "Mundra / Kandla",
      hsnCode: "5210.31.10"
    }
  },
  {
    id: "agro-onion-red-01",
    title: "Premium Red Onions",
    description: "High-pungency red onions with excellent shelf life. Uniformly sized and cured, specifically graded for international reefer shipment.",
    category: "Agro",
    image: "https://images.unsplash.com/photo-1508747703725-719777637510?q=80&w=800&auto=format&fit=crop",
    thumbnail: "/product_images/Agro/Onion_closeup.jpg",
    images: [
      "/product_images/Agro/Onion_hero.png.jpg",
      "/product_images/Agro/Onion_table.jpg",
      "/product_images/Agro/Onion_boxes.jpg"
    ],
    specs: {
      label1: "Variety", value1: "Red Globe / Nashik", icon1: "Target",
      label2: "Avg. Size", value2: "45mm - 60mm", icon2: "Maximize2",
      label3: "Moisture", value3: "82% Maximum", icon3: "Thermometer",
      label4: "Curing", value4: "A+ Field Dried", icon4: "ShieldCheck"
    },
    details: {
      origin: "Nashik, Maharashtra",
      grade: "Export Grade A",
      ripeness: "Well Cured / Field Dried",
      description: "High-pungency red onions with excellent shelf life. Uniformly sized and cured, specifically graded for international reefer shipment.",
      laboratoryReport: "Phytosanitary certified. Moisture < 82%. Zero sprout detected. Heavy metal compliant.",
      certifications: ["APEDA", "GLOBAL G.A.P.", "HACCP"],
      leadTime: "7-10 Days",
      minOrder: "28 Metric Tons",
      stockStatus: "Seasonal High",
      shippingPorts: "Nhava Sheva / Mumbai",
      hsnCode: "0703.10.10"
    }
  },
  {
    id: "agro-lemon-acid-01",
    title: "Seedless Fresh Lemons",
    description: "Juicy, thin-skinned seedless lemons with high acid content and aromatic zest. Harvested at optimal color for long-distance transit.",
    category: "Agro",
    image: "https://images.unsplash.com/photo-1590505681534-423c827ec3d9?q=80&w=800&auto=format&fit=crop",
    thumbnail: "/product_images/Agro/lemon_listing.jpg",
    images: [
      "/product_images/Agro/lemon_hero.jpg",
      "/product_images/Agro/lemon_detail.jpg",
      "/product_images/Agro/lemon_boxes.png"
    ],
    specs: {
      label1: "Variety", value1: "Kagzi / Seedless", icon1: "Target",
      label2: "Juice Yield", value2: "> 35% Weight", icon2: "Zap",
      label3: "Brix", value3: "8.2 Average", icon3: "Thermometer",
      label4: "Weight", value4: "40g - 60g / Unit", icon4: "Maximize2"
    },
    details: {
      origin: "Andhra Pradesh, India",
      grade: "Premium Export",
      ripeness: "Light Yellow (Stage 4)",
      description: "Juicy, thin-skinned seedless lemons with high acid content and aromatic zest. Harvested at optimal color for long-distance transit.",
      laboratoryReport: "Juice yield > 35%. Brix: 8.2. MRL compliant. Organic wax coated.",
      certifications: ["GLOBAL G.A.P.", "ISO 22000", "FSSAI"],
      leadTime: "5-7 Days",
      minOrder: "5 Metric Tons",
      stockStatus: "Harvesting Now",
      shippingPorts: "Chennai / Krishnapatnam",
      hsnCode: "0805.50.00"
    }
  },
  {
    id: "agro-chilly-green-01",
    title: "Spicy Green Chillies",
    description: "Intense dark green chillies with high Scoville heat units. Firm texture and vibrant color, pre-cooled for maximum freshness.",
    category: "Agro",
    image: "https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?q=80&w=800&auto=format&fit=crop",
    thumbnail: "/product_images/Agro/chilli_listing.jpg",
    images: [
      "/product_images/Agro/chilli_hero.jpg",
      "/product_images/Agro/chilli_detail.jpg",
      "/product_images/Agro/chilli_packaging.jpg"
    ],
    specs: {
      label1: "Variety", value1: "G4 / Teja", icon1: "Target",
      label2: "Capsaicin", value2: "0.52% High Heat", icon2: "Zap",
      label3: "Length", value3: "8cm - 12cm", icon3: "Maximize2",
      label4: "Pre-Cooling", value4: "10°C Post-Harvest", icon4: "Thermometer"
    },
    details: {
      origin: "Guntur, Andhra Pradesh",
      grade: "High Pungency",
      ripeness: "Fresh Harvested",
      description: "Intense dark green chillies with high Scoville heat units. Firm texture and vibrant color, pre-cooled for maximum freshness.",
      laboratoryReport: "Capsaicin: 0.52%. Aflatoxin free. Pre-cooled at 10°C within 4 hours of harvest.",
      certifications: ["BRC Global", "HACCP", "EU MRL Compliant"],
      leadTime: "3-5 Days",
      minOrder: "1 Metric Ton",
      stockStatus: "Daily Flush",
      shippingPorts: "Mundra / JNPT",
      hsnCode: "0709.60.10"
    }
  },
  {
    id: "agro-mango-alphonso-01",
    title: "Alphonso Mangoes",
    description: "World-renowned 'King of Mangoes' from the Konkan coast. Rich saffron flesh, creamy texture, and unmatched aroma. Hand-picked for export.",
    category: "Agro",
    image: "https://images.unsplash.com/photo-1553279768-865429fa0078?q=80&w=800&auto=format&fit=crop",
    thumbnail: "/product_images/Agro/mango_listing.png",
    images: [
      "/product_images/Agro/mango_hero.jpg",
      "/product_images/Agro/mango_boxes.png",
      "/product_images/Agro/mango_detail.jpg"
    ],
    specs: {
      label1: "Variety", value1: "Ratnagiri Alphonso", icon1: "Target",
      label2: "Brix", value2: "> 18° Saffron", icon2: "Zap",
      label3: "Treatment", value3: "Hot Water (HWT)", icon3: "Thermometer",
      label4: "Weight", value4: "250g - 300g / Unit", icon4: "Maximize2"
    },
    details: {
      origin: "Konkan, Maharashtra",
      grade: "Super Premium",
      ripeness: "Mature Green (Pre-ripened)",
      description: "World-renowned 'King of Mangoes' from the Konkan coast. Rich saffron flesh, creamy texture, and unmatched aroma. Hand-picked for export.",
      laboratoryReport: "Hot water treatment (HWT) compliant. Zero spongy tissue. Brix > 18°.",
      certifications: ["APEDA", "GLOBAL G.A.P.", "USDA Organic"],
      leadTime: "3-5 Days (Air)",
      minOrder: "1.2 Metric Tons",
      stockStatus: "In Season",
      shippingPorts: "Mumbai Air Cargo",
      hsnCode: "0804.50.20"
    }
  },
  {
    id: "agro-banana-cavendish-01",
    title: "G9 Cavendish Bananas",
    description: "Premium G9 Cavendish bananas, uniformly sized and free from blemishes. Harvested at specific caliper levels for global shipping requirements.",
    category: "Agro",
    image: "https://images.unsplash.com/photo-1571771894821-ad996d13a24e?q=80&w=800&auto=format&fit=crop",
    thumbnail: "/product_images/Agro/banana_listing.jpg",
    images: [
      "/product_images/Agro/banana_hero.jpg",
      "/product_images/Agro/banana_detail.jpg",
      "/product_images/Agro/banana_packaging.jpg"
    ],
    specs: {
      label1: "Variety", value1: "Grand Naine (G9)", icon1: "Target",
      label2: "Caliper", value2: "39 - 47 Range", icon2: "Maximize2",
      label3: "Length", value3: "7.5 inches Minimum", icon3: "Dumbbell",
      label4: "Condition", value4: "Zero Blemishes", icon4: "ShieldCheck"
    },
    details: {
      origin: "Jalgaon, Maharashtra",
      grade: "Export Class 1",
      ripeness: "Green / Unripened",
      description: "Premium G9 Cavendish bananas, uniformly sized and free from blemishes. Harvested at specific caliper levels for global shipping requirements.",
      laboratoryReport: "Caliper: 39-47. Finger length: Min 7.5 inches. Temperature controlled transit.",
      certifications: ["Rainforest Alliance", "GLOBAL G.A.P.", "ISO 22000"],
      leadTime: "10-14 Days",
      minOrder: "20 Metric Tons",
      stockStatus: "Year-Round",
      shippingPorts: "Mundra / JNPT",
      hsnCode: "0803.90.10"
    }
  },
  {
    id: "agro-ginger-fresh-01",
    title: "Fresh Rhizome Ginger",
    description: "Aromatic and pungent fresh ginger rhizomes. Thoroughly washed and dried, featuring large fingers and minimal fiber content.",
    category: "Agro",
    image: "https://images.unsplash.com/photo-1615485240214-12a418ef0052?q=80&w=800&auto=format&fit=crop",
    thumbnail: "/product_images/Agro/ginger_listing.jpg",
    images: [
      "/product_images/Agro/ginger_hero.jpg",
      "/product_images/Agro/ginger_detail.jpg",
      "/product_images/Agro/ginger_packaging.jpg"
    ],
    specs: {
      label1: "Variety", value1: "Fresh Kochi Ginger", icon1: "Target",
      label2: "Gingerol", value2: "> 1.5% Pungency", icon2: "Zap",
      label3: "Moisture", value3: "10-12% Stable", icon3: "Thermometer",
      label4: "Finger Size", value4: "100g+ Minimum", icon4: "Maximize2"
    },
    details: {
      origin: "Kerala, India",
      grade: "Export Grade A",
      ripeness: "Fully Developed",
      description: "Aromatic and pungent fresh ginger rhizomes. Thoroughly washed and dried, featuring large fingers and minimal fiber content.",
      laboratoryReport: "Gingerol content > 1.5%. Moisture 10-12%. Zero mould detected.",
      certifications: ["Spice Board India", "HACCP", "ISO 9001"],
      leadTime: "10-12 Days",
      minOrder: "10 Metric Tons",
      stockStatus: "Post-Harvest Ready",
      shippingPorts: "Cochin / Bangalore",
      hsnCode: "0910.11.10"
    }
  },
  {
    id: "agro-capsicum-green-01",
    title: "Green Bell Peppers",
    description: "Crisp and thick-walled green capsicum grown in controlled greenhouse environments. Excellent shape uniformity and shelf stability.",
    category: "Agro",
    image: "https://images.unsplash.com/photo-1563590525586-635d94bc240f?q=80&w=800&auto=format&fit=crop",
    thumbnail: "/product_images/Agro/capsicum_listing.jpg",
    images: [
      "/product_images/Agro/capsicum_hero.jpg",
      "/product_images/Agro/capsicum_detail.jpg",
      "/product_images/Agro/capsicum_packaging.jpg"
    ],
    specs: {
      label1: "Variety", value1: "Indra Greenhouse", icon1: "Target",
      label2: "Wall Thickness", value2: "4mm - 6mm", icon2: "Maximize2",
      label3: "Firmness", value3: "> 1kg/cm²", icon3: "Dumbbell",
      label4: "Pesticide", value4: "Zero Residue Tech", icon4: "ShieldCheck"
    },
    details: {
      origin: "Karnataka, India",
      grade: "Export Premium",
      ripeness: "Fresh Harvested",
      description: "Crisp and thick-walled green capsicum grown in controlled greenhouse environments. Excellent shape uniformity and shelf stability.",
      laboratoryReport: "Zero pesticide residues (MRL compliant). Glossy skin finish. Firmness: > 1kg/cm².",
      certifications: ["GLOBAL G.A.P.", "HACCP", "APEDA"],
      leadTime: "4-6 Days (Reefer)",
      minOrder: "2 Metric Tons",
      stockStatus: "Production Cycle",
      shippingPorts: "Bangalore Air / Chennai",
      hsnCode: "0709.60.10"
    }
  },
  {
    id: "agro-rice-basmati-01",
    title: "1121 Basmati Rice",
    description: "Premium long-grain 1121 Steam Basmati rice, aged naturally for superior aroma. Non-sticky and elongates significantly upon cooking.",
    category: "Agro",
    image: "/product_images/Agro/rice_basmati.jpg",
    thumbnail: "/product_images/Agro/rice_listing.jpg",
    images: [
      "/product_images/Agro/rice_hero.jpg",
      "/product_images/Agro/rice_detail.jpg",
      "/product_images/Agro/rice_packaging.jpg"
    ],
    specs: {
      label1: "Type", value1: "1121 Steam Basmati", icon1: "Target",
      label2: "Raw Length", value2: "8.35mm Average", icon2: "Maximize2",
      label3: "Elongation", value3: "2.5x Post-Cook", icon3: "Zap",
      label4: "Purity", value4: "> 95% Content", icon4: "ShieldCheck"
    },
    details: {
      origin: "Punjab / Haryana",
      grade: "Super Premium Aged",
      ripeness: "Aged 12-24 Months",
      description: "Premium long-grain 1121 Steam Basmati rice, aged naturally for superior aroma. Non-sticky and elongates significantly upon cooking.",
      laboratoryReport: "Purity: 95%. Moisture: 12% max. Broken: < 1%. Elongation: 2.5x.",
      certifications: ["FSSAI", "FDA Registered", "SGS Inspected"],
      leadTime: "15-20 Days",
      minOrder: "20 Metric Tons",
      stockStatus: "Aged Stock Ready",
      shippingPorts: "Kandla / Mundra",
      hsnCode: "1006.30.20"
    }
  }
];
