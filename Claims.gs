function claimCycle() {
  var range = staffClaimInfo.getRange("D6:D13");
  var range2 = staffClaimInfo.getRange("E6:E13");
  range2.setValues(range.getValues());  
  range = staffClaimInfo.getRange("D15:D24");
  range2 = staffClaimInfo.getRange("E15:E24");
  range2.setValues(range.getValues());  
  range = staffClaimInfo.getRange("D24:D35");
  range2 = staffClaimInfo.getRange("E24:E35");
  range2.setValues(range.getValues());  
  range = staffClaimInfo.getRange("D33:D46");
  range2 = staffClaimInfo.getRange("E33:E46");
  range2.setValues(range.getValues());  
  range = staffClaimInfo.getRange("D42:D57");
  range2 = staffClaimInfo.getRange("E42:E57");
  range2.setValues(range.getValues());  
 }

function playerListRefresh(){
  var sheet = ss.getSheetByName('playerList')
  sheet.getRange(1,1).setValue("Updating...");
  Utilities.sleep(10000);
  playerListPaste();
}

function playerListPaste(){  
  var sheet = ss.getSheetByName('playerList')
  sheet.getRange(1,1).setValue('=IMPORTHTML("https://www.trackyserver.com/pages/server_playerslist.php?server_id=219362", "table",2)');
}


function clearNewClaims(){
  var range = staffClaimInfo.getRange("D6:D13");
  range = staffClaimInfo.getRange("D17:D24").clearContent(); 
  range = staffClaimInfo.getRange("D28:D35").clearContent();  
  range = staffClaimInfo.getRange("D39:D46").clearContent();
  range = staffClaimInfo.getRange("D50:D57").clearContent();  
}

function claimCycle(){
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
    var values2 = staffClaimInfo.getRange(TEAMS[teamCounter].NAMESTART,7,8,1).getValues();
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