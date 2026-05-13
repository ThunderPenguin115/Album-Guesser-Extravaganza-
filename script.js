const albums = [
  /* Here is where all of the albums are stored with their image and their titles */
  { cover: "albums/nightmare.png", Title: "Nightmare" },
  { cover: "albums/a7x.png", Title: "Avenged Sevenfold" },
  { cover: "albums/httk.png", Title: "Hail to the King" },
  { cover: "albums/coe.png", Title: "City of Evil" },
  {
    cover: "albums/bullets.jpg",
    Title: "I brought you my bullets, you brought me your love",
  },
  { cover: "albums/threecheers.jpg", Title: "Three Cheers for Sweet Revenge" },
  { cover: "albums/tbp.jpg", Title: "The Black Parade" },
  { cover: "albums/dd.jpg", Title: "Danger Days" },
  { cover: "albums/od.jpg", Title: "Overly Dedicated" },
  { cover: "albums/section80.png", Title: "Section 80" },
  { cover: "albums/gkmc.jpg", Title: "Good Kidd Maad City" },
  { cover: "albums/tpab.png", Title: "To pimp a butterfly" },
  { cover: "albums/damn.jpg", Title: "DAMN" },
  { cover: "albums/mrmorale.png", Title: "Mr Morale & The Big Steppers" },
  { cover: "albums/gnx.jfif", Title: "GNX" },
  { cover: "albums/wolf.jpg", Title: "Wolf" },
  { cover: "albums/cb.jpg", Title: "Cherry Bomb" },
  { cover: "albums/fb.jfif", Title: "Flower boy" },
  { cover: "albums/igor.jpg", Title: "Igor" },
  { cover: "albums/cmiygl.jpg", Title: "Call me if you get lost" },
  { cover: "albums/dttg.png", Title: "Dont tap the glass" },
  { cover: "albums/tod.jpg", Title: "This old dog" },
  { cover: "albums/hctc.png", Title: "Here comes the cowboy" },
  {
    cover: "albums/gmcogmd.jpg",
    Title: "Give me convenience or give me death",
  },
  { cover: "albums/dirt.jpg", Title: "Dirt" },
  {cover: "albums/nvm.jpg", Title: "Nevermind"},
  {cover: "albums/cali.jpg", Title: "Californication"},
  {cover: "albums/currents.png", Title: "Currents"},
  {cover: "albums/tsr.jpg", Title: "The Slow Rush"},
  {cover: "albums/ihd.png", Title: "Infinite Hyperdeath"},
  {cover: "albums/ih.jpg", Title: "Imperfect Hatred"},
  {cover: "albums/doom.png", Title: "Doom 2016"},
  {cover: "albums/tmb.jpeg", Title: "The Melodic Blues"},
  {cover: "albums/dfmb.jpg", Title: "Die for My"},
  {cover: "albums/eb.jpg", Title: "Everblack"},
  {cover: "albums/am.png", Title: "American Idiot"},
  {cover: "albums/saviors.png", Title: "Saviors"},
  {cover: "albums/ajfa.jpg", Title: "And justice for all..."},
  {cover: "albums/rtl.png", Title: "Ride the lightning"},
  {cover: "albums/mop.jpeg", Title: "Master of Puppets"},
  {cover: "albums/ar.jpg", Title: "Abbey Road"},
  {cover: "albums/bib.png", Title: "Back in Black"},
  {cover: "albums/tdsotm.png", Title: "The Dark Side of The Moon"},
  {cover: "albums/amottfh.jfif", Title: "A Matter of Time: The Final Hour"},
];

// Here is where we will have all of the buttons and other features that will display after the start button is clicked.

let subTitle = document.getElementById("subTitle");
let strtBtn = document.getElementById("strtBtn");
let skipBtn = document.getElementById("skipBtn");
let gameContainer = document.getElementById("gameContainer");
let skips = 55;
let guesses = 3;

function start() {
  subTitle.textContent = "";
  strtBtn.remove();

  // This will randomize the order of the albums.

  shuffleArray(albums);
  shuffleArray(albums);

  let albumCover = document.createElement("img");
  albumCover.id = "albumCover";
  albumCover.alt = "image";
  albumCover.src = albums[0].cover;
  gameContainer.appendChild(albumCover);

  let result = document.createElement("div");
  result.id = "result";
  gameContainer.appendChild(result);

  let input = document.createElement("input");
  input.id = "input";
  input.type = "text";
  input.placeholder = "Ex. With Heaven On Top";
  gameContainer.appendChild(input);

  let breakElement1 = document.createElement("br");
  gameContainer.appendChild(breakElement1);

  let submit = document.createElement("button");
  submit.id = "submit";
  submit.classList = "buttons";
  submit.textContent = "Submit";
  submit.onclick = checkAnswer;
  gameContainer.appendChild(submit);

  let breakElement2 = document.createElement("br");
  gameContainer.appendChild(breakElement2);

  let skipBtn = document.createElement("button");
  skipBtn.id = "skipBtn";
  skipBtn.classList = "buttons";
  skipBtn.textContent = "Skip";
  skipBtn.onclick = skip;
  gameContainer.appendChild(skipBtn);

  result.textContent = "You have 5 guesses to guess each album.";
}

function checkAnswer() {
  let input = document.getElementById("input").value;
  let result = document.getElementById("result");
  let albumCover = document.getElementById("albumCover");

  // guess is correct if the input equals the title or is a > 4 char part of the title
  if ((input.toLowerCase() == albums[0].Title.toLowerCase()) || (input.length > 4 &&
    albums[0].Title.toLowerCase().includes(input.toLowerCase()))) {
    document.getElementById("input").value = "";
    albums.shift();

    if (albums.length === 0) {
      result.textContent = "You reached the end! Good Job!";
      setTimeout(() => {
        location.reload();
      }, 2000);
    }

    albumCover.src = albums[0].cover;
    result.textContent = "Congrats you got it! Now try this one!";
    guesses = 3;
  } else if (input === "") {
    result.textContent = "You have to guess something...";
    document.getElementById("input").value = "";
  } else if (input != albums[0].Title) {
    guesses--;
    document.getElementById("input").value = "";
    result.textContent =
      "Wrong! Try Again! You have " + guesses + " guesses remaining!";

    if (guesses === 0) {
      result.textContent = "You ran out of guesses. You lose! The correct answer was " + albums[0].Title;

      setTimeout(() => {
        location.reload();
      }, 2000);
    }
  }
}

function skip() {
  let result = document.getElementById("result");
  let albumCover = document.getElementById("albumCover");

  document.getElementById("input").value = "";

  if (skips > 0) {
    albumCover.src = albums[1].cover;
    skips--;
    result.textContent =
      "Skipped! The correct answer was " +
      albums[0].Title +
      ". You have " +
      skips +
      " skips remaining.";
    albums.shift();
    guesses = 3;
  } else {
    result.textContent = "You don't have any skips to use...";
  }
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

//Chicken butt
