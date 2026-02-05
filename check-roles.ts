import { db } from "./lib/db";

async function main() {
    const users = await db.user.findMany();
    console.log("Registered Users:");
    users.forEach((u: any) => {
        console.log(`- ${u.email}: ${u.role}`);
    });
}

main();
