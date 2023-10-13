const { PrismaClient } = require('@prisma/client')

export default function handler(request, response) {
    const prisma = new PrismaClient();
    if(request.query.rsvp && request.query.n) {
        prisma.invitee.update({
            where: {name: request.query.n},
            data: {RSVP: request.query.rsvp === "true" }
        }).then(()=>{
            response.status(200).json({
              status: "success"
            })
        })
    }else if(request.query.n){
        prisma.invitee.upsert({
            where: {name: request.query.n},
            create: {
                name: request.query.n,
                scanned: new Date(),
                opened: new Date()
            },
            update: {
                opened: new Date()
            }
        }).then(()=>{
            response.status(200).json({
                status: "success"
            })
        })
    }else{
        console.log("error");
        response.status(501);
    }
  } 