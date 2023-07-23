# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [0.9.4]: 2023-07-23

### Fixed

- Fix change log not showing up in `/changelog` command (it was too long).

---

## [0.9.3]: 2023-07-22

### Fixed

- Ignore any spaces immediately following a colon (`:`) when separating chapter
  and verse numbers. For example, `Eph 1: 4` is the same as `Eph 1:4`. On
  mobile, a space is sometimes automatically inserted after a colon, so this
  should make it easier to type out a verse reference.
- Allow formatting of verse references. For example, `Eph 1:__4__` should not be
  ignored by PBDB.
- Make a semi-colon (`;`) synonymous with a colon (`:`) when separating chapter
  and verse numbers. For example, `Eph 1;4` is the same as `Eph 1:4`. This is
  to account for misspellings.

---

## [0.9.2]: 2023-07-21

### Fixed

- Ignore verses in square brackets because they are likely meant for the Erasmus
  bot. For example, `[Ephesians 1:4]` should not be posted by PBDB.
- Make a dot (`.`) synonymous with a colon (`:`) when separating chapter and
  verse numbers. For example, `Eph 1.4` is the same as `Eph 1:4`.

---

## [0.9.1]: 2023-07-20

### Fixed

- Use `client.shards.respawnAll` instead of `client.login` to reconnect to
  Discord when disconnected.

---

## [0.9.0]: 2023-07-19

### Fixed

- Fix blockquote formatting.
- Post from one verse onwards.

### Removed

- Ability to split long verses into separate messages. Verses that exceed the
  Discord message character limit will be truncated from now on.

---

## [0.8.1]: 2023-07-19

### Fixed

- Automatically reconnect to Discord when disconnected — hopefully.

---

## [0.8.0]: 2023-07-17

### Added

- Log file to record bot activity and errors.

---

## [0.7.0]: 2023-07-14

### Added

- `/pbdb` help command to show bot information.
- new presence activity/status: `/pbdb | v#.#.#`.

---

## [0.6.0]: 2023-07-13

### Added

- Clamp the first verse in a range to one. For example, saying `John 1:0` will
  post John 1:**_1_**.
- Option (in `/settings`) to use “curly” or "straigth" quotation marks in
  verses.

### Fixed

- Make sure there is a space before the book name: e.g. a time interval like
  “from 1:15–2:00” has nothing to do with the book of Romans.

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

- Fix verse references appearing in incorrect order.

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
[0.9.3]: https://github.com/gimjb/pbdb/compare/v0.9.2...v0.9.3
[0.9.2]: https://github.com/gimjb/pbdb/compare/v0.9.1...v0.9.2
[0.9.1]: https://github.com/gimjb/pbdb/compare/v0.9.0...v0.9.1
[0.9.0]: https://github.com/gimjb/pbdb/compare/v0.8.1...v0.9.0
[0.8.1]: https://github.com/gimjb/pbdb/compare/v0.8.0...v0.8.1
[0.8.0]: https://github.com/gimjb/pbdb/compare/v0.7.0...v0.8.0
[0.7.0]: https://github.com/gimjb/pbdb/compare/v0.6.0...v0.7.0
[0.6.0]: https://github.com/gimjb/pbdb/compare/v0.5.0...v0.6.0
[0.5.0]: https://github.com/gimjb/pbdb/compare/v0.4.0...v0.5.0
[0.4.0]: https://github.com/gimjb/pbdb/compare/v0.3.3...v0.4.0
[0.3.3]: https://github.com/gimjb/pbdb/compare/v0.3.2...v0.3.3
[0.3.2]: https://github.com/gimjb/pbdb/compare/v0.3.1...v0.3.2
[0.3.1]: https://github.com/gimjb/pbdb/compare/v0.3.0...v0.3.1
[0.3.0]: https://github.com/gimjb/pbdb/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/gimjb/pbdb/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/gimjb/pbdb/compare/v0.0.0...v0.1.0
