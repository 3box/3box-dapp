[![Twitter Follow](https://img.shields.io/twitter/follow/3boxdb.svg?style=for-the-badge&label=Twitter)](https://twitter.com/3boxdb)
[![Discord](https://img.shields.io/discord/484729862368526356.svg?style=for-the-badge)](https://discordapp.com/invite/Z3f3Cxy)
[![CircleCI](https://img.shields.io/circleci/project/github/uport-project/3box-js.svg?style=for-the-badge)](https://circleci.com/gh/uport-project/3box-dapp) [![Greenkeeper badge](https://badges.greenkeeper.io/3box/3box-dapp.svg)](https://greenkeeper.io/)

# 3Box Profiles Application
This is the Github home of the [3Box Profiles Application](https://3box.io), which is deployed at https://3box.io. The 3Box Profiles Application allows users to:
* create a social web3 profile, which they can use to sign in to Ethereum applications
* store and manage their information on IPFS, in OrbitDB instances
* verify their Github and Twitter social accounts for use throughout the web3 dapp ecosystem
* view their unified Ethereum and integrated 3Box activity feed

### Getting Started
* New users [create a profile](https://3box.io/create)
* Existing users [sign in](https://3box.io)
* Experiencing an issue? Report it [here](https://github.com/uport-project/3box-dapp/issues/new)
* Want to contribute? Read our [contributor's guide](https://github.com/3box)
* f

# Components
## Social Profile
The primary feature of the 3Box Profiles App is that it allows Ethereum users to create a social profile for their Ethereum account. 3Box profiles consist of various public and encrypted information saved by the user and other applications (with the user's consent). 

### Public Profiles
Public profiles include information such as name, image, description, and emoji. They also include Twitter and Github account verifications. Applications can save additional information to the user's public profile, such as public group affiliations and more. Public profiles are available for all to query using the getProfile() method in the 3Box.js API, even without the user's consent – since the information is public.

### Private Profile
Private profiles include information such as email and birthday.

## Activity Feed
Activity feeds display a unified view on a user's activity from across various Ethereum networks, as well as within 3Box.

## Verifications

##

More




## Functionality
The first version of the 3box.io web application will allow users to:

1. Add/edit information to their public profile

2. Add/edit information to their private profile

3. View a feed of activity from across the Ethereum network


## 3Box Dapp Components
The 3Box dapp is built using open source components.

### 3Box DB
This is the core 3Box distributed database technology.

#### 3box-js
This is a client library that allows dapps to interface with 3Box.

#### 3box-address-server
This is a server that keeps track of the latest 3Box Address for an Ethereum address.

### Activity Feed

#### 3box-activity
This is an API that allows dapps to build an activity feed for an Ethereum account.
