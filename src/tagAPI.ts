import {info} from "@actions/core";
import axios, {AxiosRequestConfig, AxiosResponse} from "axios";
import {Action} from "./helpers/action";
import {TagData} from "./interfaces/tagData";

export class TagAPI {
	private action: Action;

	/**
	 * Creates a new instance of Environment.
	 * @param environment {Environment} The current environment.
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
		const repoOwnerAndName: string = this.action.getInput("repo-owner-and-name");
		const repoToken: string = this.action.getInput("repo-token");

		const config: AxiosRequestConfig = {
			baseURL: "https://api.github.com",
			headers: {
				"Accept": "application/vnd.github.v3.raw",
				"Authorization" : `token ${repoToken}`,
			},
		};
        
		const url: string = `/repos/${repoOwnerAndName}/tags`;
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
		} catch (error) {
			/* eslint-disable @typescript-eslint/no-unsafe-member-access */
			const res: AxiosResponse = <AxiosResponse>error.response;

			throw new Error(`${res.status} - ${res.statusText} - ${res.data.message}`);
			/* eslint-enable @typescript-eslint/no-unsafe-member-access */
		}
	}
}