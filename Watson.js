"use strict";
if (typeof Object.assign !== 'function') {
    // Must be writable: true, enumerable: false, configurable: true
    Object.defineProperty(Object, "assign", {
        value: function assign(target, varArgs) { // .length of function is 2
            'use strict';
            if (target == null) { // TypeError if undefined or null
                throw new TypeError('Cannot convert undefined or null to object');
            }

            var to = Object(target);

            for (var index = 1; index < arguments.length; index++) {
                var nextSource = arguments[index];

                if (nextSource != null) { // Skip over if undefined or null
                    for (var nextKey in nextSource) {
                        // Avoid bugs when hasOwnProperty is shadowed
                        if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                            to[nextKey] = nextSource[nextKey];
                        }
                    }
                }
            }
            return to;
        },
        writable: true,
        configurable: true
    });
}

(function () {
    function inFrontOf(distance, position, orientation) {
        return Vec3.sum(position || MyAvatar.position,
            Vec3.multiply(distance, Quat.getForward(orientation || MyAvatar.orientation)));
    }

    // tablet variables
    var tablet = null;
    var buttonName = "WATSON";
    var button = null;
    // var APP_URL = Script.resolvePath('./Tablet/Tablet2.html');
    var APP_URL = Script.resolvePath('./Tablet/Tablet_Conversation.html');
    // Function to run when tablet button is clicked
    function onTabletButtonClicked(){
        tablet.gotoWebScreen(APP_URL);
    }

    // Get Tablet
    tablet = Tablet.getTablet("com.highfidelity.interface.tablet.system");

    button = tablet.addButton({
        text: buttonName,
        icon: "icons/tablet-icons/raise-hand-i.svg",
        activeIcon: "icons/tablet-icons/raise-hand-a.svg"
    });

    button.clicked.connect(onTabletButtonClicked);

    function onWebEventReceived(data){
        print("got message");
        print(data);
        var message;
        message = JSON.parse(data);
        switch (message.type){
            case "create":
                    print("in create");
                    var createSettings = {
                        type: message.action.entityType,
                        position: inFrontOf(message.action.distance),
                        dimensions: {x:2,y:2,z:2}
                    };
                    // var combinedProps = Object.assign({}, createSettings)
                    Entities.addEntity(createSettings);
                break;
            case "goto":
                    Window.location = "hifi://" + message.action.place
                break;
            default:
        }
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
