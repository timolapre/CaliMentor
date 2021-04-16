export const WORKOUT_DATE_OPTIONS = [
  { id: 1, text: 'Today' },
  { id: 2, text: 'Last week' },
  { id: 3, text: 'Last month' },
  { id: 4, text: 'Last year' },
]

export const WORKOUT_BLOCK_OPTIONS = [
  'Circuit',
  'Single',
  'EMOM',
  'AMRAP',
  'TABATA',
  'For time',
  'Rest',
  'Text',
]

export const WORKOUT_BLOCK_OPTIONS_INFO = {
  Circuit: 'Repeat the circuit of exercises said times',
  Single: 'Do the exercises once',
  EMOM:
    'Every minute on the minute. begin the prescribed number of reps of the exercises at the top of a minute and then rest for whatever time you have left until the next top-of-minute',
  AMRAP: 'As many reps as possible.',
  TABATA:
    'Said second intervals of high intensity exercise, followed by said seconds of rest, and repeated said times',
  'For time': 'Do the exercises as fast as possible in good form',
  Rest: 'Take some rest and drink some water',
  Text: 'Do as described',
}
