<svelte:head>
  <title>Sportsfest Scheduler</title>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
</svelte:head>

<script>
  import {sf, games} from "./store.js";
  import {sendData} from './services/scheduler.js';
  let games_var;
  let game_names;
  games.subscribe(g => {games_var = g; game_names = games_var.map(a => a.name);})
  let current_game = "Test"
  let current_game_name;
  let current_timeslots_per_round;
  let current_priority;
  let current_categories;
  let email;

  const addGame = () => {
    const replacement = 
      {name: current_game_name,
        n_timeslots_round: current_timeslots_per_round,
        priority: current_priority,
        n_categories: current_categories}
    if (current_game == 'New Game') {
      $games = $games.concat(replacement)
    } else {
      $games = $games.map(g => g.name == current_game ? replacement : g)
    }
    console.log($games)
    console.log(current_priority)
  }

  const clearGameData = () => {
    current_game_name = ""
    current_timeslots_per_round = 1
    current_categories = 1
  }

  const submitData = (e) => {
    e.preventDefault()
    const data = {
      days: $sf.days,
      n_timeslots_day: $sf.n_timeslots_day,
      timeslot_length: $sf.timeslot_length,
      start_date: $sf.start_date,
      email: email,
      games: $games
    }
    console.log(data)
    sendData    (data)
  }
</script>


<body>
  <div>
    <div class="row me-0 ">
      <div class="intro col-sm-12 col-md-4 pb-3">
         <p class="mb-0 px-3 py-5 ">The SF Scheduler is an SIP Project created by Julyanna Huang, Jairo Jaropojop 
          and Adrian Mayores with the goal of creating an algorithm that would streamline the process 
          of Sportsfest Schedule making. 
          <br><br>
          Please fill out the necessary data and the Computer will do the rest.
          <br><br>
           New to the Scheduler? Maybe a tutorial could help.</p>
           <!-- Button trigger modal -->
          <div class="row offset-4 col-4 offset-4">
            <button type="button" class="btn tutorial" data-bs-toggle="modal" data-bs-target="#exampleModal">
              Tutorial
            </button>
          </div>

          <!-- Modal -->
          <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">Tutorial</h5>
                  <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  Welcome to the Tutorial for the Sportsfest Scheduler. Lets begin with GAME SETTINGS, which is shown below:
                  <img src="Images/GameSet.png" alt="Game Settings">
                  Game Settings will be straight forward, fill it out appropriately and we will move on to the next area.
                  
                  Go ahead and leave this tutorial and do that, or press next in this modal for the next part of the tutorial.
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal2">Next</button>
                </div>
              </div>
            </div>
          </div>

          <div class="modal fade" id="exampleModal2" tabindex="-1" role="dialog" aria-labelledby="exampleModal2Label" aria-hidden="true">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModal2Label">Tutorial Part 2</h5>
                  <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  Next lets look at Game Settings.(Pictured below)
                  <img src="Images/SavGame.png" alt="Saving Game">
                  <br>
                  To tell the algorithm what games the sportsfest has, you need to input them. Click 'Game Selection'and select 'New Game'.
                  <img src="Images/GameSel.png" alt="Game Selection">
                  <img src="Images/SelNew.png" alt="Selecting New Game">
                  <br>
                  
                  Then fill out the information of the game. Please make sure all the inputs fields are filled. Once done, Click the 'Add Game' button. 

                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal3">Next</button>
                </div>
              </div>
            </div>
          </div>
          
          <div class="modal fade" id="exampleModal3" tabindex="-1" role="dialog" aria-labelledby="exampleModal3Label" aria-hidden="true">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModal3Label">Tutorial Part 3</h5>
                  <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  Once you've inputted a game via the 'Add Game' button. It will now show on the 'Game Selection'.
                  <img src="Images/Example.png" alt="Example">
                  <img src="Images/Saved.png" alt="Saving done right">
                  <br>
                  Be careful, make sure your game selection is put on 'New Game'. If its put on anything else, it will overwrite the data.
                  Speaking of which, if you which to modify any game, selecting it from the selection and overwriting the data is how you do it.
                  <img src="Images/Mistake.png" alt="Showing a mistake in saving game">
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal4">Next</button>
                </div>
              </div>
            </div>
          </div>

          <div class="modal fade" id="exampleModal4" tabindex="-1" role="dialog" aria-labelledby="exampleModal4Label" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModal4Label">Tutorial Part 4</h5>
                  <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  Keep adding more games via selecting 'New Game', filling up the fields and then saving it until you are finished
                  Then please input your email here.
                  <img src="Images/GiveEmail.png" alt="Where to put email.">
                  This is because the algorithm takes a bit of time. We don't want you to sit around waiting for it to finish so we'll give 
                  the final product to you via email when the algoritm has done it.
                  <br><br>
                  That's all there is to the Schdeuler. Please enjoy the experience.

                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
              </div>
            </div>
          </div>
  
        
      </div>
    
      <div class="forms  col-sm-12 col-md-4 pb-3">
        <p>Sportsfest Settings</p>
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
        <div class="form-group">
          <label for="start_date">Start Date</label>
          <input type="date" class="form-control" id="start_date" bind:value={$sf.start_date}/>
        </div>
      </div>
     
      

      <div class="forms col-sm-12 col-md-4 pb-3">
        <p>Game Settings(WIP)</p>
        <div class="form-group">
          <label for="game-selection">Game Selection</label>
          <select class="form-control" id="game-selection" bind:value={current_game} on:change={clearGameData}>
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
          <select class="form-control" bind:value={current_priority}>
            <option>Major</option>
            <option>Minor</option>
            <option>Junior</option>
          </select>
        </div>

        <div class="form-group">
          <label for="categories">Number of categories</label>
          <input type="number" class="form-control" id="categories" bind:value={current_categories}/>
        </div>
      
      <br>
      <button class="btn custom-color" on:click={addGame}>Add game</button>
    </div>
  </div>
  <div class="results ">
    <p class="col-12mb-0 px-3 pt-3 pb-1 ">Did you already Input everything that you need? If so, please fill in your email below. The algorithm takes 
      usually 2 hours to create a result. To make it convenient for you, it'll email you the result once it has been created. After filling 
      in your email, Click the button to create a schedule and wait for the results to be emailed.</p>
    <form class="col-8 offset-2 pb-3">
      <div class>
        <label for="exampleInputEmail1" class="form-label">Email address</label>
        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" bind:value={email}>
        <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
      </div>
      <br>
      <button class="btn custom-color" on:click={submitData}>Submit data</button>
    </form>  
  </div>
  
  <footer>
    <span class=" d-block p-2 text-white ">Developed by Huang, J., Jaropojop, J., Mayores, A.
      <br> Copyright &copy;  2021 PSHS-EVC All rights reserved </span>
    
  </footer>
  
</body>

<style>
  footer {
    color:#FCF7FF;
    text-align:center;
    background-color: #0C0910;
    padding: 0.8em;
    
  }
  .modal-content{
    color:#0C0910;
  }
  .intro{
    background-color:#373F47;
    color:#F5F5F5;
    
  }
  .forms{
    background-color:#F5F5F5;
  }
  .results{
    background-color: #2E82DC;
    color: #F5F5F5;
  }
  h3{
    text-align: center;
  }
  #emailHelp{
    color: #F5F5F5;
  }
  button.tutorial{
    background-color: #2E82DC;
    color: #F5F5F5;
  }  
  button.custom-color{
    background-color: #F24F40;
    color: #F5F5F5;
  }
</style>

