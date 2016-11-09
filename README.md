[![Build Status](https://travis-ci.org/lucasfcosta/harray.svg?branch=master)](https://travis-ci.org/lucasfcosta/harray) [![Coverage Status](https://coveralls.io/repos/github/lucasfcosta/harray/badge.svg?branch=master)](https://coveralls.io/github/lucasfcosta/harray?branch=master)

# [Harray](https://lucasfcosta.github.io/harray)

An infinite array implementation in JavaScript.

[![NPM](https://nodei.co/npm/harray.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/harray/)


## Installing

To install Harray you just need to type `npm install harray` on your console.

```
$ npm install harray
```


## Getting Started

A Harray object represents an infinite array. **Every Harray object has elements and a formula used to generate the items in the sequence.**

**If a formula is not provided Harray will use the difference between the last two elements to generate the sequence.**

First of all, let's create a simple Harray with every even number from one until infinity and beyond starting from 0:

```js
'use strict';
const Harray = require('harray');

let even = new Harray(0, 2);

// Getting the third even number (the one on the index 2)
even.get(2); // -> 4
even.get(3); // -> 6
```

Now let's use a formula to generate a sequence in which every value is two times the previous value:

```js
'use strict';
const Harray = require('harray');

let timesTwo = new Harray(1, function(element) {
    // `element` represents the value before the one being calculated now
    return element * 2;
});

timesTwo.get(0); // -> 1
timesTwo.get(1); // -> 2
timesTwo.get(2); // -> 4
timesTwo.get(3); // -> 8
```

You can also use the index value on your formula. So now let's create the worlwide famous Fibonacci Sequence Example™:

```js
'use strict';
const Harray = require('harray');

let fibonacci = new Harray(0, 1, function(element, index) {
    // `element` represents the value before the one being calculated now
    // `this[index - 2]` represents the value before `element`
    if (typeof this[index - 2] === 'undefined') {
        return this[index];
    }
    
    return this[index - 2] + element;
});

fibonacci.get(0); // -> 0
fibonacci.get(1); // -> 1
fibonacci.get(2); // -> 1
fibonacci.get(3); // -> 2
fibonacci.get(4); // -> 3
fibonacci.get(5); // -> 5
```

Don't want to use a formula to create a sequence? Feel free to create a Harray with an infinite cycle:

```js
'use strict';
const Harray = require('harray');

let abc = Harray.cycle('a', 'b', 'c');

abc.get(0); // -> a
abc.get(1); // -> b
abc.get(2); // -> c
abc.get(3); // -> a
abc.get(4); // -> b
abc.get(5); // -> c
```

Oh, and before I forget: every value is calculated once, the other times you ask for it Harray gets it from its "cache".


## "Advanced" Examples

You can also use a [Stream](https://nodejs.org/api/stream.html) to pipe elements of the sequence to wherever you want:

```js
'use strict';
const Harray = require('harray');

// Prints an odd number to the console every two seconds
let harr = new Harray(1, 3);
let positiveOddsStream = harr.getReadableStream();

positiveOddsStream.on('data', function(chunk) {
    // Pauses the stream when it receives data
    positiveOddsStream.pause();

    console.log(chunk.toString());

    // Will resume streaming after two seconds
    setTimeout(function() {
        positiveOddsStream.resume();
    }, 2000);
});
```


## Extending Harray

You can easily insert methods into the Harray prototype using `Harray.addMethod` and they will be immediately available on all your Harray objects.

Let's for example, create a method that is similar to `Harray.get` but instead of returning the value for an index, return two times that value:

```js
'use strict';
const Harray = require('harray');

// Create a function
function getDouble(index) {
    return this.get(index) * 2;
}

// Use `Harray.addMethod` to add the function to the `Harray.prototype` object 
Harray.addMethod('getDouble', getDouble);

let evenNumbers = new Harray(0, 2);

evenNumbers.get(1);         // -> 2
evenNumbers.getDouble(1);   // -> 4
evenNumbers.get(2);         // -> 4
evenNumbers.getDouble(2);   // -> 8
```


## Docs

Make sure to read our [documentation pages](https://lucasfcosta.github.io/harray) and you will discover many other interesting methods available right out of the box. Everything has examples and is explained in detail.


## Contributing

Feel free to send a PR if you have had a nice feature idea or if you found a bug and just solved it, or anything else you think it would be interesting for Harray to have. I'm open to new ideas, don't be afraid of talking to me.

If you want to suggest something or if you've found a bug please use our [Issue Tracker](https://github.com/lucasfcosta/harray/issues) to get in touch with me.


## License

Who cares? This is the internet, live free, buddy.
