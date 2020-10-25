var ss = SpreadsheetApp.getActiveSpreadsheet();
var staffInfoB = ss.getSheetByName("staffList");
var dischargeList = ss.getSheetByName("Discharge List");
var rankChangeList = ss.getSheetByName('Promotion-Demotion List');
var meetingList = ss.getSheetByName('Staff Meeting Attendance');
var staffClaimInfo = ss.getSheetByName("Staff Claim Information"); 
var sheetClaims = ss.getSheetByName("Staff Claims List"); 
var test = ss.getSheetByName('Sheet9')
var ui = SpreadsheetApp.getUi();



function onOpen() {

  ui.createMenu('Cutom Tools')

    .addSubMenu(ui.createMenu('Sort')
      .addItem('Sort Backend', 'backendSort')  
      .addItem('Sort Staff Applications', 'appSort')
      .addItem('Sort Meeting Attendance','meetSort'))
  
    .addSubMenu(ui.createMenu('Staff Edit')
      .addItem('Add a new staff member', 'addStaffInfo')
      .addItem('Remove a staff member', 'getRemoveInfo')
      .addItem('Change a staff member\'s rank', 'rankChangeInfo')
      .addItem('Accept Application','acceptStaffInfo'))

    .addSubMenu(ui.createMenu('Application Edit')
      .addItem('Add a new Application', 'getNewAppInfo')
      .addItem('Remove an Application', 'removeAppInfo'))
      
    .addSubMenu(ui.createMenu('Time')
      .addSubMenu(ui.createMenu('Time Reset')
        .addItem('Reset Time All','resetTime')
        .addItem('Reset Time Server Staff','resetTimeSS')
        .addItem('Reset Time Forum Staff','resetTimeFS')
        .addItem('Reset Time Staff Applicants','resetTimeSA'))
      .addItem('Change Minimum Hours', 'changeTime'))
      
     .addSubMenu(ui.createMenu('Claims')
       .addItem('Change Minimum Claim Count','claimCountInfo')
       .addItem('Claim Cycle','claimCycle')
       .addItem('Clear New Claims','clearNewClaims')
       .addItem('Log Weekly Claims','claimLog'))
      
  .addToUi();
}