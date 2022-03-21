# Boss Tracker
This application's frontend is deployed using vercel: https://bosstracker.vercel.app/

The backend is deployed on heroku.

Application for tracking video game boss progress, using React/TailwindCSS for the frontend and PostgreSQL/Node.js/Express for the backend.

Project started on 13/02/2022. Deadline: 24/02/2022

Users will be able to register/login. Users will be create to make a Playthrough Profile. A profile can be made public or not public.
Within that profile, Multiple boss entries can be created. A boss entry will contain a boss name, a counter for boss attempts and a notes section.
All Profiles that are public will be displayed in a feed on the home page. Specific profiles can be searched for by the creator's username. Individual profiles can be expanded to view all bosses within that profile, and the boss entries can also be expanded to see the notes for that boss.

A PostgreSQL database will be used to store users, playthrough profiles and bosses.

### Initial database design
![image](https://user-images.githubusercontent.com/75766182/153832247-618d368a-73ab-4dc1-a5f7-a514a33a75e5.png)
### Changes
* password -> user_password
* public -> profile_public
* count -> attempts
* Added 'completed' column to Bosses table

### Initial Header
![image](https://user-images.githubusercontent.com/75766182/154664905-9534aae8-81eb-4623-b10e-278500cabe22.png)
When a button is hovered over, the button changes shape and a tooltip appears below.

#### Header when logged out
![image](https://user-images.githubusercontent.com/75766182/155158220-3a513eae-0ed7-4da0-ace7-5823c8a67be1.png)
Contains 3 buttons: Home, Log In and Register

#### Header when logged in
![image](https://user-images.githubusercontent.com/75766182/155158514-5d4435fb-6eb6-4cbc-ba69-e554a531d192.png)
Contains 4 buttons: Home, New Playthrough, Your Playthroughs and Log Out

### Landing Page
![image](https://user-images.githubusercontent.com/75766182/154793021-659386fb-01bc-4406-83cf-641819f9ec49.png)
The "Create one!" button will open the New Playthrough modal if they are logged in, or the Login page if they are not logged in.

### Playthroughs Feed
![image](https://user-images.githubusercontent.com/75766182/154793268-eb958bf6-efa3-4051-bbeb-6702d9af073d.png)

### New Playthrough Modal
![image](https://user-images.githubusercontent.com/75766182/155157475-136efce0-3e8f-48f3-b58f-b4f3a018c73a.png)

### Login Page
![image](https://user-images.githubusercontent.com/75766182/155228877-ecf9cb3a-7044-4669-8884-1043fcf365e5.png)

### Register Page
![image](https://user-images.githubusercontent.com/75766182/155228955-6c1f7b91-ed02-4c45-9791-f42f221f43b9.png)

### Your Playthroughs Page
![image](https://user-images.githubusercontent.com/75766182/155716397-0fb7c592-66ee-43e2-a958-d7953aa70052.png)

### Initial Detailed Playthrough Page
![image](https://user-images.githubusercontent.com/75766182/155716717-3ff8ac38-d3e2-494f-89f1-ad4a9b124830.png)
* Improvements/additions required in the future

### Add-Boss component on Detailed Playthrough
![image](https://user-images.githubusercontent.com/75766182/155716621-d3cfda86-f578-4c32-abe2-dae2119727ff.png)
* The add-boss component is visible only if the user created the playthrough being viewed

### 24/02/2022
#### Remaining tasks
* A more advanced login authentication (JWT)
* Password hashing (Bcrypt)
* Improvement of Detailed Playthrough page
* Allow each boss to be expanded to view boss notes
* Update and Delete functionality for profiles and bosses
* Responsive on all screen sizes

