# Welcome to the Wedding Planner App 👋

This is an [Expo](https://expo.dev) project created with [
`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

## Table of Contents

- [Tech-Stack](#Project Stack)
- [Authentication](#Authentication)

### Tech-Stack

- Expo : Frontend development
- NestJs : Backend development

### Authentication

#### OAuth2 :

1. when this signIn (with google/Apple/Facebook , etc ) is pressed we use the provided method from WebBrowser package to
   open a window that create a request to our backend ( NestJs )

2. our backend then will construct the object needed for the provider using the package 'passport' ( please learn the
   best practice using passport with strategies, what is actually
   needed is following :
    1. the client id
    2. the client secret
    3. the callback url
    4. the scopes ( if needed )

   The client id and client secret could be obtained by creating an account on the provider related page ( for
   google its the google console ) after that the data could be obtained from there.

   The callback url is the Endpoint on our backend in which the provider will send a code ( if the user consent ) that
   we
   could use to fetch user's data , __Please note that when using passport :__ this step were we should get a code and
   exchange it with user's info will happen behind the scene , passport with automatically exchange the code and
   return :
   (userinfo , accessToken , refreshToken).

3. after getting the user's info we store them in the database

4. at this stage sending the accessToken and the refreshToken to the frontend is only possible through params in the
   url ( which is not very safe )
   because we are redirecting to web or using deep link , so instead we create an ExchangeToken ( quickly expired )
   and we send it back to the frontend , in which later the frontend will directly exchange it with the
   accessToken and refreshToken from the /api/auth/exchange endpoint
