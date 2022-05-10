[<-- Table Of Contents](docs.md)

# Environment Variables

The environment variables are used to not only signify that the action is in a **development** or **production** environment, but also to hold values for the action inputs.  These values are purely for testing purposes.  Using this system prevents the developer from having to constantly deploy the code changes, and then have to test the action using another project.  Without doing this, the development loop is slow, so this helps save development and testing time.
Basically this allows the testing of the action locally on the dev machine.

The environment variables for testing must reside in a file with the name **env.json** and follow the simple key/value pair setup like below.  This file is ignored by GIT so it does not get checked into the repository.  This is to prevent any input values such as tokens being added to the repo.

### **Environment JSON File Example:**
``` json
{
    "environment": "dev",
    "repo-owner-and-name": "JohnDoe/MyRepo",
    "repo-token": "abcd1234",
	"tag-name": "v1.2.3"
}
```

What does it mean to be in a **development** vs a **production** environment?

- Code that accesses the [@actions/core](https://github.com/actions/toolkit/tree/main/packages/core) cannot be used in a regular local environment.  Code that gets input, sets output, and other GitHub action specific code only work in the GitHub workflow environment.  The ```action``` class in combination of the ```environment``` class wrap these operations to allow the ability to operate differently depending on which **environment** the action is running in.

If the action is in the **development** environment, (meaning the **environment** value in the **env.json** has the value of **dev** or **develop**), then the ```action``` class will return the value from the **env.json** file.  If it is in **production**, then it will get the actual input of the action described in the **action.yml** file.

Since the **env.json** file is not committed to the repository and is not included as part of the **publish** process, by default the action is simply considered as **production**.  No special environment setup is required for the action to run properly as a published usable action.

**Examples of action code that is only executed/used in workflow environment(GitHub):**
 ``` js
 core.getInput();
 core.setOutput();
 core.info();
 core.error();
 core.warning();
 ```

 **NOTE:** The **nodemon** package used to watch for file changes and help debug also watches the environment file **env.json** for changes.  This means you can run the npm script **yarn run:app** and make changes to the **env.json** file and it will automatically rebuild and run the code. This is great for testing out environment and action input for validation and processing.
 