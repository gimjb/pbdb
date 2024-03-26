# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.24.0]: 2024-03-25

### Added

- Added [`/term term:Elect`] — thank Nia for this 
  [contribution](https://pbdb.io/definitions/65fd8d7291464ab267d3250b)!
- Added [`/term term:Conversion`] — thank Nia for this 
  [contribution](https://pbdb.io/definitions/65fd968191464ab267d3251a)!
- Added [`/term term:Eternal Salvation`] — thank Nia for this 
  [contribution](https://pbdb.io/definitions/65fda3b391464ab267d32530)!
- Added [`/term term:Eternal Life`] — thank Nia for this
  [contribution](https://pbdb.io/definitions/65fda5de91464ab267d32534)!
- Added [`/term term:Gospel`] — thank Nia for this 
  [contribution](https://pbdb.io/definitions/65fda9c191464ab267d32539)!
- Added [`/term term:Temporal Salvation] — thank Nia for this 
  [contribution](https://pbdb.io/definitions/6600772191464ab267d32552)!

### Thanks

A special thank you to [Jennifer Chen](https://www.facebook.com/jen.chen.507) for the $200 donation to the project.

## [0.23.1]: 2024-03-22

### Fixed

- Slightly changed the wording in the [`/term term:Regeneration`] as requested by Nia.

## [0.23.0]: 2024-03-22

### Added

- Added [`/term term:Regeneration`] — thank Nia for this 
  [contribution](https://pbdb.io/definitions/65fd8d7291464ab267d3250b)!

## [0.22.1]: 2024-03-22

## Fixed

- Updated import to `src/CooldownCache` in [`src/bible.ts`](https://github.com/gimjb/pbdb/blob/v0.22.1/src/bible.ts#L4)
  and [`src/commands/serverprefs.ts`](https://github.com/gimjb/pbdb/blob/v0.22.1/src/commands/serverprefs.ts#L3).

## [0.22.0]: 2024-03-22

### Added

- Added `/legal` command to show legal information.
- Added `/term <term>` command to show the definition of a theological term:
  - `/term term:TULIP`;
  - `/term term:Total Depravity`;
  - `/term term:Unconditional Election`;
  - `/term term:Limited Atonement`;
  - `/term term:Irresistible Grace`;
  - `/term term:Preservation of the Saints`.

### Removed

- Removed the `/terms` command in favor of the `/legal` command to avoid confusion with the `/term` command.
- Removed the `/privacy` command in favor of the `/legal` command.

## 0.21.5: 2024-03-08

### Fixed

- `/serverprefs cooldown 0` will now disable the verse cooldown (it previously set it to `180` seconds).

## [0.21.4]: 2024-02-15

### Fixed

- Corrected instructions in `/serverprefs cooldown` command.

## [0.21.3]: 2024-02-15

### Fixed

- Fix verses not posting for most users.

## [0.21.2]: 2024-02-15

### Fixed

- Fix logging of errors.

## [0.21.1]: 2024-02-15

### Changed

- Rename import `'cooldownCache'` to `'CooldownCache'` in
  [`src/bible.ts`](../bible.ts).

## [0.21.0]: 2024-02-15

### Changed

Organize server preferences and user preferences into separate categories/commands:

- Rename “/cooldown” command to “/serverprefs cooldown” to make it clear that it
  is a server preference.
- Rename “/settings” command to “/userprefs” to make it clear that it is user
  preferences.

## [0.20.0]: 2023-10-19

### Added

- When a passage is on cooldown, the bot will react with a clock emoji.

### Fixed

- Remove inquiry when the user has confirmed that a chapter should be posted.
  Previously, the inquiry would still be part of the message when using the
  embed format.

## [0.19.0]: 2023-10-16

### Added

- Ask for confirmation when posting whole chapters.

### Changed

- Rename “PCE” to “KJV1900” so that it is more clear that it is the 1900 edition
  of the King James Version.

### Removed

- A colon is no longer required to post a single chapter.

## [0.18.0]: 2023-10-05

### Added

- Pure Cambridge Edition ([`@bible-api/bible-api@0.10.0`](https://github.com/bible-api-io/bible-api/releases/tag/v0.10.0)).

### Changed

- The default version is now the Pure Cambridge Edition.
- Update the [privacy policy] to include information about the new verse cooldown
  feature (again).

## [0.17.0]: 2023-10-05

### Changed

- Updated the [privacy policy] to improve clarity and include information about
  the new verse cooldown feature.

## [0.16.0]: 2023-10-03

### Added

- Verse cooldowns: the bot will not post the same verse in the same version
  within a default of 180 seconds (3 minutes) of the last time it was posted.
- `/cooldown` command to show and change the verse cooldown. Setting it to 0
  will disable the cooldown.

## [0.15.0]: 2023-09-24

### Added

- Latin Vulgate ([`@bible-api/bible-api@0.8.0`](https://github.com/bible-api-io/bible-api/releases/tag/v0.8.0)).

## [0.14.1]: 2023-09-25

### Fixed

- Do not post whole chapters when the user does not intend to.

## [0.14.0]: 2023-09-24

### Added

- Biblia Gdańska ([`@bible-api/bible-api@0.5.0`](https://github.com/bible-api-io/bible-api/releases/tag/v0.5.0)).

## [0.13.0]: 2023-09-23

### Changed

- Titles of Bible verses are now smaller in blockquotes.

## [0.12.1]: 2023-09-23

### Fixed

- Remove tailing greater-than signs (`>`) from Bible verses.

---

## [0.12.0]: 2023-09-23

### Added

- Ignore verses in \`backticks\` or code blocks.
- Add information about how to ignore verses in the introduction command (`/pbdb`).

### Fixed

- Ignore verses in `[square brackets]`.

---

## [0.11.0]: 2023-09-23

### Added

- Ability to specify a Bible version.
- Elzevir Textus Receptus (1624).
- Scrivener’s Textus Receptus (1894).
- Ability to post whole chapters. For example, `John 1` will post John 1:1–51.
- Ability to post cross-chapter verses (e.g. `John 1:1–2:1`).

### Changed

- Verses in the King James Version (1769) will now be postfixed with “(KJV1769)”
  instead of “(KJV)” to distinguish it from other editions of the KJV.
- Blockquotes now display the book name, chapter number(s), and verse number(s)
  in a heading instead of at the bottom of the blockquote.

### Removed

- No longer clamp the first verse in a range to one.
- No longer cap the last verse of a range to the number of verses in a chapter.

### Fixed

- Remove HTML tags from Bible verses.

---

## [0.10.0]: 2023-07-25

### Added

- Convert Markdown links to Discord Markdown links, including links to version
  tags in this changelog.

### Fixed

- Correct displaying of this changelog in `/changelog` command.

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
- new presence activity/status: `/pbdb | vMAJOR.minor.fix`.

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
- `/privacy` command to show [privacy policy].
- `/terms` command to show terms of service.
- `/settings` to configure the bot.
- Set nickname to `PBDB` when joining a server.
- Post Bible verses referenced in messages.

---

## [0.1.0]: 2023-06-11

### Added

- Bot goes online.

[`/term term:Elect`]: https://github.com/gimjb/pbdb/blob/v0.24.0/src/commands/term/elect.md
[`/term term:Conversion`]: https://github.com/gimjb/pbdb/blob/v0.24.0/src/commands/term/conversion.md
[`/term term:Eternal Salvation`]: https://github.com/gimjb/pbdb/blob/v0.24.0/src/commands/term/eternal-salvation.md
[`/term term:Eternal Life`]: https://github.com/gimjb/pbdb/blob/v0.24.0/src/commands/term/eternal-life.md
[`/term term:Gospel`]: https://github.com/gimjb/pbdb/blob/v0.24.0/src/commands/term/gospel.md
[`/term term:Temporal Salvation`]: https://github.com/gimjb/pbdb/blob/v0.24.0/src/commands/term/temporal-salvation.md
[`/term term:Regeneration`]: https://github.com/gimjb/pbdb/blob/v0.23.0/src/commands/term/regeneration.md

[privacy policy]: https://github.com/gimjb/pbdb/blob/master/docs/privacy.md
[unreleased]: https://github.com/gimjb/pbdb/compare/latest...develop
[0.24.0]: https://github.com/gimjb/pbdb/compare/v0.23.1...v0.24.0
[0.23.1]: https://github.com/gimjb/pbdb/compare/v0.23.0...v0.23.1
[0.23.0]: https://github.com/gimjb/pbdb/compare/v0.22.1...v0.23.0
[0.22.1]: https://github.com/gimjb/pbdb/compare/v0.22.0...v0.22.1
[0.22.0]: https://github.com/gimjb/pbdb/compare/v0.21.4...v0.22.0
[0.21.4]: https://github.com/gimjb/pbdb/compare/v0.21.3...v0.21.4
[0.21.3]: https://github.com/gimjb/pbdb/compare/v0.21.2...v0.21.3
[0.21.2]: https://github.com/gimjb/pbdb/compare/v0.21.1...v0.21.2
[0.21.1]: https://github.com/gimjb/pbdb/compare/v0.21.0...v0.21.1
[0.21.0]: https://github.com/gimjb/pbdb/compare/v0.20.0...v0.21.0
[0.20.0]: https://github.com/gimjb/pbdb/compare/v0.19.0...v0.20.0
[0.19.0]: https://github.com/gimjb/pbdb/compare/v0.18.0...v0.19.0
[0.18.0]: https://github.com/gimjb/pbdb/compare/v0.17.0...v0.18.0
[0.17.0]: https://github.com/gimjb/pbdb/compare/v0.16.0...v0.17.0
[0.16.0]: https://github.com/gimjb/pbdb/compare/v0.15.0...v0.16.0
[0.15.0]: https://github.com/gimjb/pbdb/compare/v0.14.1...v0.15.0
[0.14.1]: https://github.com/gimjb/pbdb/compare/v0.14.0...v0.14.1
[0.14.0]: https://github.com/gimjb/pbdb/compare/v0.13.0...v0.14.0
[0.13.0]: https://github.com/gimjb/pbdb/compare/v0.12.1...v0.13.0
[0.12.1]: https://github.com/gimjb/pbdb/compare/v0.12.0...v0.12.1
[0.12.0]: https://github.com/gimjb/pbdb/compare/v0.11.0...v0.12.0
[0.11.0]: https://github.com/gimjb/pbdb/compare/v0.10.0...v0.11.0
[0.10.0]: https://github.com/gimjb/pbdb/compare/v0.9.4...v0.10.0
[0.9.4]: https://github.com/gimjb/pbdb/compare/v0.9.3...v0.9.4
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
