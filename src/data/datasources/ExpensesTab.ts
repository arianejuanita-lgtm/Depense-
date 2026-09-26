import type { IExpense } from "@/domain/Expenses";

export const ExpensesTab : IExpense[] =[
 
  { id:0, label: "Courses Carrefour",        amount: 87.45,  categoryId: 0, date: "2026-02-03", status: "UNCONFIRMED"   },
  { id:1, label: "Pizza du vendredi",        amount: 24.90,  categoryId: 0, date: "2026-03-05", status: "UNCONFIRMED"   },
  { id:2, label: "Marché bio",               amount: 42.10,  categoryId: 0, date: "2026-04-11", status: "UNCONFIRMED" },
  { id:3, label: "Restaurant italien",       amount: 65.00,  categoryId: 0, date: "2026-04-18", status: "UNCONFIRMED"   },
  { id:4, label: "Abonnement métro",         amount: 75.00,  categoryId: 1,    date: "2026-06-02", status: "UNCONFIRMED"   },
  { id:5, label: "Plein d'essence",          amount: 68.30,  categoryId: 1,    date: "2026-07-09", status: "UNCONFIRMED"   },
  { id:6, label: "Ticket de bus",            amount: 2.50,   categoryId: 1,    date: "2026-02-14", status: "UNCONFIRMED" },
  { id:7, label: "VTC retour soirée",        amount: 18.75,  categoryId: 1,    date: "2026-03-22", status: "UNCONFIRMED" },
  { id:8, label: "Cinéma IMAX",              amount: 16.50,  categoryId: 2,       date: "2026-01-06", status: "UNCONFIRMED"   },
  { id:9, label: "Abonnement Spotify",       amount: 11.99,  categoryId: 2,       date: "2026-01-08", status: "UNCONFIRMED"   },
  { id:10, label: "Salle de sport",           amount: 39.90,  categoryId: 2,       date: "2026-09-10", status: "UNCONFIRMED"   },
  { id:11, label: "Concert rock",             amount: 55.00,  categoryId: 2,       date: "2026-09-20", status: "UNCONFIRMED" },
  { id:12, label: "Loyer janvier",            amount: 850.00, categoryId:3,      date: "2026-01-01", status: "UNCONFIRMED"   },
  { id:13, label: "Électricité EDF",          amount: 92.40,  categoryId:3,      date: "2026-01-07", status: "UNCONFIRMED"   },
  { id:14, label: "Internet fibre",           amount: 29.99,  categoryId:3,      date: "2026-06-12", status: "UNCONFIRMED"   },
  { id:15, label: "Assurance habitation",     amount: 24.60,  categoryId:3,      date: "2026-01-15", status: "UNCONFIRMED" },
  { id:16, label: "Produits ménagers",        amount: 33.20,  categoryId: 4,         date: "2026-04-04", status: "UNCONFIRMED"   },
  { id:17, label: "Cadeau anniversaire",      amount: 45.00,  categoryId: 4,         date: "2026-01-17", status: "UNCONFIRMED" },
  { id:18, label: "Frais bancaires",          amount: 8.90,   categoryId: 4,         date: "2026-01-20", status: "UNCONFIRMED"   },
  { id:19,label: "Pharmacie",                amount: 27.35,  categoryId: 4,         date: "2026-01-28", status: "UNCONFIRMED" },

];