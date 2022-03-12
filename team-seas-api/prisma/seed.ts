import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.donation.deleteMany();

  const alice = await prisma.donation.create({
    data: {
      count: 1,
      displayName: 'display name',
      email: 'email@email.com',
      message: 'some message',
      mobile: '+25932323233',
      team: 'some team',
    },
  });

  console.log(alice, ' is the created user');
}

main()
  .then((res) => {
    console.log('done!');
  })
  .catch((e) => {
    console.error(e, 'is the error');
  });
