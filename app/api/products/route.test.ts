import { describe, it, expect, vi, beforeEach } from "vitest";

const mockProducts = [
  {
    id: "professortocat",
    name: "Professortocat",
    description: "The scholarly Octocat ready to teach you the ways of code",
    price: 4.99,
    image: "/images/products/Professortocat_v2.png",
    category: "academic",
  },
  {
    id: "terracottocat",
    name: "Terracottocat",
    description: "A warm, earthy Octocat with rustic charm",
    price: 3.99,
    image: "/images/products/Terracottocat_Single.png",
    category: "artistic",
  },
];

const { mockReadFile, mockJoin, mockNextResponseJson } = vi.hoisted(() => {
  return {
    mockReadFile: vi.fn(),
    mockJoin: vi.fn(),
    mockNextResponseJson: vi.fn(),
  };
});

vi.mock("fs/promises", () => ({
  default: {
    readFile: mockReadFile,
  },
}));

vi.mock("path", () => ({
  default: {
    join: mockJoin,
  },
}));

vi.mock("next/server", () => ({
  NextRequest: class MockNextRequest {},
  NextResponse: {
    json: mockNextResponseJson,
  },
}));

describe("GET /api/products", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockJoin.mockReturnValue("/mock/path/products.json");
    mockNextResponseJson.mockImplementation((data: unknown, init?: ResponseInit) => {
      return new Response(JSON.stringify(data), {
        status: init?.status || 200,
        headers: {
          "content-type": "application/json",
        },
      });
    });
  });

  it("should return products successfully", async () => {
    mockReadFile.mockResolvedValue(JSON.stringify(mockProducts));

    const { GET } = await import("./route");
    const mockRequest = new Request("http://localhost:3000/api/products");
    const response = await GET(mockRequest as any);

    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data).toEqual(mockProducts);
    expect(mockReadFile).toHaveBeenCalledWith("/mock/path/products.json", "utf8");
    expect(mockNextResponseJson).toHaveBeenCalledWith(mockProducts);
  });

  it("should return 500 and empty array on error", async () => {
    const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    mockReadFile.mockRejectedValue(new Error("File not found"));

    const { GET } = await import("./route");
    const mockRequest = new Request("http://localhost:3000/api/products");
    const response = await GET(mockRequest as any);

    expect(response.status).toBe(500);
    const data = await response.json();
    expect(data).toEqual([]);
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Error reading products:",
      expect.any(Error)
    );
    expect(mockNextResponseJson).toHaveBeenCalledWith([], { status: 500 });

    consoleErrorSpy.mockRestore();
  });

  it("should handle invalid JSON gracefully", async () => {
    const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    mockReadFile.mockResolvedValue("invalid json");

    const { GET } = await import("./route");
    const mockRequest = new Request("http://localhost:3000/api/products");
    const response = await GET(mockRequest as any);

    expect(response.status).toBe(500);
    const data = await response.json();
    expect(data).toEqual([]);
    expect(consoleErrorSpy).toHaveBeenCalled();
    expect(mockNextResponseJson).toHaveBeenCalledWith([], { status: 500 });

    consoleErrorSpy.mockRestore();
  });

  it("should return empty array when products.json is empty", async () => {
    mockReadFile.mockResolvedValue("[]");

    const { GET } = await import("./route");
    const mockRequest = new Request("http://localhost:3000/api/products");
    const response = await GET(mockRequest as any);

    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data).toEqual([]);
    expect(mockNextResponseJson).toHaveBeenCalledWith([]);
  });
});
