import {Action} from "./helpers/action";
import { Environment } from "./helpers/environment";
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
		const environment: Environment = new Environment();
		const actionInput: Action = new Action();
		const tagAPI: TagAPI = new TagAPI();

		try {
			const tagName: string = environment.getVarValue("tag-name");
			const tagExists: boolean = await tagAPI.tagExistsAsync(tagName);

			if (tagExists) {
				actionInput.info(`The tag '${tagName}' exists.`);
			} else {
				actionInput.info(`The tag '${tagName}' does not exist.`);
			}

			actionInput.setOutput("tag-exists", tagExists ? "true" : "false");

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
