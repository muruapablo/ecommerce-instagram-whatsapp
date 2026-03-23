export const store = {
  name: "Bike Marketplace",
  description: "Tienda online para insumos de bicicletas",
  whatsapp: "5493513931707", // Formato: código país + código área + número
  instagram: "muruapablo",
  logo: "/logo.png",
  primaryColor: "#000000", // MonoBoutique: Pure black
  secondaryColor: "#006d2f", // MonoBoutique: WhatsApp green
  currency: "ARS",
  currencySymbol: "$",
  // MonoBoutique Design Tokens
  design: {
    borderStyle: "none", // No solid borders - use background shifts
    roundness: "0.375rem", // 6px
    spacing: 3, // Generous spacing
  }
}

export type StoreConfig = typeof store
