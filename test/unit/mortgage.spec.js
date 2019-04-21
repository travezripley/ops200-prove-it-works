const expect = require('chai').expect;
const Mortgage = require('../../src/js/lib/Mortgage');

describe('Mortgage Calculator', () => {
    let mortgage = null;

    beforeEach(() => {
        mortgage = new Mortgage(250000, 4, 10, 10);
    });

    it('should have a monthlyPayment function', () => {
        expect(mortgage.monthlyPayment).to.exist;
    });

    it('should have a monthlyInterestRate function', () => {
        expect(mortgage.monthlyInterestRate).to.exist;
    });

    it('should calculate monthly interest rate correctly', () => {
        expect(mortgage.monthlyInterestRate(4, 10)).to.equal(0.004);
    });

    it('should have a numberOfPayments function', () => {
        expect(mortgage.numberOfPayments).to.exist;
    });

    it('should calculate number of payments correctly', () => {
        expect(mortgage.numberOfPayments(10, 10)).to.equal(100);
    });

    it('should have a compoundedInterestRate function', () => {
        expect(mortgage.compoundedInterestRate).to.exist;
    });

    it('should calculate compounded interest rates correctly', () => {
        expect(mortgage.compoundedInterestRate(0.004, 100)).to.equal(1.490634885647868);
    });

    it('should have a interest quotient function', () => {
        expect(mortgage.interestQuotient).to.exist;
    });

    it('should calculate interest quotient correctly', () => {
        expect(mortgage.interestQuotient(0.004, 1.490634885647868, 100)).to.equal(
            0.012152701972502681
        );
    });

    it('should calculate monthly payment correctly', () => {
        expect(mortgage.monthlyPayment(250000, 4, 10, 10)).to.equal('3038.18');
    });
});
