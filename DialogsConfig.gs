const DIALOGS = {
    REMOVESTAFF: {
        HEADER: 'Remove a Staff Member',
        INFO: [
            ['Enter the name, SteamID64 or row number of the new staff.\nPlease note if you are using name the name must be exact.', decideSearch],
            ['Enter the type of discharge.\n1 = Resigned.\n2 = Demoted.\n3 = Honourable Discharge', [null, "Resigned", "Demoted", "Honourable Discharge"]],
            ['Enter the reason for the discharge.'],
            ['Discharged By?']
        ],
        RETURN: addToDemoList
    },
    
    NEWAPP: {
        HEADER: 'Add New Staff Application',
        INFO: [
                ['Enter the name of the Applicant'], 
                ['Enter the SteamID 64'], 
                ['Enter the Rank.\n1 = Trusted.\n2 = Donator.\n3 = User', [null, "Trusted", "Donator", "User"]], 
                ['Enter the Date Applied.'], 
                ['Enter Ammount of Warns']
        ],
        RETURN: addNewStaffApp
    },

    ADDNEWSTAFF: {
        HEADER: 'Add new Staff Member',
        INFO: [
                ['Enter the name of the staff member'],
                ['Enter the SteamID 64'],
                ['Enter the Trainer']
        ],
        RETURN: addNewStaff
    },
    ACCEPTSTAFFINFO : {
        HEADER: "Accept New Staff INFO ",
        INFO: [
            ['Enter the name, SteamID64 or row number of the new staff\'s application.\nPlease note if you are using name the name must be exact.', decideSearch],
            ['Enter the name of the Trainer.\nIf the staff is yet to be trained leave blank.']
        ],
        RETURN: acceptStaff
    },
    
     RANKCHANGE: {
        HEADER: 'Promote or Demote a Staff Member',
        INFO: [
            ['Enter the name, SteamID64 or row number of the staff having their rank chnaged.\nPlease note if you are using name the name must be exact.', decideSearch],
            ['Enter the new Rank.\n1 = Trial Moderator\n2 = Moderator\n3 = Senior Moderator\n4 = Administrator\n5 = Senior Administrator\n6 = Enforcer\n7 = Head Administrator', [null, "Trial Moderator","Moderator", "Senior Moderator", "Administrator","Senior Administrator","Enforcer","Head Administrator"]],
            ['Enter Reason For Rank Change'],
            ['Rank changed By?']
        ],    
        RETURN: rankChange

    },
    
     CLAIMCOUNT: {
        HEADER: 'Claim Count',
        INFO: [
            ['Enter The New Minumum Claim Count']
        ],    
        RETURN: claimCount
    },
    
     REMOVEAPP: {
        HEADER: 'Remove Application',
        INFO: [
          ['Enter the name, SteamID64 or row number of the staff having their rank chnaged.\nPlease note if you are using name the name must be exact.', decideSearch],
        ],    
        RETURN: removeApp
    }

}