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

    it('should contain a <h1> element for the page title', () => {
      return pageObject
        .evaluate(() => document.querySelector('h1').innerText)
        .then(headerText => {
          expect(headerText).to.not.be.null;
          expect(headerText).to.equal('Mortgage Calculator');
        });
    });

    it('should contain an element named principal', () => {
      return pageObject
        .evaluate(() => document.getElementsByName('principal'))
        .then(element => {
          expect(element.length).to.not.equal(0);
          expect(element[0]).to.not.be.null;
          expect(typeof element).to.equal('object');
        });
    });

    it('should contain an element named interestRate', () => {
      return pageObject
        .evaluate(() => document.getElementsByName('interestRate'))
        .then(element => {
          expect(element.length).to.not.equal(0);
          expect(element[0]).to.not.be.null;
          expect(typeof element).to.equal('object');
        });
    });

    it('should contain an element named loanTerm', () => {
      return pageObject
            .evaluate(() => document.getElementsByName('loanTerm'))
            .then(element => {
                expect(element.length).to.not.equal(0);
                expect(element[0]).to.not.be.null;
                expect(typeof element).to.equal('object');
            });
    });

    it('should contain an element named period', () => {
      return pageObject
            .evaluate(() => document.getElementsByName('period'))
            .then(element => {
                expect(element.length).to.not.equal(0);
                expect(element[0]).to.not.be.null;
                expect(typeof element).to.equal('object');
            });
    });

    it('should contain an button named calculate', () => {
      return pageObject
        .evaluate(() => document.getElementsByName('calculate'))
        .then(element => {
          expect(element.length).to.not.equal(0);
          expect(element[0]).to.not.be.null;
          expect(typeof element).to.equal('object');
        })
    });

    it('should contain a <p> element named output', () => {
      return pageObject
        .evaluate(() => document.getElementsByName('interestRate'))
        .then(element => {
          expect(element[0]).to.not.be.null;
          expect(typeof element).to.equal('object');
        })
    });

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
})
