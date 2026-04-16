export const COUNTRIES: { code: string; label: string }[] = [
  { code: "KW", label: "Kuwait" },
  { code: "SA", label: "Saudi Arabia" },
  { code: "AE", label: "UAE" },
  { code: "BH", label: "Bahrain" },
  { code: "QA", label: "Qatar" },
  { code: "OM", label: "Oman" },
  { code: "JO", label: "Jordan" },
  { code: "LB", label: "Lebanon" },
  { code: "EG", label: "Egypt" },
  { code: "IQ", label: "Iraq" },
];

export const CITIES_BY_COUNTRY: Record<string, string[]> = {
  KW: ["Kuwait City", "Hawalli", "Salmiya", "Ahmadi", "Farwaniya", "Jahra", "Mangaf", "Sabah Al Salem", "Fahaheel", "Rumaithiya"],
  SA: ["Riyadh", "Jeddah", "Mecca", "Medina", "Dammam", "Khobar", "Dhahran", "Tabuk", "Abha", "Taif", "Yanbu", "Najran"],
  AE: ["Dubai", "Abu Dhabi", "Sharjah", "Ajman", "Ras Al Khaimah", "Fujairah", "Umm Al Quwain", "Al Ain"],
  BH: ["Manama", "Riffa", "Muharraq", "Isa Town", "Hamad Town", "Sitra", "Budaiya"],
  QA: ["Doha", "Al Rayyan", "Al Wakrah", "Al Khor", "Al Shamal", "Lusail", "Mesaieed"],
  OM: ["Muscat", "Salalah", "Sohar", "Nizwa", "Sur", "Ibri", "Buraimi"],
  JO: ["Amman", "Zarqa", "Irbid", "Aqaba", "Salt", "Madaba", "Jerash"],
  LB: ["Beirut", "Tripoli", "Sidon", "Tyre", "Jounieh", "Byblos", "Zahle"],
  EG: ["Cairo", "Alexandria", "Giza", "Sharm El Sheikh", "Hurghada", "Luxor", "Aswan", "Mansoura", "Tanta"],
  IQ: ["Baghdad", "Basra", "Erbil", "Mosul", "Najaf", "Karbala", "Sulaymaniyah", "Kirkuk"],
};

export const CURRENCY_BY_COUNTRY: Record<string, string> = {
  KW: "KWD", SA: "SAR", AE: "AED", BH: "BHD", QA: "QAR",
  OM: "OMR", JO: "JOD", LB: "LBP", EG: "EGP", IQ: "IQD",
};

export const PRICE_UNITS: { value: string; label: string }[] = [
  { value: "per_hour", label: "Per Hour" },
  { value: "per_event", label: "Per Event" },
  { value: "per_product", label: "Per Product" },
  { value: "per_day", label: "Per Day" },
  { value: "per_person", label: "Per Person" },
  { value: "per_package", label: "Per Package" },
];
