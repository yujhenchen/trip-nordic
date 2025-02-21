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





## Tech stack and why choose them

#### Frontend - Vike (pending)
- runtime: Bun
- Frontend Framework: [Vike](https://vike.dev/)
- UI Framework: [React]()
- ???: [Bâti](https://batijs.dev/)
- UI Component Libraries: [shadcn](https://ui.shadcn.com/)

#### Frontend - Next.js
- Runtime: Bun
- Frontend Framework: [Next.js](https://vike.dev/)
- UI Component Libraries: [shadcn](https://ui.shadcn.com/)
- Git hooks manager [Lefthook](https://lefthook.dev/)
- Icon library: [Lucide](https://lucide.dev/)


#### Backend
- Script to crawl data from source websites - Go
- 





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

