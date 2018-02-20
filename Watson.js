"use strict";
(function () {

    /*
    todos

    */
    /*
    notes

    Tablet
        .tabletShown
        .gotoWebScreen(url)
        .gotoHomeScreen()
        tablet.screenChanged.connect(onTabletScreenChanged);
        tablet.tabletShownChanged.connect(onTabletShownChanged);
        .removeButton(button)

    Settings
        .getValue(key)
        .setValue(key,value)

    Key Event
    if ((event.text === "0") && !event.isAutoRepeat && !event.isShifted && !event.isMeta && event.isControl && !event.isAlt) {


    */
    // FUNCTION VAR DECLARATIONS

    function inFrontOf(distance, position, orientation) {
        return Vec3.sum(position || MyAvatar.position,
            Vec3.multiply(distance, Quat.getForward(orientation || MyAvatar.orientation)));
    }

    // tablet variables
    var tablet = null;
    var buttonName = "WATSON";
    var button = null;
    var APP_URL = Script.resolvePath('./Tablet/Tablet2.html');

    // Function to run when tablet button is clicked
    function onTabletButtonClicked(){
        tablet.gotoWebScreen(APP_URL);
    }

    // Get Tablet
    tablet = Tablet.getTablet("com.highfidelity.interface.tablet.system");
    button = tablet.addButton({
        text: buttonName,
        icon: "icons/tablet-icons/spectator-i.svg",
        activeIcon: "icons/tablet-icons/spectator-a.svg"
    });
    button.clicked.connect(onTabletButtonClicked);

    // function onTabletScreenChanged(){
    //
    // }
    // tablet.screenChanged.connect(onTabletScreenChanged);
    // function onDomainChanged(){
    //
    // }
    // Window.domainChanged.connect(onDomainChanged);
    // function keyPressEvent(){
    //
    // }
    // Controller.keyPressEvent.connect(keyPressEvent);

    // var hasEventBridge = false;

    function onWebEventReceived(data){
        var message;
        message = JSON.parse(data);
    }
    tablet.webEventReceived.connect(onWebEventReceived);


    // function to run when script is ending
    function onEnding(){
        // disconnect the button
        button.clicked.disconnect(onTabletButtonClicked);
        // remove the tablet button
        tablet.removeButton(button);

        // remove onWebEvent
        tablet.webEventReceived.disconnect(onWebEventReceived);
    }

    Script.scriptEnding.connect(onEnding);
}());
