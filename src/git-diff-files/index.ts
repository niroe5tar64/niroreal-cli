import getGitDiffFiles from "./get-git-diff-files";
import loadCommandOptions from "./load-command-opts";
import loadRepoBranchSettings from "./load-settings";

console.log("[Git Diff Files] start process");

const commandOpts = loadCommandOptions();
const { dataList } = loadRepoBranchSettings(commandOpts);
const results = dataList.map((data) => getGitDiffFiles(data));

const diffObjects = await Promise.all(results).then((result) => {
	return result;
});

console.log("[Git Diff Files] end process");

console.log("******************** result object ********************");
console.log(diffObjects);
