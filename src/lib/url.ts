import { Session } from 'next-auth'
import crypto from 'crypto'
import { prisma } from './prisma'
import { Url } from '@prisma/client'

export const getUrlById = async (id: string) => {
  const url = await prisma.url.findUnique({
    where: {
      id: id,
    },
    include: {
      user: true,
    },
  })
  return url
}

export const createUrl = async (originalUrl: string, session: Session) => {
  if (!session?.user?.email) {
    throw new Error('No email present in Session object')
  }

  let randomString = crypto.randomBytes(4).toString('hex')
  let shortUrl = process.env.NEXTAUTH_URL + '/' + randomString

  while (true) {
    const count = await prisma.url.count({ where: { shortUrl: shortUrl } })
    if (count === 0) {
      break
    }
    randomString = crypto.randomBytes(4).toString('hex')
    shortUrl = process.env.NEXTAUTH_URL + '/' + randomString
  }

  const url = await prisma.url.create({
    data: {
      originalUrl,
      shortUrl,
      user: {
        connect: {
          email: session?.user?.email,
        },
      },
    },
  })
  return url
}

export const getUrlsForUser = async (
  id: string,
  skip: number = 0,
  take: number = 10
): Promise<IPaginatedUrls> => {
  const results = await Promise.all([
    prisma.url.findMany({
      skip: skip,
      take: take,
      where: { userId: id },
      include: {
        user: true,
      },
    }),
    prisma.url.count({
      where: {
        userId: id,
      },
    }),
  ])

  return {
    results: results[0] ?? [],
    totalCount: results[1] ?? 0,
    skip: skip,
    take: take,
  }
}
