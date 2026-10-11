# বাজার দর (BazarDor)

বাজার দর is a Bangla market price tracker. It shows today's price for everyday
groceries, how much each one moved since yesterday, and what the same item costs
in different bazars across the country. Prices, dates and percentages are all
shown in Bengali numerals.

**Live site:** _add after deploy_

## Technology used

- Next.js 16 with the App Router
- TypeScript
- Tailwind CSS v4 + DaisyUI
- BetterAuth with the MongoDB adapter
- MongoDB Atlas
- React Hot Toast
- React Icons

## Features

1. **Today's price for every product.** All items load from the BazarDor API and
   show the price, the unit, and a badge saying how much it rose or fell, green
   for up and red for down.
2. **Risers and fallers at a glance.** The home page pulls out the six products
   that climbed the most today and the six that dropped the most, so you can see
   the movement without scrolling the whole list.
3. **A live price ticker.** A scrolling strip under the navbar runs through every
   product with its current price and change, and pauses when you hover it.
4. **Category pages with sorting.** Each category has its own page with a sort
   control for default, cheapest first, or most expensive first. Sorting works on
   the real numbers, not the Bengali text.
5. **Market by market breakdown.** Open any product to see the lowest, highest
   and average price, plus a table of what every bazar is charging today.
6. **Accounts with three ways in.** Email and password, Google, or GitHub, all
   through BetterAuth. Product detail pages are protected, and signing out or
   signing in gives you a toast either way.
7. **Editable profile.** The profile page has an update route where you can
   change your name and have it saved back to your account.

## Pages

| Route | What it shows |
| --- | --- |
| `/` | Banner, risers, fallers and every product |
| `/category/[slug]` | One category, with the sort control |
| `/product/[slug]` | Full detail for one product, sign in required |
| `/signin`, `/signup` | Email and social authentication |
| `/profile`, `/profile/update` | Your account and the name update form |

## The API

- All products: `https://openapi.programming-hero.com/api/bazardor/products`
- Categories: `https://openapi.programming-hero.com/api/bazardor/categories`

## Run it locally

Copy `.env.example` to `.env.local` and fill in the values:

```bash
BETTER_AUTH_SECRET=   # any long random string
BETTER_AUTH_URL=http://localhost:3000
MONGODB_URL=          # your MongoDB connection string
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
```

Then:

```bash
npm install
npm run dev
```

Open http://localhost:3000.
