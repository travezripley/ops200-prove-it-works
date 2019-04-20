# Testing JavaScript Code
Second Project in the OPS200 * Module @ San Diego Code School

#Author - Michel Roberts JR.

#Modified by Travis Ripley, * Started Friday April 20th, 2019 13:00
## You don't got to love it, because the hood's gon' love it. 


## Prerequisites

Before you start this project, make sure that you have the `mocha` tool installed globally.

```sh
$ npm install -g mocha@3
```

---

### Introduction

---

In this project we're going to take another look at building Mortgage Calculator with decent unit/integration tests.

- Create a local git repository.
- Build a mini version of Mortgage Calculator.
- Write unit tests in the beginning.
- Write end to end tests toward the end.
- Add a README.md document.
- Push a branch with latest code up to GitHub..

---

### NPM Scripts

---

- `build`: Triggers Webpack build process
- `start`: Runs an Express server that serves the output from `build`

You will be creating two more NPM scripts for this project:

- `test`: Runs your tests
- `submit`: Runs tests to test your tests

---

### High Level Steps

---

1. Initialize the project.
2. Review the project files.
2. Build a calculator with unit tests.
3. Build a mortgage calculator with unit tests.
4. Build a React component with end to end tests.

## Step 1 - Initialize the Project

---

First, we need to perform the usual, repeatable steps to start a new project. Clone the project from [github](https://github.com/SanDiegoCodeSchool/ops200-prove-it-works)

## Step 2 - Review the project files

---

Next, review the files that you have been provided. Notice anything strange? 

There's not much here, other than the bare necessities of a React project and a few helpful developer tools. That's because we're going to take a [Test-Driven Development](https://www.atlassian.com/software-testing) approach to rebuilding a miniature version of Mortgage Calculator. We're not introducing a new business need in this project as our focus will be on the testing aspect of software development.

> Atlassian has great content on the ins and outs of software testing at the link pasted below. You should plan to spend a little time reviewing that after completing this project.
>
> https://www.atlassian.com/software-testing

## Step 3 - Build a calculator with unit tests

---

### Objectives

We're going to build a simple calculator module and force ourselves to write unit tests _before_ we build the calculator module. 

As well as writing tests before code, we will also follow a common process used by developers to write tests called "[Red/Green/Refactor](http://www.jamesshore.com/Blog/Red-Green-Refactor.html)". Take a second to read [this article](http://www.jamesshore.com/Blog/Red-Green-Refactor.html), then come back and continue the assignment.

First, we need to install `mocha` and `chai` as development dependencies in our project.

```sh
$ npm install mocha chai --save-dev
```

It would be a good idea at this point to stop and take some time to read the documentation/quick start guides for both [mocha](https://mochajs.org/) and [chai](http://chaijs.com/) before continuing. This will help you become more fluent with the testing syntax and how it works.

Next, create a folder named `unit` inside the `test` folder within project and create a new file called `calculator.spec.js` containing the following code:

```js
const expect = require('chai').expect;
const Calculator = require('../../src/js/lib/Calculator');

describe('Calculator', () => {
  let calculator = null;

  beforeEach(() => {
    calculator = new Calculator();
  });

  it('should have an add function', () => {
    expect(calculator.add).to.exist;
  });

  it('should add 2 + 2 together correctly', () => {
    expect(calculator.add(2, 2)).to.equal(4);
  });
});
```

This code adds two failing unit tests. The purpose of these two tests are to check that the `add` function in the `calculator` object exists, not only behaves as expected, but also exists in the first place.

With those tests in place, let's add a `test` script to `package.json` to verify that they are working. Add the following key/value pair to the `scripts` section of `package.json`.

```js
"test": "npm run build && mocha test/**/*.spec.js --exit"
```

This command uses the `&&` operator to run two commands sequentially (that is, one after the other). The first command (`npm run build`) compiles your React project, and the second command (`mocha test/**/*.spec.js`) runs the `mocha` command line program, passing in a [glob pattern](https://en.wikipedia.org/wiki/Glob_(programming)) to tell `mocha` to run all tests contained in files that end in `.spec.js`, in any folder under `test`.

Navigate to the project folder in the console and run the following command to run the tests.

```sh
$ npm test
```

These tests should fail, which is reasonable as we haven't built a `calculator` object yet!

Create a new file called `Calculator.js` in `src/js/lib` (you'll need to make that `lib` folder) and add the following code:

```js
module.exports = function Calculator() {
  this.add = function() {

  }
};
```

Try running the tests now. You should see that the first test (the one that checks for the existence of an add function) passes while the second fails. Let's get that test to pass by implementing the add function...

```js
module.exports = function Calculator() {
  this.add = function(x, y) {
    return x + y;
  }
};
```

... followed by running the tests to make sure the code works.

```sh
$ npm test
```

Now that our tests pass, we should do a brief refactor, following the advice of Red-Green-Refactor.

We can leverage ES6 classes to replace the calculator and negate the need to use `this`. Modify `Calculator.js` to look like this:

```js
module.exports = class Calculator {
  add(x, y) {
    return x + y;
  }
}
```

Then, run the tests to make sure the code _still works_. This is often called "regression" testing - running tests to make sure you didn't break anything.

Now that we have those two tests passing, it's your turn. Write a `subtract`, `multiply` and `divide` function in `Calculator.js` in a similar fashion to `add`, following the [Red/Green/Refactor](http://www.jamesshore.com/Blog/Red-Green-Refactor.html) process to write your tests (Write a failing test, then a passing test, then refactor, then repeat).

## Step 4 - Build a Mortgage Calculator constructor function

Next, let's practice writing more tests by encapsulating the mortgage calculation code into it's own module and write 4 accompanying unit tests. Here is some code to get you started:

**src/js/lib/Mortgage.js**
```js
module.exports = class Mortgage {
    constructor(principal, interest, term, period) {
      this.principal = principal;
      this.interest = interest;
      this.term = term;
      this.period = period;
    }
  
    monthlyPayment() {
      const monthlyInterestRate = (this.interest / 100) / this.period
      const numberOfPayments = this.term * this.period
      const compoundedInterestRate = Math.pow((1 + monthlyInterestRate), numberOfPayments)
      const interestQuotient = (monthlyInterestRate * compoundedInterestRate) / ( (Math.pow((1 + monthlyInterestRate), numberOfPayments)) - 1)
      const monthlyPayment = this.principal * interestQuotient
      return monthlyPayment
    }
  }
```

You will also need to create another `.spec.js` file in `test/unit`. Here is some code to get you started:

**test/unit/mortgage.spec.js**
```js
const expect = require('chai').expect;
const Mortgage = require('../../src/js/lib/Mortgage');

describe('Mortgage Calculator', () => {
    
});
```

Your task is to write at least 4 unit tests


## Step 5 - Build a React component with end to end tests

Next, let's write some end to end (e2e) tests using [NightmareJS](http://www.nightmarejs.org/) to make sure our React component will work as expected.

A large benefit of end to end testing is realized once you create tests that ensure that common user paths (such as adding items to a shopping cart) are working and kindly alert future developers when their new code breaks this revenue-generating feature.

> NightmareJS a high-level browser automation library that runs your website inside a "headless" (think invisible) browser and allows you to interact with it using JavaScript.
> 
> You should use their [GitHub README](https://github.com/segmentio/nightmare) as a reference to the code you're about to see.

Create a new folder in `test` called `e2e` and create the following file with the following starter code:

**app.spec.js**

```js
const express = require('express');
const expect = require('chai').expect;
const path = require('path');
const Nightmare = require('nightmare');

const app = express();

app.use(express.static(path.join(__dirname, '../../public')));
app.use(express.static(path.join(__dirname, '../../dist')));

const url = 'http://localhost:8888';

const nightmare = new Nightmare();

describe('End to End Tests', () => {
  let httpServer = null;
  let pageObject = null;

  before((done) => {
    httpServer = app.listen(8888);
    done();
  });

  beforeEach(() => {
    pageObject = nightmare.goto(url);
  });

  after((done) => {
    httpServer.close();
    done();
  });

  // This is where your code is going to go
})
```

Currently, this code spins up an express app to serve your React content (see lines 6-11 in above example), and tells NightmareJS to "open" that express app in an invisible browser before each test (see lines 21-23 in above example).

Now we can start writing tests. Let's start by writing tests to ensure that certain elements appear on the page. We'll give you an example and a list of elements that should exist in the React component, then it's your turn to practice writing tests in a TDD fashion.

```js
it('should contain a <h1> element for the page title', () => { 
  return pageObject
    .evaluate(() => document.querySelector('h1').innerText)
    .then(headerText => {
      expect(headerText).to.not.be.null;
      expect(headerText).to.equal('Mortgage Calculator');
    });
});
```

When this test is run using Mocha, it will:

1. Tell Nightmare to go to that page
2. Use [`document.querySelector('h1')`](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector) to select the first `<h1>` element from the page, and grab the text inside that element using [`.innerText`](https://developer.mozilla.org/en-US/docs/Web/API/Node/innerText)
3. Verify the text is not null, and that it reads as "Mortgage Calculator".

Your turn - add the following code to `App.jsx` and create matching tests using the example above as a reference.

```js
import React, { Component } from 'react';
const Mortgage = require('../../src/lib/Mortgage');

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      principal: 0,
      interestRate: 0,
      loanTerm: 0,
      period: 12,
      monthlyPayment: 0
    };
    this.handleChange = this.handleChange.bind(this);
    this.calculateMonthlyPayment = this.calculateMonthlyPayment.bind(this)
  }

  handleChange(event) {
    switch (event.target.name) {
      case 'principal':
        this.setState({ principal: Number(event.target.value) })
        break;
      case 'loanTerm':
        this.setState({ loanTerm: Number(event.target.value) })
        break;
      case 'period':
        this.setState({ period: Number(event.target.value) })
        break;
      case 'interestRate':
        this.setState({ interestRate: Number(event.target.value) })
        break;
      default:
        break;
    }
  }

  calculateMonthlyPayment() {
    let mortgage = new Mortgage(
      this.state.principal,
      this.state.interestRate,
      this.state.loanTerm,
      this.state.period)
    let monthlyPayment = mortgage.monthlyPayment()
    let monthly = document.getElementById('output')
    monthly.innerText = "$" + monthlyPayment
  }

  render() {
    return (
      <div className='App'>
        <h1> Mortgage Calculator  </h1>
        <input onChange={this.handleChange} name='principal' />
        <input onChange={this.handleChange} name='interestRate' />
        <input onChange={this.handleChange} name='loanTerm' />
        <select onChange={this.handleChange} name='period'>
          <option value='12'>Monthly</option>
          <option value='4'>Quarterly</option>
        </select>
        <button onClick={this.calculateMonthlyPayment} id='calculate' >Calculate</button>
        <p id='output'></p>
      </div>
    );
  }
}

```

Once you have written those tests, it is time to create a functional end to end test that involves interacting with the webpage. Spend a few minutes reading the following code with a peer to try your hand at understanding the code before continuing.

```js
it('should correctly calculate mortgage', () =>
  pageObject
  .wait()
  .type('input[name=principal]', 300000)
  .type('input[name=interestRate]', 3.75)
  .type('input[name=loanTerm]', 30)
  .select('select[name=period]', 12)
  .click('button#calculate')
  .wait('#output')
  .evaluate(() => document.querySelector('#output').innerText)
  .then((outputText) => {
    expect(outputText).to.equal('$1389.35');
  })
).timeout(6500);
```

In a nutshell, the above code creates a test that will enter test values into the form elements in our React component utilizing various chained NightmareJS functions such as `.type(selector, value)`, `.select(selector, value)` and `.click(selector)`.

## Project Submission

[Submit your project](https://goo.gl/forms/wx8DLSus7s88lk043)

## Exit Criteria

- 12 or more unit tests.
- 8 or more end to end tests.
- All tests pass when `npm test` is run in the console.

## BONUS

---

* Add an [amortization schedule](https://en.wikipedia.org/wiki/Amortization_schedule) feature to the application, utilizing a TDD approach to gain experience writing tests before writing the code. 

##

#Thank you for taking the time to look at my projects,

#Also please follow my progress on youtube: 
https://www.youtube.com/channel/UCXv4p-lDYeWXPlnoRFYCSUg