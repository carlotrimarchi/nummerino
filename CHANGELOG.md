# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

## [0.2.0] - 2026-03-05

### Added

- CLI interface to convert numbers from the command line (`npm run cli -- <number>`)

## [0.1.0] - 2026-03-05

### Added

- `scales` dictionary with singular, plural and feminine forms for each scale (hundert, tausend, million…)
- `numberToText` function that converts numbers to German words written as separate tokens
- `getPlaceValues`, `getScale`, `groupByScale` as pure pipeline functions
- `smallValuesToWords` for ones, teens and tens (<100 numbers)
- `largeValuesToWords` for scaled values, handling singular/plural and feminine forms (eine Million, zwei Millionen)
- Full test coverage for all functions