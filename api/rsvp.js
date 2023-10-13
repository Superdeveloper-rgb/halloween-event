import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(request, response) {
    if(request.query.rsvp) {
        await prisma.invitee.update({
            where: {name: request.query.n},
            data: {RSVP: request.query.rsvp === "true" }
        });
    
        response.status(200).json({
          status: "success"
        });
    }else if(request.query.n){
        await prisma.invitee.upsert({
            where: {name: request.query.n},
            create: {
                name: request.query.n,
                scanned: new Date(),
                opened: new Date()
            },
            update: {
                opened: new Date()
            }
        });
    }
  } 