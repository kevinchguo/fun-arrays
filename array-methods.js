var dataset = require("./dataset.json");

/*
  create an array with accounts from bankBalances that are
  greater than 100000
  assign the resulting new array to `hundredThousandairs`
*/
var hundredThousandairs = null;

//balances refer to each object in the bankBalances object
hundredThousandairs = dataset.bankBalances.filter(function(balances) {
  //balances.amount gets the $$$
  if (parseInt(balances.amount) > 100000) {
    return balances.amount;
  }
});

// set sumOfBankBalances to be the sum of all value held at `amount` for each bank object
var sumOfBankBalances = null;

sumOfBankBalances = dataset.bankBalances.reduce(function(prev, curr) {
  //prev starts at 0 and added to the parsedint number of amount
  return prev + parseInt(curr.amount);
}, 0);

/*
  from each of the following states:
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  take each `amount` and add 18.9% interest to it rounded to the nearest dollar 
  and then sum it all up into one value saved to `sumOfInterests`
 */
var sumOfInterests = null;

sumOfInterests = dataset.bankBalances
  .filter(function(currState) {
    if (
      currState.state === "WI" ||
      currState.state === "IL" ||
      currState.state === "WY" ||
      currState.state === "OH" ||
      currState.state === "GA" ||
      currState.state === "DE"
    ) {
      return currState;
    }
  })
  .reduce(function(prev, curr) {
    return Math.round(prev + parseInt(curr.amount) * 0.189);
  }, 0);

/*
  aggregate the sum of bankBalance amounts
  grouped by state
  set stateSums to be a hash table where

  the key is:
    the two letter state abbreviation
  and the value is:
    the sum of all amounts from that state
    the value must be rounded to the nearest dollar

  note: During your summation (
    if at any point durig your calculation where the number looks like `2486552.9779399997`
    round this number to the nearest dollar before moving on.
  )
 */
var stateSums = null;

stateSums = dataset.bankBalances.reduce(function(prev, curr) {
  //if that key doesnt exist, then make the key with the amount being the value, else if there is that key inside, then update amount
  if (!prev[curr.state]) {
    prev[curr.state] = parseInt(curr.amount);
  } else {
    prev[curr.state] += parseInt(curr.amount);
  }
  //returns the newly created obj from the if statement
  return prev;
}, {});
/*
  for all states *NOT* in the following states:
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  sum the amount for each state (stateSum)
  take each `stateSum` and calculate 18.9% interest for that state
  sum the interest values that are greater than 50,000 and save it to `sumOfHighInterests`

  note: During your summation (
    if at any point durig your calculation where the number looks like `2486552.9779399997`
    round this number to the nearest dollar before moving on.
  )
 */
var sumOfHighInterests = null;
//Puts the stateSums object into an array so I can reduce it
sumOfHighInterests = Object.entries(stateSums)
  .reduce(function(prev, curr) {
    //includes returns true if there IS that item in the array, curr.state loops through each state in the bankBalances obj
    if (!["WI", "IL", "WY", "OH", "GA", "DE"].includes(curr[0])) {
      if (Math.round(curr[1] * 0.189) > 50000) {
        prev.push(Math.round(curr[1] * 0.189));
      }
    }
    return prev;
  }, [])
  .reduce(function(prev, curr) {
    return prev + curr;
  }, 0);
/*
  set `lowerSumStates` to be an array of two letter state
  abbreviations of each state where the sum of amounts
  in the state is less than 1,000,000
 */
var lowerSumStates = null;

lowerSumStates = Object.entries(stateSums).reduce(function(prev, curr) {
  if (curr[1] < 1000000) {
    prev.push(curr[0]);
  }
  return prev;
}, []);

/*
  aggregate the sum of each state into one hash table
  `higherStateSums` should be the sum of all states with totals greater than 1,000,000
 */
var higherStateSums = null;

higherStateSums = Object.entries(stateSums)
  .reduce(function(prev, curr) {
    if (curr[1] > 1000000) {
      prev.push(curr[1]);
    }
    return prev;
  }, [])
  .reduce(function(prev, curr) {
    return prev + curr;
  }, 0);
/*
  from each of the following states:
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware

  Check if all of these states have a sum of account values
  greater than 2,550,000

  if true set `areStatesInHigherStateSum` to `true`
  otherwise set it to `false`
 */
var areStatesInHigherStateSum = null;
//everything in this array HAS to be over the retun statement to return true else return false
areStatesInHigherStateSum = Object.entries(stateSums).every(function(balances) {
  if (!["WI", "IL", "WY", "OH", "GA", "DE"].includes(balances[0])) {
    return balances[1] > 2550000;
  }
});

/*
  Stretch Goal && Final Boss

  set `anyStatesInHigherStateSum` to be `true` if
  any of these states:
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  have a sum of account values greater than 2,550,000
  otherwise set it to be `false`
 */
var anyStatesInHigherStateSum = null;
//If one thing in the array fulfills the return statement, it'll return true, if NOTHING in the array fulfills the return statement, it'll return false
anyStatesInHigherStateSum = Object.entries(stateSums).some(function(balances) {
  if (!["WI", "IL", "WY", "OH", "GA", "DE"].includes(balances[0])) {
    return balances[1] > 2550000;
  }
});
module.exports = {
  hundredThousandairs: hundredThousandairs,
  sumOfBankBalances: sumOfBankBalances,
  sumOfInterests: sumOfInterests,
  sumOfHighInterests: sumOfHighInterests,
  stateSums: stateSums,
  lowerSumStates: lowerSumStates,
  higherStateSums: higherStateSums,
  areStatesInHigherStateSum: areStatesInHigherStateSum,
  anyStatesInHigherStateSum: anyStatesInHigherStateSum
};
