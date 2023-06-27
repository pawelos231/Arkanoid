# Arkanoid

<p align='center'>
<br>
<i><b>[🚧 Work in progress! 🚧]</b></i>
</p>

This project is my attempt to recreate arkanoid and make it funnier / more interesting.

To run this project you would also need backend for it, if you want to experience it in its full capacity you can also downoload and run levelEditor on your computer, currently i am not planning on hosting this project mainly beacuse i dont want to for now, but i will se in the future.

## implemented features

this implementation covers pretty much everything that a normal arkanoid would have plus alot more, for example buffs, playing songs or level creation. speaking of levels, there are 8 different types of bricks:

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

beyond level implementation you can also play sonngs that were added by me (in the future i plan to also give this option to users). The implementation also has 5 different types of buffs which you can see here:

| Color  | Description                                          | Image                                                                                                                                        |
| ------ | ---------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| FF0000 | Enhances your paddle speed                           | ![PaddleSpeed](https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png)       |
| 00FF00 | Adds one live                                        | ![AddLive](https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png)           |
| 0000FF | Enhances your ball and paddle speed by small amounts | ![SpeedBuff](https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png)         |
| FFFF00 | Makes you invincible for about 1 minute              | ![InvincibilityBuff](https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png) |
| FF00FF | Makes your ball go through EVERYTHING, broken buff   | ![DestroyerBuff](https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png)     |
