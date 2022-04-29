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

