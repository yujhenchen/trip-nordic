# trip-nordic

## Resources
- [Concurrent HTTP Requests in Golang: Best Practices and Techniques](https://medium.com/insiderengineering/concurrent-http-requests-in-golang-best-practices-and-techniques-f667e5a19dea)
- [Go Concurrency Explained: Go Routines & Channels](https://www.youtube.com/watch?v=B9uR2gLM80E)
- [Concurrency in Go](https://www.youtube.com/watch?v=LvgVSSpwND8)
- [Structs](https://www.codecademy.com/resources/docs/go/structs)
- [Understanding the Power of Go Interfaces: A Comprehensive Guide](https://medium.com/@jamal.kaksouri/understanding-the-power-of-go-interfaces-a-comprehensive-guide-835954101b7e)
- [Type assertion vs type switches in Go](https://rednafi.com/go/type_assertion_vs_type_switches/)
- [gob](https://pkg.go.dev/encoding/gob#NewEncoder)
- [Golang Defer: From Basic To Traps](https://victoriametrics.com/blog/defer-in-go/)

MongoDB
- [MongoDB Go Driver](https://www.mongodb.com/docs/drivers/go/current/)
- [How To Use Go with MongoDB Using the MongoDB Go Driver](https://www.digitalocean.com/community/tutorials/how-to-use-go-with-mongodb-using-the-mongodb-go-driver)
- [How to Use MongoDB with Go](https://earthly.dev/blog/use-mongo-with-go/)
- [Go Backend Clean Architecture](https://github.com/amitshekhariitbhu/go-backend-clean-architecture)

Not yet
- [Testing and Benchmarking in Go](https://medium.com/hyperskill/testing-and-benchmarking-in-go-e33a54b413e)
- [Benchmarking in Golang: Improving function performance](https://blog.logrocket.com/benchmarking-golang-improve-function-performance/)

Frontend development
- [Learn to become a modern Frontend Developer in 2022](https://medium.com/@kamranahmedse/modern-frontend-developer-in-2018-4c2072fa2b9c)
- [frontend-checklist](https://developerruhul.github.io/frontend-checklist/)
- [Mastering Modal Dialogs in React Like a Pro](https://hackernoon.com/mastering-modal-dialogs-in-react-like-a-pro)

Django
- [Creating a Custom User Model in Django](https://testdriven.io/blog/django-custom-user-model/)

Custom model
- [Creating a Custom User Model in Django](https://testdriven.io/blog/django-custom-user-model/)

Auth token
- [JWT Authentication in Django](https://code.tutsplus.com/how-to-authenticate-with-jwt-in-django--cms-30460t)
- [Simple JWT](https://django-rest-framework-simplejwt.readthedocs.io/en/latest/index.html)
- [How to use JWT Authentication with Django](https://appliku.com/post/how-use-jwt-authentication-django/#django-jwt-authentication-logout)
- [JWT Logout — Django Rest Framework](https://medium.com/django-rest/logout-django-rest-framework-eb1b53ac6d35)

CORS with HTTPOnly Cookie
- [JWT token as HttpOnly cookie in Django](https://www.procoding.org/jwt-token-as-httponly-cookie-in-django)
- [How to Enable CORS with HTTPOnly Cookie to Secure Token?](https://geekflare.com/cybersecurity/enable-cors-httponly-cookie-secure-token/) 
- [Auth with JWT in React and Django #1 - JWT, Web security & Auth server set-up](https://blog.zjzhang.org/post/Auth-with-JWT-in-React-and-Django-part1)
- [django-cors-headers 4.7.0](https://pypi.org/project/django-cors-headers/)
- [Using HTTP cookies](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Cookies)
- [Cross-Origin Resource Sharing (CORS)](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS)
- [Request: credentials property](https://developer.mozilla.org/en-US/docs/Web/API/Request/credentials)



## Tech stack and why choose them

#### Frontend
- Runtime: [Bun](https://bun.sh/)
- Frontend Framework: [Next.js](https://nextjs.org/)
- Frontend library: [React](https://react.dev/)
- Language: [TypeScript](https://www.typescriptlang.org/)
- UI Component Libraries: [shadcn](https://ui.shadcn.com/)


#### Backend
- Script to crawl data from source websites [Go](https://go.dev/)
- Database [Supabase](https://supabase.com/)
- [Poetry](https://python-poetry.org/)
- Restful API [Django REST framework](https://www.django-rest-framework.org/)
- Language: [Python](https://www.python.org/)
- JWT auth [Simple JWT](https://django-rest-framework-simplejwt.readthedocs.io/en/latest/index.html#)





## Features

### General
- [ ] header
    - [ ] logo
    - [ ] navbar 
    	- [x] explore page, plan page, about page, sign in/ sign out button
		- [ ] sign in/ out status
		- [ ] toggle theme
- [x] footer
	- [x] copyright
	- [x] navbar

### Home
- [ ] hero text
- [ ] plan link, explore link

### About

### Explore
- [x] filter panel
    - [x] select/ unselect filters
    - [x] reset a row of filters
    - [x] reset all filters
- [x] activity card grid
    - [x] card
        - [x] image, title, description
        - [x] click to open card detail dialog
    - [x] display cards based on filters 
- [ ] card detail dialog
	- [ ] style should be correct
	- [ ] map of the place
	- [ ] press Keep to save the activity in personal Keep


### Plan
- [ ] left side bar
	- [ ] drag/ drop activity from Keep into day card

- [ ] right scroll panel
	
	- [ ] day card
		- [ ] title
			- [ ] edit: date picker
			- [ ] display: text
		- [ ] click + to create
		- [ ] click ?? to remove
			- [ ] confirm remove dialog
		
		- [ ] activity card
			- [ ] click + to create
			- [ ] click ?? to remove
				- [ ] confirm remove dialog
			- [ ] click to open activity dialog

			- [ ] activity dialog
				- [ ] click ?? to remove
				- [ ] confirm remove dialog

- [ ] right top save, copy link to clipboard

### Auth
- [ ] signup
	- [ ] BE with confirmation email
	- [ ] FE
- [ ] login using JWT
	- [x] BE
	- [ ] FE
- [ ] refresh token
	- [x] BE
	- [ ] FE
- [ ] logout
	- [x] BE
	- [ ] FE
