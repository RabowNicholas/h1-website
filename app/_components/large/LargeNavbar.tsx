import Link from "next/link";
import Cart from "../common/Cart";

export default function LargeNavbar() {
  return (
    <div className="flex items-center justify-between bg-dark-black w-full h-[72px] text-cool-white px-4">
      <div className="flex-1"></div>
      <div className="flex gap-4 justify-center flex-3 uppercase text-xl">
        <Link href="/">shop</Link>
        <Link href="/">why hydrogen</Link>
        <Link href="/">where to buy</Link>
      </div>

      <div className="flex-1 flex justify-end">
        <Cart />
      </div>
    </div>
  );
}
