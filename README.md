This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Setup

Fill in the correct environment variables in `.env.local`:

```bash
# .env.local
CONTENTFUL_SPACE_ID=
CONTENTFUL_ACCESS_TOKEN=
```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Possible Improvements

If there was a contentful management token provided, the typescript types could be generated automatically using the contentful cli. This would allow for better type safety and less boilerplate code.
I've included the sample npm script in the package.json.
