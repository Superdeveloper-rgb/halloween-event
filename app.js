import { PrismaClient } from '@prisma/client'
import express from 'express'

const prisma = new PrismaClient()
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', async (req, res) => {
    const name = req.query.n;
    await prisma.invitee.upsert({
        where: {name: req.query.n},
        create: {
            name: req.query.n,
            scanned: new Date(),
            opened: new Date()
        },
        update: {
            opened: new Date()
        }
    });
    res.render('home', { name });
  });

app.get('/rsvp', async (req, res)=>{
    await prisma.invitee.update({
        where: {name: req.query.n},
        data: {RSVP: req.query.rsvp === "true" }
    });
    res.send('Received');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});