import Image from "next/image";

import logo from "../../images/shogun_logo.png";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="flex items-center justify-between px-4 py-2 max-w-screen-xl mx-auto w-full flex-wrap">
      <div>
        <Image src={logo} alt="Logo" quality={100} width={70} height={70} placeholder="blur" />
        <strong>SHOGUN</strong>
      </div>
      <p>
        <i>© {year}. All rights reserved.</i>
      </p>
    </footer>
  );
}
