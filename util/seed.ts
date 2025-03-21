import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    await prisma.user.createMany({
        data: [
            {
                username: 'john_doe',
                password: 'password123',
                profile_pic: 'https://example.com/profile1.jpg',
                email: 'john.doe@example.com',
                reputation: 100,
            },
            {
                username: 'alice_smith',
                password: 'alicepassword',
                profile_pic: 'https://example.com/profile2.jpg',
                email: 'alice.smith@example.com',
                reputation: 200,
            },
            {
                username: 'bob_jones',
                password: 'bobsecure',
                profile_pic: 'https://example.com/profile3.jpg',
                email: 'bob.jones@example.com',
                reputation: 150,
            },
            {
                username: 'charlie_brown',
                password: 'charliepass',
                profile_pic: 'https://example.com/profile4.jpg',
                email: 'charlie.brown@example.com',
                reputation: 50,
            },
            {
                username: 'eve_white',
                password: 'evepassword',
                profile_pic: 'https://example.com/profile5.jpg',
                email: 'eve.white@example.com',
                reputation: 300,
            },
        ],
    })

    console.log('Seed data has been successfully created!')
}

main()
    .catch(e => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
