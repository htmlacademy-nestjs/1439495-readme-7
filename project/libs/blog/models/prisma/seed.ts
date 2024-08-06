import { PrismaClient, Type } from '@prisma/client';

const FIRST_POST_UUID = '6d308040-96a2-4162-bea6-2338e9976540';
const SECOND_POST_UUID = 'ab04593b-da99-4fe3-8b4b-e06d82e2efdd';

const FIRST_USER_ID = '658170cbb954e9f5b905ccf4';
const SECOND_USER_ID = '6581762309c030b503e30512';

function getPosts() {
  return [
    {
      id: FIRST_POST_UUID,
      userId: FIRST_USER_ID,
      type: 'Link',
      isDraft: false,
      publishDate: new Date(),
      comments: [{
        userId: SECOND_USER_ID,
        text: 'Some message'
      }]
    },
    {
      id: SECOND_POST_UUID,
      userId: SECOND_USER_ID,
      type: 'Quote',
      isDraft: false,
      publishDate: new Date(),
      comments: []
    }
  ];
}

function getLinkPost() {
  return {
    postId: FIRST_POST_UUID,
    link: 'Some URL'
  }
}

function getQuotePost() {
  return {
    postId: SECOND_POST_UUID,
    text: 'Text of quote',
    author: 'Author name'
  }
}

async function seedDb(prismaClient: PrismaClient) {
  const mockPosts = getPosts();
  for (const post of mockPosts) {
    await prismaClient.post.upsert({
      where: { id: post.id },
      update: {},
      create: {
        id: post.id,
        userId: post.userId,
        type: post.type as Type,
        isDraft: post.isDraft,
        publishDate: post.publishDate,
        comments: post.comments ? {
          create: post.comments
        } : undefined
      }
    });
  }
  const linkPostInfo = getLinkPost();
  await prismaClient.link.upsert({
    where: { postId: linkPostInfo.postId },
    update: {},
    create: {
      postId: linkPostInfo.postId,
      link: linkPostInfo.link
    }
  })
  const quotePostInfo = getQuotePost();
  await prismaClient.quote.upsert({
    where: { postId: quotePostInfo.postId },
    update: {},
    create: {
      postId: quotePostInfo.postId,
      text: quotePostInfo.text,
      author: quotePostInfo.author
    }
  })
}

async function bootstrap() {
  const prismaClient = new PrismaClient();

  try {
    await seedDb(prismaClient);
    globalThis.process.exit(0);
  } catch (error: unknown) {
    console.error(error);
    globalThis.process.exit(1);
  } finally {
    await prismaClient.$disconnect();
  }
}

bootstrap();
