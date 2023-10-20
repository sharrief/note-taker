# Note Taker

I had a blast building this project as part of an assessment for an job application. The assessment had a 3 week timeline. I completed the project in 15 calendar days, but was away for 5 of those days at a wedding.

The objective was stated as:
> The deliverable out of this is a link to a Github repo, whatever documentation you might think would be helpful and a working web app hosted somewhere publicly accessible.
>
> Please build a very simple “Notes” Web App. An app that will allow a user to Index, Create, Update and Delete notes. 
> 
> Our main goal is to see how you put the pieces together, so feel free to be creative and have fun with it. Please ensure that you cover all of the acceptance criteria mentioned below but be sure to add your own spin on it and if you have to make tradeoffs in any area, that’s fine, just mention what and why in your documentation.

The acceptance requirements were:

- Must be written with JavaScript or Typescript (preferred)

- Note Form must have the following validations

  - Must not be shorter then 20 characters

  - Must not be longer then 300 characters

- Main page must include all the notes and a way to create a new note

- Main page must include a search bar that will find based on a notes content. (Client or Server query is fine)

- Must include README with steps on how to run the application(s) locally.
---
### How to access publicly
For now the project is running live on Vercel at https://note-taker.sharrief.com. Its a live app, so please be nice, I haven't added the robust network protections a public live service would normally have.

You'll need to sign up for an account, then sign in, then you can create your notes.

---
### How to run locally
1. Install Docker desktop
    - This is needed to run a postgres db server locally
1. Clone the repo
1. ``cd`` into the postgres directory of the repo
1. Create a .env file at the project root. Define at least these 3 vars
    - POSTGRES_USER
    - POSTGRES_PASSWORD
    - POSTGRES_DB 
1. Run ``docker-compose up``. This will use these vars to create the postgres server in a Docker container
1. Deploy the prisma schema to the database by running ``npx prisma generate dev``
1. Add the text search column vector by executing the SQL statement: 
    - > ``
    ALTER TABLE "note" ADD COLUMN "text_tsvector" tsvector GENERATED ALWAYS AS (to_tsvector('english', text)) STORED;
    ``
1. Create a few more .env vars for the "pg" postgres driver to use to connect to the db. In the examples below the previously created vars are re-used.
    - PGHOST=localhost
    - PGPORT=5432
    - PGUSER=${POSTGRES_USER}
    - PGPASSWORD=${POSTGRES_PASSWORD}
    - PGDATABASE=${POSTGRES_DB}
1. Create an .env var for next-auth to use when encrypting cookies/jwts
    - NEXTAUTH_SECRET
1. Install npm
1. ``cd`` into the project root and run ``npm i`` to install the dependencies and then ``npm run dev`` to start the web server using NextJS
1. Open a browser on the machine and navigate to https://localhost:3000 (the default port is 3000)

---
### Misc

A few things I did beyond the base requirements
1. Add a sign up/sign in process
1. Add a rich text editor
1. Added some tests with Jest
1. Added storybooks for some client components
1. JSDocs with typedoc
1. Added basic localization support
1. Host on a custom domain

Some of the tricky things I ran into
1. Prisma doesn't support full text search with postgres. So I used two other postgres drivers for full text search: 
      - For production I used @vercel/postgres which uses websockets for perf benefits on the edge runtime. 
      - For local dev I use the basis "pg" module
1. Was my first time using NextJS App router, server components are nice once you get used to them
1. First time using many other modules here, like the tiptap editor and next-intl

I would (might?) do a few more things beyond the requirements to bring this product to production ready levels.

1. Add error reporting with Sentry
1. Add telemetry reporting
1. More comprehensive testing (snapshot testing, transactions for db-based testing, full module mocks)
1. Learn more about NextJS caching to fix the issue where the Notes list page doesn't refresh after burning a note 😁
1. Improve pagination experience. Decided to try out cursor-based pagination just to learn, even though my expected dataset is small.
1. Build a custom stop list for full text search