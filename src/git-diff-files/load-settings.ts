import fs from "fs";
import path from "path";
import type { CommandOpts } from "./load-command-opts";

export type RepoBranchSettings = {
	name: string;
	description: string;
	dataList: RepositoryData[];
};

export type RepositoryData = {
	repository: string;
	projectPath: string;
	baseBranch: string;
	targetBranch: string;
};

export default function loadRepoBranchSettings(commandOpts: CommandOpts): RepoBranchSettings {
	const repoBranchSettings = loadJsonSettings(commandOpts.configEnv);

	const repositoryDataList = repoBranchSettings?.dataList;

	if (!repositoryDataList) {
		throw "The program will terminate because it failed to retrieve the configuration values.";
	}

	// コマンド実行時にリポジトリ指定がある場合はそのレポジトリのみ対象。指定がない場合は設定にある全てのリポジトリが対象
	const targetRepositories = commandOpts.repository
		? repositoryDataList.filter((data) => data.repository === commandOpts.repository)
		: repositoryDataList;

	return {
		name: repoBranchSettings.name,
		description: repoBranchSettings.description,
		dataList: targetRepositories,
	};
}

function loadJsonSettings(configEnv: string) {
	try {
		const configPath = path.resolve(__dirname, `./config/repo-branch-settings.${configEnv}.json`);
		const jsonString = fs.readFileSync(configPath).toString();
		const jsonObject: RepoBranchSettings = JSON.parse(jsonString);

		return jsonObject;
	} catch (error) {
		if (!(error instanceof Error)) {
			console.warn("An unexpected exception has occurred:", error);
			return;
		}
		outputErrorLog(error);
	}
}

function outputErrorLog(error: Error) {
	if (error instanceof SyntaxError) {
		// JSON.parse などの構文エラー (SyntaxError) の場合の処理
		console.error("SyntaxError: Invalid JSON format", error.message);
	} else if (error instanceof Error && "code" in error) {
		// fs.readFileSyncのファイル読み込みエラーなどの場合の処理
		const errnoException = error as NodeJS.ErrnoException;
		switch (errnoException.code) {
			case "ENOENT":
				console.error(`No such file or directory: ${errnoException.path}`);
				break;

			default:
				console.error(`An error occurred: ${errnoException.message}`);
				break;
		}
	}
}
