import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white py-4 px-6 shadow mb-6">
      <ul className="flex gap-4">
        <li><Link href="/">Server Side</Link></li>
        <li><Link href="/static">Static</Link></li>
      </ul>
    </nav>
  );
}
