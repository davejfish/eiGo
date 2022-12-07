import Words from '../../models/Words.js';

const words = `foo
bar
baz
And
Are
Ape
Ace
Act
Ask
Arm
Age
Ago
Air
Ate
All
But
Bye
Bad
Big
Bed
Bat
Boy
Bus
Bag
Box
Bit
Bee
Buy
Bun
Cub
Cat
Car
Cut
Cow
Cry
Cab
Can
Dad
Dab
Dam
Did
Dug
Den
Dot
Dip
Day
Ear
Eye
Eat
End
Elf
Egg
Far
Fat
Few
Fan
Fun
Fit
Fin
Fox
Fix
Fly
Fry
For
Got
Get
God
Gel
Gas
Hat
Hit
Has
Had
How
Her
His
Hen
Ink
Ice
Ill
Jab
Jug
Jet
Jam
Jar
Job
Jog
Kit
Key
Lot
Lit
Let
Lay
Mat
Man
Mad
Mug
Mix
Map
Mum
Mud
Mom
May
Met
Net
New
Nap
Now
Nod
Net
Not
Nut
Oar
One
Out
Owl
Old
Own
Odd
Our
Pet
Pat
Peg
Paw
Pup
Pit
Put
Pot
Pop
Pin
Rat
Rag
Rub
Row
Rug
Run
Rap
Ram
Sow
See
Saw
Set
Sit
Sir
Sat
Sob
Tap
Tip
Top
Tug
Tow
Toe
Tan
Ten
Two
Use
Van
Vet
Was
Wet
Win
Won
Wig
War
Why
Who
Way
Wow
You
Yes
Yak
Yet
Zip
Zap`;

// split the words based on new line
const wordArr = words.split('\n');

const buildQuery = () => {
  const totalWords = wordArr.length;
  let valueString = '';
  const valueArr = [];
  let i = 0;

  wordArr.forEach((word, index) => {
    const string = `(
      ${`$${i + 1}`},
      ${`$${i + 2}`}),`;
    valueString += string;

    if (index + 1 === totalWords)
      valueString = valueString.slice(0, -1);
    valueArr.push(word, word.length === 3 ? 'E1' : 'E2');
    i += 2;
  });
  return [valueString, valueArr];
};

export default buildQuery;

