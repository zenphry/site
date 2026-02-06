import type { MetaFunction } from "react-router";

export const meta: MetaFunction = () => {
  return [
    { title: "About Zenphry | Zenphry" },
    { name: "description", content: "Learn more about Zenphry." },
  ];
};

export default function About() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
      <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
        About Zenphry
      </h1>
      <p className="text-xl text-gray-600 dark:text-gray-300">
        Content for the About page will go here.
      </p>
    </div>
  );
}
