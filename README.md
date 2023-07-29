# Copy to Chat GPT

A Visual Studio Code extension that copies code content to the clipboard to be used as context in artificial intelligence platforms.

## How to use

Once the extension is installed, you can right-click on either a directory or a file and select one of the following options:

- Copy to GPT Chat
- Copy Directory to GPT Chat
- Prompt to GPT Chat

The `Prompt to GPT Chat` option provides the initial contextualization text to the prompt, which is highly recommended when opening new chats. 
The other two options put the code in a organized and comprehensive format for the AI. You can place it immediately after the initial text or use it independently.

## Features

- Copy the content of a single file or multiple files to the clipboard using a specific format
- Copy the content of a whole folder and all its files to the clipboard using a specific format

## Requirements

No specific requirements are needed to use this extension.

## Extension Settings

This extension does not have any settings.

## Known Issues

No known issues at the moment.

## Release Notes

### 0.0.1

Initial release.

## Contributing

If you encounter any issues while using this extension or have ideas for new features or improvements, please create a new issue on the [GitHub repository](https://github.com/guilhermelim/copy-to-gpt-chat).

If you want to contribute to this extension, please fork the [GitHub repository](https://github.com/guilhermelim/copy-to-gpt-chat) and submit a pull request with your changes.

## License

This extension is licensed under the [MIT License](LICENSE).

## How to Publish a New Version

1. Update the version number in `package.json` and commit the changes.
2. Run the `vsce package` command to create a `.vsix` file for the new version.
3. Run the `vsce publish` command to publish the new version to the Visual Studio Code Marketplace.
