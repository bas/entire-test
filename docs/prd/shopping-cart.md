# Product Requirements Document: Shopping Cart

## 1. Overview

- **Title**: Shopping Cart Functionality
- **Author**: Product Team
- **Date**: 2026-02-11
- **Status**: Draft
- **Version**: 1.0

## 2. Problem Statement

### Current State
Octodeco currently displays product listings with "Add to Cart" buttons, but clicking these buttons has no effect. Users cannot save products, review their selections, or proceed to checkout. This creates a poor user experience and prevents the demo from functioning as a realistic e-commerce site.

### Who Experiences This Problem?
- **Potential customers** browsing the sticker catalog who want to purchase multiple items
- **Demo viewers** evaluating Octodeco as an e-commerce template
- **Developers** looking for a reference implementation of shopping cart patterns in Next.js 16

### Why Solve This Now?
Without cart functionality, Octodeco is incomplete as an e-commerce demo. The cart is a fundamental feature that users expect from any online store. Implementing this feature will:
- Complete the core user journey (browse → add to cart → checkout)
- Demonstrate Next.js 16 client-side state management patterns
- Showcase modern React 19 patterns for interactive UIs
- Provide a foundation for future features (saved carts, wishlists, etc.)

### Impact of Not Solving
- Demo appears incomplete and unprofessional
- Users cannot experience the full e-commerce workflow
- Missing code examples for developers using this as a template
- Reduced credibility as a production-ready template

## 3. Goals & Success Metrics

### Primary Goals
1. Enable users to add, view, update, and remove products from their shopping cart
2. Persist cart data across browser sessions using localStorage
3. Provide clear visual feedback on cart status (item count, totals)
4. Maintain fast performance and responsive UI
5. Follow established Octodeco design patterns and conventions

### Success Metrics
- **Functional**: 100% of cart operations (add, remove, update) work without errors
- **Performance**: Cart operations complete in <50ms
- **Persistence**: Cart data survives page reload and browser restart
- **UX**: Cart state updates are immediately visible to users
- **Code Quality**: All cart features covered by unit tests (>80% coverage)

### Non-Goals (Out of Scope for MVP)
- ❌ User authentication or account-based carts
- ❌ Real payment processing integration
- ❌ Server-side cart persistence or sync across devices
- ❌ Promo codes or discount functionality
- ❌ Cart abandonment tracking or email reminders
- ❌ Saved carts or wishlists
- ❌ Guest checkout with shipping information
- ❌ Inventory management or stock checking

## 4. User Stories & Personas

### Primary Persona: Casual Browser
**Profile**: Developer or GitHub enthusiast browsing fun Octocat stickers for personal use

**User Stories**:
1. As a casual browser, I want to add multiple stickers to my cart so that I can purchase several items at once
2. As a casual browser, I want to see how many items are in my cart without leaving the current page
3. As a casual browser, I want to quickly review my cart contents without navigating away from browsing
4. As a casual browser, I want to adjust quantities in my cart so that I can buy multiple copies of the same sticker
5. As a casual browser, I want to see the total price update automatically when I change quantities
6. As a casual browser, I want to remove items from my cart if I change my mind
7. As a casual browser, I want my cart to persist if I close and reopen my browser

### Secondary Persona: Demo Evaluator
**Profile**: Developer evaluating Octodeco as a potential template for their own e-commerce project

**User Stories**:
1. As a demo evaluator, I want to see a complete cart implementation to understand best practices
2. As a demo evaluator, I want to review the code structure for cart state management
3. As a demo evaluator, I want to see how cart data persists using localStorage

## 5. Requirements

### Functional Requirements

#### FR-1: Add to Cart
- **FR-1.1**: Users can click "Add to Cart" button on any product card to add one unit of that product to their cart
- **FR-1.2**: System shows visual feedback (toast notification or animation) when item is added
- **FR-1.3**: Cart icon badge updates immediately to show new item count
- **FR-1.4**: Adding the same product multiple times increases quantity rather than creating duplicate entries
- **FR-1.5**: System prevents adding invalid or non-existent products

