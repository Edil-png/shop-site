import Link from "next/link";
import { ArrowRight } from "lucide-react"; 

export function LookAll() {
  return (
    <Link
      href="/shop"
      className="group inline-flex items-center gap-2 text-sm font-bold bg-gray-100  px-6 py-3 rounded-xl hover:bg-blue-600 hover:text-white transition-all duration-300"
    >
      Смотреть все
      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
    </Link>
  );
}