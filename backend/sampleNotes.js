const APP_NAME = process.env.REACT_APP_NAME || 'JotPot'

const sampleNotes = [
  {
    name: `Welcome to ${APP_NAME}`,
    description: `${APP_NAME} is your personal note-taking space. Create notes, organize by tags, and access them anywhere. Sign in to start building your own collection.`,
    tag: "General"
  },
  {
    name: "Meeting Agenda Template",
    description: "1. Review action items from last meeting\n2. Project status updates\n3. Blockers and dependencies\n4. Next steps and owners\n5. Any other business",
    tag: "Work"
  },
  {
    name: "Book Reading List",
    description: "Books to read:\n- Atomic Habits — James Clear\n- Deep Work — Cal Newport\n- The Pragmatic Programmer\n- Clean Code — Robert C. Martin\n- Thinking, Fast and Slow — Daniel Kahneman",
    tag: "Personal"
  },
  {
    name: "App Ideas",
    description: "Things to build:\n- Habit tracker with streaks and reminders\n- Local event discovery app\n- Recipe organizer with ingredient lists\n- Pomodoro timer with integrated notes\n- Expense splitter for group trips",
    tag: "Ideas"
  },
  {
    name: "Weekly Workout Plan",
    description: "Monday: Upper body strength\nTuesday: 5 km run\nWednesday: Rest or yoga\nThursday: Lower body strength\nFriday: HIIT cardio\nWeekend: Active recovery — walk or cycle",
    tag: "Health"
  }
]

module.exports = sampleNotes
