_Looking for a shareable component template? Go here --> [sveltejs/component-template](https://github.com/sveltejs/component-template)_

---

# svelte app

This is a project template for [Svelte](https://svelte.dev) apps. It lives at https://github.com/sveltejs/template.

To create a new project based on this template using [degit](https://github.com/Rich-Harris/degit):

```bash
npx degit sveltejs/template svelte-app
cd svelte-app
```

_Note that you will need to have [Node.js](https://nodejs.org) installed._

## Get started

Install the dependencies...

```bash
cd svelte-app
npm install
```

...then start [Rollup](https://rollupjs.org):

```bash
npm run dev
```

Navigate to [localhost:5000](http://localhost:5000). You should see your app running. Edit a component file in `src`, save it, and reload the page to see your changes.

By default, the server will only respond to requests from localhost. To allow connections from other computers, edit the `sirv` commands in package.json to include the option `--host 0.0.0.0`.

If you're using [Visual Studio Code](https://code.visualstudio.com/) we recommend installing the official extension [Svelte for VS Code](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode). If you are using other editors you may need to install a plugin in order to get syntax highlighting and intellisense.

## Building and running in production mode

To create an optimised version of the app:

```bash
npm run build
```

You can run the newly built app with `npm run start`. This uses [sirv](https://github.com/lukeed/sirv), which is included in your package.json's `dependencies` so that the app will work when you deploy to platforms like [Heroku](https://heroku.com).

## Single-page app mode

By default, sirv will only respond to requests that match files in `public`. This is to maximise compatibility with static fileservers, allowing you to deploy your app anywhere.

If you're building a single-page app (SPA) with multiple routes, sirv needs to be able to respond to requests for _any_ path. You can make it so by editing the `"start"` command in package.json:

```js
"start": "sirv public --single"
```

## Using TypeScript

This template comes with a script to set up a TypeScript development environment, you can run it immediately after cloning the template with:

```bash
node scripts/setupTypeScript.js
```

Or remove the script via:

```bash
rm scripts/setupTypeScript.js
```

## Deploying to the web

### With [Vercel](https://vercel.com)

Install `vercel` if you haven't already:

```bash
npm install -g vercel
```

Then, from within your project folder:

```bash
cd public
vercel deploy --name my-project
```

### With [surge](https://surge.sh/)

Install `surge` if you haven't already:

```bash
npm install -g surge
```

Then, from within your project folder:

```bash
npm run build
surge public my-project.surge.sh
```

# API calls for seperate pages

> Note: treat localhost:7777 is just a URL for a Demo server. It will be a domain for the deployed back-end

## Grid page:

1. **Get** information for the grid
   Body: empty
   Link: `localhost:7777/applications`
   Return: Find example: `/mockData/applications.json`
2. **Post** status update:
   Link: `localhost:7777/application/status`
   Body: `{applicationId: number, status: string}`

## Application Notes Page

1. **Get** essay responses for an applicant
   Link: `localhost:7777/applications/responses`
   Body: `applicationId: number` (just a number as text)
   Return: One object in the following format:

```
{
  essay1: string,
  essay2: string,
  essay3: string,
  commitments: string,
  attendedVH: boolean,
  feedback: string,
  source: string
}
```

Example: `/mockData/applicaitonResponses.json` 2. **Get** all interview notes for an applicant
Link: `localhost:7777/applications/notes`
Body: `applicationId: number` (just a number as text)
Return: Array of objects in the following format:

```
[{
  interviewer_name: string,
  reliability: number [1-7],
  interest: number [1-7],
  teamwork: number [1-7],
  overall: number [1-7],
  thoughts: string,
  responses: [{question: string, description: string, specificity: string, note: string}]
}]
```

Example: `mockData/interviewNotesForApplicant.json` 3. **Post** status update:
Link: `localhost:7777/application/status`
Format: `{applicationId: number, status: string}`

## Interview form

1. **Get** questions for a specific applicant
   Link: `localhost:7777/interview/questions`
   Body: `applicationId: number` (just a number as text)
   Return: Array of objects in the following format:

```
[{
  id: number,
  content: string,
  specificity: string,
  description: string
}]
```

Example: `/mockdata/questionsForApplicant.json` 2. **Post** interview notes for an applicant
Link: `/interview/notes/add`
Body: Data from a form on the page in the following format:

```
{
  applicationId: number,
  interviewer_name: string,
  reliability: number, [1-7]
  interest: number, [1-7]
  teamwork: number, [1-7]
  overall: number [1-7]
  thoughts: string [paragraph],
  questionAnswers: [{questionId: number, response: string}]
}
```

## Add questions for interviews

1. **Post** question for interviews
   Link: `localhost:7777/interview/questions/add`
   Body:

```
{
  content: string,
  specificity: string,
  description: string
}
```
