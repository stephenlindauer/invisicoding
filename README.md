# Invisicoding

A‪⁪ ⁪​m⁪⁨e​⁫s⁬⁩s⁨⁨a⁨⁮g​⁫e⁪‪ ⁪​c​⁫o⁬​d⁪⁮i⁪⁫n⁬​g⁨⁪ ⁪‪s​⁫y⁬⁪s⁬​t​⁫e⁪‪m⁪​ ​⁫t⁬⁩h⁬‬a⁨⁮t⁬​ ​⁫h⁪‬i⁪​d⁬⁪e⁬​s​⁫ ⁪‪a⁬​ ⁪⁮s⁪‪e​⁫c⁬‬r⁬⁮e​⁫t⁪‪ ⁬⁩m⁬​e​⁫s‪⁫s⁬​a⁨⁨g⁨⁮e‬⁨ ⁬​i⁫⁩n​⁫ ⁪⁩p⁬‬l⁬⁣a⁬⁩i⁪‪n⁩⁣ text by embedding invisible characters in between visible ones.

Example: [Encoder](https://invisicoding.herokuapp.com/encoder.html) / [Decoder](https://invisicoding.herokuapp.com/decoder.html)

## Why?

A‪⁩f⁬⁩t⁨⁨e⁬⁮r⁬⁨ ⁪‬g​⁫e⁬⁫t⁪​t⁪⁩i​⁫n⁨⁪g⁬⁩ ⁬​t⁨⁪r⁬⁨i⁬‬p⁬⁮p⁬⁣e​⁫d⁪​ ⁪⁨u⁪‪p​⁫ ⁬⁪b⁮​y​⁫ ‬​a⁬‬n⁪‪ ‬⁫i⁪⁨n⁨⁬v​⁫i⁪⁩s⁬​i⁪⁫b⁪​l​⁣e​⁫ ‬⁣c​⁫h⁬⁩a⁪​r⁪⁫a⁬​c​⁫t⁮​e⁪​r⁪⁨ ​⁫i⁬⁩n⁨⁨ ⁪⁬a⁬​ ​⁫b⁨⁨a⁪‬s​⁫h⁬⁪ ⁪⁨c⁨⁪o⁬⁩m​⁫m⁬⁫a⁪⁨n⁬⁮d​⁫ ⁪⁨a⁪‬t⁬‬ ⁬⁮w⁬⁣o​⁫r⁬‬k⁪‪,​⁫ ⁨⁨I⁪‬ ​⁫e‬⁣n​⁫d⁬⁩e⁨⁨d⁨⁮ ​⁫u⁬⁪p⁨⁨ ⁬⁨g⁬‬o⁬⁮i⁬⁣n​⁫g⁬‬ ⁪‪d⁫‪o​⁫w⁣⁬n⁫​ ​⁫a⁫‬ ⁫‬r‪⁣a⁪‪b⁬​b⁪⁫i⁬⁩t⁬​ ⁬⁮hole of invisible characters. I ended up discovering my issue due to a cool little [website](https://www.soscisurvey.de/tools/view-chars.php) that shows the invisible characters in a block of text. Then I found a bunch of different variants and thought, how cool would it be to use these to hide a message inside regular text to pass secret messages back and forth. 

## How does it work?

Each character in a secret message gets translated to a two digit code that represents the ASCII character code (with an offset).

Take the secret message `Hello` and visible message `Invisicoding`.

```
H -> \&#72; -> 41
e -> \&#101; -> 70
l -> \&#108; -> 77
l -> \&#108; -> 77
o -> \&#111; -> 80
```

The `H` is ASCII #72. We subtract 31 so that our valid characterset all fits within 2 digits. This ends up with 41 as our code.

We then lookup the invisible characters from a key. The key is a 10 element array of unicode character codes. For our `H` example, we grab `key[4] + key[1]`.

We then alternate 1 visible character with the two invisible characters from the above mapping. Eg..

`"I" + key[4] + key[1] + "n" + key[7] + key[0] + "v" + key[7] + key[7] + "i" + ...`

In practice, this ends up looking like:

`I‬⁫n⁬​v⁬⁬i⁬⁬s⁪​icoding` (Working example, copy the text and [go try it out for yourself!](https://invisicoding.herokuapp.com/decoder.html))

I made a separate debugging key using ASCII codes for the numbers 0 - 9 which helps visualize this. (See Code > Debugging for details.)

`I41n70v77i77s80icoding`

Here you can see the character codes embedded in the visible message.

## Code

The code is pretty simple and has a few accompanying tests in [src/invisicoding.js](/src/invisicoding.js). You can build and run your own copy of the web UI with `npm run start`. If you make any changes to the source, you'll need to repackage it for use in browser with `npm run package` or `npm run package-dev` (the `package` command minifies and uglifies the output where-as `package-dev` does not). Or you can use the code directly in terminal:

```
$ node
Welcome to Node.js v17.9.0.
Type ".help" for more information.
> const { encode, decode } = require("./src/invisicoding");
undefined
> msg = encode("Hello world", "Invisicoding")
'Hello world'
> decode(msg)
'Invisicoding'
```

**Debugging**

In the source file, there is an additional key provided and commented out that swaps the invisible characters out for ASCII characters 0-9. Using this instead allows you to visualize our character codes in the text.

--
I discovered the infamous invisible character in my bash command <8 hours ago and threw this whole thing together. It currently has it's limitations. It was designed to only accept ASCII characters between 32 (space) and 126 (~). It could be extended to accept more characters by expanding to 3+ invisible characters but was out of scope for my simple demo. If you have feedback or suggestions, please open a ticket and I'd love to hear them!
