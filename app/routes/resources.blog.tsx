import type { MetaFunction } from "react-router";

export const meta: MetaFunction = () => {
  return [
    { title: "Blog | Zenphry" },
    { name: "description", content: "Zenphry Blog - Coming Soon!" },
  ];
};

export default function BlogComingSoon() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
      <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
        Blog
      </h1>
      <p className="text-xl text-gray-600 dark:text-gray-300">
        Our blog is coming soon! Stay tuned for insights and updates.
      </p>
    </div>
  );
}
