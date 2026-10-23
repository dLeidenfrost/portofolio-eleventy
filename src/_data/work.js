export default [
  {
    company: "Fresh Consulting",
    role: "Frontend Developer · México Branch, Ciudad de México",
    dates: "2015.02 — present",
    projects: [
      {
        title: "Corporate online banking platform",
        status: "shipped",
        summary:
          "Developed and deployed a banking platform for companies, with user management, transfers, balance inquiries and foreign-exchange modules. Co-led frontend as one of two senior developers on a five-person team, balancing a polished experience with strict security requirements. Unit and end-to-end tests with Jest and Playwright keep each release reliable.",
        stats: [
          { value: "~15,000", label: "company accounts" },
          { value: "~300,000", label: "transactions / month" },
          { value: "5", label: "team · 2 FE, 2 BE, 1 QA" },
        ],
      },
      {
        title: "ATM cash logistics system",
        status: "in progress",
        active: true,
        summary:
          "Building a logistics management system for a company that loads and collects cash across ATM networks.",
      },
    ],
  },
];
