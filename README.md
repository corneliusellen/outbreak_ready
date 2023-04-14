# README

## Getting Started

### Prerequisites

You must have PostgreSQL, Rails, and Bundler installed on your machine to use this repository.

### Installation
After cloning this repo, run the following command in your CLI:
```
$ bundle install
$ npm install
$ rake db:{create,migrate}
```

To run this application locally, run the following command and visit localhost:3000:
```
$ rails server
```

## Setup concerns

### Failures building Mimemagic gem
Add the following line to your Gemfile:
`gem 'mimemagic', github: 'mimemagicrb/mimemagic', ref: '01f92d86d15d85cfd0f20dabd025dcbd36a8a60f'` to Gemfile.
[source](https://stackoverflow.com/questions/66919504/your-bundle-is-locked-to-mimemagic-0-3-5-but-that-version-could-not-be-found)

### Puma not compiling
It's not compiling due to Clang issues with XCode tooling. Run the following command:
`$ gem install puma:4.3.5 -- --with-cflags="-Wno-error=implicit-function-declaration"`.
[source1](https://stackoverflow.com/questions/63187613/fail-to-bundle-install-puma-4-3-5-or-gem-puma-with-ruby-2-6-6-on-macos-10-15-6)
[source2](https://github.com/puma/puma/issues/2304#issuecomment-664448309)

### Node-Sass compatibility
If you're seeing something like this when running `yarn install --check-files` ... `node_modules/node-sass: Command failed`.
Your Nodejs version needs to be compatible with the repo's node-sass package. Set Nodejs version to `12.14.0` where current `node-sass` version is `4.13.0`.
[source](https://stackoverflow.com/a/56064364/2097966)
