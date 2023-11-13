//convert sting input to array of object which contain platoon name , value and visited false intially
function platoonArr (platoon) {
  const platoons = platoon.split(";");
  let obj = []
  platoons.forEach(p => {
    const [name, value] = p.split("#");
    obj.push({ name,value: parseInt(value), visited: false})
  })
  return obj;
}
 // sort the platoon array by value for your Platoons only
function sortedPlatoon(yourPlatoon){
  const arr = platoonArr(yourPlatoon);
  
  return arr.sort((a,b) => a.value - b.value);
}

// main function
function battle(yourPlatoon, oppPlatoon){
  const yourPlatoons  = sortedPlatoon(yourPlatoon);
  const oppPlatoons = platoonArr(oppPlatoon);
  const C = {
    "Militia" : [ "Spearmen", "LightCavalry" ],
    "Spearmen" : [ "LightCavalry", "HeavyCavalry" ],
    "LightCavalry" : [ "FootArcher", "CavalryArcher" ],
    "HeavyCavalry" : [ "Militia", "FootArcher", "LightCavalry" ],
    "CavalryArcher" : [ "Spearmen", "HeavyCavalry" ],
    "FootArcher" : [ "Militia", "CavalryArcher" ]
  }
  let result = []
  for(let  op of oppPlatoons){
    for(let yp of yourPlatoons){
      // check whether it is set with opponent platoon
      if(!yp.visited){
        //check all condition where your opponent can win the battle
        if(op.value === yp.value && C[yp.name].includes(op.name)){
        // opponent value is equal and your opponent has advantage
        yp.visited =true
        yp.against = op.name
        result.push(yp)
        break;
      } else if(op.value > yp.value && C[yp.name].includes(op.name) && yp.value * 2 > op.value){
        // opponent value is greater but your opponent has advantage and twice its value is greater that opponent one
        yp.visited =true
        yp.against = op.name
        result.push(yp)
        break;
      } else if(yp.value > op.value && !C[op.name].includes(yp.name)){
        //your platoon value is greater and opponent don't have any advantage
        yp.visited =true
        yp.against = op.name
        result.push(yp)
        break;
      } else if(yp.value > op.value && C[op.name].includes(yp.name) && op.value*2 < yp.value){
        //your platoon value is greater but opponent has advantage, still twice opponent value is smaller than your opponnet value
        yp.visited =true
        yp.against = op.name
        result.push(yp)
        break;
      }
    }
   }
  }
  let ans = "";
  //get the final answer in string as per opponent platoon
  if(result.length >= 3){
    for(let op of oppPlatoons){
      const opp = result.filter(r => r.against === op.name)
      if(opp.length){
        ans += `${opp[0].name}#${opp[0].value}`
      }else{
        for(let yp of yourPlatoons){
          if(!yp.visited){
            ans += `${yp.name}#${yp.value}`
          }
        }
      }
    }

    return ans;

  }else{
    // if your opponent win less than 3 battles
    return "There is no chance of winning"
  }
}

//Please enter i as your platoons and o as opponent Platoon
outcome = battle(i,o);
// final outcome
console.log(outcome)


