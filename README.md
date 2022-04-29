This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

Install dependecies 

```bash
yarn install
```

copy .env.example with command (windows) and update info
```
copy .env.example .env
```

add schema to local host then seed data
```bash
npx prisma db push
npx prisma db seed
```

Run the development server:

```bash
yarn dev
```

