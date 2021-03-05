## Project Post Mortem

---

## Approach and Process

---

- What in my process and approach to this project would I do differently next time?

My approach is to start with the basic MVP with a basic low-fidelity wireframe.
Once the basic CRUD is established i extended the recipes to include images.
After the image upload feature has been tested and implemented, I move onto my stretch goals such as implementing googlemaps.
CSS layout is polished after the MVP and stretch goals are fufilled.

I would actually consider and design the data models more in depth and establish the relationship between models.

## Code and Code Design

---

- What in my code and program design in the project would I do differently next time?

I will look into populate for mongoose to better establish the model relationships. Currently the models are related via storing
their IDs in the User data arrays. After i learnt about mongoose populate, I feel my approach is incorrect.

Shown here the food delete route, once the Food data is delete another nested route is required to go into user to splice the
food ID which is stored in the user's foods array.

```javascript
foodShare.delete('/:id', isAuthenticated, (req, res) => {
	Food.findByIdAndRemove(req.params.id, (err, foundFood) => {
		if (err) console.log(err);
		else {
			// remove food id from current user array
			User.findByIdAndUpdate(
				req.session.currentUser._id,
				{ $pull: { foods: req.params.id } },
				(err, foundUser) => {
					if (err) console.log(err);
					else {
						res.redirect('/app/profile');
					}
				}
			);
		}
	});
});
```

I also need better and more consistent naming in my routes and CSS classes/id. As the app is being developed the code base got larger
which is sometimes confusing to know what CSS class controls which element and if the routes are correctly accessed. This will save time when debugging.

- What in my code and program design in the project went well? Is there anything I would do the same next time?

The usage of partials helped alot as it reduce copying of the same code over many views and kept the code base DRY.

A footer partial that is used througout the app

```html
<footer class="page-footer teal darken-1 footer-copyright">
	<div class="container">© 2021 Food Nomad</div>
</footer>
```

Creating a low-fidelity wireframe, this helped in trying to anchor my vision for the app, in case I lose track of it.
[Food Nomad Web Mockup](https://www.figma.com/proto/UcZCNESBlWCKz99K9GHzox/Food-Nomad-Web-App?node-id=1%3A2&scaling=min-zoom)

Creating dev routes for debugging, for quick resetting of data base or to query a data object quickly.

Dev routes for getting current user object and to delete all users.

```javascript
// get current user object
dev.get('/currentUser', (req, res) => {
	res.send(req.session.currentUser);
});

// delete users
dev.get('/deleteUsers', (req, res) => {
	User.remove({}, (err, allUsers) => {
		console.log(allUsers);
		res.redirect('/');
	});
});
```

For each, please include code examples.

- Code snippet up to 20 lines.
- Code design documents or architecture drawings / diagrams.

## Unit 2 Post Mortem

---

- ## What habits did I use during this unit that helped me?

  - DRY
  - Frequent commits and branching
  - MVC Design Pattern
  - Pseudocode and sketching on paper to help visualise the problem

- ## What habits did I have during this unit that I can improve on?

  - More practice on abstract concepts such as recursion etc.
  - More work with mongoose and DB. So far I feel I have not yet handled a complex data model that has many nests and relationships.

- ## How is the overall level of the course during this unit? (instruction, course materials, etc.)
  - Might need more work on mongoose, it is a good package to use but I feel I'm barely scratching the surface.
