const github = require('@actions/github')

async function run () {
  const token = process.env.GITHUB_TOKEN
  const client = github.getOctokit(token)

  const payload = github.context.payload

  if (payload.pull_request === null) {
    return
  }

  const prNumber = payload.pull_request.number
  const repo = payload.repository.name
  const owner = payload.repository.owner.login
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
