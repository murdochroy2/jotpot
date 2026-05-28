const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '.env') })
const mongoose = require('mongoose')
const Notes = require('./models/Notes')
const sampleNotes = require('./sampleNotes')

const GUEST_ID = process.env.GUEST_ID
if (!GUEST_ID) {
  console.error('GUEST_ID not set in backend/.env')
  process.exit(1)
}

const mongoURI = "mongodb://127.0.0.1:27017/jotpot?directConnection=true&serverSelectionTimeoutMS=2000"

async function seed() {
  await mongoose.connect(mongoURI)
  console.log('Connected to MongoDB')

  const result = await Notes.deleteMany({ user: GUEST_ID })
  console.log(`Removed ${result.deletedCount} guest notes from DB (guest notes now served from frontend)`)

  await mongoose.disconnect()
}

seed().catch(err => {
  console.error(err)
  process.exit(1)
})
