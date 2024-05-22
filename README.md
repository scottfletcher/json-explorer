Hi there! Welcome to my JsonExplorer :) you can run it using `npm run start`

I used a recursive class-based approach to build a `Tree` to represent and JSON object. Each instance of this class has a `render()` function which renders itself and any of its `children` (if it has any)

You can find the `JsonTreeNode` class in the `classes/` folder

In order to find a node by path, I used a `Record<string, JsonTreeNode>` map.

Thank you for taking the time to look through my code - I'm looking forward to your feedback!
