# YouTrack

JavaScript workflows and related scripts for JetBrains YouTrack.

I use a self-hosted YouTrack Server instance and keep my custom workflow code here.

JetBrains YouTrack product page:
- https://www.jetbrains.com/youtrack/

JetBrains documents a self-hosted edition as **YouTrack Server**, which you host on your own infrastructure. It is also available with cloud or on-premises hosting. 

## Purpose

This repository is for:

- custom YouTrack workflows
- JavaScript automation scripts
- supporting files such as manifests and documentation
- examples and experiments for future workflow ideas

## Repository layout

```text
.
├── README.md
└── <workflow-or-script-directory>/
    ├── README.md
    ├── manifest.json
    └── *.js
