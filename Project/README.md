# WebApp for a grocery list for (university/broke) students [name still required]

The aim of this project is to make a webapp for university students that helps them to made a grocery list for the week (ideally healthy within a budget)

I found out about the [Open Food facts](https://world.openfoodfacts.org/) organization and then see that their [data](https://world.openfoodfacts.org/data?utm_source=off&utm_medium=web&utm_campaign=discover_buttons_en) is available
and thought about doing an app using this data.

So basically is a recommendation webapp.
The idea is to help student made better choices or even give them a full grocery list of food products for their week.

The student has a health preference list of required macro nutrients and micro nutrients.
Then the webapp can give a list of recommended product to achieve such list.

The app consist in two main part:
- The backend: An asp dotnet API with the following endpoints:
  - /auth/register for register student
  - /auth/login for login user
  - /api/v1/product used to retrieve information of a product (Json format) based on the Id
  - /api/v1/preferences 
- The frontend: An angular project for the logic and maybe tailwind for the styles.
