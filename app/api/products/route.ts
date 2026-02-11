import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import type { Product } from "@/app/types/product";
import fs from "fs/promises";
import path from "path";

export async function GET(request: NextRequest): Promise<NextResponse<Product[]>> {
  try {
    const filePath = path.join(process.cwd(), "app/api/products/products.json");
    const fileContents = await fs.readFile(filePath, "utf8");
    const products: Product[] = JSON.parse(fileContents);

    return NextResponse.json(products);
  } catch (error) {
    console.error("Error reading products:", error);
    return NextResponse.json(
      [] as Product[],
      { status: 500 }
    );
  }
}