#### FR-2: View Cart
- **FR-2.1**: Users can click the cart icon in the header to open a slide-over cart panel
- **FR-2.2**: Cart panel displays all cart items with: product image, name, price per unit, quantity, subtotal
- **FR-2.3**: Cart panel shows subtotal, estimated tax (if applicable), and total amount
- **FR-2.4**: Users can click "View Full Cart" to navigate to dedicated `/cart` page
- **FR-2.5**: Empty cart displays helpful message with link back to products
- **FR-2.6**: Cart panel can be closed by clicking outside, pressing ESC, or clicking close button

#### FR-3: Update Quantities
- **FR-3.1**: Users can increase/decrease item quantity using +/- buttons or direct input
- **FR-3.2**: Quantity accepts values from 1 to 99
- **FR-3.3**: System validates quantity input and rejects invalid values (< 1, > 99, non-numeric)
- **FR-3.4**: Subtotal and total update immediately when quantity changes
- **FR-3.5**: Changes persist to localStorage automatically

#### FR-4: Remove from Cart
- **FR-4.1**: Users can remove individual items using a "Remove" or trash icon button
- **FR-4.2**: System shows confirmation for remove action (optional, based on UX preference)
- **FR-4.3**: Cart updates immediately upon removal
- **FR-4.4**: If cart becomes empty after removal, show empty cart state

#### FR-5: Cart Icon & Badge
- **FR-5.1**: Cart icon appears in header navigation on all pages
- **FR-5.2**: Badge displays total number of items (not unique products) in cart
- **FR-5.3**: Badge shows "0" or is hidden when cart is empty
- **FR-5.4**: Badge updates immediately when cart changes
- **FR-5.5**: Clicking cart icon opens slide-over panel

#### FR-6: Cart Page
- **FR-6.1**: Dedicated `/cart` page accessible via header link or slide-over panel
- **FR-6.2**: Cart page displays same information as slide-over panel with more space
- **FR-6.3**: Cart page includes order summary sidebar with subtotal, tax, and total
- **FR-6.4**: Cart page includes "Continue Shopping" link back to products
- **FR-6.5**: Cart page includes "Proceed to Checkout" button

#### FR-7: Data Persistence
- **FR-7.1**: Cart data saves to browser localStorage on every change
- **FR-7.2**: Cart data loads from localStorage on app initialization
- **FR-7.3**: Cart persists across page refreshes and browser restarts
- **FR-7.4**: System handles localStorage quota exceeded errors gracefully
- **FR-7.5**: System handles private browsing mode (localStorage disabled) gracefully

#### FR-8: Checkout Flow (Mock)
- **FR-8.1**: Users can click "Proceed to Checkout" from cart page
- **FR-8.2**: System navigates to `/checkout` page (placeholder)
- **FR-8.3**: Checkout page displays order summary and mock form fields
- **FR-8.4**: Submitting checkout shows success message (no actual processing)
- **FR-8.5**: Success state clears cart and thanks user

### Non-Functional Requirements

#### NFR-1: Performance
- **NFR-1.1**: Cart operations (add, remove, update) complete in <50ms
- **NFR-1.2**: Cart panel opens/closes with smooth animation (<300ms)
- **NFR-1.3**: localStorage read/write operations don't block UI interactions
- **NFR-1.4**: Cart badge updates don't cause layout shifts

#### NFR-2: Accessibility
- **NFR-2.1**: Cart functionality keyboard navigable (Tab, Enter, ESC)
- **NFR-2.2**: Screen readers announce cart updates and changes
- **NFR-2.3**: Focus management works correctly when opening/closing cart panel
- **NFR-2.4**: All interactive elements meet WCAG 2.1 AA contrast requirements
- **NFR-2.5**: Cart quantity controls have accessible labels

