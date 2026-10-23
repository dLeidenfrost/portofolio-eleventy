const rows = [
  { key: "languages", values: ["JavaScript", "TypeScript", "HTML", "CSS"] },
  { key: "frameworks", values: ["React", "Next.js", "React Native", "Node.js"] },
  { key: "styling", values: ["Tailwind CSS", "plain CSS"] },
  { key: "testing", values: ["Jest", "Playwright"] },
  // `comment` is a key into the translation dictionary's `stack.comments`.
  { key: "tools", values: ["Git", "AWS"], comment: "aws" },
  { key: "ai", values: ["Claude Code", "Claude", "OpenCode"] },
];

export default {
  filename: "stack.toml",
  rows,
  keyWidth: Math.max(...rows.map((row) => row.key.length)),
};
