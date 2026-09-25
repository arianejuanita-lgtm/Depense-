import type { IExpense } from "@/domain/Expenses";

export const ExpensesTab : IExpense[] =[
 
  { label: "Courses Carrefour",        amount: 87.45,  category: "Alimentations", date: "2026-02-03", status: "UNCONFIRMED"   },
  { label: "Pizza du vendredi",        amount: 24.90,  category: "Alimentations", date: "2026-03-05", status: "UNCONFIRMED"   },
  { label: "Marché bio",               amount: 42.10,  category: "Alimentations", date: "2026-04-11", status: "UNCONFIRMED" },
  { label: "Restaurant italien",       amount: 65.00,  category: "Alimentations", date: "2026-04-18", status: "UNCONFIRMED"   },
  { label: "Abonnement métro",         amount: 75.00,  category: "Transports",    date: "2026-06-02", status: "UNCONFIRMED"   },
  { label: "Plein d'essence",          amount: 68.30,  category: "Transports",    date: "2026-07-09", status: "UNCONFIRMED"   },
  { label: "Ticket de bus",            amount: 2.50,   category: "Transports",    date: "2026-02-14", status: "UNCONFIRMED" },
  { label: "VTC retour soirée",        amount: 18.75,  category: "Transports",    date: "2026-03-22", status: "UNCONFIRMED" },
  { label: "Cinéma IMAX",              amount: 16.50,  category: "Loisirs",       date: "2026-01-06", status: "UNCONFIRMED"   },
  { label: "Abonnement Spotify",       amount: 11.99,  category: "Loisirs",       date: "2026-01-08", status: "UNCONFIRMED"   },
  { label: "Salle de sport",           amount: 39.90,  category: "Loisirs",       date: "2026-09-10", status: "UNCONFIRMED"   },
  { label: "Concert rock",             amount: 55.00,  category: "Loisirs",       date: "2026-09-20", status: "UNCONFIRMED" },
  { label: "Loyer janvier",            amount: 850.00, category: "Logement",      date: "2026-01-01", status: "UNCONFIRMED"   },
  { label: "Électricité EDF",          amount: 92.40,  category: "Logement",      date: "2026-01-07", status: "UNCONFIRMED"   },
  { label: "Internet fibre",           amount: 29.99,  category: "Logement",      date: "2026-06-12", status: "UNCONFIRMED"   },
  { label: "Assurance habitation",     amount: 24.60,  category: "Logement",      date: "2026-01-15", status: "UNCONFIRMED" },
  { label: "Produits ménagers",        amount: 33.20,  category: "Autre",         date: "2026-04-04", status: "UNCONFIRMED"   },
  { label: "Cadeau anniversaire",      amount: 45.00,  category: "Autre",         date: "2026-01-17", status: "UNCONFIRMED" },
  { label: "Frais bancaires",          amount: 8.90,   category: "Autre",         date: "2026-01-20", status: "UNCONFIRMED"   },
  { label: "Pharmacie",                amount: 27.35,  category: "Autre",         date: "2026-01-28", status: "UNCONFIRMED" },

];