#### NFR-3: Browser Support
- **NFR-3.1**: Works in all modern browsers (Chrome, Firefox, Safari, Edge - last 2 versions)
- **NFR-3.2**: Mobile responsive design for cart panel and cart page
- **NFR-3.3**: Touch-friendly controls on mobile devices (min 44x44px tap targets)

#### NFR-4: Error Handling
- **NFR-4.1**: Gracefully handles localStorage unavailable (private browsing)
- **NFR-4.2**: Validates product data before adding to cart
- **NFR-4.3**: Recovers from corrupted localStorage data
- **NFR-4.4**: Shows user-friendly error messages for failures

#### NFR-5: Code Quality
- **NFR-5.1**: Cart state managed using React Context or similar pattern
- **NFR-5.2**: Unit tests cover cart operations (>80% coverage)
- **NFR-5.3**: TypeScript types for all cart-related data structures
- **NFR-5.4**: Follow Octodeco code conventions (see `.github/copilot-instructions.md`)

## 6. User Experience

### User Flow: Adding Items to Cart

```
[Browse Products Page]
         ↓
[Click "Add to Cart" button]
         ↓
[Toast notification: "Added to cart!"]
         ↓
[Cart badge increments: 0 → 1]
         ↓
[User continues browsing OR clicks cart icon]
         ↓
[Cart panel slides open from right]
         ↓
[User reviews items, adjusts quantities]
         ↓
[User clicks "View Full Cart" OR "Checkout"]
         ↓
[Navigate to /cart page]
         ↓
[Review order, update quantities]
         ↓
[Click "Proceed to Checkout"]
         ↓
[Mock checkout page]
         ↓
[Click "Place Order" (mock)]
         ↓
[Success message, cart cleared]
```

### Entry Points
- "Add to Cart" button on product cards
- Cart icon in header navigation
- Direct URL navigation to `/cart`

### Exit Points
- Continue shopping (back to products)
- Close cart panel (stays on current page)
- Complete checkout (mock success page)
- Clear cart (empty state)

### Cart Panel Wireframe (Slide-Over)

```
┌────────────────────────────────────┐
│ Cart (2 items)              [X]    │
├────────────────────────────────────┤
│                                    │
│ ┌──────┐                           │
│ │ IMG  │  Professortocat    $4.99  │
│ └──────┘  Qty: [−] 1 [+]    Remove │
│           Subtotal: $4.99          │
│                                    │
│ ┌──────┐                           │
│ │ IMG  │  Dinotocat         $5.49  │
│ └──────┘  Qty: [−] 2 [+]    Remove │
│           Subtotal: $10.98         │
│                                    │
├────────────────────────────────────┤
│ Subtotal:            $15.97        │
│ Shipping:         Calculated       │
├────────────────────────────────────┤
│ Total:               $15.97        │
│                                    │
│ [View Full Cart]  [Checkout →]     │
└────────────────────────────────────┘
```

### Cart Page Layout

```
┌─────────────────────────────────────────────────┐
│ Header (with cart icon showing count)          │
├─────────────────────────────────────────────────┤
│                                                 │
│  Shopping Cart                                  │
│  ┌─────────────────┬──────────────┐            │
│  │ Cart Items      │ Order Summary│            │
│  │                 │              │            │
│  │ [Product 1]     │ Subtotal: $X │            │
│  │ [Product 2]     │ Tax: $X      │            │
│  │ [Product 3]     │ Total: $X    │            │
│  │                 │              │            │
│  │ [Continue       │ [Proceed to  │            │
│  │  Shopping]      │  Checkout →] │            │
│  └─────────────────┴──────────────┘            │
│                                                 │
└─────────────────────────────────────────────────┘
```

### Empty Cart State

```
┌────────────────────────────────────┐
│              🛒                     │
│                                    │
│      Your cart is empty            │
│                                    │
│  Start adding some Octocat         │
│  stickers to get started!          │
│                                    │
│      [Browse Products]             │
│                                    │
└────────────────────────────────────┘
```

## 7. Technical Considerations

### Architecture

