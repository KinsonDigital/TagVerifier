import {info} from "@actions/core";
import axios, {AxiosRequestConfig, AxiosResponse} from "axios";
import {Environment} from "./helpers/environment";
import {TagData} from "./interfaces/tagData";

export class TagAPI {
	private environment: Environment;

	/**
	 * Creates a new instance of Environment.
	 * @param environment {Environment} The current environment.
	 */
	constructor () {
		this.environment = new Environment();
	}

	/**
	 * Checks to see if the given tag exists.
	 * @param name {string} The name of the tag to check for.
	 * @returns True if the tag exists.
	 */
	public async tagExistsAsync (name: string): Promise<boolean> {
		const repoOwnerAndName: string = this.environment.getVarValue("repo-owner-and-name");
		const repoToken: string = this.environment.getVarValue("repo-token");

		const config: AxiosRequestConfig = {
			baseURL: "https://api.github.com",
			headers: {
				"Accept": "application/vnd.github.v3.raw",
				"Authorization" : `token ${repoToken}`,
			},
		};
        
		const url: string = `/repos/${repoOwnerAndName}/git/refs/tags`;
		info("URL used to download file from repository:\n\t${url}");

		try {
			const response: AxiosResponse<TagData[]> = await axios.get<TagData[]>(url, config);

			for (const tag of <TagData[]>response.data) {
				if (tag.ref.endsWith(name)) {
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