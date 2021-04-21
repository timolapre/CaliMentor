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
    'Every minute on the minute. Do the number of reps of the exercises within the time given. The remaining time serves as recovery.',
  AMRAP: 'As many reps as possible within given time.',
  TABATA:
    'Work and rest alternating. Do the exercise for the given work seconds an then rest for given rest seconds.',
  'For time': 'Do the exercises as fast as possible in good form',
  Rest: 'Take some rest and drink some water',
  Text: 'Do as described',
}
