function claimLog(){
  const TEAMS = {
    7: {CELL: "M19", NAMESTART:  28}, // Yoshi
    10: {CELL: "M21", NAMESTART: 50}, // Ross
    //13: {CELL: "M18", NAMESTART: 17}, // swipz
    13: {CELL: "M20", NAMESTART: 39}, // Donny
    16: {CELL: "M17", NAMESTART: 6} // Bill
  }
  var currentWeek = staffClaimInfo.getRange("M23").getValue();
  var activeRow = 6 + 9 * (currentWeek - 1);
  var teamCounter = 7;
  var array = [];

  for(teamCounter in TEAMS){
    var result = new Array();
    var newValues = new Array();
    var newValues2 = new Array();
    var values = staffClaimInfo.getRange(TEAMS[teamCounter].NAMESTART,3,8,1).getValues();
    for(var i = 0; i < values.length; i++)
    {
      newValues = newValues.concat(values[i]);
    }
    var values2 = staffClaimInfo.getRange(TEAMS[teamCounter].NAMESTART,6,8,1).getValues();
    for(var i = 0; i < values2.length; i++)
    {
      newValues2 = newValues2.concat(values2[i]);
    }
    result = newValues.map((item,index) => {return [item,newValues2[index]]})
    array.push(result)
    }
  var teamCounter = 4;
   for(var i = 0; i < 4; i++)
  { teamCounter += 3;
    for(var j = 0; j < 8; j++)
    {
      for(var f = 0; f < 2; f++)
      {
        Logger.log(array[i][j][f]+" ("+i+" "+j+" "+f+")")
        Logger.log(teamCounter-2+f)
        sheetClaims.getRange(activeRow + j,teamCounter-2+(f*2)).setValue(array[i][j][f])
        
      }
    } 
  }
}