#### State Management
- **Approach**: React Context + useReducer hook for cart state
- **Location**: Create `app/contexts/CartContext.tsx`
- **Actions**: `ADD_ITEM`, `REMOVE_ITEM`, `UPDATE_QUANTITY`, `CLEAR_CART`, `LOAD_CART`
- **State Shape**:
```typescript
interface CartState {
  items: CartItem[];
  isOpen: boolean; // For slide-over panel
}

interface CartItem {
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}
```

#### Component Structure
```
app/
  ├── components/
  │   ├── cart/
  │   │   ├── CartIcon.tsx          # Header cart icon with badge
  │   │   ├── CartPanel.tsx         # Slide-over panel
  │   │   ├── CartItem.tsx          # Individual cart item row
  │   │   ├── CartSummary.tsx       # Subtotal/total display
  │   │   └── AddToCartButton.tsx   # Reusable add button
  │   └── layout/
  │       └── Header.tsx            # Updated with CartIcon
  ├── contexts/
  │   └── CartContext.tsx           # Cart state management
  ├── hooks/
  │   ├── useCart.tsx              # Hook to access cart context
  │   └── useLocalStorage.tsx       # Persistence helper
  ├── cart/
  │   └── page.tsx                  # Full cart page route
  ├── checkout/
  │   └── page.tsx                  # Mock checkout page
  └── products/
      └── page.tsx                  # Updated with AddToCartButton
```

### Data Model

#### localStorage Schema
```json
{
  "octodeco_cart": {
    "items": [
      {
        "productId": "professortocat",
        "name": "Professortocat",
        "price": 4.99,
        "image": "/images/products/Professortocat_v2.png",
        "quantity": 1
      }
    ],
    "updatedAt": "2026-02-11T10:30:00Z"
  }
}
```

#### Key: `octodeco_cart`
- Namespaced to avoid conflicts with other apps
- Stores array of cart items
- Includes timestamp for cache invalidation

### localStorage Utilities

```typescript
// hooks/useLocalStorage.tsx
export function useLocalStorage<T>(key: string, initialValue: T) {
  // Handle SSR (no window object)
  // Handle private browsing (localStorage unavailable)
  // Parse/stringify JSON safely
  // Return [value, setValue] tuple
}
```

### Cart Context Provider

```typescript
// contexts/CartContext.tsx
export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, dispatch] = useReducer(cartReducer, initialState);

  // Load from localStorage on mount
  useEffect(() => {
    // Load cart from localStorage
  }, []);

  // Save to localStorage on cart changes
  useEffect(() => {
    // Save cart to localStorage
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}
```

### Performance Optimizations
- Memoize cart calculations (subtotal, item count) using `useMemo`
- Debounce localStorage writes (100ms) to avoid excessive I/O
- Use `React.memo()` for CartItem components to prevent unnecessary re-renders
- Lazy load cart panel component (code splitting)

### Migration Strategy
1. Create cart context and hooks (no UI changes)
2. Add cart icon to header (non-functional)
3. Implement add to cart functionality
4. Build cart panel (slide-over)
5. Build cart page
6. Add mock checkout flow
7. Add tests

### Testing Strategy
- **Unit Tests**: Cart context reducer actions, localStorage hooks
- **Integration Tests**: Adding/removing items, quantity updates, persistence
- **Component Tests**: CartPanel, CartItem, AddToCartButton
- **E2E Tests** (optional): Full user journey from browse to checkout

## 8. Dependencies & Assumptions

### Dependencies
- **Next.js 16**: App Router, server/client components
- **React 19**: Context API, hooks (useState, useReducer, useEffect, useMemo)
- **TypeScript 5**: Type safety for cart data structures
- **Tailwind CSS 4**: Styling for cart components
- **localStorage API**: Browser storage (no polyfill needed for modern browsers)

### Assumptions
1. All products are in stock and available for purchase
2. No shipping cost calculation needed for MVP
3. Tax calculation not required (can show "Calculated at checkout")
4. All prices in USD, no currency conversion
5. Users access site from modern browsers with localStorage support
6. No authentication required for cart functionality
7. Cart data doesn't need server-side validation (demo context)
8. One size/variant per product (no product options)

