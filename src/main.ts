import {Action} from "./helpers/action";
import {TagAPI} from "./tagAPI";


/**
 * The main GitHub action.
 */
export class Application {
	/**
	 * The main entry point of the GitHub action.
	 * @returns {Promise<void>} Returns just a promise with now result.
	 */
	public async main (): Promise<void> {
		const action: Action = new Action();
		const tagAPI: TagAPI = new TagAPI();

		try {
			const tagName: string = action.getInput("tag-name");
			const tagExists: boolean = await tagAPI.tagExistsAsync(tagName);

			if (tagExists) {
				action.info(`The tag '${tagName}' exists.`);
			} else {
				action.info(`The tag '${tagName}' does not exist.`);
			}

			action.setOutput("tag-exists", tagExists ? "true" : "false");

			return await Promise.resolve();
		} catch (error) {
			throw error;
		}
	}
}

const app: Application = new Application();
const action: Action = new Action;

app.main().then(() => {
	action.info("Action Success!!");
}, (error: Error) => {
	// Takes any incoming errors and fails the action with a message
	action.setFailed(error.message);
});
