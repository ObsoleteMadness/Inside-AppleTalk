---
title: "User Authentication Methods"
source: "022_AppleTalkFilingProtocolEngineeringTechnicalNotes"
source_url: ""
pages: "113–114"
converted: "2026-04-04"
engine: "gemini-flash"
nav_order: 21
parent: "AFP Technical Notes"
layout: default
grand_parent: Books
---


# Appendix A User Authentication Methods

1. TOC
{:toc}

As noted in the main body of this document, AFP version 1.1 provides three standard user authentication methods. These correspond to UAM strings "NoUserAuthent", "Cleartxt passwd" and "Randnum exchange". [Note: these strings should be used in a case-insensitive fashion].

## No User Authentication

The first of these in fact corresponds to no user authentication (UAM = "No User Authent") and as such needs no specification. Thus, no user name or password information is required in the *FPLogin* command, which therefore has no *UserAuthInfo* field.

Any server can accept a user login using this method. If the server handles the user-authentication-based directory-level access control mechanism, then it must assign the user a special User ID and Group ID for that session, such that the user only obtains world's access rights for every directory in every server volume.

## User Authentication with Clear Text Password Transmission

The second standard method employs the transmission of the user's password in clear text (in addition to the user's name) in the *FPLogin* command packet. The *UserAuthInfo* part of the *FPLogin* command consists of the user's name (a string of up to 31 characters which follows the UAM field in the packet without padding) followed by a possible null byte and then the user's password. The user's password is an 8-byte quantity. If the user provides a shorter password then it must be padded (suffixed) with null ($00) bytes to make its length equal to 8 bytes. The permissible set of characters in passwords consists of all 8-bit characters with the most significant bit equal to 0.

User name comparison in servers must be case insensitive, but password comparison is to be case sensitive in this UserAuthenticationMethod. Of course, one could create a new UserAuthenticationMethod that performed case-insensitive password comparison.

It should be noted that this method should be used by workstations only if it is known that the intervening network is secure against "wire tapping", otherwise the password information can be picked up out of *FPLogin* command packets by anyone tapping the network.

## User Authentication Based on Random Number Exchange

In environments where the network is not secure against tapping, a more secure method based on a random number exchange between the server and the workstation can be used. In this method, the user's password is never sent over the network and hence cannot be picked up by tapping. In fact, it is essentially impossible (as secure as the basic encryption method) to derive the password from the information that is sent over the network.

The underlying idea of the method is that the server knows the user's password and it wants to find out if the user trying to log in knows this password as well. In a sense, the method tries to determine if the user and the server "share the same secret", the password, without sending the secret information over the network.

First, the user sends the FPLogin command packet with UAM corresponding to "Randnum exchange" and the UserAuthInfo containing the user's name string, which follows the UAM in the packet without padding.

Upon receiving this packet, the server examines its user data base to determine if this is a valid user name. If the user name is not found in the user data base, then an error is sent to the workstation indicating this result and login is denied. If the name is found in the user data base, then the server generates a random number (64 bits in length) and sends it back to the workstation. This is returned as the reply to the FPLogin call, along with an ID number and an AuthContinue error. Although not really an "error", this value is returned to indicate that all is well so far but the user is not yet authenticated.

The workstation uses the NBS data encryption standard (DES) algorithm to encrypt the random number, using the user's password (case-sensitive, same format as in the clear text UAM) as the encryption key. It sends the encrypted value (64 bits) back to the server in the UserAuthInfo parameter of the FPLoginCont call along with the ID number returned from the FPLogin call. This ID number merely helps the server associate the two calls and is not used again. The server compares the workstation's encrypted value with the encrypted value obtained using the password from its user data base. If the two encrypted values match, then the user is considered to have been authenticated and the login is successful. The FPLoginCont call will return NoErr if so, UserNotAuth if not. In either case, no reply data is returned.