### Potential Blockers
- None identified for MVP scope

## 9. Open Questions

### For Product Decision
- [x] **Resolved**: Should we add a "Clear Cart" button? **Decision**: Yes, add to cart page only
- [ ] Should we show a confirmation dialog when removing items? **Recommendation**: No, use undo toast instead
- [ ] Should cart badge show item count (3) or unique products (2)? **Recommendation**: Item count for consistency
- [ ] What's the max quantity per item? **Recommendation**: 99

### For Design Decision
- [ ] Toast notification style and duration? **Recommendation**: 3 seconds, bottom-right, Tailwind default styling
- [ ] Cart panel width on desktop? **Recommendation**: 384px (24rem)
- [ ] Animation style for cart panel? **Recommendation**: Slide from right with backdrop fade

### For Technical Investigation
- [ ] Should we use a cart reducer library (Zustand, Jotai) instead of Context? **Recommendation**: Start with Context, can refactor later if needed
- [ ] Do we need optimistic updates for cart operations? **Recommendation**: Not necessary since localStorage is synchronous

## 10. Timeline & Milestones

### Phase 1: Foundation (MVP Core)
- Set up cart context and state management
- Implement localStorage persistence
- Create basic cart data types and utilities
- **Deliverable**: Working cart state that persists

### Phase 2: Add to Cart
- Update "Add to Cart" buttons to be functional
- Implement add to cart logic
- Add toast notifications
- Update cart badge in header
- **Deliverable**: Users can add products to cart

### Phase 3: Cart Panel UI
- Build slide-over cart panel component
- Implement cart item display
- Add quantity controls
- Add remove item functionality
- **Deliverable**: Working cart panel with full CRUD operations

### Phase 4: Cart Page
- Create `/cart` page route
- Build full cart page layout
- Implement order summary component
- Add empty state
- **Deliverable**: Dedicated cart page matching slide-over functionality

### Phase 5: Checkout Flow (Mock)
- Create `/checkout` page route
- Build mock checkout form
- Implement success state
- Clear cart on completion
- **Deliverable**: Complete end-to-end flow (mock)

### Phase 6: Polish & Testing
- Write unit tests for cart logic
- Write component tests
- Add loading states and error handling
- Accessibility review and fixes
- Performance optimization
- **Deliverable**: Production-ready cart feature with tests

### MVP vs. Full Feature Scope

#### MVP (Must Have)
- ✅ Add to cart
- ✅ Remove from cart
- ✅ Update quantities
- ✅ Cart icon with badge
- ✅ Cart panel (slide-over)
- ✅ Cart page
- ✅ localStorage persistence
- ✅ Mock checkout

#### Future Enhancements (Nice to Have)
- 🔮 Promo code support
- 🔮 Save for later / wishlist
- 🔮 Cart sharing (shareable URL)
- 🔮 Recently viewed products
- 🔮 Cart abandonment tracking
- 🔮 Real payment integration
- 🔮 Server-side cart sync
- 🔮 Bulk operations (clear all, add multiple)

### Release Strategy
- **Phased rollout**: Not applicable (demo app)
- **Feature flag**: Not needed for MVP
- **A/B testing**: Not applicable
- **Rollback plan**: Git revert if critical issues found

---

## Appendix

### Related Documents
- [Octodeco Copilot Instructions](../../.github/copilot-instructions.md)
- [Product Data Structure](../../app/api/products/products.json)
- [Next.js 16 Documentation](https://nextjs.org/docs)

### Revision History
| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-02-11 | Product Team | Initial draft |

### Glossary
- **Cart**: Collection of products user intends to purchase
- **Cart Item**: Single product entry in cart (includes quantity)
- **Badge**: Visual indicator showing item count on cart icon
- **Slide-over**: Panel that slides in from screen edge
- **localStorage**: Browser API for client-side data persistence
- **Mock checkout**: Non-functional checkout for demo purposes
