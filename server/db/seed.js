
//each teammember please create seed method to test your
const db = require('./database');
const { createMerchandise, addCategory, updateMerchandise, createMerchandiseReview, getAllMerchandise, getMerchandiseById } = require('./index');
const { createUser, updateUser, getUserByUserId, getUserByUsername, getAllUsers } = require('./users');
const faker = require('faker');
const chalk = require('chalk');

const bcrypt = require('bcrypt');
SALT_COUNT = 10;

async function dropTables() {

    try {
        console.log('Dropping all tables...');
        await db.query(`
            DROP TABLE IF EXISTS payments;
            DROP TABLE IF EXISTS blogs;
            DROP TABLE IF EXISTS wishlist;
            DROP TABLE IF EXISTS userPreferences;
            DROP TABLE IF EXISTS orderItem;
            DROP TABLE IF EXISTS orders;
            DROP TABLE IF EXISTS images;
            DROP TABLE IF EXISTS reviews;
            DROP TABLE IF EXISTS merchandise;
            DROP TABLE IF EXISTS categories;
            DROP TABLE IF EXISTS users;
        `);

        console.log('Successfully dropped all tables.');
    } catch (error) {
        console.log(chalk.red('Error dropping tables!'));
        throw error;
    };

};

async function createTables() {

    try {

        console.log('Building new tables...');

        console.log('Building users...')
        await db.query(`
            CREATE TABLE IF NOT EXISTS users(
                user_id SERIAL PRIMARY KEY,
                username VARCHAR(255) UNIQUE NOT NULL,
                hashpassword VARCHAR(255) NOT NULL,
                firstname VARCHAR(255) NOT NULL,
                lastname VARCHAR(255) NOT NULL,
                active BOOLEAN DEFAULT true
            );
        `);

        console.log('Creating categories...');
        await db.query(`
            CREATE TABLE IF NOT EXISTS categories(
                cat_id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL
            );
        `);

        console.log('Creating merchandise...')
        await db.query(`
            CREATE TABLE IF NOT EXISTS merchandise(
                merch_id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                description TEXT NOT NULL,
                price MONEY NOT NULL,
                rating INTEGER,
                cats INTEGER REFERENCES categories(cat_id)
                
            );
        `);

        console.log('Creating reviews...')
        await db.query(`
            CREATE TABLE IF NOT EXISTS reviews(
                review_id SERIAL PRIMARY KEY,
                author INTEGER REFERENCES users(user_id) NOT NULL,
                "merchId" INTEGER REFERENCES merchandise(merch_id)NOT NULL,
                rating INTEGER,
                description TEXT NOT NULL
            );
        `);

        console.log('Creating images...')
        await db.query(`
            CREATE TABLE IF NOT EXISTS images(
                imageId SERIAL PRIMARY KEY,
                merch_id SERIAL REFERENCES merchandise(merch_id)
            );
        `);

        console.log('Creatings blogs...');
        await db.query(` 
            CREATE TABLE IF NOT EXISTS blogs(
                blog_id SERIAL PRIMARY KEY,
                merchId INTEGER REFERENCES merchandise(merch_id),
                title VARCHAR(255) UNIQUE NOT NULL,
                "blogText" TEXT NOT NULL,
                "authorId" INTEGER REFERENCES users(user_id)
            );
        `);

        console.log('Creating wishlist...')
        await db.query(`
            CREATE TABLE IF NOT EXISTS wishlist(
                wish_id SERIAL PRIMARY KEY,
                "merchId" INTEGER REFERENCES merchandise(merch_id),
                title VARCHAR(255) UNIQUE NOT NULL,
                "userId" INTEGER REFERENCES users(user_id)
            );
        `);

        console.log('Creating orderItem...')
        await db.query(`
            CREATE TABLE IF NOT EXISTS orderItem(
                item_id SERIAL PRIMARY KEY,
                "merchId" INTEGER REFERENCES merchandise(merch_id),
                quantity INTEGER DEFAULT 1,
                price NUMERIC NOT NULL
            );
        `);

        console.log('Creating orders...')
        await db.query(`
            CREATE TABLE IF NOT EXISTS orders(
                "orderId" SERIAL PRIMARY KEY,
                userId INTEGER REFERENCES users(user_id),
                "orderItemId" INTEGER REFERENCES orderItem.item_id,
                status BOOLEAN,
                price NUMERIC
            );
        `);

        console.log('Creating userPreferences...')
        await db.query(`
            CREATE TABLE IF NOT EXISTS userPreferences(
                preference_id SERIAL PRIMARY KEY,
                userId INTEGER REFERENCES users(user_id),
                street VARCHAR(255) NOT NULL,
                city TEXT NOT NULL,
                state TEXT NOT NULL,
                zip INTEGER NOT NULL,
                save_pmt BOOLEAN DEFAULT FALSE,
                shipping VARCHAR(255)
            );
        `);

        console.log('Creating payments...')
        await db.query(`
            CREATE TABLE IF NOT EXISTS payments(
                userId INTEGER REFERENCES users(user_id),
                name VARCHAR(255) NOT NULL,
                number INTEGER UNIQUE NOT NULL,
                CID INTEGER NOT NULL,
                expiration DATE NOT NULL
            );
        `);

        console.log('Tables successfully built!');
    } catch (error) {
        console.log(chalk.red('Error creating tables!'));
        throw error;
    };

};

