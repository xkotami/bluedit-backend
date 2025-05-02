// Execute: npx ts-node seed.ts

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const main = async () => {
    // Clear existing data
    await prisma.comment.deleteMany();
    await prisma.post.deleteMany();
    await prisma.community.deleteMany();
    await prisma.user.deleteMany();

    // Create users
    const user1 = await prisma.user.create({
        data: {
            username: 'tech_enthusiast',
            email: 'tech@example.com',
            password: 'securepassword123',
            points: 150
        }
    });

    const user2 = await prisma.user.create({
        data: {
            username: 'coding_ninja',
            email: 'coder@example.com',
            password: 'securepassword456',
            points: 420
        }
    });

    const user3 = await prisma.user.create({
        data: {
            username: 'forum_moderator',
            email: 'mod@example.com',
            password: 'securepassword789',
            points: 1000
        }
    });

    // Create communities
    const webDevCommunity = await prisma.community.create({
        data: {
            name: 'Web Development',
            description: 'All things web development - frontend, backend, and everything in between',
            users: {
                connect: [{ id: user1.id }, { id: user2.id }, { id: user3.id }]
            }
        }
    });

    const javascriptCommunity = await prisma.community.create({
        data: {
            name: 'JavaScript',
            description: 'Discussion about JavaScript and its ecosystem',
            users: {
                connect: [{ id: user1.id }, { id: user2.id }]
            }
        }
    });

    // Create posts
    const reactPost = await prisma.post.create({
        data: {
            title: 'React 19 is coming - what to expect?',
            content: 'I heard about some new features coming in React 19. Anyone have details?',
            userId: user1.id,
            communityId: webDevCommunity.id
        }
    });

    const typescriptPost = await prisma.post.create({
        data: {
            title: 'TypeScript vs JavaScript - when to use which?',
            content: 'As a new developer, I\'m confused about when to use TypeScript vs plain JavaScript. Any advice?',
            userId: user2.id,
            communityId: javascriptCommunity.id
        }
    });

    // Create comments with hierarchical relationships
    const mainComment = await prisma.comment.create({
        data: {
            text: 'React 19 will include compiler optimizations and better server components support',
            postId: reactPost.id,
            userId: user3.id,
            points: 25
        }
    });

    const reply1 = await prisma.comment.create({
        data: {
            text: 'Do you know if it will still require Babel?',
            postId: reactPost.id,
            userId: user2.id,
            parentId: mainComment.id,
            points: 10
        }
    });

    await prisma.comment.create({
        data: {
            text: 'From what I heard, the compiler will handle everything natively',
            postId: reactPost.id,
            userId: user3.id,
            parentId: reply1.id,
            points: 5
        }
    });

    await prisma.comment.create({
        data: {
            text: 'TypeScript is great for large projects, but can be overkill for small scripts',
            postId: typescriptPost.id,
            userId: user1.id,
            points: 15
        }
    });

    await prisma.comment.create({
        data: {
            text: 'I recommend starting with JavaScript and switching to TypeScript when you feel the need',
            postId: typescriptPost.id,
            userId: user3.id,
            points: 12
        }
    });

    console.log('Seed data created successfully!');
};

(async () => {
    try {
        await main();
        await prisma.$disconnect();
    } catch (error) {
        console.error('Error seeding data:', error);
        await prisma.$disconnect();
        process.exit(1);
    }
})();