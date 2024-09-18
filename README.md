# Ferris Wheel Engine

A simple interactive Ferris Wheel simulation built with JavaScript and HTML5 Canvas. This project showcases a rotating Ferris wheel with moving cabins, clouds, swaying grass, and a dynamic game where players collect passengers by aligning them with the corresponding colored cabins.

## Click Below to View Live Demo

<a href="https://samgilmore.dev/FerrisWheelEngine/" target="_blank">
    <img src="https://github.com/user-attachments/assets/3a766dca-4e5a-418f-8d32-a6ac47fe7ac1" alt="Click to View Live Demo" width="300"/>
</a>

## Key Features

- **Rotating Ferris Wheel**: The Ferris wheel rotates smoothly, with eight evenly spaced cabins swaying slightly as they spin. Use the arrow keys to rotate the wheel left and right to align the cabins with passengers.

- **Passenger Collection Game**: A never-ending line of passengers extends from the base of the Ferris wheel. Each passenger is randomly assigned a color that corresponds to one of the cabins. Players must rotate the Ferris wheel to pick up the passengers with matching colored cabins. A 30-second timer adds challenge, and the goal is to collect as many passengers as possible before time runs out.

- **Custom Cabin Design**: Each cabin is composed of a simple triangle and semicircle. The cabins remain upright as the wheel rotates, and the smooth swaying effect adds to the visual appeal.

- **Fixed Time Step & Variable Rendering**: The engine uses a fixed time step for updating game logic (physics) while allowing variable rendering rates, ensuring the game runs smoothly across devices without frame rate dependence.

- **Interpolation for Smoother Animation**: By using interpolation between frames, the game reduces stutter and provides smoother visual movement, even when frame rates fluctuate.

- **Web Workers for Background Movement**: Cloud movement and background animations are handled by web workers, freeing up the main thread for handling user interaction and rendering. This ensures efficient background animation with minimal performance overhead.

- **Moving Clouds**: Clouds move across the sky at different speeds, respawning when they leave the screen to create a continuous floating effect. The cloud movement is offloaded to web workers for optimized performance.

- **Swaying Grass**: Grass blades at the bottom of the canvas gently sway, with random height variations for natural movement.

- **Smiley Face Center**: A playful smiley face is drawn at the center of the Ferris wheel, adding character to the design.

## Game Description

- **Arrow Keys to Control**: Use the left and right arrow keys to rotate the Ferris wheel. Align the colored cabins with passengers to collect them.

- **Passengers**: A line of passengers with randomly assigned colors extends from the base of the Ferris wheel. The goal is to rotate the wheel so that passengers are picked up by the corresponding colored cabins.

- **Scoring**: Each time a passenger is picked up by the matching cabin, the score is incremented, and a new passenger appears at the end of the line.

- **Time Limit**: The game runs for 30 seconds. Try to collect as many passengers as you can before the timer runs out!

[![Hits](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2Fsamgilmore%2FFerrisWheelEngine&count_bg=%233D66C8&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=Views&edge_flat=false)](https://hits.seeyoufarm.com)
