<svelte:head>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
</svelte:head>

<script>
  import {sf, games} from "./store.js";
  let games_var;
  let game_names;
  games.subscribe(g => {games_var = g; game_names = games_var.map(a => a.name);})
  let current_game = "Test"
  let current_game_name;
  let current_timeslots_per_round;
  let current_priority;
  let current_categories;

  const addGame = () => {
    const replacement = 
      {name: current_game_name,
        n_timeslots_per_round: current_timeslots_per_round,
        priority: current_priority,
        n_categories: current_categories}
    if (current_game == 'New Game') {
      $games = $games.concat(replacement)
    } else {
      $games = $games.map(g => g.name == current_game ? replacement : g)
    }
    console.log($games)
  }

  const submitData = () => {
    const data = {
      days: $sf.days,
      n_timeslots_day: $sf.n_timeslots_day,
      timeslot_length: $sf.timeslot_length,
      games: $games
    }
    console.log(data)
  }
</script>

<body>
  <div>
    <div id="aside"></div>
    <div id="form-1">
      <div class="form-group">
        <label for="n_days">No. of days for Sportsfest</label>
        <input type="number" class="form-control" id="n_days" placeholder="1" bind:value={$sf.days}/>
      </div>

      <div class="form-group">
        <label for="n_timeslots_per_day">Number of Timeslots Per Day</label>
        <input type="number" class="form-control" id="n_timeslots_per_day" placeholder="1" bind:value={$sf.n_timeslots_per_day}/>
      </div>
      <div class="form-group">
        <label for="timeslot_length">Length of Timeslot in Sportsfest</label>
        <input type="number" class="form-control" id="timeslot_length" placeholder="1" bind:value={$sf.timeslot_length}/>
      </div>
    </div>
    <div id="form-2">
      <div class="form-group">
        <label for="game-selection">Game Selection</label>
        <select class="form-control" id="game-selection" bind:value={current_game}>
          {#each game_names as g}
            <option>{g}</option>
          {/each}
          <option>New Game</option>
        </select>
      </div>

      <div class="form-group">
        <label for="game-name">Name</label>
        <input type="text" class="form-control" id="game-name" bind:value={current_game_name}/>
      </div>

      <div class="form-group">
        <label for="n_timeslots_per_round">Number of Timeslots Per Rounds</label>
        <input type="number" class="form-control" id="n_timeslots_per_round" bind:value={current_timeslots_per_round}/>
      </div>

      <div class="form-group">
        <label for="priority">Priority</label>
        <select class="form-control" bind_value={current_priority}>
          <option>Major</option>
          <option>Minor</option>
          <option>Junior</option>
        </select>
      </div>

      <div class="form-group">
        <label for="categories">Number of categories</label>
        <input type="number" class="form-control" id="categories" bind:value={current_categories}/>
      </div>

      <button class="btn btn-primary" on:click={addGame}>Add game</button>
    </div>
  </div>
  <button class="btn btn-primary" on:click={submitData}>Submit data</button>
</body>

<style>
  div {
    margin: 1em;
  }
</style>
