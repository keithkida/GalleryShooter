Class assignment for CMPM 120 where we explore 1D of movement
Create a new Phaser project
To create a new Phaser project, create a new folder for the project in your filesystem. Ideally locate this in the same place where you have been creating your other projects in VS Code (this is a matter of personal preference, and will vary from computer to computer. However, avoid placing the project on the desktop, as this is not typical practice).

1. The folder should have the following sub-folders:

lib - for holding the phaser.js library
src - for holding source code
src\Scenes - for holding scene code
assets - for holding images and audio assets
2. From one of the existing projects in the class, copy phaser.js into your lib folder.

3. From one of the existing projects in the class, copy over index.html. Important: you will need to edit this file to change the <script> tags to bring in the Javascript code for your scenes.

4. From one of the existing projects in the class, copy over main.js. Important: you will need to edit this file to change the game configuration object to have the correct scene class.

5. Now, open up the project in Visual Studio Code. Create a new "README.md" file and add a brief description of your project ("Class assignment for CMPM 120 where we explore 1D of movement")

6. Create a new scene class to hold the 1D movement scene. Put in your Phaser scene class template code (class name, constructor, preload, create, update). Make sure the constructor calls super('sceneName'); // 'SceneName' will vary by project, use the name from your project

7. Go back into index.html and add the scene class .js file into the <script> tag. Also change the <title> tag.

8. Go back into main.js and add the scene class name into the game config object.

Checklist:

Please verify all of these items! Missing any of these will cause an error.

phaser.js is in lib
main.js is in src
your new scene class is in src/Scenes
index.html has a script tag which loads this scene class (use the screen class' filename here)
the game config object in main.js has the name of the scene class (use the class name here, not the filename)
the scene class constructor calls super('sceneName')
No, really, verify each of these items, ok?

Once you are done, try running it in Live Server. Nothing should be visible on screen, but there should also not be any errors in the console. Try adding a console.log to your update() and create() methods in the scene if you are wondering if your scene has actually loaded.

Create your 1D Movement Avatar
For this part of the project, you need to identify a player avatar from one of the Kenny AssetsLinks to an external site. projects, and then make it move back and forth along the bottom of the screen. There are a few parts to this:

Find the avatar image asset. You can choose any player avatar-like asset from any of the 2D Kenny Asset packs. If you don't have a strong preference, use one of the player avatars from the Scribble Platformer pack. Links to an external site.
Place the avatar image into the assets folder.
Repeat this process for an art asset that the player will emit (could be a bullet, a heart, flower, etc.)
In main.js, add the following to the game configuration object:
fps: { forceSetTimeOut: true, target: 30 }
Add code to load the assets in preload() and create the sprites in create(). Make sure you save a binding to the created sprites, you'll need this to move them.
Create key objects in create() and then add code in update() to move the player avatar left on "A" and right on "D". 
Add code to make sure the player avatar does not go off the screen.
Run your code and verify it works!

Player, Emit!
Now make it so the player avatar emits a sprite when the space bar is pressed.

Create a key object in create() for space bar.
In update, when the space bar is pressed, the player avatar emits a sprite from the avatar. This emitted sprite should travel upwards. This can be accomplished by subtracting from the sprite's y value during every call to update() while the emitted sprite is active.
Note that the emitted sprite's x value should not change while it is in flight -- only the y value should change.

THANK YOU