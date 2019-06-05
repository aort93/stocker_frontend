## Stocker App
An stock trading simulation app with real time stock market imforamtion such as current prices, close price, news, etc using IEX's api. This app was built for users to create their own portfolio with an amount they choose and see how they would do if they really invested money in that stock. This web app can also just be used to get links to trending stock market news.

## Backend link
https://github.com/aort93/stocker_backend

## Update
On June 1, 2019, IEX changed their public api (https://api.iextrading.com/1.0/stock) to a cloud based api. Functionality in Stocker will temporarily be down until api endpoints are updated to correspond with their new cloud based api.

## Motivation
This project was built in order for people who are new to trading, like me,  can practive and learn trading without it affecting them financially. In the future i hope to add real time chat so users can commmunicate with other users and discuss finance and the stock market.

## Tech/Framework Used
Built With: 
- React/Redux frontend
- Ruby on Rails backend
- semantic-ui-react
- IEX trading api 
- Chart js2 
- Stock Quote gem

## Features
- Search for companies by ticker symbol or company name
- Obtain real-time trade price pulled from external API
- Visualize historical stock prices for up to five years
- Buy and sell company shares based on current market-price
- Watch companies to add to a user's Watchlist
- See financial portfolio on account page
- Read news articles on publicly traded companies





## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

