"use strict";
// Execute: npx ts-node seed.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt_1 = require("bcrypt");
const prisma = new client_1.PrismaClient();
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    // Clear existing data
    yield prisma.comment.deleteMany();
    yield prisma.post.deleteMany();
    yield prisma.community.deleteMany();
    yield prisma.user.deleteMany();
    // Hash passwords
    const password = yield (0, bcrypt_1.hash)('password123', 10);
    // Create users
    const users = yield Promise.all([
        prisma.user.create({
            data: {
                username: 'tech_guru',
                email: 'techguru@example.com',
                password,
                points: 250
            }
        }),
        prisma.user.create({
            data: {
                username: 'code_wizard',
                email: 'codewizard@example.com',
                password,
                points: 500
            }
        }),
        prisma.user.create({
            data: {
                username: 'moderator_pro',
                email: 'modpro@example.com',
                password,
                points: 1200
            }
        }),
        prisma.user.create({
            data: {
                username: 'design_master',
                email: 'design@example.com',
                password,
                points: 350
            }
        }),
        prisma.user.create({
            data: {
                username: 'data_explorer',
                email: 'data@example.com',
                password,
                points: 400
            }
        }),
        prisma.user.create({
            data: {
                username: 'cloud_architect',
                email: 'cloud@example.com',
                password,
                points: 600
            }
        })
    ]);
    // Create communities
    const communities = yield Promise.all([
        prisma.community.create({
            data: {
                name: 'Web Development',
                description: 'Discuss all aspects of web development',
                users: {
                    connect: users.map(user => ({ id: user.id }))
                }
            }
        }),
        prisma.community.create({
            data: {
                name: 'JavaScript',
                description: 'Everything about JavaScript and its ecosystem',
                users: {
                    connect: users.slice(0, 4).map(user => ({ id: user.id }))
                }
            }
        }),
        prisma.community.create({
            data: {
                name: 'Data Science',
                description: 'Machine learning, data analysis, and visualization',
                users: {
                    connect: [users[4], users[2]].map(user => ({ id: user.id }))
                }
            }
        }),
        prisma.community.create({
            data: {
                name: 'DevOps',
                description: 'CI/CD, infrastructure as code, and cloud computing',
                users: {
                    connect: [users[5], users[1], users[2]].map(user => ({ id: user.id }))
                }
            }
        }),
        prisma.community.create({
            data: {
                name: 'UI/UX Design',
                description: 'User interface and experience design principles',
                users: {
                    connect: [users[3], users[0]].map(user => ({ id: user.id }))
                }
            }
        })
    ]);
    // Create posts
    const posts = yield Promise.all([
        // Web Development posts
        prisma.post.create({
            data: {
                title: 'React vs Vue in 2024 - which one to learn?',
                content: 'I want to focus on one framework this year. Which one has better job prospects?',
                userId: users[0].id,
                communityId: communities[0].id
            }
        }),
        prisma.post.create({
            data: {
                title: 'Best practices for REST API authentication',
                content: 'What are the current best practices for securing REST APIs?',
                userId: users[1].id,
                communityId: communities[0].id
            }
        }),
        // JavaScript posts
        prisma.post.create({
            data: {
                title: 'TypeScript 5.0 features you should know',
                content: 'A breakdown of the most important features in the latest TypeScript release',
                userId: users[2].id,
                communityId: communities[1].id
            }
        }),
        prisma.post.create({
            data: {
                title: 'Why I switched from npm to pnpm',
                content: 'My experience with pnpm and the performance benefits I observed',
                userId: users[3].id,
                communityId: communities[1].id
            }
        }),
        // Data Science posts
        prisma.post.create({
            data: {
                title: 'Getting started with PyTorch for deep learning',
                content: 'A beginner-friendly guide to PyTorch basics',
                userId: users[4].id,
                communityId: communities[2].id
            }
        }),
        // DevOps posts
        prisma.post.create({
            data: {
                title: 'Terraform vs Pulumi - which IaC tool to choose?',
                content: 'Comparing these two infrastructure as code solutions',
                userId: users[5].id,
                communityId: communities[3].id
            }
        }),
        prisma.post.create({
            data: {
                title: 'Kubernetes networking explained',
                content: 'Understanding pods, services, and ingress controllers',
                userId: users[1].id,
                communityId: communities[3].id
            }
        }),
        // UI/UX Design posts
        prisma.post.create({
            data: {
                title: 'Accessibility checklist for web applications',
                content: 'Essential accessibility requirements every web app should meet',
                userId: users[3].id,
                communityId: communities[4].id
            }
        })
    ]);
    // Create comments with hierarchical relationships
    yield Promise.all([
        // React vs Vue post comments
        prisma.comment.create({
            data: {
                text: 'React has a larger job market but Vue is growing fast in certain regions',
                postId: posts[0].id,
                userId: users[2].id,
                points: 25
            }
        }).then(parentComment => {
            return Promise.all([
                prisma.comment.create({
                    data: {
                        text: 'I agree, React is safer for job hunting but Vue is more enjoyable to work with',
                        postId: posts[0].id,
                        userId: users[3].id,
                        parentId: parentComment.id,
                        points: 15
                    }
                }),
                prisma.comment.create({
                    data: {
                        text: 'Vue is dominating in Asia while React is stronger in North America',
                        postId: posts[0].id,
                        userId: users[4].id,
                        parentId: parentComment.id,
                        points: 10
                    }
                }).then(reply => {
                    return prisma.comment.create({
                        data: {
                            text: 'Interesting regional differences! Do you have any data to back this up?',
                            postId: posts[0].id,
                            userId: users[1].id,
                            parentId: reply.id,
                            points: 5
                        }
                    });
                })
            ]);
        }),
        // REST API authentication post comments
        prisma.comment.create({
            data: {
                text: 'JWT with refresh tokens is still the most common approach I see',
                postId: posts[1].id,
                userId: users[5].id,
                points: 20
            }
        }),
        prisma.comment.create({
            data: {
                text: 'Consider using HTTP-only cookies for better security against XSS',
                postId: posts[1].id,
                userId: users[2].id,
                points: 18
            }
        }),
        // TypeScript post comments
        prisma.comment.create({
            data: {
                text: 'The new decorators implementation is a game changer!',
                postId: posts[2].id,
                userId: users[0].id,
                points: 22
            }
        }).then(comment => {
            return prisma.comment.create({
                data: {
                    text: 'Can you elaborate on how you\'re using decorators?',
                    postId: posts[2].id,
                    userId: users[1].id,
                    parentId: comment.id,
                    points: 12
                }
            });
        }),
        // pnpm post comments
        prisma.comment.create({
            data: {
                text: 'The disk space savings with pnpm are incredible for monorepos',
                postId: posts[3].id,
                userId: users[5].id,
                points: 30
            }
        }),
        // PyTorch post comments
        prisma.comment.create({
            data: {
                text: 'Great introduction! Would love to see a follow-up on CNN architectures',
                postId: posts[4].id,
                userId: users[2].id,
                points: 15
            }
        }),
        // Terraform vs Pulumi post comments
        prisma.comment.create({
            data: {
                text: 'Pulumi is great if you want to use real programming languages instead of HCL',
                postId: posts[5].id,
                userId: users[0].id,
                points: 25
            }
        }).then(comment => {
            return Promise.all([
                prisma.comment.create({
                    data: {
                        text: 'But Terraform has much better documentation and community support',
                        postId: posts[5].id,
                        userId: users[3].id,
                        parentId: comment.id,
                        points: 18
                    }
                }),
                prisma.comment.create({
                    data: {
                        text: 'The Terraform provider ecosystem is unmatched',
                        postId: posts[5].id,
                        userId: users[4].id,
                        parentId: comment.id,
                        points: 12
                    }
                })
            ]);
        }),
        // Accessibility post comments
        prisma.comment.create({
            data: {
                text: 'Don\'t forget about keyboard navigation testing!',
                postId: posts[7].id,
                userId: users[2].id,
                points: 20
            }
        })
    ]);
    console.log('Seed data created successfully!');
    console.log(`Created:
- ${users.length} users
- ${communities.length} communities
- ${posts.length} posts
- Numerous comments with thread structures`);
});
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield main();
        yield prisma.$disconnect();
    }
    catch (error) {
        console.error('Error seeding data:', error);
        yield prisma.$disconnect();
        process.exit(1);
    }
}))();
