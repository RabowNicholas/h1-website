import Link from "next/link";
import ShoppingCart from "@mui/icons-material/ShoppingCart";

export default function LargeNavbar() {
  return (
    <div className="flex items-center justify-between bg-deep-black w-full h-16 text-cool-white px-4">
      <div className="flex-1"></div>
      <div className="flex gap-4 justify-center flex-3 uppercase text-xl">
        <Link href="/">shop</Link>
        <Link href="/">why hydrogen</Link>
        <Link href="/">where to buy</Link>
      </div>

      <div className="flex-1 flex justify-end">
        <ShoppingCart />
      </div>
    </div>
  );
}
