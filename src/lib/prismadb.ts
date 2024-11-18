import { PrismaClient } from "@prisma/client"

const globalForPrisma = global as unknown as { prismadb: PrismaClient }

export const prismadb =
  globalForPrisma.prismadb ||
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  })

if (process.env.NODE_ENV !== "production") globalForPrisma.prismadb = prismadb

export default prismadb
