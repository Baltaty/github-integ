# github-integ

Fixture repository for Tandem's GitHub context source (PFB-247).

Project source: repository `Baltaty/github-integ`, filter term `(tandem)`.
The term is matched case-insensitively, as a substring, against a pull
request's title, description, branch name and commit messages.

## What should be ingested

| Object | Why |
|---|---|
| PR #1 · Rework the webhook transport (tandem) | Matches on TITLE. Both its commits are unlabelled and come in anyway — a pull request is admitted whole or not at all. Carries a conversation comment and a review. |
| PR #2 · Tidy the config loader | Title, description and branch all plain. Only the commit message carries the term, so this is the one that pays for the extra call to read its commits. |
| PR #4 · Cache the repository listing (tandem) | Merged by squash. |
| PR #5 · Log skipped repositories (tandem) | Merged by rebase. |
| PR #6 · Prefetch the repository list (tandem) | Merged by squash. |
| One commit_group | The two labelled direct pushes to `main`, grouped by repo + author + UTC day. |

## What should NOT be ingested

| Object | Why |
|---|---|
| PR #3 · Add cursor pagination for another customer | Nothing carries the term. Goes to the rejection ledger so later polls never re-read its commits. |
| `chore: scaffold the fixture repo` | Direct push, no term. |
| `chore: tidy an unrelated helper` | Direct push, no term. A commit outside a pull request has no title or branch to fall back on. |
| `feat: prefetch the repository list (tandem) (#6)` | The squash commit of #6. It carries the term and sits in no pull request's commit list, so it would form a second item reporting work #6 already reports. Claimed by merge sha, at fetch. |
| `feat: log skipped repositories (tandem)` on `main` | The rebase copy of #5's commit — same content, new sha. Claimed by content signature, which is what survives the rewrite. |
| `feat: cache the repository listing (#4)` | The squash commit of #4. Claimed by merge sha; it is also unlabelled, so it proves less than #6 does. |
