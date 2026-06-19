/**
 * @typedef {Object} ProductSpec
 * @property {string} label
 * @property {string} value
 */

/**
 * @typedef {Object} ProductDetails
 * @property {string} origin
 * @property {string[]} certifications
 * @property {string} durability
 * @property {string} variety
 * @property {string} minOrderQuantity
 * @property {string} packaging
 * @property {string} leadTime
 * @property {string} technicalDescription
 */

/**
 * @typedef {Object} Product
 * @property {string} id
 * @property {string} name
 * @property {"Textiles" | "Fresh Produce" | "Industrial Wraps" | "Logistics Supplies"} category
 * @property {string} tag
 * @property {"primary" | "secondary" | "tertiary" | "info" | "success" | "warning"} tagColor
 * @property {string} image
 * @property {ProductSpec[]} specifications
 * @property {ProductDetails} details
 * @property {number} liveInventoryCount
 */

/**
 * @typedef {"material-variety" | "durability" | "origin" | "certifications" | null} ActiveFilterType
 */

export {};
