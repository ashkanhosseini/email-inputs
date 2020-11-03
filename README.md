<!-- TABLE OF CONTENTS -->

## Table of Contents

- [About the Project](#about-the-project)
  - [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Tests](#tests)
- [Usage](#usage)
- [Public API](#public-api)
  - [replaceAll](#replaceAll)
  - [getState](#getState)
  - [addEmails](#addEmails)

<!-- ABOUT THE PROJECT -->

## About The Project

Demo: https://ashkanhosseini.github.io/email-inputs/

[![Screen Shot][screenshot]](https://ashkanhosseini.github.io/email-inputs/)

A vanilla js emails input component

### Built With

Javascript, html, css

<!-- GETTING STARTED -->

## Getting Started

Getting started is quite easy.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.

- npm

```sh
npm install npm@latest -g
```

### Installation

1. Clone the repo

```sh
git clone https://github.com/ashkanhosseini/email-inputs.git
```

2. Install NPM packages

```sh
npm install
```

3. start

```sh
npm start
```

### Tests

```sh
npm run test
```

### Usage

The EmailsInput accepts two parameters:

1. element: The element to initialize the Emails Input
2. options: as of now there is only one option which is `onChange` method

`onChange`: receives two parameters:

1. event: the event which is a custom event of type `emailsInput.change`
2. value: an array of objects with selected emails. Example:

```js
{id: Number, value: String, status: String}
```

### Public API

#### replaceAll

Accepts an array of strings and replaces all the entered emails with the new ones:

```js
const emailsInput = EmailsInput(document.getElementById('dummy'));
emailsInput.replaceAll(['john@gmail.com']);
```

#### getState

Returns an array of objects which is the current state of the component with entered emails

```js
const emailsInput = EmailsInput(document.getElementById('dummy'));
emailsInput.replaceAll(['john@gmail.com']);
emailsInput.getState(); // {id: 21323, value: 'john@gmail.com', status: 'valid'}
```

#### addEmails

Accepts an array of strings and appends the list to the entered emails

```js
const emailsInput = EmailsInput(document.getElementById('dummy'));
emailsInput.addEmails(['john@gmail.com']);
```

[screenshot]: image.png
