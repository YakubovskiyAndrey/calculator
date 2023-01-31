export function getMathHandler() {
    const math = getMathFn();  
    let divByZero = false;
  
    return applyMath;
    
    /***/
  
    function applyMath(math_str) {
      math_str = math_str.replace(/ /g,'');
      divByZero = false;    
        
      let result = parseLinearMath(math_str);

      return divByZero ? "Error division by zero!" : result;
    }
    
    function parseLinearMath(math_str) {
      math_str = mulOrDiv(math_str);
      math_str = plusOrMinus(math_str);
  
      return math_str;
  
      /***/
  
      function mulOrDiv(math_str) {
        let length = (math_str.match(/\/|\*/g) || []).length;
        if (!length) return math_str;
  
        for (let i = 0; i < length; i++) {
          math_str = math_str.replace(
            /(\d+(?:\.\d+)?)(\/|\*)(-?\d+(?:\.\d+)?)/,
            function(_, a, oper, b) {
              return math(a, oper, b);
            }
          );
        }
  
        return math_str;
      }
  
      function plusOrMinus(math_str) {
        let length = (math_str.match(/\+|-/g) || []).length;
        if (!length) return math_str;
  
        for (let i = 0; i < length; i++) {
          math_str = math_str.replace(
            /((?:^-)?\d+(?:\.\d+)?)(\+|-)(\d+(?:\.\d+)?)/,
            function(_, a, oper, b) {
              return math(a, oper, b);
            }
          );
        }
  
        return math_str;
      }
    }
  
    function getMathFn() {
      let local_math = {
        "+": (a, b) => Number(a) + Number(b),
        "-": (a, b) => a - b,
        "*": (a, b) => a * b,
        "/": (a, b) => {
          if( b === "0" ) {
            divByZero = true;
          }
          
          return (a / b);
        },
      };
  
      return function math(a, operation, b) {
        return local_math[operation](a, b);
      }
    }
  }