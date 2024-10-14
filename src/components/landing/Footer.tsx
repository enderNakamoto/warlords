import Link from "next/link";

export default function Footer() {
  return (
    <>
      <hr className="text-gray-300" />
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-400">© {new Date().getFullYear()} Shogun. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4 text-gray-200" href="#">
            Home
          </Link>
          <Link
            className="text-xs hover:underline underline-offset-4 text-gray-200"
            href="https://github.com/enderNakamoto/warlords"
            target="_blank"
          >
            GitHub
          </Link>
        </nav>
      </footer>
    </>
  );
}
