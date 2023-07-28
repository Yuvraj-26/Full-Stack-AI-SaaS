# Full Stack SaaS AI Platform with Next.js 13

<img src="docs/1.png">

<img src="docs/0.png">

## Introduction

Aim: Develop a full stack buld of an SaaS AI Platform with Next.js 13, React, Tailwind, Prisma, Stripe

## Deployment Link

https://full-stack-ai-saas.vercel.app/

Note: Some compelx AI generation request may timeout due to timeout set by API routes,
this will be resolved using Vercel AI SDK with the Edge Network, providing faster  generation and content streaming suppoort

## Technology Used
- TSX | Typescript | Javascript 
- React
- Tailwind (shadcn/ui) CSS
- PlanetScale DB Platform
- OpenAI
- ReplicateAI 
- Prisma
- Stripe
- Crisp Messaging Platform
- Clerk


##Features:
- Tailwind design
- Tailwind animations and effects
- Full responsiveness
  <img src="docs/1.png">


- Clerk Authentication (Email, Google, 9+ Social Logins)
- Client form validation and handling using react-hook-form
- Server error handling using react-toast
- Image Generation Tool (Open AI)
- Video Generation Tool (Replicate AI)
- Conversation Generation Tool (Open AI)
- Music Generation Tool (Replicate AI)
- Page loading state
- Stripe monthly subscription
- Free tier with API limiting
- How to write POST, DELETE, and GET routes in route handlers (app/api)
- How to fetch data in server react components by directly accessing database (WITHOUT API! like Magic!)
- How to handle relations between Server and Child components!
- How to reuse layouts

## Prerequisites

**Node version 18.x.x**

### Cloning the repository

```shell
git clone https://github.com/Yuvraj-26/Full-Stack-AI-SaaS-with-Next.js-13.git
```

### Install packages

```shell
npm i
```

### Setup .env file


```js
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

OPENAI_API_KEY=
REPLICATE_API_TOKEN=

DATABASE_URL=

STRIPE_API_KEY=
STRIPE_WEBHOOK_SECRET=

NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### Setup Prisma

Add MySQL Database (I used PlanetScale)

```shell
npx prisma db push

```

### Start the app

```shell
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Available commands

Running commands with npm `npm run [command]`

| command         | description                              |
| :-------------- | :--------------------------------------- |
| `dev`           | Starts a development instance of the app |
| `lint`          | Checks code for errors and warnings |



## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
