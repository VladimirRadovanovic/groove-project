# Groove

Groove is the place to find and sell amazing vinyl records. Inspired by The Sound of Vinyl, but with the added benefit of selling vinyl records instead of just purchasing them.

Website: https://groove-project.herokuapp.com/

![alt](https://imgur.com/CwEuDnU.png)

![alt](https://imgur.com/8jKQFVK.png)

![alt](https://imgur.com/IgqkIde.png)

![alt](https://imgur.com/3s41OFc.png)

##Technologies Used

### Frontend
   * JavaScript
   * React
   * Redux
   * HTML/CSS
### Backend
   * Python
   * Flask
   * SQLAlchemy
   * PostgreSQL
   * WTForms
   * Docker
   * Heroku
   * AWS S3

## Development

To run this project localy, take the following steps:

   * Clone the repository from GitHub.
   * Install dependencies
     ** in the root of the project run: pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt
     ** then: cd react-app && npm install
   * Create a .env file based on the .env.example with the proper settings for your development environment
   * Set up your PostgreSQL user and database and make sure it matches the information in the .env
   * Get into pipenv and get the database up to date:
     ** pipenv shell
     ** flask db upprade
     ** flask seed all
   * Start development servers
     ** in the root of the project run: flask run
     ** then: cd react-app && npm start
      
## Adding new dependencies

If you install any new python dependencies to your pipfiles (using pipenv install), you'll need to regenerate the requirements.txt before deployment.

For production dependencies, run pipenv lock -r > requirements.txt.

For development dependencies, run pipenv lock -r --dev > dev-requirements.txt.

Note: psycopg2-binary MUST remain a dev dependency. 
