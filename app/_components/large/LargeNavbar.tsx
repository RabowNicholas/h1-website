import Link from "next/link";
import Cart from "../common/Cart";

export default function LargeNavbar() {
  return (
    <div className="flex items-center justify-between bg-dark-black w-full h-[72px] text-warm-white px-4">
      <div className="flex-1"></div>
      <div className="flex gap-4 justify-center flex-3 uppercase text-xl">
        <Link
          href="/"
          className="hover:text-bright-yellow transition-colors duration-300"
        >
          Shop
        </Link>
        <Link
          href="/educate"
          className="hover:text-bright-yellow transition-colors duration-300"
        >
          Why Hydrogen
        </Link>
        <Link
          href="/where-to-buy"
          className="hover:text-bright-yellow transition-colors duration-300"
        >
          Where to Buy
        </Link>
      </div>

      <div className="flex-1 flex justify-end">
        <Cart />
      </div>
    </div>
  );
}
