let getObjectStructure = function getObjectStructure(aObject, maxDepth, depth) {
  let maxDepth = maxDepth || 3;
  let depth = depth || 1;
  try {
    let structure = {
      'Methods': {
      },
      'Properties': {
      },
    };
    if (depth && depth > maxDepth) {
      console.warn('maxDepth %d exceeded', maxDepth);
      return 'maxDepth '+ maxDepth +' exceeded';
    }
    aObject && Object.getOwnPropertyNames(aObject).sort(function (a, b) {
      return a.localeCompare(b);
    }).forEach(function (value) {
      let type = typeof aObject[value];
      switch (type) {
        case 'boolean':
        case 'number':
        case 'string':
          // structure.Properties.push(value);
          structure.Properties[value] = type;
          break;
        case 'function':
          structure.Methods[value] = type;
          break;
        case 'object':
          if (aObject[value]) {
            // structure.Properties.push(value);
            structure.Properties[value] = getObjectStructure(aObject[value], maxDepth, depth + 1);
            //           structure.Properties.push(value + '(' + aObject[value].toString().split(/[\[\] ]/)[2] + ')');
          }
          //           if (aObject[value] instanceof Array) {
          //           structure.Properties.push(value + '(Array)');
          //           }
          //           else if (aObject[value] instanceof RegExp) {
          //           structure.Properties.push(value + '(RegExp)');
          //           } else {
          //           structure.Properties.push(value + '(' ')');
          //           }
          //           structure.Properties.push(value);

          break;
      }
    });
    return structure;
  } 
  catch (exception) {
    console.log(JSON.stringify(exception, Object.getOwnPropertyNames(exception), 2))
  }
};
// getObjectStructure({ 1: 'one', true: 'regexp', cough: [1, 'a', 3, /wrecks/]});
let structure = getObjectStructure(window);
console.log(JSON.stringify(structure, null, 2));
structure;
