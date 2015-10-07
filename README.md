##Project proposal - 10,000 Hours

####Summary
Users can track and log their practice time in any discipline (sport, languages, coding, crafts, dancing etc).

Users can log each practice session, its aims, duration, the outcome etc. They can also upload (or link to) useful videos, photos, documents etc, and likewise with their own created content ( eg a dancer filming the result of their practice session to refer to later).

The tool tracks your progress towards the 10,000 hours (see below) and you can earn badges as you progress towards this. 

###10,000 hours concept

The idea of 10,000 hours practice is a common trope in discussions around how people become experts in any discipine (languages, sports, crafts, coding). The idea is that you only become good at something through doing it often and over an extended period of time. 10,000 hours of practice is a figure that you aim for before you can say you know something:

[BBC article about 10000 hours concept](http://www.bbc.co.uk/news/magazine-26384712 "Can 10,000 hours of practice make you an expert?")


####MVP
The internal API would be for a user's practice logs. Users can create/update/delete a log and view all their previous logs. Their profile will show them the progress they have made, what badges they have earned, and their activity over time.

####Models
Three models: users, logs and badges (groups would be the next logical model if we have time).

###Badges
These are a way to 'game-ify' the experience. At first they would just be generic - 'novice', 'master' etc but eventually we could make custom sets of badges for specific activities eg. golf ( 'birdie', 'still on the green', 'hole-in-one', 'tiger woods' etc). Possibly allow users to upload their own sets of badges.

You get badges as you acculumate more hours or for eg. logging in three days in a row. Later on, when groups are introduced, you can gain points for providing useful advice to others, or for moderating a group etc ( like stack overflow).

####Further features
- connect with other people who have similar learning goals (eg. your training partner). Eventually we could allow users to set up their own groups.
- user can tag the practice logs to categorise the different types of practice they do.

####Technology we will use
- Carrierwave ( to allow upload of practice notes, pdfs, videos etc). Question: would these resources have to be set up as a additional model?
- Passport - for authentication
- Jquery - for ajax requests and DOM manipulation
- ? Web sockets ? - for group chat?



