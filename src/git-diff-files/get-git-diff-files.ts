import { $ } from "bun";
import os from "os";
import path from "path";
import type { RepositoryData } from "./load-settings";

const REGEX_TRAILING_NULL = /\u0000+$/;
const REGEX_TRAILING_NEW_LINE = /\n+$/;

export default async function getGitDiffFiles(data: RepositoryData) {
	const fullPath = resolveAbsolutePath(data.projectPath);
	const { baseBranch, targetBranch } = await getBranches(data);
	const buffer = Buffer.alloc(1000); // TODO: メモリ確保領域として適切か検証する。

	await $.cwd(`${fullPath}`);
	await $`git diff --name-status ${baseBranch} ${targetBranch} > ${buffer}`;

	const gitDiffFiles = buffer
		.toString()
		.replace(REGEX_TRAILING_NULL, "")
		.replace(REGEX_TRAILING_NEW_LINE, "")
		.split("\n");

	return gitDiffFiles.map((line) => {
		const array = line.split("\t");
		return {
			type: array[0],
			file: array[1],
		};
	});
}

function resolveAbsolutePath(inputPath: string, basePath: string = os.homedir()): string {
	return path.resolve(basePath, inputPath);
}

async function getBranches(data: RepositoryData) {
	let baseBranch = data.baseBranch;
	if (!baseBranch) {
		const bufferBaseBranch = Buffer.alloc(50); // TODO: メモリ確保領域として適切か検証する。
		await $.cwd(`${resolveAbsolutePath(data.projectPath)}`);
		await $`git branch -r | grep '\->' | awk '{print $NF}' > ${bufferBaseBranch}`;
		baseBranch = bufferBaseBranch.toString().replace(REGEX_TRAILING_NULL, "").replace(REGEX_TRAILING_NEW_LINE, "");
	}

	const targetBranch = data.targetBranch || "HEAD";
	return { baseBranch, targetBranch };
}
