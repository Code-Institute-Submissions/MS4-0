![Responsive website images](/READMEinfo/banner.jpeg "Responsive website images")

# **MILESTONE PROJECT THREE**

For Milestone Project Three, which requires the development of a full stack site that allows users to manage a common dataset, users can manage the cost tracking of a building development through the design and/or construction phases.  The site allows users to view the current estimated cost and a list of changes which are impacting the cost movement from the original budget.

The website can be viewed [here](xxxxxxxxxxxxxxxxxxxxxxxxxxxxx)

## **UX**

### **Who is the Website for?**

Ultimately, the site serves the purpose of the developer, to:-

**1. View the current cost position**<br>
The website shall enable the developer, and other persons involved and with access, the ability to view the live, current cost position of the development.

Whilst the developer will probably be most interested in the Total Cost, other users may be more interested in the list of changes - and their individual cost impact.

**2. Implement Consistent, Best Practice Cost Control**<br>
The website shall enable the Cost Managers - those responsible for managing and reporting the current cost position of the development - to report costs immediately as they arise on a project.

The website will provide a consistent approach in the reporting of costs and changes, from project to project.  This will support familiarity and understanding for users.

<br>

### **User Stories**

On any property development, there will be methods for tracking and reporting costs.  A cost manager will normally implement a simple cost tracker utilising an Excel spreadsheet to list the changes and report this back to the Developer/Client.

I currently work for a developer and we require our cost managers to implement these procedures. The cost managers utilise the Excel cost tracker which can be viewed [here](XXXXXXXXXXX)

My aspiration is to incorporate the principles of this template into a more robust data management system which can be used for different construction projects by different developers / clients.

As such, the fundamentals and principles are crystalised in the User Stories below, which will be translated into the final website.

*As a developer, I want to implement best practice cost control on my construction projects.*

 **Item** | **Experience** | **Objectives**
---------|----------------|---------------
&nbsp; | *As a developer / user, I want to:-* | &nbsp;
1 | Clearly see the current cost position of the project | Provide a Summary that is concise and easy to interpret
2 | Determine the cost movement from start to current/forecast position | Include the original budget, summary of changes and revised total estimate on the Summary
3 | View a full list of the changes impacting the development | Provide a list of the changes on the website
4 | Determine what changes in the latest period (30 days) have added to the revised total estimate | Provide a filter of the cost for the past 30 days
5 | Depending on the purpose of my visit to the site, view only Accepted or Pending/WiP changes | Provide a filter for 'Status' categories
6 | View changes / cost impacts by the type of change to understand their impact on the development | Provide a filter for the 'Change Type' categories
&nbsp; | &nbsp; | &nbsp;
&nbsp; | *As a Cost Manager, I want to:-* | &nbsp;
7 | Add new changes to the Cost Tracker with a breakdown of the cost | Provide an 'Add' function which updates the database and list of changes which can be viewed
8 | Edit changes as details are updated or when the Status changes | Enable an edit function of the change which will update the database

<br>


### **Functions of the Website**

The functions of the website are to:-

1. Provide a visual summary of the current cost position of the development project.  This is represented in a Dashboard.
    - XXXXXXXXXXXXXx

2.  View a list of all the changes impacting on the cost of a construction project.  This is represented on the Register.
    - XXXXXXXXXXXXXXXXXX

3. Ability to Add (create) / View (read) / Edit (update) / Delete changes which affect a construction project.
    - XXXXXXXX

<br>

___
<br>

## **Design**

### **Desktop-only** (for now)

The website is optimised for desktops only at this stage, as mobile versions will necessitate a 'lite' version.

Whilst the website / app is in development, the focus is on establishing all the desired functionality of the desktop version in order that there are no constraints are introduced.

Once all the desired features are fully developed, a 'Lite' version will be deployed.
<br>


### **Key concepts**
The primary purpose of website is to show the current cost of a construction project and a list of the changes that have affected the cost since the establishment of the budget.

The intention of the site is to give this information in a clear, concise manner.  By giving users control of certain filters, it is envisaged that this will assist users understanding of the numbers being presented without the need for explanation.  The filters should give users a better insight on the information and numbers being presented, and in turn control of the project by being able to make more informed decisions.

