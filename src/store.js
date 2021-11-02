import { writable } from 'svelte/store';

export const sf = writable({
  days: 1,
  n_timeslots_day: 1,
  timeslot_length: 1,
  start_date: "2021-09-20"
})

export const games = writable([{
  name: 'Test',
  n_timeslots_round: 1,
  priority: 'Major',
  n_categories: 3
}])
