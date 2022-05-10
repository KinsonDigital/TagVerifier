import {info} from "@actions/core";
import axios, {AxiosRequestConfig, AxiosResponse} from "axios";
import {Action} from "./helpers/action";
import {TagData} from "./interfaces/tagData";

/**
 * Provides the ability to get tag data of a GitHub repository.
 */
export class TagAPI {
	private action: Action;
	
	private readonly repoOwnerInputName: string = "repo-owner";

	private readonly repoNameInputName: string = "repo-name";

	private readonly repoTokenInputName: string = "repo-token";
	
	/**
	 * Creates a new instance of Environment.
	 */
	constructor () {
		this.action = new Action();
	}

	/**
	 * Checks to see if the given tag exists.
	 * @param tagName {string} The name of the tag to check for.
	 * @returns True if the tag exists.
	 */
	public async tagExistsAsync (tagName: string): Promise<boolean> {
		const repoOwner: string = this.action.getInput(this.repoOwnerInputName);
		const repoName: string = this.action.getInput(this.repoNameInputName);
		const repoToken: string = this.action.getInput(this.repoTokenInputName);

		const config: AxiosRequestConfig = {
			baseURL: "https://api.github.com",
			headers: {
				"Accept": "application/vnd.github.v3+json",
				"Authorization" : `token ${repoToken}`,
			},
		};
        
		const url: string = `/repos/${repoOwner}/${repoName}/tags`;
		info(`URL used to download tag data from repository:\n\t${url}`);

		try {
			const response: AxiosResponse<TagData[]> = await axios.get<TagData[]>(url, config);

			for (const tag of <TagData[]>response.data) {
				if (tag.name.endsWith(tagName)) {
					return await Promise.resolve(true);
				}
			}

			// If this point is reached, then the tag does not exist
			return await Promise.resolve(false);
		} catch (error: any) {
			/* eslint-disable @typescript-eslint/no-unsafe-member-access */
			const res: AxiosResponse = <AxiosResponse>error.response;

			throw new Error(`${res.status} - ${res.statusText} - ${res.data.message}`);
			/* eslint-enable @typescript-eslint/no-unsafe-member-access */
		}
	}
}