Whilst the website has reached a point of deployment for presentation, feedback and testing with users, the page requires further development before being deployed in a live situation.  

As such, the page is developed along certain principles:-

<br>

### **Wireframe**

Figma was used to develop a key concept into framework for developing the web page / app.  Only a desktop framework was formulated at this stage.

A copy of the original wireframe can be found here: [Figma](https://www.figma.com/file/NCiIRZCyfNSYk62uRwCqu3/MS3?node-id=0%3A1) or [PDF](READMEinfo/Figma.pdf)

<br>

### Typography

The [Montserrat](https://fonts.google.com/specimen/Montserrat) font (from Google Fonts) is the only font used throughout the whole website with Sans Serif as the fallback font in case for any reason the font isn't being imported into the site correctly.

<br>

___

## Features

### Responsive

XXXXXXXXXXXXXXXXXXXXXXXXXX

![Responsive Screen](/README-attachments/responsiveScreen.gif "Responsive Screen")


### Interactive Elements

The web page is interactive in the following ways:-

* Filter - on the Dashboard and Register, the Filter acts to filter and change the data presented on screen.
  1. Cost - option to switch between 'Nett' and 'Gross' total figures
  2. Status - selection of Status will update totals or filter the register for only those selected
  3. Change Type - selection of Change Type will update totals or filter the register for only those selected
  4. Period - selecting will update the totals to only include the changes within the period selected.

* Add / Edit Changes - users can add or edit changes, affecting the database accordingly.

* Auto-update input information on the Add / Edit pages:-
  1. Numbers auto-format with thousand separators when fields entered/updated;
  2. Gross total auto-calculates to ensure that it is the sum of the preceding numbers.


### Existing Features

An overview of the features on the website are listed below:

* **Dashboard**: XXXXXXXXXXXXXXX
![Weather Chart](/README-attachments/ChartTile.jpg "Weather Chart")

* **Register**: XXXXXXXXXXXXXXX
![Weather Chart](/README-attachments/ChartTile.jpg "Weather Chart")

* **Add Change**: XXXXXXXXXXXXXXX
![Weather Chart](/README-attachments/ChartTile.jpg "Weather Chart")

* **View / Edit Change**: XXXXXXXXXXXXXXX
![Weather Chart](/README-attachments/ChartTile.jpg "Weather Chart")

* **Registration**: XXXXXXXXXXXXXXX
![Weather Chart](/README-attachments/ChartTile.jpg "Weather Chart")

* **Log In**: XXXXXXXXXXXXXXX
![Weather Chart](/README-attachments/ChartTile.jpg "Weather Chart")

* **Budget**: XXXXXXXXXXXXXXX
![Weather Chart](/README-attachments/ChartTile.jpg "Weather Chart")

* **Log Out**: XXXXXXXXXXXXXXX
![Weather Chart](/README-attachments/ChartTile.jpg "Weather Chart")


### Features to Implement in the Future

The functions implemented on this website are for demonstration purposes only at this stage, there is further development required before the website can be deployed for a live development.  Those features required before live deployment include:-

* **Authorisation of Registration:** After a user has registered, access will not be granted until an Administrator approves access and sets privileges.
* **Access privileges:** Users will be granted different rights and viewer privileges dependent upon their role on the project. For example, a cost manager will be able to add and edit changes, whereas other users will only be able to view them.  An Adminstrator role will also be introduced for controlling these access privileges.
* **Graphical Representation:** To enhance and make the user experience more engaging, the Dashboard can benefit from graphs or other figurative representations of the data in a more visually absorbing way.

<br>

## Technologies Used

### Languages Used

* [HTML5](https://en.wikipedia.org/wiki/HTML5)
* [CSS](https://en.wikipedia.org/wiki/Cascading_Style_Sheets) 
* [Javascript](https://en.wikipedia.org/wiki/JavaScript)
* [Python](https://www.python.org/)

### Frameworks, Libraries and Programmes Used 

* [MaterializeCSS](https://materializecss.com/)  
Materialize is generally used to assist with the layout, utilising the in-built grid system, and design functionality.

* [Google fonts](https://fonts.google.com/)  
Google fonts is used to import the 'Montserrat' font into the style.css file which is used throughout the project.

* [jQuery, incl UI](https://jquery.com/)  
jQuery is used for Javascript DOM manipulation.

* [Git](https://git-scm.com/)  
Git was used for version control by utilizing the terminal in VSCode terminal to commit and push changes to GitHub.  
In addition, in order to track the purpose of commits, the following pre-fixes have been adopted, which are taken from the Commit Message Guidelines outlined by [Angular Framework](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#-commit-message-guidelines):-
  * feat: new feature has been added to the code
  * fix: bug fixed during on-going testing
  * refactor: 'tidy up' of code
  * docs: addition of comments to code or writing of README file

* [GitHub](https://github.com/)  
GitHub is used to store the projects code after being pushed from Git.

* [Figma](https://www.figma.com/)  
Figma was used to create the wireframes during the design process.

* [Kapwing](https://www.kapwing.com/)
Kapwing used for editing videos and creating GIFs used in this README file.

* [Screen Recorder](https://chrome.google.com/webstore/detail/screen-recorder/hniebljpgcogalllopnjokppmgbhaden)  
Screen Recorder used for creating videos (edited in Kapwing) of website features in operation.


## Testing

### User Story Feedback and Testing

**1** | **As a user, I want to be able to find a possible travel destination**
---------|----------------
(a) | Users can load destinations into the search bar to select destinations.  
(b) | The search bar is restricted to towns and cities, so the search bar can be specific and not over-loaded with the likes of street names.
(c) | ![Destination Search](/README-attachments/Destination.gif "Destination Search")
________________

<br>

**2** | **As a user, I want to be able check the location of the travel destination**
---------|----------------
(a) | In order for users to be able to confirm that the correct destination has been selected, a map is included on the panel.
(b) | A cross-hair indicates the location of the destination selected.
(c) | Users can see the country, and surrounding countries, of the destination selected.
(d) | ![Map](/README-attachments/Map.jpg "Map")
_____________

<br>

**3** | **As a user of the site, I want to be able to see typical weather conditions of that destination**
---------|----------------
**4** | **As a user, I want to be able to determine the best months to visit the destination**
(a) | Once the destination is loaded, the panel displays two past trends of weather for that place, the average temperature and rainfall for each month in the form of a Line Chart.
(b) | The Chart will show the warmest and driest months to visit a destination, two factors which help to determine the best months to visit a destination.
(c) | To see the average temperature of each month, scroll through the months to read the temperature in degrees Celsius.
(d) |![Typical Weather](/README-attachments/TypicalWeather.gif "Typical Weather")
_____________

<br>

**5** | **As a user, I want to see the current weather in the chosen destination**
---------|----------------
(a) | A Current Weather tile is included on the page.
(b) | ![Current Weather](/README-attachments/CurrentWeather.jpg  "Current Weather")
_____________

<br>

**6** | **As a user, I would like to find out the cost of travelling to this destination**
---------|----------------
(a) | A flight price tile is included on the page.
(b) | ![Flight Price](README-attachments/FlightPrice.jpg "Flight Price")
(c) | The price of the flight of is the lowest price returned from Skyscanner for the destination.
(d) | The price is based on the current month selected
(e) | ![Flight Price by Month](README-attachments/FlightPriceMonth.gif "Flight Price by Month")
(f) | Users can click on the Flight Price Tile to go to Skyscanner and search flight prices in more detail
(g) | ![Link to Skyscanner](README-attachments/LinkToSkyscanner.gif "Link to Skyscanner")
(h) | Where it is not possible to return flight prices, users can still click on the Flight Price Tile to direct them to Skyscanner.net.
(i) | ![No Flight Price Available](README-attachments/NoFlightPrices.gif "No Flight Price Available")
_____________

<br>

**7** | **As a user, I would like to see what the place I want like to visit looks like** 
---------|----------------
(a) | The Photo Tile shows a selection of photos that are 'Points of Interest' at the destination.  
(b) | ![Photo Tile](README-attachments/Photos.gif "Photo Tile") 
____________

<br>

### Validators

The W3C Markup Validator and W3C CSS Validator Services were used to validate every page of the project to ensure there were no syntax errors in the project.

**[W3C Markup Validator](https://validator.w3.org/) - [Results](https://validator.w3.org/nu/?doc=https%3A%2F%2Fdkeddie.github.io%2FMS2%2F)**

The following errors were raised on the validator on first pass:-

![HTML Validator Errors](README-attachments/ValidatorErrors.jpg "HTML Validator Errors")  

These errors were associated with the blank headings / fields which will be populated once the Javascript app has run, following the input of the user information and full load of the page.  

In order to overcome this issue, a non-breaking space, *"&nbsp"*, has been added to the headings as a temporary input until the Javasript runs, and a placeholder image has been used for the 'src' attribute (from [Placeholder.com](https://placeholder.com/)).

**There are now no errors remaining on the HTML validator**

<br>

**[W3C CSS Validator](https://jigsaw.w3.org/css-validator/) - [Results](https://jigsaw.w3.org/css-validator/validator?uri=https%3A%2F%2Fdkeddie.github.io%2FMS2%2Fassets%2Fcss%2Fstyle.css&profile=css3svg&usermedium=all&warning=1&vextwarning=&lang=en)**

There are no errors found on the validation service for CSS.

### Javascript Code Quality - JSHint

[JSHint](https://jshint.com/) has been used to check and test the Code Quality of the Javascript used on this page.  The Javascript has been updated in line with warnings initially returned.  The following items remain and which are deemed not critical to the functioning of the site:-

- Where warnings of ES6, 8 and 10 have been raised, these have not been ignored, as the main browsers will function with the use of this version of Javascript.
- There remains one warning, 'Redefinition of 'origin'', hover this is an intended part of the Javascript to be implemented on the page.
- Undefined variables - these are undefined on the initial page load but become defined after further Javascript has been implemented.
- Unused variables - these variables are required for the running of external APIs.
<br>

### Manual Testing of the Site

The following tests were carried out to ensure functionality before deployment:-

**Test**: Check that page fully loads with different Current Locations and Destinations
* Steps followed:  
  * Static Current Location of Dublin for 10 different Destinations tested
  * 10 different Current Locations with static Destination of Dublin tested
  * 10 different locations used were:-  
    * New York
    * Shanghai
    * Milan  
    * London
    * Abu Dhabi
    * Los Cristianos
    * Florence
    * Perth
    * Wellington
    * Cape Town
  * Check that all Tiles load
  * Check that map shows correct Destination
  * Check that Months Tile rotates when clicked, and Ave Temp and Flight Price changes
  * Check that images can be rotated on Photos Tile
* Results:  Page loads in all scenarios but the following limitations are sometimes observed when carrying out the full test  
    * Flight Prices may not always be returned.  That can be for a number of reasons, including:-  
        1. The place name returned by Algolia is not recognised by Skyscanner.net.  For example, London is called City of London in Algolia and is therefore not recognised by Skyscanner.  
        2. Requests to Skyscanner API may be exceeded if used too much or to quickly.  This is a limitation of the open API available.  
        3. There may be no Flights available in that month.  

        A Catch statement has been put in place for when the above 3 items occur, so that Users are directed to Skyscanner.net to be able to check prices manually.  The Tile may also toggle as appropriate when rotating through the months to show prices.
    * **[Bug now fixed]** *Some city or town names may be the same in different countries, e.g. Perth.  The web page defaults only to the top selection, Perth, WA.  This is a current bug which will need to be rectified.* **[Bug now fixed]**

**Test**: Test the page with invalid inputs
* Steps followed:-
  1. Current Location of 'Dublin' and Destination of 'Asdfasdfasdf' used to test page.
  2. Current Location of 'Asdfasdfasdf' and Destination of 'Dublin' used to test page.
  3.  Destination and Current Location of 'Asdfasdfasdf' used to test page.
* Results:-
  * Steps 1 and 3 return expected Error alert.
  ![Invalid Input - Fail](README-attachments/InvalidInputs-Fail.jpg "Invalid Input - Fail")
  * The page loads under Step 2, however this is to be expected as the Current Location is only required for the Flight Price Tile, which has an option if no prices are returned from the API
  ![Invalid Input - Still Pass](README-attachments/InvalidInputs-StillPass.jpg "Invalid Input - Still Pass")

During the on-going testing and development of the site, bugs were discovered and resolved.  These can be reviewed in the list of Git commits, specifically those with the 'fix' prefix.

For a list of the Git Commit history, this can be viewed [here](https://github.com/dkeddie/MS2/commits/master)


### Further Testing

During the development of the website, and again as a final, comprehensive and in-depth review, the following testing was carried out:-

* The Website was tested on Google Chrome, Internet Explorer, Microsoft Edge and Safari browsers.
* The website was viewed on a variety of devices: Desktop, Laptop, iPhone 8 & iPhoneX.
* Buttons were checked to ensure when hovered or active that they are responsive and operate uniformly.


### Known Bugs

The following issues were identified during development of the site.  Some of them have been fixed during the final checking, testing and deployment phase:-

1. The following error occurs in the console when both the Current Location and Destination have been inputted, and the Tiles are loaded:-  
!['defaultView' Error](README-attachments/Error-defaultView.jpg "'defaultView' Error")
No known negative effect has been detected.
2. The following error can occur at times in the console when rotating through the images in the Photo Tile:-  
!['Undefined Property' Error](README-attachments/Error-propertyUndefined.jpg "'Undefined Property' Error")
Although the image does not change when the Error arises, the images will continue to rotate when the forward/back options are selected.  
**[Bug now fixed]** *This error has now been resolved by creating a new array which only contains places with photos, excluding those items which do not contain photos from the original API array* **[Bug now fixed]**
3. A city or town with the same name in different locations will only return information on the top return.  For example, Perth will only return Perth, WA.  
**[Bug now fixed]** *This fault has now been resolved by modifying the Algolia API.  The global variables now set according to the full place name and country as opposed to just the city name, which rectifies this issue.* **[Bug now fixed]**


## Deployment

### For Development Purposes

The website has been deployed on GitHub and is currently publicly accessible. 

The development of the website has been undertaken on VSCode.

The steps from start to present were:-

1. Creation of repository on GitHub, utilising Code Institute template.

2. Clone of GitHub repository to local machine but utilising GitBash to implement the command:-  
`git clone https://github.com/dkeddie/MS2.git`

3. Utilise Git via the VSCode terminal to push content back to GitHub.  This was undertaken at regular intervals throughout the development of the website.

4. Deployment of the webpage was implemented by
    * Going to the 'Settings' of the repository,
    * Scrolling to 'GitHub Pages' section,
    * Selecting 'master branch' of the Source dropdown menu
        
The website is now deployed and can be viewed at:
    [https://dkeddie.github.io/MS2/](https://https://dkeddie.github.io/MS2/)  
<br>

### Cloning of the Repository

Should you wish to deploy your own version of the website, the following steps may be followed to host your own version on GitHub:-

1. Visit my GitHub Repository: [MS2](https://github.com/dkeddie/MS2)

2. Click dropdown 'Code' and copy url to 'Clone with HTTPS'  
![Clone](README-attachments/clone.png)

3. Select 'Import Repository' from the Menu dropdown, paste the url, give your new repository a name and click 'Begin Import'
![Clone instructions](README-attachments/clone2.png)

4. Go to your new Repository.  You may chose to launch the repository in an IDE of your chosing in order to make changes to the website, and customise it to your requirements.

5. To deploy the website, follow step 4 of the **Deployment** section immediately above.


## Credits

### Content

All content and code was written by the developer, except where taken from libraries or documented within this file or the Code files.

### Media

The Media Content utilised for this site is taken from Google Places via the Google Maps Javascript API, which is available for public use.

### Acknowledgements

Thank you to my mentor for feedback and advice given throughout the project.