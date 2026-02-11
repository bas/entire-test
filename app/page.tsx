import Image from "next/image";
import Link from "next/link";
import Header from "@/app/components/layout/Header";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <main className="mx-auto max-w-7xl px-6">
        <div className="flex min-h-[calc(100vh-200px)] flex-col items-center justify-center text-center">
          <div className="mb-8">
            <Image
              src="/images/products/original.png"
              alt="Octocat"
              width={200}
              height={200}
              priority
              className="mx-auto"
            />
          </div>
          <h1 className="mb-6 text-5xl font-bold tracking-tight text-black sm:text-6xl lg:text-7xl">
            Welcome to Octodeco
          </h1>
          <p className="mb-10 max-w-2xl text-xl text-zinc-600 sm:text-2xl">
            Your one-stop shop for premium GitHub Octocat-themed stickers.
            Show your love for open source with style.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link
              href="/products"
              className="rounded-lg bg-black px-8 py-4 text-base font-medium text-white transition-colors hover:bg-zinc-800"
            >
              Browse Stickers
            </Link>
            <a
              href="#about"
              className="rounded-lg border border-zinc-300 px-8 py-4 text-base font-medium text-black transition-colors hover:bg-zinc-50"
            >
              Learn More
            </a>
          </div>
        </div>

        {/* About Section */}
        <div id="about" className="py-24">
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-black text-white text-2xl font-bold">
                  20
                </div>
              </div>
              <h3 className="mb-2 text-lg font-semibold text-black">
                Unique Designs
              </h3>
              <p className="text-zinc-600">
                Choose from 20 different Octocat characters, each with their own personality
              </p>
            </div>
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-black text-white text-2xl font-bold">
                  $
                </div>
              </div>
              <h3 className="mb-2 text-lg font-semibold text-black">
                Affordable Prices
              </h3>
              <p className="text-zinc-600">
                Premium quality stickers starting at just $3.49
              </p>
            </div>
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-black text-white text-2xl font-bold">
                  ★
                </div>
              </div>
              <h3 className="mb-2 text-lg font-semibold text-black">
                High Quality
              </h3>
              <p className="text-zinc-600">
                Durable, weather-resistant stickers perfect for any surface
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black text-white">
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
