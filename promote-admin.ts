import { db } from "./lib/db";

async function main() {
    const email = "michellehawns@gmail.com";
    console.log(`Promoting ${email} to ADMIN...`);

    const user = await db.user.update({
        where: { email },
        data: { role: "ADMIN" },
    });

    console.log(`Success! User ${user.email} is now ${user.role}.`);
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await db.$disconnect();
    });
