# NC News Seeding

1. You must create two .env files for your databases:

.env.test (for the test database).
.env.development (for the development database).
Double-check that .gitignore file includes .env.* so these files aren't pushed to GitHub.

2. This project requires two databases:

A development database (for realistic data).
A test database (with simpler test data).

3. Run the following scripts and check the console logs (you may need to scroll up a bit in the terminal!):

npm run test-seed
This runs tests for your seed function.
No tests will pass yet (which is expected), but you should see logs confirming you are connected to your test database.
npm run seed-dev
This runs the run-seed script, which calls your seed function with development data.
You will see errors at this stage, but the logs should confirm that you are connected to the development database.