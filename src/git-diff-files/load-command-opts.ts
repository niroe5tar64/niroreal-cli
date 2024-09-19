import { Command } from "commander";

export type CommandOpts = {
	configEnv: string;
	repository?: string;
};

export default function loadCommandOptions(): CommandOpts {
	const program = new Command();

	program
		.option("-e, --configEnv <configEnv>", "Set which config file to load. Default is 'default'.", "default")
		.option(
			"-r, --repository <repository>",
			"Set the target repository for processing. Default is all repositories of loaded config file.",
		);
	program.parse();

	return program.opts();
}