async function initializeMerchandise() {
    for (let index = 0; index < 20; index++) {
        const merch = await createMerchandise({name: faker.hacker.ingverb(), description: faker.hacker.phrase(), price:faker.commerce.price(),cat: 1});
        
        const review = await createMerchandiseReview(index+1, 1, 5, faker.hacker.phrase());
    }
}


async function createInitialUsers() {

    try {
        console.log("Starting to create users...");

        const seededUsers = [
            {
                username: 'groovyash',
                hashpassword: 'hailtotheking',
                firstname: 'Ashley',
                lastname: 'Williams'
            },

            {
                username: 'batman',
                hashpassword: 'thedarkknight',
                firstname: 'Bruce',
                lastname: 'Wayne'
            }
        ]
    
        console.log(seededUsers);

        await Promise.all(seededUsers.map(async user => {
            const hashedPassword = bcrypt.hashSync(user.username, SALT_COUNT);
            const seededUser = await createUser({
                ...user,
                hashpassword: hashedPassword
            });
            return seededUser;
        }));

        console.log("Finished creating users!");
    } catch (error) {
        console.error(chalk.red('There was a problem creating users!', error));
        throw error;
    };

};

async function testDB() {

    try {
        console.log(chalk.yellow('Starting to test the database...'));

        console.log('Calling getAllUsers...');
        const allUsers = await getAllUsers();
        console.log('All Users: ', allUsers);

        console.log(chalk.yellow('Finished testing the database.'));

        const catArray=['tents', 'sleeping bags', 'clothing', 'outdoor gear'];

        const newCategory = await Promise.all(catArray.map((cat)=>addCategory(cat)));
        console.log(newCategory);
    
    
        await initializeMerchandise();
        await updateMerchandise(2,{price:5, description: faker.company.catchPhrase});
        await createMerchandiseReview(2, 1, 5, 'I have no idea what this is or why I bought it...');
        await getAllMerchandise();
        // await getMerchandiseById(2);

    } catch (error) {
        console.error(chalk.red('There was an error testing the database!', error));
        throw error;
    };



}

async function startDb() {
    try {
        db.connect()
            .then(() => dropTables())
            .then(() => createTables())
            .then(() => createInitialUsers()) 
            .then(() => testDB())
            .finally(() => db.end()
            );

    } catch (error) {
        console.error(chalk.red("Error during startDB"));
        throw error;
    };

};

startDb();
