import mongoose from "mongoose";
import Portfolio from "./src/models/Portfolio";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/nooraxis";

const SEED_PROJECTS = [
  {
    title: "Apex Analytics Dashboard",
    category: "Web App",
    desc: "An enterprise AI-driven analytics suite providing real-time telemetry, predictive cohort behaviors, and high-performance serverless dashboards.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Mongoose", "Recharts"],
    image: "/portfolio/apex.png",
    externalLink: "https://apex.nooraxis.tech",
    codeLink: "https://github.com/nooraxis/apex-analytics"
  },
  {
    title: "Zora Gestural Crypto Client",
    category: "Mobile",
    desc: "A sleek, gesture-oriented crypto wallet client designed for minimal layout overhead, beautiful micro-interactions, and ultra-fast transactional verification.",
    tags: ["React Native", "Expo", "Ethers.js", "Reanimated", "Tailwind CSS"],
    image: "/portfolio/zora.png",
    externalLink: "https://zora.nooraxis.tech",
    codeLink: "https://github.com/nooraxis/zora-client"
  },
  {
    title: "Lumina Design Token System",
    category: "UI/UX",
    desc: "An architectural UI system and token schema built to automate developer handover and cross-platform design synchronization seamlessly.",
    tags: ["Figma API", "React", "Design Tokens", "Style Dictionary"],
    image: "/portfolio/lumina.png",
    externalLink: "https://lumina.nooraxis.tech",
    codeLink: "https://github.com/nooraxis/lumina-tokens"
  },
  {
    title: "Chronos Enterprise SaaS Workspace",
    category: "Web App",
    desc: "A secure, modern workspace management suite designed for engineering fleets to manage sprint schedules, log activities, and control cloud resource quotas.",
    tags: ["Next.js", "GraphQL", "PostgreSQL", "Tailwind CSS", "Redis"],
    image: "/portfolio/chronos.png",
    externalLink: "https://chronos.nooraxis.tech",
    codeLink: "https://github.com/nooraxis/chronos-saas"
  },
  {
    title: "Valkyrie Quantum Security Rebrand",
    category: "Branding",
    desc: "A complete brand restructuring and strategic visual identity deployment for an advanced quantum threat detection platform, complete with WebGL marketing pages.",
    tags: ["Brand Identity", "Design System", "Motion Graphics", "3D WebGL"],
    image: "/portfolio/valkyrie.png",
    externalLink: "https://valkyrie.nooraxis.tech",
    codeLink: ""
  }
];

async function seedDatabase() {
  try {
    console.log("Connecting to MongoDB at:", MONGODB_URI);
    await mongoose.connect(MONGODB_URI);
    console.log("Connected successfully!");

    // Clear existing portfolio items to avoid duplicates
    console.log("Clearing existing portfolios...");
    await Portfolio.deleteMany({});
    console.log("Cleared successfully!");

    // Insert new portfolio items
    console.log("Seeding portfolio items...");
    const createdPortfolios = await Portfolio.insertMany(SEED_PROJECTS);
    console.log(`Successfully seeded ${createdPortfolios.length} portfolio items!`);

    for (const item of createdPortfolios) {
      console.log(` - [${item.category}] ${item.title}`);
    }
  } catch (error) {
    console.error("Error seeding the database:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB.");
    process.exit(0);
  }
}

seedDatabase();
