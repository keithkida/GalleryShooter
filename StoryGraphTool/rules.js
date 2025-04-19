class Start extends Scene {
    create() {
        this.engine.setTitle(this.engine.storyData.Title); // TODO: replace this text using this.engine.storyData to find the story title

        this.engine.Hammer = false;
        this.engine.DrawerKey = false;
        this.engine.Combination = false;
        this.engine.MasterKey = false;

        this.engine.addChoice("Begin the story");
    }

    handleChoice() {
        this.engine.gotoScene(Location, this.engine.storyData.InitialLocation); // TODO: replace this text by the initial location of the story
    }
}

class Location extends Scene {
    create(key) {
        this.key = key;
        let locationData = this.engine.storyData.Locations[key]; // TODO: use `key` to get the data object for the current story location
        this.engine.show(locationData.Body); // TODO: replace this text by the Body of the location data
        
        if(key == "Take Hammer" && !this.engine.Hammer) {
            this.engine.Hammer = true;
            this.engine.show(`<p><em>Hammer</em></p>\n`)
        }

        if(key == "Unlocked Drawer" && !this.engine.Combination) {
            this.engine.Combination = true;
            this.engine.show(`<p><em>Combination</em></p>\n`)
        }

        if(key == "Broken Cabinet" && !this.engine.DrawerKey) {
            this.engine.DrawerKey = true;
            this.engine.show(`<p><em>Drawer Key</em></p>\n`)
        }

        if(key == "Safe Opened" && !this.engine.MasterKey) {
            this.engine.MasterKey = true;
            this.engine.show(`<p><em>Master Key</em></p>\n`)
        }

        if(locationData.hasOwnProperty("Choices")) { // TODO: check if the location has any Choices
            for(let choice of locationData.Choices) { // TODO: loop over the location's Choices
                this.engine.addChoice(choice.Text, choice); // TODO: use the Text of the choice
                // TODO: add a useful second argument to addChoice so that the current code of handleChoice below works

            }
        } else {
            this.engine.addChoice("The end.")
        }
    }

    handleChoice(choice) {
        if(choice) {
            this.engine.show("&gt; "+choice.Text);

            if(choice.ItemNeeded){
                let hasItem = false;

                if(choice.ItemNeeded == "Hammer") {
                    hasItem = this.engine.Hammer;
                } else if (choice.ItemNeeded == "Drawer Key") {
                    hasItem = this.engine.DrawerKey;
                } else if (choice.ItemNeeded == "Combination") {
                    hasItem = this.engine.Combination;
                } else if (choice.ItemNeeded == "Master Key") {
                    hasItem = this.engine.MasterKey;
                }

                if(!hasItem) {
                    if(choice.FailedTarget) {
                        this.engine.gotoScene(Location, choice.FailedTarget);
                    }
                    return;
                }

            }

            this.engine.gotoScene(Location, choice.Target);
        } else {
            this.engine.gotoScene(End);
        }
    }
}


class End extends Scene {
    create() {
        this.engine.show("<hr>");
        this.engine.show(this.engine.storyData.Credits);
    }
}

Engine.load(Start, 'myStory.json');