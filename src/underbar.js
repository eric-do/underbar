(function() {
  'use strict';

  window._ = {};

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val) {
    return val;
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understand it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * implementing the sections you are responsible for.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    return n > array.length ? array
                            : n === undefined ? array[array.length - 1]
                            : array.slice(array.length - n, array.length);
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = function(collection, iterator) {
    if (Array.isArray(collection)) {
      for (let i = 0; i < collection.length; i++) {
        iterator(collection[i], i, collection);
      }
    } else if (typeof collection === 'object') {
      let values = Object.values(collection);
      let keys = Object.keys(collection);

      for (let i = 0; i < values.length; i++) {
        iterator(values[i], keys[i], collection);
      }
    }
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;

    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, test) {
    // Iterate through entire array checking whether each value passes a truth test
    // If value passes truth test, push value to an array
    // Return array
    let arr = [];

    _.each(collection, function(val){
      if (test(val) === true) {
        arr.push(val);
      }
    });
    return arr;
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, test) {
    // TIP: see if you can re-use _.filter() here, without simply
    // copying code in and modifying it
    return _.filter(collection, function(val){
      return test(val) === false;
    });
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array, isSorted, iterator) {
    // If there isn't an iterator, loop
      // If a value exists in a hashMap, it's not unique and we skip it
      // If a value doesn't exist in a hashMap, it's unique; push value
      // to uniques and add value to hashmap
    // If there is an iterator, loop
      // If the result of iterator isn't unique, skip
      // If the result of iterator IS unique, add the _result_ to the
      // hashMap and push the array _value_ to uniques
    let hashMap = {};
    let uniques = [];

    if (!iterator) {
      _.each(array, function(val) {
        if (hashMap[val] === undefined) {
          uniques.push(val);
          hashMap[val] = ' ';
        }
      });
    } else if (iterator) {
      _.each(array, function(val){
        if (hashMap[iterator(val)] === undefined) {
          uniques.push(val);
          hashMap[iterator(val)] = ' ';
        }
      });
    }
    return uniques;
  };


  // Return the results of applying an iterator to each element.
  _.map = function(collection, iterator) {
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
    let map = [];
    if (Array.isArray(collection)) {
      for (let i = 0; i < collection.length; i++) {
        map.push(iterator(collection[i], i, collection));
      }
    } else if (typeof collection === 'object') {
      let values = Object.values(collection);
      let keys = Object.keys(collection);

      for (let i = 0; i < values.length; i++) {
        map.push(iterator(values[i], keys[i], collection));
      }
    }
    return map;
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(collection, key) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(collection, function(item){
      return item[key];
    });
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(accumulator, item) for each item. accumulator should be
  // the return value of the previous iterator call.
  //
  // You can pass in a starting value for the accumulator as the third argument
  // to reduce. If no starting value is passed, the first element is used as
  // the accumulator, and is never passed to the iterator. In other words, in
  // the case where a starting value is not passed, the iterator is not invoked
  // until the second element, with the first element as its second argument.
  //
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  //
  //   var identity = _.reduce([5], function(total, number){
  //     return total + number * number;
  //   }); // should be 5, regardless of the iterator function passed in
  //          No accumulator is given so the first element is used.
  _.reduce = function(collection, iterator, accumulator) {
    // If there's an accumulator, we set starting value to be the accumulator and
    // begin the iterator starting from the first element (i.e. iterate the entire array)
    // If there's no accumulator, we set starting value to be the first element
    // in the array, and apply the iterator starting from the second and on
    let acc;
    let sliced = [];
    let values = Object.values(collection);

    if (accumulator !== undefined) {
      acc = accumulator;
      sliced = values.slice();
    } else {
      acc = collection[0];
      sliced = values.slice(1);
    }

    _.each(sliced, function(val){
      acc = iterator(acc, val);
    })

    return acc;
  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(collection, function(wasFound, item) {
      if (wasFound) {
        return true;
      }
      return item === target;
    }, false);
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    // TIP: Try re-using reduce() here.
    let iterate = iterator ? iterator : _.identity;

    return _.reduce(collection,function(allTrue, item){
      if (Boolean(iterate(item)) === false) {
        return false;
      }
      return allTrue;
    }, true);
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    // TIP: There's a very clever way to re-use every() here.
    // Basically if EVERY value is NOT false, then SOME values are true and
    // _.some() returns true
    let iterate = iterator ? iterator : _.identity;

    return !_.every(collection, function(val) {
      return (Boolean(iterate(val)) === false);
    });
  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  _.extend = function(obj) {
    // If there is only 1 argument, we return that argument as an object
    // If there are multiple arguments, we append the key/value pairs for each
    // source object to the destination object (destination object is the first
    // argument). Function can take one or more arguments.
    if (arguments.length < 2 ) {
      return obj;
    }

    for (let i = 1; i < arguments.length; i++){
      let keys = Object.keys(arguments[i]);
      for (let j = 0; j < keys.length; j++) {
        obj[keys[j]] = arguments[i][keys[j]];
      }
    }
    return obj;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
    if (arguments.length < 2 ) {
      return obj;
    }

    for (let i = 1; i < arguments.length; i++){
      let keys = Object.keys(arguments[i]);
      for (let j = 0; j < keys.length; j++) {
        if (!(keys[j] in obj)) obj[keys[j]] = arguments[i][keys[j]];
      }
    }
    return obj;
  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function() {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memorize an expensive function's results by storing them. You may assume
  // that the function only takes primitives as arguments.
  // memoize could be renamed to oncePerUniqueArgumentList; memoize does the
  // same thing as once, but based on many sets of unique arguments.
  //
  // _.memoize should return a function that, when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {
    // Get string value of arguments and store it as a key
    // If the key already exists, return the key
    // If the key doesn't exist, execute the function given the paramters and
    // return the result
    let cache = {};
    return function() {
      let key = JSON.stringify(arguments);
      if (key in cache) {
        return cache[key];
      } else {
        let value = func.apply(null, arguments);
        cache[key] = value;
        return value;
      }
    }
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
    let args = Array.prototype.slice.call(arguments, 2);
    return setTimeout(function(){
      return func.apply(null, args);
    }, wait);
  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice
  _.shuffle = function(array) {
    // Take an array as param
    // Generate random number between 0 and array length - 1
    // If random number exists in map, generate another until a unique number generated
    // Else use random number as an index to push val from original array to shuffled array
    let hashMap = {};
    let shuffled = [];

    while (shuffled.length !== array.length) {
      let randomIndex = getRandom(0, array.length);

      while (hashMap[randomIndex]) {
        randomIndex = getRandom(0, array.length);
      }
      hashMap[randomIndex] = ' ';
      shuffled.push(array[randomIndex]);
    }

    return shuffled;
  };

  function getRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min) + min);
  }

  /**
   * ADVANCED
   * =================
   *
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */

  // Calls the method named by functionOrKey on each value in the list.
  // Note: You will need to learn a bit about .apply to complete this.
  _.invoke = function(collection, functionOrKey, args) {
    if (typeof functionOrKey === 'function') {
      return _.map(collection, function(x) { return functionOrKey.apply(x); });
    } else {
      return _.map(collection, function(s) { return s[functionOrKey](); });
    }
  };

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
    var swapped = true;
    while (swapped === true) {
      swapped = false;
      for (var i = 0; i < collection.length - 1; i++){
        if (typeof iterator === 'function'){
          var a = iterator(collection[i]);
          var b = iterator(collection[i + 1]);
        } else {
          var a = collection[i][iterator];
          var b = collection[i + 1][iterator];
        }
        if(a !== b) {
          if (a > b || a === void 0) {
            var temp = collection[i];
            collection[i] = collection[i + 1];
            collection[i + 1] = temp;
            swapped = true;
          }
        }
      }
    }
    return collection;
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
    var result = [];
    var maxLength = Math.max.apply(null, _.pluck(arguments, 'length'));

    for (var i = 0; i < maxLength; i++) {
      result[i] = [];
      for (var j = 0; j < arguments.length; j++) {
        result[i].push(arguments[j][i]);
      }
    }
    return result;
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {
    if (!result) result = [];

    for (var i = 0; i < nestedArray.length; i++) {
      if (Array.isArray(nestedArray[i])){
        _.flatten(nestedArray[i], result);
      } else {
        result.push(nestedArray[i]);
      }
    }
    return result;
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
    var args = Array.prototype.slice.call(arguments);
    var valueArray = args[0];
    var results = [];


    for (var i = 0; i < valueArray.length; i++) {
      var isInAll = _.every(args, function(array) {
        return _.some(array, function(val){
          return val === valueArray[i];
        });
      });
      if (isInAll) {
        results.push(valueArray[i]);
      }
    }
    return results;
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.  See the Underbar readme for extra details
  // on this function.
  //
  // Note: This is difficult! It may take a while to implement.
  _.throttle = function(func, wait) {
  };
}());
