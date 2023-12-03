import { createClient } from "@libsql/client"
import { PrismaLibSQL } from "@prisma/adapter-libsql"
import { PrismaClient } from "@prisma/client"

const libsql = createClient({
  url: `${process.env.TURSO_DATABASE_URL}`,
  authToken: `${process.env.TURSO_AUTH_TOKEN}`,
})

const adapter = new PrismaLibSQL(libsql)

declare global {
  var prisma: PrismaClient | undefined
}

const prismadb =
  globalThis.prisma ||
  new PrismaClient({
    adapter,
    log:
      process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  })
if (process.env.NODE_ENV !== "production") globalThis.prisma = prismadb

export default prismadb
