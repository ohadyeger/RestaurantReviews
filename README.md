Ohad Yeger: 315787713
Eden Azulay: 308504315

- Project Design: 
				- We've started with the given boilerplate.
                - Each component we've used is in the Components folder inside src/client
                - The main component is 'App' containing a left menu bar with registration	        logging in and creating restaurant options, and a search browser.
                - Each Component has its actions, reducers and saga files implementing all his      functionalities.
				- The project has an 'initialState' file with the initial state of each component   in the system.
- View:

	Components:
		App - Brings together all other components
		LoginPage - Handles Login/Logout requests
		Register - Handles user registration
		Restaurant - Handles the creation of a new restaurant
		RestaurantReview - Handles the creation of a new restaurant review
		RestaurantView - handles the vieweing of a restaurant review
		Search - Handles the Search features of the application
		UserEdit - Handles user profile editing
		UserView - Handles user view

	sub-components(3rd party):
		PropTypes - Handles prop typing
		Geosuggest - Google Maps API for location search and integration
		StarRatings - Handles star ratings at review creation/edit

	*	The view design is, as apparant, a very basic design meant to show the different features 	in 	a minimalistic fashion.

- Model:

	App model:

		* mostly done by the 'reducer' function of Redux, handling all changes to the state of 	    the store.

	Mongoose Schemas:

		"RestaurantModel": 
			- _id: Schema.Types.ObjectId
  			- name: String
  			- location: 
    			- type: 
					- description: String
					- lat: Number
					- lng: Number 
				- default: null
  			- reviews <Array>:
			    - type: Schema.Types.ObjectId
				- ref: "ReviewModel" 

		- "ReviewModel":
    		- _id: Schema.Types.ObjectId,
    		- reviewer:
    			- type: Schema.Types.ObjectId
    			- ref: "UsersModel"
    		- restaurant:
    			- type: Schema.Types.ObjectId
    			- ref: "RestaurantModel"
    		- pictures:
      			- type <Array>:
    			  	- name: String
    				- data: String
    				- contentType: String
      			- default: []
    		- rating:
      			- type:
        			- bathroomQuality: Number
    				- staffKindness: Number
    				- cleanliness: Number
    				- driveThruQuality: Number
    				- deliverySpeed: Number
    				- foodQuality: Number
      			- default: null
      			- creationDate: Date

    	- "UsersModel":
			- _id: mongoose.Schema.Types.ObjectId
  			- username: String
  			- location: 
    			- type:
					- description: String
					- lat: Number 
					- lng: Number 
    			- default: null
  			- picture: 
    			- type:
					- name: String
					- data: String
				- contentType: String 
    			- default: null
  			- reviews <Array>: 
				- type: Schema.Types.ObjectId
				- ref: "ReviewModel"

- Control:
				
	- Flow example: 
					- A user is trying to register 
					- while typing, the text is sent to 'validateUserName' action of 'RegisterActions'
					- from there, the saga of Register component catch the action and send a get request to the server.
					- if the request succeeded - means that the name already exists, a 'ValidateUserNameFailed' action is invoked and an error message jump to the screen.
					- if the request failed - means that the name is valid, and than a 'validateUserNameSucceed' action is invoked and the user can complete his typing.
					- on pressing 'submit' button an 'registerRequest' is invoked, going through the saga and send a set request to the server, saving the user credentials.
					- an 'RegisterReqSucc' is invoked than if the request from the server succeeded and than the user is in the database.			  

	- Extra Libraries Used:
					- 'semantic-ui-react'
					- 'react-geosuggest'
					- 'react-star-ratings'

	**	Most of the App's control and flow is dictated by the Redux Store.
		Meaning, all control over changes to the system (e.g. View events, Server requests, state changes) were done from a single 'source-of-truth' and actions were dispatched and handled by the Redux store.


