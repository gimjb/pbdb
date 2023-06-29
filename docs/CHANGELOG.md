# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

### Added

- Display version in presence activity/status.

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

### Fixed

- Capitalize release notes in this file.

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
[0.3.3]: https://github.com/gimjb/pbdb/compare/v0.3.2...v0.3.3
[0.3.2]: https://github.com/gimjb/pbdb/compare/v0.3.1...v0.3.2
[0.3.1]: https://github.com/gimjb/pbdb/compare/v0.3.0...v0.3.1
[0.3.0]: https://github.com/gimjb/pbdb/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/gimjb/pbdb/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/gimjb/pbdb/compare/v0.0.0...v0.1.0
