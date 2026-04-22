# JetBrains YouTrack workflow - youtrack-workflow-due-date-approaching

Creates a custom workflow in JetBrains YouTrack that notifies the assignee when an issue's **Due Date** is within the next 30 days.

## Files

This repository currently contains:

- `README.md` - install and usage notes
- `manifest.json` - workflow package metadata
- `due-date-approaching.js` - the active workflow module
- `due-date-approaching-schedule.js` - the schedule JavaScript created by the YouTrack editor

## Install

### Create the workflow in YouTrack

1. In YouTrack, go to **Administration** -> **Workflows**.
2. Click **New workflow**.
3. Choose **JavaScript editor**.
4. Enter the workflow name:

   `youtrack-workflow-due-date-approaching`

5. Enter the workflow title:

   `Check if due date is approaching`

6. Create or use the module `due-date-approaching.js` as the active workflow module.
7. Create the schedule JavaScript file `due-date-approaching-schedule.js` if required by the YouTrack editor.
8. Paste in the workflow code and save the workflow.
9. Attach the workflow to the project where you want it to run.

## What the workflow does

- Checks unresolved issues that have a **Due Date**
- Sends a notification when the due date is today or within the next 30 days
- Notifies the issue **Assignee**
- Falls back to the project leader if no assignee is set

## Requirements

The target project must have these fields:

- **Due Date** - date field
- **Assignee** - user field

The workflow also assumes:

- The issue is unresolved
- The issue has a **Due Date** set
- The workflow is attached to the project where the issues live
- The scheduled rule is enabled and saved successfully in YouTrack

## Notes

- `due-date-approaching.js` is the active workflow module.
- `due-date-approaching-schedule.js` is the schedule JavaScript file required by the YouTrack editor.
- The workflow sends repeated reminders while an issue remains unresolved and its due date is within the next 30 days.
- If you want only one reminder per issue, the workflow needs to be extended with a tag, flag, or custom field to mark issues that were already notified.
- The exact schedule is controlled by the cron expression in the schedule rule.
- If your project uses different field names than **Due Date** or **Assignee**, the workflow code must be adjusted to match them.

## Repository layout

```text
.
├── README.md
├── due-date-approaching-schedule.js
├── due-date-approaching.js
└── manifest.json
