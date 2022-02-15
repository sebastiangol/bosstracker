# Boss Tracker
Application for tracking video game boss progress, using React/Next.js for the frontend and PostgreSQL/Node.js/Express for the backend.

Project started on 13/02/2022. Deadline: 24/02/2022

Users will be able to register/login. Users will be create to make a Playthrough Profile. A profile can be made public or not public.
Within that profile, Multiple boss entries can be created. A boss entry will contain a boss name, a counter for boss attempts and a notes section.
All Profiles that are public will be displayed in a feed on the home page. Specific profiles can be searched for by the creator's username. Individual profiles can be expanded to view all bosses within that profile, and the boss entries can also be expanded to see the notes for that boss.

A PostgreSQL database will be used to store users, playthrough profiles and bosses.

#### Initial database design
![image](https://user-images.githubusercontent.com/75766182/153832247-618d368a-73ab-4dc1-a5f7-a514a33a75e5.png)
#### Changes
* password -> user_password
* public -> profile_public
* count -> attempts
* Added 'completed' column to Bosses table

.
