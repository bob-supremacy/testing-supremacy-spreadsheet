function claimCount(response){
  staffClaimInfo.getRange(27,13).setValue(response)
}

// Add new staff application. Called by getNewAppInfo.
function addNewStaffApp(response){
  var yIndex = 73;
  while(staffInfoB.getRange(yIndex, 5).isBlank() == true){
    yIndex -= 1;     
  }
  var inputs = [[response[0], response[1], response[2]]];  
  staffInfoB.getRange(yIndex+1, 5, 1, 3).setValues(inputs);
  staffInfoB.getRange(yIndex+1, 11).setValue(0);
  staffInfoB.getRange(yIndex+1, 16).setValue(response[3]);
  staffInfoB.getRange(yIndex+1, 23).setValue(response[4]);
  appSort();
}

// Add to Discharge list. Called by getRemoveInfo
function addToDemoList(response){
  var yIndex = 5;
  while(dischargeList.getRange(yIndex, 3).isBlank()==false){
    yIndex++;
  }
  dischargeList.getRange(yIndex, 3).setValue(staffInfoB.getRange(response[0], 6).getValue());
  var dateToday = new Date();
  var name = staffInfoB.getRange(response[0], 5).getValue()
  var dischargeInfo = [[name, staffInfoB.getRange(response[0], 7).getValue(), dateToday, response[2], response[3], response[4]]];
  dischargeList.getRange(yIndex, 5, 1, 6).setValues(dischargeInfo);
  removeStaff(response[0]);
  removeStaffMeet(name);
  backendSort();
}

// Evaluated New rank. Called by rankChangeInfo.
function rankChange(response){
  const rankHashMap = {null: 0, "Trial Moderator" : 1, "Moderator" : 2 , "Senior Moderator" : 3, "Administrator" : 4,"Senior Administrator" : 5,"Enforcer" : 6,"Head Administrator" : 7}
  var yIndex = 5;
  while(!rankChangeList.getRange(yIndex, 3).isBlank()){
    yIndex++;
  }
  var dateToday = new Date();
  var staffName = staffInfoB.getRange(response[0], 5).getValue();
  var rankChangeInfo = response[2];
  var oldRank = staffInfoB.getRange(response[0],7,1,2).getValues();
  var rankChangeType = (rankHashMap[response[2]] > oldRank[0][1]) ? "Promotion" : "Demotion";
  var results = [[staffName,rankChangeType,oldRank[0][0],response[2],dateToday,response[3],response[4]]];
  rankChangeList.getRange(yIndex,3,1,7).setValues(results); 
  staffInfoB.getRange(response[0],7).setValue(response[2]);
}

// Staff Meeting Attendance
// Adds New staff member to staff meeting sheet. Called by acceptStaff and addNewStaff.
function addStaffMeet(response){
  var yIndex = 6;
  while(!meetingList.getRange(yIndex, 3).isBlank()){
    yIndex++;
  }
  meetingList.getRange(yIndex,4,1,14).activate();
  meetingList.getRange(yIndex,4,1,14).setDataValidation(SpreadsheetApp.newDataValidation()
  .setAllowInvalid(false)
  .requireCheckbox()
  .build());
  meetingList.getRange(yIndex,3).setValue(response[0]);
}

// Removes a staff member from the meeting sheet. Called by addToDemoList.
function removeStaffMeet(name){
  var currentIndex = 6;
  var foundFlag = false;
  while(foundFlag==false && currentIndex <= 46){
    if(meetingList.getRange(currentIndex, 3).getValue() == name){
      foundFlag = true;
    }else{
      currentIndex++;
    }
  }
    if(foundFlag == true){
      meetingList.getRange(currentIndex,3,1,15).clearContent();
      meetingList.getRange(currentIndex,3,1,15).setDataValidation(null);
   } 
  meetSort();
}  
  
// Remove from roster. Called by addToDemoList
function removeStaff(yIndex){
    staffInfoB.getRange(yIndex, 5, 1, 3).setValue("");
    staffInfoB.getRange(yIndex, 11).setValue("");
    staffInfoB.getRange(yIndex, 16, 1, 3).clear({contentsOnly: true});
    staffInfoB.getRange(yIndex, 21).clear({contentsOnly: true});
}

// Add to roster. Called by addStaffInfo
function addNewStaff(response){
  var yIndex = 52;
  while(staffInfoB.getRange(yIndex, 5).isBlank() == true){
    yIndex -= 1;     
  }
  var inputs = [[response[0], response[1], "Trial Moderator"]];  
  staffInfoB.getRange(yIndex+1, 5, 1, 3).setValues(inputs);
  staffInfoB.getRange(yIndex+1, 11).setValue(0);
  var todayDate = new Date();
  inputs = [[todayDate, response[2], todayDate]];
  staffInfoB.getRange(yIndex+1, 16, 1, 3).setValues(inputs);
  addStaffMeet(response)
}

// Moves Applicant to roster. Called by acceptStaffInfo
function acceptStaff(args){  
  var trainer = args[2];
  var staffIndex = args[0];
  var staffName = staffInfoB.getRange(staffIndex, 5).getValue();
  var staffID = staffInfoB.getRange(staffIndex, 6).getValue();
  if (trainer == ""){
    trainer = "PENDING";
  }
  var response = [staffName,staffID, trainer];
  addNewStaff(response);
  removeApp(staffIndex);
}

// Remove Application. Called by acceptStaff and addToDemoList
function removeApp(appIndex){
  Logger.log(appIndex)
  staffInfoB.getRange(appIndex, 5, 1, 3).clear({contentsOnly: true});
  staffInfoB.getRange(appIndex, 11).clear({contentsOnly: true});
  staffInfoB.getRange(appIndex, 16).clear({contentsOnly: true});
  staffInfoB.getRange(appIndex, 21, 1, 3).clear({contentsOnly: true});
  appSort();
}


SORT_ORDER_STAFF = [
{column: 8, ascending: false}
];

SORT_ORDER_APPS = [
{column: 16, ascending: true}
];

SORT_ORDER_MEET = [
{column: 21, ascending: false}
];

// Sorting Functions
// Sorts the meeting attendance. Called by removeStaffMeet and refresh button.
function meetSort(){
  var rangeToSort = meetingList.getRange("C6:U46");
  rangeToSort.sort(SORT_ORDER_MEET)
}

// Sorts the backend databse. Called by addToDemoList and refresh button.
function backendSort() {
  var rangeToSort = staffInfoB.getRange("C9:W52");
  rangeToSort.sort(SORT_ORDER_STAFF)
}

// Sorts the staff Applications. Called by removeApp
function appSort() {
  var rangeToSort = staffInfoB.getRange("D64:W73");
  rangeToSort.sort(SORT_ORDER_APPS)
}

// Takes User input and runs a search for the name of player
function decideSearch(toSearch){
    if (isNaN(toSearch) == true){  
      return searchStaff(toSearch, 9, 52, 5);
    }else{
      if(toSearch > 1000){
        return searchStaff(toSearch, 9, 52, 6);
      }else{
        return toSearch;
      }
    }
  }

// Takes a key term, start and end rows and a column to search and returns the row that matches.
function searchStaff(searchInput, startRow, endRow, searchColumn){
  var currentIndex = startRow;
  var foundFlag = false;
  while(foundFlag==false && startRow <= endRow){
    if(staffInfoB.getRange(currentIndex, searchColumn).getValue() == searchInput){
      foundFlag = true;
    }else{
      currentIndex++;
    }
    }
   if(foundFlag == true){
     return currentIndex

    }
  }  