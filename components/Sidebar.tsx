import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-60 p-4 border-r border-gray-200 dark:border-gray-700 min-h-screen">
      <nav className="flex flex-col space-y-2">
        <Link href="/" className="hover:underline">Home</Link>
        <Link href="#" className="hover:underline">About</Link>
        <Link href="#" className="hover:underline">Contact</Link>
      </nav>
    </aside>
  );
}
