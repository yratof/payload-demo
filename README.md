# Payload Demo

A local replica of `ungieiendom.no` using **Payload CMS v3** and **Next.js 15**.

## Tech Stack
- **CMS:** Payload 3.38.0 (SQLite adapter)
- **Frontend:** Next.js 15 (App Router)
- **Database:** SQLite (`data/demo.db`)
- **Node:** v20.18.0+ (Required for Next.js 15)

## Setup Instructions

### 1. Prerequisites
Ensure you have **Node.js v20** or higher installed.
```bash
node -v
# Should be v20.x.x or higher
```

### 2. Install Dependencies
```bash
npm install
```
*Note: If you encounter `sharp` issues, ensure your OS architecture matches the installed binary. You may need to explicitly install `@img/sharp-win32-x64` (Windows) or `@img/sharp-linux-x64` (Linux).*

### 3. Seed the Database
This project includes a seed script to populate the SQLite database with demo content.
```bash
npm run seed
```
This will create `data/demo.db` and populate it with sample pages, posts, and media.

### 4. Build the Project
```bash
npm run build
```

### 5. Start the Server
```bash
npm run start
```

The server will run on:
- **Site:** `http://localhost:3000`
- **Admin:** `http://localhost:3000/admin`

## Project Structure
```
src/
├── app/              # Next.js App Router frontend
├── collections/      # Payload collections (Pages, Posts, Media, etc.)
├── globals/          # Payload globals (Header, Footer)
├── blocks/           # Custom block definitions
├── components/       # React components (Header, Footer, Blocks)
├── payload.config.ts # Payload configuration
└── seed.ts           # Database seeder
```

## API Endpoints
Payload exposes a GraphQL and REST API at `/api`.
- **GraphQL:** `http://localhost:3000/api/graphql`
- **REST (Example):** `http://localhost:3000/api/pages`
