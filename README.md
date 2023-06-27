# Arkanoid

<p align='center'>
<br>
<i><b>[🚧 Game will receive updates in the future depending on the additional functionalities i would like to implement 🚧]</b></i>
</p>

This project is an attempt to recreate Arkanoid and make it more enjoyable and engaging.

## Features

### Bricks

The game includes eight different types of bricks, each with unique characteristics and properties. The table below provides an overview of the bricks' colors, required hits to destroy them, points earned, and buff drop rates:

| Color       | Times to Hit  | Points | Buff Drop Rate |
| ----------- | ------------- | ------ | -------------- |
| Yellow      | 2             | 20     | 0.1            |
| Green       | 1             | 10     | 0.1            |
| Blue        | 1             | 10     | 0.02           |
| Red         | 1             | 50     | 0.02           |
| Light Blue  | 1             | 10     | 0.02           |
| Light Green | 1             | 10     | 0.05           |
| Black       | 4             | 50     | 0.05           |
| Gray        | 1,000,000,000 | 0      | 0.05           |

### Buffs

The game introduces five different types of buffs that can enhance gameplay. Each buff has a specific color, description, and image associated with it. The table below provides an overview of the available buffs:

| Color   | Description                                          | Image                                                                                            |
| ------- | ---------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| Red     | Enhances your paddle speed                           | ![PaddleSpeed](https://upload.wikimedia.org/wikipedia/commons/0/0a/No-image-available.png)       |
| Green   | Adds one life                                        | ![AddLive](https://upload.wikimedia.org/wikipedia/commons/0/0a/No-image-available.png)           |
| Blue    | Enhances your ball and paddle speed by small amounts | ![SpeedBuff](https://upload.wikimedia.org/wikipedia/commons/0/0a/No-image-available.png)         |
| Yellow  | Makes you invincible for about 1 minute              | ![InvincibilityBuff](https://upload.wikimedia.org/wikipedia/commons/0/0a/No-image-available.png) |
| Magenta | Makes your ball go through EVERYTHING, broken buff   | ![DestroyerBuff](https://upload.wikimedia.org/wikipedia/commons/0/0a/No-image-available.png)     |

### Grid Resizing

The game allows for resizing the grid of bricks. You can render a grid of up to 20 x 10 bricks, providing flexibility in level design and gameplay experiences.

### Collision Sound

During collisions between the ball and bricks or other objects, a sound effect is played. You can choose from a variety of sound options to customize the auditory experience of the game.

### Volume Controls

The project includes options to adjust the volume of both the music and sound effects. You can lower or increase the volume levels according to your preference, enhancing the overall gameplay experience.

### Backend

To run the full version of the game, a backend is required. The backend provides additional functionality and supports features such as level creation, user profiles, and score tracking. Instructions for setting up the backend will be provided separately.

### Level Editor

The project includes a level editor that allows you to create and customize your own levels. The level editor provides a user-friendly interface to design unique levels with different brick arrangements, challenges, and buff placements. It empowers you to unleash your creativity and share your custom levels with others.

## Conclusion

Arkanoid project aimed at recreating the classic game with added features, customization options, and enhanced gameplay experiences. Stay tuned for future updates and additions as the project evolves.

Feel free to explore, contribute, and have fun with Arkanoid!
