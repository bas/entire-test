import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Products - Octodeco",
  description: "Browse our collection of GitHub Octocat-themed stickers",
};

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

async function getProducts(): Promise<Product[]> {
  const fs = await import("fs/promises");
  const path = await import("path");
  const filePath = path.join(process.cwd(), "app/api/products/products.json");
  const fileContents = await fs.readFile(filePath, "utf8");
  return JSON.parse(fileContents);
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-black text-white">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <Image
                src="/images/products/original.png"
                alt="Octodeco"
                width={40}
                height={40}
                className="rounded-full"
              />
              <span className="text-xl font-semibold">Octodeco</span>
            </Link>
            <nav>
              <Link href="/products" className="text-sm font-medium hover:text-zinc-300 transition-colors">
                Products
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-black mb-4">
            Octocat Stickers
          </h1>
          <p className="text-lg text-zinc-600 max-w-2xl">
            Browse our collection of {products.length} unique GitHub Octocat-themed stickers.
            Perfect for laptops, water bottles, and showing your love for open source.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="group relative flex flex-col overflow-hidden rounded-lg border border-zinc-200 bg-white transition-shadow hover:shadow-lg"
            >
              {/* Product Image */}
              <div className="relative aspect-square w-full overflow-hidden bg-zinc-50">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain p-4 transition-transform group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                />
              </div>

              {/* Product Info */}
              <div className="flex flex-1 flex-col p-4">
                <div className="mb-2">
                  <h3 className="text-sm font-medium text-black">
                    {product.name}
                  </h3>
                  <p className="mt-1 text-xs text-zinc-500 capitalize">
                    {product.category}
                  </p>
                </div>
                <p className="mb-4 flex-1 text-sm text-zinc-600 line-clamp-2">
                  {product.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold text-black">
                    ${product.price.toFixed(2)}
                  </span>
                  <button className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-24 bg-black text-white">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-zinc-400">
              &copy; {new Date().getFullYear()} Octodeco. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">
                Terms
              </a>
              <a href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">
                Privacy
              </a>
              <a href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
