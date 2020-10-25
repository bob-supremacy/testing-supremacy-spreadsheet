// Time Scripts
// Resets all Timers
function resetTime(){
  resetTimeSS()
  resetTimeSA()
  resetTimeFS()
}
// Resets Server Staffs Timers
function resetTimeSS(){
  var yIndex = 9
  while(yIndex <= 52 && (staffInfoB.getRange(yIndex,4).isBlank() != true)){
    staffInfoB.getRange(yIndex,11).setValue('0.00');
    yIndex++;
  }  
}
// Resets Forum Staffs Timers
function resetTimeFS(){
  var yIndex = 56
  while(yIndex <= 60 && (staffInfoB.getRange(yIndex,4).isBlank() != true)){
    staffInfoB.getRange(yIndex,11).setValue('0.00');
    yIndex++;
  }  
}
// Resets Staff Applicants Timers
function resetTimeSA(){
  var yIndex = 64
  while(yIndex <= 73 && (staffInfoB.getRange(yIndex,4).isBlank() != true)){
    staffInfoB.getRange(yIndex,11).setValue('0.00');
    yIndex++;
  }  
}

// Change Minimum Time Requirment
function changeTime(){
  var sheet = ss.getSheetByName("staffList");
  
  var ui = SpreadsheetApp.getUi();
  var result1 = ui.prompt(
    'Change Minimum Time',
    'Please enter the minimum hours you want staff to be on in a week',
    ui.ButtonSet.OK_CANCEL);
  var button1 = result1.getSelectedButton();
  var text1 = result1.getResponseText();
  if(button1 = ui.Button.OK){
  }
  for(var i = 9 ; i <= 52 ; i++){
    sheet.getRange(i, 9).setValue("=IF(NOT(ISBLANK(D" + i + ")), IF(K" + i + " = 0, \"Not Seen\",IF(K" + i + " >= " + text1 + ",\"Active\", \"Under Time\")),)")
  }
  for(var i = 56 ; i <= 60 ; i++){
    sheet.getRange(i, 9).setValue("=IF(NOT(ISBLANK(D" + i + ")), IF(K" + i + " = 0, \"Not Seen\",IF(K" + i + " >= " + text1 + ",\"Active\", \"Under Time\")),)")
  }
  for(var i = 64 ; i <= 73 ; i++){
    sheet.getRange(i, 9).setValue("=IF(NOT(ISBLANK(D" + i + ")), IF(K" + i + " = 0, \"Not Seen\",IF(K" + i + " >= " + text1 + ",\"Active\", \"Under Time\")),)")
  }
}