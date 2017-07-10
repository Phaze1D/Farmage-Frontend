# Farmage Frontend

This repository contains an app that I been working on for over a year now, and I hope to finish someday. The is a farm management application that simplifies the process of maintaining and organizing economic data of any farm. It has a simple easy to use UI that makes it easy to store and access one's data. The data is stored in a NoSQL database which provides sufficient flexibility for any farm.

Since this is just the frontend part of the project all the data comes from [faker.js](https://github.com/marak/Faker.js/) and currently all the input forms do not work because it is not connected to the backend yet. The concept version of this app does have a backend support but the frontend is mostly just concept. You can find the concept version with backend support in this [repository](https://github.com/Phaze1D/Farmage-Concept).

<p align="center">
<img src="readme_imgs/screenshot1.jpg" height="300px"/>
</p>

<p align="center">
<img src="readme_imgs/screenshot2.jpg" height="300px"/>
</p>

<p align="center">
<img src="readme_imgs/screenshot3.jpg" height="300px"/>
</p>


## Development
This is the first app that I built with ReactJS so it may have some rust. I had to stop the development of the app do to work, but I do hope to continue making it. I planned on using MeteorJS as the backend so to get started you need to have [MeteorJS](https://www.meteor.com/) installed. Once you have installed MeteorJS, run `meteor ` in the root directory of the app which should start the application on `localhost:3000`

### Folder Structure
The two main folders in this app are

* import
	* ui
		* [models](import/ui/models)
		* [structure](import/ui/structure)

Theses folders contain all the current frontend code that I've work on so far. The models folder contains the React components for each data model and the structure folder contains all the custom UI components that I built.


## Dependencies
* [NodeJS](https://nodejs.org)
* [MeteorJS 1.4.2.3](https://www.meteor.com/)

## License
Usage is provided under the MIT License. See [LICENSE](LICENSE) for the full details.
