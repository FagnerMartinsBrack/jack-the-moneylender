window.Money = (input) => {
  const toDecimalPoint = (cents) => {
    const sign = cents < 0 ? '-' : '';
    const columns = cents < 0
      ? cents.toString().split('').slice(1, Infinity)
      : cents.toString().split('');
    const result = columns.slice();
    const dotLocation = columns.length - 2;

    if (dotLocation < 0) {
      return sign + '$0.0' + result.join('');
    }
    if (dotLocation === 0) {
      return sign + '$0.' + result.join('');
    }
    if (dotLocation > 0) {
      result.splice(dotLocation, 0, '.');
      return sign + '$' + result.join('');
    }
  };

  const thisCents = Number(
    input
      .split('$').join('')
      .split('.').join('')
  );

  return {
    cents: thisCents,
    toString: () => input,
    multipliedBy: (dollarValue) => {
      const multiplicationInCents = thisCents * dollarValue.cents;
      const resultOfMultiplication = Number(
        multiplicationInCents
          .toString()
          .slice(0, -2)
      );
      return Money(toDecimalPoint(resultOfMultiplication));
    },
    minus: (dollarValue) => {
      const resultOfSubtraction = thisCents - dollarValue.cents;
      return Money(toDecimalPoint(resultOfSubtraction));
    },
    greaterThan: (dollarValue) => {
      return thisCents > dollarValue.cents;
    },
    lessThan: (dollarValue) => {
      return thisCents < dollarValue.cents;
    },
    equalsTo: (dollarValue) => {
      return thisCents === dollarValue.cents;
    }
  };
};
