module.exports = class Mortgage {
    constructor(principal, interest, term, period) {
        this.principal = principal;
        this.interest = interest;
        this.term = term;
        this.period = period;
    }

    monthlyPayment(principal, interest, term, period) {
        const monthlyInterestRate = this.interest / 100 / this.period;
        const numberOfPayments = this.term * this.period
        const compoundedInterestRate = Math.pow(1 + monthlyInterestRate, numberOfPayments)
        const interestQuotient =
            (monthlyInterestRate * compoundedInterestRate) / ((Math.pow((1 + monthlyInterestRate), numberOfPayments)) - 1);
        const monthlyPayment = this.principal * interestQuotient;
        return parseFloat(monthlyPayment).toFixed(2);
    }

    monthlyInterestRate(interest, period) {
        return (interest / 100) / period;
    }
    numberOfPayments(term, period) {
        return term * period;
    }
    compoundedInterestRate(monthlyInterestRate, numberOfPayments) {
        return Math.pow((1 + monthlyInterestRate), numberOfPayments);
    }
    interestQuotient(monthlyInterestRate, compoundedInterestRate, numberOfPayments) {
      return (monthlyInterestRate * compoundedInterestRate) / ( (Math.pow((1 + monthlyInterestRate), numberOfPayments)) - 1);
    }
}
