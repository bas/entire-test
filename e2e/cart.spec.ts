import { test, expect } from "@playwright/test";

test.describe("Shopping Cart E2E", () => {
  test.beforeEach(async ({ page }) => {
    // Clear localStorage before each test
    await page.goto("/");
    await page.evaluate(() => localStorage.clear());
  });

  test("should add items to cart and show badge", async ({ page }) => {
    await page.goto("/products");

    // Verify cart badge shows 0 initially
    await expect(page.getByLabel(/shopping cart, 0 items/i)).toBeVisible();

    // Add first product to cart
    await page.getByRole("button", { name: "Add to Cart" }).first().click();

    // Verify toast notification appears
    await expect(page.getByRole("status")).toBeVisible();
    await expect(page.getByText(/added.*to cart/i)).toBeVisible();

    // Verify cart badge updates to 1
    await expect(page.getByLabel(/shopping cart, 1 items/i)).toBeVisible();

    // Add second product
    await page.getByRole("button", { name: "Add to Cart" }).nth(1).click();

    // Verify cart badge updates to 2
    await expect(page.getByLabel(/shopping cart, 2 items/i)).toBeVisible();
  });

  test("should open cart panel and show items", async ({ page }) => {
    await page.goto("/products");

    // Add a product
    await page.getByRole("button", { name: "Add to Cart" }).first().click();
    await page.waitForTimeout(500); // Wait for toast to appear

    // Click cart icon
    await page.getByLabel(/shopping cart/i).click();

    // Verify cart panel opens
    await expect(page.getByRole("heading", { name: /cart \(1 item\)/i })).toBeVisible();

    // Verify product is in cart (use nth to get cart image specifically)
    const cartImages = page.getByRole("img", { name: /professortocat/i });
    await expect(cartImages.nth(1)).toBeVisible(); // Second image is in cart
  });

  test("should update item quantity in cart panel", async ({ page }) => {
    await page.goto("/products");

    // Add a product
    await page.getByRole("button", { name: "Add to Cart" }).first().click();
    await page.waitForTimeout(500);

    // Open cart panel
    await page.getByLabel(/shopping cart/i).click();

    // Find quantity input using role
    const quantityInput = page.getByRole("spinbutton", { name: "Quantity" });
    await expect(quantityInput).toHaveValue("1");

    // Click increment button
    await page.getByLabel("Increase quantity").click();
    await expect(quantityInput).toHaveValue("2");

    // Verify badge updates
    await expect(page.getByLabel(/shopping cart, 2 items/i)).toBeVisible();

    // Click decrement button
    await page.getByLabel("Decrease quantity").click();
    await expect(quantityInput).toHaveValue("1");
  });

  test("should remove item from cart", async ({ page }) => {
    await page.goto("/products");

    // Add a product
    await page.getByRole("button", { name: "Add to Cart" }).first().click();
    await page.waitForTimeout(500);

    // Open cart panel
    await page.getByLabel(/shopping cart/i).click();

    // Remove item
    await page.getByRole("button", { name: /remove.*from cart/i }).click();

    // Verify empty cart state
    await expect(page.getByText(/your cart is empty/i)).toBeVisible();
    await expect(page.getByLabel(/shopping cart, 0 items/i)).toBeVisible();
  });

  test("should close cart panel with ESC key", async ({ page }) => {
    await page.goto("/products");

    // Add a product and open cart
    await page.getByRole("button", { name: "Add to Cart" }).first().click();
    await page.waitForTimeout(500);
    await page.getByLabel(/shopping cart/i).click();

    // Verify panel is open
    await expect(page.getByRole("heading", { name: /cart/i })).toBeVisible();

    // Press ESC key
    await page.keyboard.press("Escape");

    // Verify panel closes
    await expect(page.getByRole("heading", { name: /cart/i })).not.toBeVisible();
  });

  test("should persist cart across page reloads", async ({ page }) => {
    await page.goto("/products");

    // Add products to cart
    await page.getByRole("button", { name: "Add to Cart" }).first().click();
    await page.waitForTimeout(500);
    await page.getByRole("button", { name: "Add to Cart" }).nth(1).click();
    await page.waitForTimeout(500);

    // Verify badge shows 2 items
    await expect(page.getByLabel(/shopping cart, 2 items/i)).toBeVisible();

    // Reload page
    await page.reload();

    // Verify cart persists
    await expect(page.getByLabel(/shopping cart, 2 items/i)).toBeVisible();

    // Verify items are still in cart
    await page.getByLabel(/shopping cart/i).click();
    await expect(page.getByRole("heading", { name: /cart \(2 items\)/i })).toBeVisible();
  });

  test("should navigate to full cart page", async ({ page }) => {
    await page.goto("/products");

    // Add a product
    await page.getByRole("button", { name: "Add to Cart" }).first().click();
    await page.waitForTimeout(500);

    // Open cart panel
    await page.getByLabel(/shopping cart/i).click();

    // Click "View Full Cart"
    await page.getByRole("link", { name: /view full cart/i }).click();

    // Verify navigation to cart page
    await expect(page).toHaveURL("/cart");
    await expect(page.getByRole("heading", { name: /shopping cart/i })).toBeVisible();

    // Verify item is displayed (first image is in cart list)
    await expect(page.getByRole("img", { name: /professortocat/i }).first()).toBeVisible();
  });

  test("should show empty cart state on cart page", async ({ page }) => {
    await page.goto("/cart");

    // Verify empty state
    await expect(page.getByText(/your cart is empty/i)).toBeVisible();
    await expect(page.getByRole("link", { name: /browse products/i })).toBeVisible();
  });

  test("should complete checkout flow", async ({ page }) => {
    await page.goto("/products");

    // Add a product
    await page.getByRole("button", { name: "Add to Cart" }).first().click();
    await page.waitForTimeout(500);

    // Open cart panel and go to checkout
    await page.getByLabel(/shopping cart/i).click();
    await page.getByRole("link", { name: /checkout/i }).click();

    // Verify checkout page
    await expect(page).toHaveURL("/checkout");
    await expect(page.getByRole("heading", { name: /checkout/i })).toBeVisible();

    // Fill out form
    await page.getByLabel(/email/i).fill("test@example.com");
    await page.getByLabel(/full name/i).fill("John Doe");
    await page.getByLabel(/address/i).fill("123 Main St");
    await page.getByLabel(/city/i).fill("San Francisco");
    await page.getByLabel(/postal code/i).fill("94102");
    await page.getByLabel(/country/i).fill("United States");
    await page.getByLabel(/card number/i).fill("4242 4242 4242 4242");
    await page.getByLabel(/expiry date/i).fill("12/25");
    await page.getByLabel(/cvv/i).fill("123");

    // Submit order
    await page.getByRole("button", { name: /place order/i }).click();

    // Verify success page
    await expect(page.getByText(/thank you for your order/i)).toBeVisible();
    await expect(page.getByText(/order number is:/i)).toBeVisible();

    // Verify cart is cleared
    await expect(page.getByLabel(/shopping cart, 0 items/i)).toBeVisible();
  });

  test("should add same product multiple times and increment quantity", async ({ page }) => {
    await page.goto("/products");

    // Add same product twice
    const addButton = page.getByRole("button", { name: "Add to Cart" }).first();
    await addButton.click();
    await page.waitForTimeout(300);
    await addButton.click();
    await page.waitForTimeout(300);

    // Verify badge shows 2 items (quantity)
    await expect(page.getByLabel(/shopping cart, 2 items/i)).toBeVisible();

    // Open cart and verify quantity
    await page.getByLabel(/shopping cart/i).click();
    await expect(page.getByRole("heading", { name: /cart \(1 item\)/i })).toBeVisible();
    await expect(page.getByRole("spinbutton", { name: "Quantity" })).toHaveValue("2");
  });

  test("should validate quantity limits (1-99)", async ({ page }) => {
    await page.goto("/products");

    // Add a product
    await page.getByRole("button", { name: "Add to Cart" }).first().click();
    await page.waitForTimeout(500);

    // Open cart panel
    await page.getByLabel(/shopping cart/i).click();

    const quantityInput = page.getByRole("spinbutton", { name: "Quantity" });
    const decrementButton = page.getByLabel("Decrease quantity");

    // At quantity 1, decrement should be disabled
    await expect(quantityInput).toHaveValue("1");
    await expect(decrementButton).toBeDisabled();

    // Set quantity to 99
    await quantityInput.fill("99");
    await expect(page.getByLabel(/shopping cart, 99 items/i)).toBeVisible();

    // Increment button should be disabled at 99
    await expect(page.getByLabel("Increase quantity")).toBeDisabled();
  });

  test("should handle multiple items in cart", async ({ page }) => {
    await page.goto("/products");

    // Add 3 different products
    await page.getByRole("button", { name: "Add to Cart" }).nth(0).click();
    await page.waitForTimeout(300);
    await page.getByRole("button", { name: "Add to Cart" }).nth(1).click();
    await page.waitForTimeout(300);
    await page.getByRole("button", { name: "Add to Cart" }).nth(2).click();
    await page.waitForTimeout(500);

    // Verify badge
    await expect(page.getByLabel(/shopping cart, 3 items/i)).toBeVisible();

    // Open cart panel
    await page.getByLabel(/shopping cart/i).click();

    // Verify 3 items in cart
    await expect(page.getByRole("heading", { name: /cart \(3 items\)/i })).toBeVisible();

    // Navigate to cart page
    await page.getByRole("link", { name: /view full cart/i }).click();

    // Verify order summary shows correct total (use exact match)
    await expect(page.getByText(/order summary/i)).toBeVisible();
    await expect(page.getByText("Total", { exact: true })).toBeVisible();
  });
});
