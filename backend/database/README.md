# Database setup

1. Create the database:

```sql
CREATE DATABASE sdg_hackathon;
```

2. Apply schema:

```bash
psql -U postgres -d sdg_hackathon -f schema.sql
```

3. Install backend dependencies from `backend/`:

```bash
npm install
```

4. Copy `.env.example` to `.env` and configure PostgreSQL.

5. Generate the demo accounts:

```bash
node database/create-demo-users.js
```

Demo accounts:

```text
admin@example.com / Admin@123
user@example.com  / User@123
```
