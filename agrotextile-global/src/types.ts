export interface ProductSpec {
  label: string;
  value: string;
}

export interface ProductDetails {
  origin: string;
  certifications: string[];
  durability: string;
  variety: string;
  minOrderQuantity: string;
  packaging: string;
  leadTime: string;
  technicalDescription: string;
}

export interface Product {
  id: string;
  name: string;
  category: "Textiles" | "Fresh Produce" | "Industrial Wraps" | "Logistics Supplies";
  tag: string;
  tagColor: "primary" | "secondary" | "tertiary" | "info" | "success" | "warning";
  image: string;
  specifications: ProductSpec[];
  details: ProductDetails;
  liveInventoryCount: number;
}

export type ActiveFilterType = "material-variety" | "durability" | "origin" | "certifications" | null;
