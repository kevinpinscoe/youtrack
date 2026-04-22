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

## To apply workflow to project

Apply it either from the workflow page or from each project page.

From Administration → Workflows:

Open the workflow you created, go to the Projects tab, click Manage projects, then select Work - TODO and Kevin - To do and save. JetBrains documents this as the standard way to attach a workflow to specific projects. You need permission to update the project.

From the project side:

Open Projects, select Work - TODO, open Workflows, click New workflow and choose Attach existing workflow, then pick youtrack-workflow-due-date-approaching. Repeat the same steps for Kevin - To do. JetBrains documents this project-level path as well.

One important detail: only workflows attached to a project are evaluated for issues in that project. If the workflow is not attached, the rule will not run there.

After attaching it, verify these points in both projects:

The workflow appears under the project’s workflows, the scheduled rule is enabled, and the project has the required fields Due Date and Assignee. Your rule depends on those fields, so if either field is missing or named differently, it will not behave as expected. The project attach behavior is documented by JetBrains, and the field dependency comes from your workflow code.

If you want the shortest path, use: 

Administration → Workflows → your workflow → Projects → Manage projects → check both projects → Save.


