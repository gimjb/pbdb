const github = require('@actions/github')

async function run() {
  const token = process.env.GITHUB_TOKEN
  const client = new github.GitHub(token)

  const context = github.context

  if (context.payload.pull_request === null) {
    return
  }

  const prNumber = context.payload.pull_request.number
  const repo = context.payload.repository.name
  const owner = context.payload.repository.owner.login
  const body =
    'Thank you for your contribution! :tada: Someone will review your PR soon.'

  await client.issues.createComment({
    owner,
    repo,
    issue_number: prNumber,
    body
  })
}

run().catch(error => {
  console.error(error)
  process.exit(1)
})
