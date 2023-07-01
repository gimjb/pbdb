# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

### Added

- Clamp the first verse in a range to one. For example, saying `John 1:0` will
  post John 1:**_1_**.

---

## [0.5.0]: 2023-06-30

### Added

- Ability to post from one verse onwards. For example, `Romans 5:20–` will post
  from Romans 5:20 to the end of the chapter (i.e., `Romans 5:20–21`).
- Split long messages into multiple messages. This is to avoid hitting the
  Discord message character limit, which would prevent the bot from posting it.

### Fixed

- Cap the last verse of a range to the number of verses in a chapter.

### Removed

- No longer packs message embeds into a single message. This is to avoid hitting
  the Discord message character limit, which would prevent the bot from posting
  it.

---

## [0.4.0]: 2023-06-29

### Added

- Display version in presence activity/status.
- Post multiple verse embeds in a single message. This optimizes the bot’s
  response time.

---

## [0.3.3]: 2023-06-29

### Fixed

- Fix verse refereneces appearing in incorrect order.

---

## [0.3.2]: 2023-06-29

### Fixed

- Fix horizontal rulers sometimes not showing up.

---

## [0.3.1]: 2023-06-29

### Fixed

- Fix crash when bot has insufficient permissions to send Bible verses.
- No longer tries to post verses that do not exist.

---

## [0.3.0]: 2023-06-28

### Added

- Add color to verse embeds: red for Jesus; otherwise Discord blurple.
- Horizontal rulers in Discord Markdown (work-around).

---

## [0.2.0]: 2023-06-28

### Added

- `/changelog` command to show this file.
- `/privacy` command to show privacy policy.
- `/terms` command to show terms of service.
- `/settings` to configure the bot.
- Set nickname to `PBDB` when joining a server.
- Post Bible verses referenced in messages.

---

## [0.1.0]: 2023-06-11

### Added

- Bot goes online.

[unreleased]: https://github.com/gimjb/pbdb/compare/latest...HEAD
[0.5.0]: https://github.com/gimjb/pbdb/compare/v0.4.0...v0.5.0
[0.4.0]: https://github.com/gimjb/pbdb/compare/v0.3.3...v0.4.0
[0.3.3]: https://github.com/gimjb/pbdb/compare/v0.3.2...v0.3.3
[0.3.2]: https://github.com/gimjb/pbdb/compare/v0.3.1...v0.3.2
[0.3.1]: https://github.com/gimjb/pbdb/compare/v0.3.0...v0.3.1
[0.3.0]: https://github.com/gimjb/pbdb/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/gimjb/pbdb/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/gimjb/pbdb/compare/v0.0.0...v0.1.0
