# Flyberry Product Catalog — Master (Stub)

Purpose
- Single source of truth for SKU, pack size, and MRP across all 8 categories.
- Fill this first; block packaging/website (Phase 2) until complete.

How To Use
- Edit alongside `product-catalog-master.csv`.
- For each row, finalize: `pack_size_g_ml` (e.g., 250g, 350ml) and `mrp_inr` (e.g., 649).
- Keep `status` as `pending` until SKU is finalized; then set to `active`.
- Add variants only if consumer-visible (e.g., 250g/500g).

Pricing Communication Guardrails (aligns Acts 1–5)
- Entry from ₹49 (chips, trial sizes)
- Popular range ₹299–₹699
- Premium up to ₹2,899 (large packs, premium origins)
- Gift sets up to ₹7,249 (bespoke hampers)

Categories (8)
1) Dates (8 varieties): Ajwa, Medjoul, Kalmi, Mabroom, Deglet Nour, Ameri, Deri, Halawi
2) Date-Based Products: Date Bites, Trail Mix
3) Date Line Products: Date Syrup, Date Powder, Hazelnut Chocolate Spread
4) Exotic Nuts (6): Macadamia, Pecan, Brazil, Hazelnut, Pine, Walnuts
5) Vacuum-Fried Chips (6): Okra, Chickpea, Banana, Sweet Beet, Taro, Coconut
6) Seeds (4): Chia, Pumpkin, Sunflower, Watermelon
7) Berries (8): Strawberries, Blackcurrants, Blueberries, Cherries, Cranberries, Raspberries, Lingonberries, Mixed Dried Fruits
8) Dried Fruits (3): Apricots, Turkish Figs, Afghani Figs

Next Steps
- Fill the CSV fully; export a read-only HTML table for Acts 2/4 appendices.
- Add per-SKU badges (origin, cold chain applicable, Reserve/Premium tier).

