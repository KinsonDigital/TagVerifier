/**
 * Represents the inputs of the action.
 */
export interface ActionInputs {
	/**
     * The current environment.
     * @summary The values 'dev' and 'develop' are valid values for the development environment.
     * The values 'prod', 'production', undefined, or empty all represents the production environment.
     * This value is not case sensitive.
     */
	environment: string,

	/**
     * The owner and name of the repository.
     */
	repoOwnerAndName: string,

	/**
     * The name of the tag.
     */
	tagName: string,

	/**
     * The repository secret token.
     */
	repoToken: string,
}