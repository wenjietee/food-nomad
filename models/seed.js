const seedData = {
	users: [
		{
			username: 'jane89',
			password: 'jane123',
			recipes: [],
			email: 'jane89@gmail.com',
			zip: '560312',
		},
		{
			username: 'herblover',
			password: 'basil123',
			recipes: [],
			email: 'herby@gmail.com',
			zip: '525497',
		},
		{
			username: 'Test',
			password: '123',
			recipes: [],
			email: 'test@gmail.com',
			zip: '123456',
		},
	],
	recipes: [
		{
			name: 'Test Description',
			description: 'Test recipe',
			ingredients: ['test'],
			instructions: `test test`,
			author: 'Test',
		},
		{
			name: 'Potato Salad',
			description: 'A simple and delicious potato salad with chives topping.',
			ingredients: [
				'2 potatos',
				'2 eggs',
				'chives',
				'red onions',
				'sour cream',
			],
			instructions: `Cook the potatoes: Dice your potatoes into large chunks.  Then add them to a large stockpot and cover with generously-salted cold water, and cook until the potatoes are tender.  Drain the potatoes in a colander, return them to the pot, drizzle with vinegar and let cool while you prepare the rest of the ingredients.
            Prep the sauce: Meanwhile, whisk together the mayo, celery salt, mustard and pickle relish in a medium bowl until evenly combined.
            Toss everything together: Once the potatoes are ready to go, add in the mayo mixture, diced eggs, celery and onion.  Toss gently until evenly combined.
            Season: Taste and season with salt and pepper, to taste.  (Also feel free to add in a tablespoon or two of pickle juice if you would like.)
            Chill: Transfer the potato salad to a serving bowl, cover, and refrigerate for 1-2 hours to chill.  Then serve chilled, topped with your desired garnishes.`,
			author: 'jane89',
		},

		{
			name: 'Veggie Soup Stock',
			description:
				'Not sure what to do with wilted herbs and veggies? Make some stock!',
			ingredients: ['wilted herbs', 'wilted vegetables'],
			instructions: `Start by cleaning and processing your vegetables. The veggies and herbs listed above will yield a good basic stock, but you can add other vegetables depending on what you have access to!  Roughly chop larger veggies into big chunks. 
            Pour the water into your Instant Pot, then add all your chopped veggies and herbs. (Don’t add the salt just yet.)
            Place the lid on the pot. Select the “Soup” function, then select the 30 minute timer option.
            When the timer goes off, hit “Cancel” to start the depressurization process. Allow the pressure to release naturally, which should take between 15 and 20 minutes.
            Finally, remove the lid and use a large slotted spoon to remove the solids from the stock, or pour the whole mixture through a strainer. Season with salt to taste, if desired. (Or you could leave the stock unsalted and just add as necessary to your recipes.)
            Pour the finished stock into an airtight container, and store in your fridge for up to a week (or freeze for longer-term storage).`,
			author: 'herblover',
		},
	],
};

module.exports = seedData;
