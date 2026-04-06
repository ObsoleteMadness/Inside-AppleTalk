---
title: "Access Control Mechanisms in AFP"
source: "022_AppleTalkFilingProtocolEngineeringTechnicalNotes"
source_url: ""
pages: "27–30"
converted: "2026-04-04"
engine: "gemini-flash"
nav_order: 4
parent: "AFP Technical Notes"
layout: default
grand_parent: Books
---
# Access Control Mechanisms in AFP

| Field | Value |
|-------|-------|
| **Source** | 022_AppleTalkFilingProtocolEngineeringTechnicalNotes |
| **Chapter** | 4 |
| **Pages** | 27–30 |
| **Converted** | 2026-04-04 |
| **Engine** | gemini-flash |

---

# Chapter 4 Access Control Mechanisms in AFP

Access controls are built into AFP in three ways: user authentication at server login, an optional volume level password when first accessing ("opening") a volume, and directory-level access controls based on user authentication at login.

## User Authentication at Server Login

User authentication at server login time has already been discussed above. This is the first "line of defense" as far as access controls are concerned. A file server can be set up to turn away an unauthorized user at this level and thus maintain the privacy and security of the file server's volumes and their contents. It is important to note that the user authentication step is vital to the directory-level access controls discussed below.

## Volume Passwords

A second level of access control is provided through volume passwords. A server can associate an optional fixed-length 8-character password with each volume it is making visible through AFP.

As will become clear in the discussion of AFP calls, in order to make reference to a server volume the workstation must use a VolID. This VolID is obtained by the workstation through an FPOpenVol call in which the name of the volume is supplied as a call parameter. If the volume has a password associated with it, then the workstation must supply this password together with the FPOpenVol call in order to obtain the VolID (and hence the ability to issue AFP calls that make reference to that volume).

Volume passwords constitute a very simple protection mechanism for simple servers that do not wish to implement the full-fledged directory-level access control mechanism. Of course it is not as secure a mechanism either.

## Directory-Level Access Controls

AFP includes a directory-level access control mechanism that constitutes the most secure method provided in this protocol. Note that, as mentioned earlier, AFP does not support any file-level access controls.

The basic idea is that directories are containers that contain objects: other containers (directories) and files. A user that has been authenticated at the server login step can try to make four classes of accesses to the directory's contents:

* see *directories* contained within that directory
* see *files* contained within that directory

---

* *read the contents of an object* (or view its parameters) contained within that directory.
* *write the contents of an object* (or change its parameters) contained within that directory.

Permission to search a directory's contents allows the user to list the names and parameters of other files and/or directories contained in this directory. Access to the contents of an objects in a directory can be of two types: Read and/or Write. Setting (changing) the parameters of an object (file or directory) is considered as Writing to the object.

AFP includes mechanisms for restricting these classes of access (Search, Read, and Write access) at the level of each directory in the catalog tree. This is done as follows:

With each directory we associate an owner and a group of users. The owner is initially set to the ID of the user that created the directory; the group is initially set to the user's Primary group, if one exists. The Primary group is like any other group affiliation, except that it is the group that gets assigned to any new directories that the user creates.

AFP recognizes three different access rights: Search, Read, and Write. The file server must save, with each directory, three *Access Rights bytes*, corresponding respectively to the directory's owner, the directory's group, and the world. Each access rights byte is used as a bit map whose three least significant bits are used to encode the three different access rights allowed by AFP for the corresponding user (i.e. owner, group, or world). More specifically, each directory has associated with it the following five parameters:

* *owner ID* [4 bytes]
* *group ID* [4 bytes]
* *owner's Access Rights* [1 byte]
* *group's Access Rights* [1 byte]
* *world's Access Rights* [1 byte].

In addition, the server must maintain a one-to-one mapping between owner ID (user ID) and user name (a string of maximum length 31 characters), and between group ID and group name (also a string of at most 31 characters). AFP includes calls to allow users to map IDs to names and visa-versa.

The most significant 5 bits of each access rights byte must be zero (they are reserved for access rights extension in future versions of this protocol).

When a user logs in on a server, as part of the user authentication mechanism, various identifiers are retrieved from a *user data base* maintained on the server. These include the user ID (a 32-bit number unique among all server users) and one or more (the exact number is implementation dependent) 32-bit group IDs which indicate the user's group affiliations. One of these group IDs is special in that it represents the user's Primary Group. This number is assigned as the group ID of each directory created by the user. Assignment of user IDs, group IDs, and Primary Groups is an administrative function and is outside the scope of this document.

When this user tries to access a directory or its contents, the following algorithm is used by the server to extract the rights corresponding to that user (UARights) and that directory:

```
UARights := Directory's world access rights;
If (User's ID = Directory's owner ID) then
```

---

```
UARights := UARights OR Directory's owner's access rights;
If (any of User's group IDs = Directory's group ID) then
    UARights := UARights OR Directory's group's access rights
```

The OR operations in this algorithm are inclusive OR operations. Having given this algorithm for determining the UARights corresponding to a particular directory we can now examine in more detail what rights are required for various AFP operations. We use the following notation: SA = "search access rights to all ancestors down to but not including the Parent directory", WA = "search or write access to all ancestors down to but not including the Parent directory, Sp = "search access rights to the Parent directory", Wp = "write access rights to the Parent directory", Rp = "read access rights to the Parent directory".

Almost all operations require SA access, which means the user can only access the contents of an object in a given directory if he has permission to Search every directory in the path from the root to the parent's immediate parent directory. The exact access permitted to objects in the directory is then determined further by Sp, Rp and Wp rights for the Parent directory.

*Creating a File or a Directory:* The user must have WA plus Wp. Hard Create needs the same rights as deleting a file.

*Enumerate a Directory:* The user must have Search access rights to all directories down to but not necessarily including the directory being enumerated. To view its offspring that are directories, Search access to the directory being enumerated is required as well. To view its file offspring, Search access to the directory is not required, but the user must have Read access rights to the directory.

*Deleting a File.* The user must have SA, Rp, and Wp. Furthermore, a file can be deleted only if it is not open at that time.

*Delete a Directory:* The user must have SA, Sp, and Wp. Furthermore, a directory can be deleted only if it is empty.

*Rename a File:* The user must have SA, Rp, and Wp.

*Rename a Directory.* The user must have SA, Sp, and Wp.

*Get (Read) Directory Parameters:* All this requires are SA plus Sp access rights.

*Get (Read) File Parameters:* The user must have SA plus Rp.

*Open a File to Read its Contents:* A file's fork must be opened in read mode before its contents may be read. To open a file for read (and thus to be able to read from it) the user must have SA plus Rp.

*Open a File to Write its Contents:* A file's fork must be opened in write mode in order to write to the fork. To open a fork which is currently empty (both forks must be of zero-length) to write to it, the user must have WA plus Wp. To open an existing fork (either fork is of non-zero length) to write to it, SA, Rp, and Wp access is required.

***Set (Write) File Parameters:*** The user must have WA plus Wp to set the parameters of an empty file (when both forks are zero-length). To set the File Parameters on a non-empty (either fork) file, SA, Rp, and Wp access is required.

***Set (Write) Directory Parameters:*** The user must have SA, Sp, and Wp access to change a directory's parameters if the directory is non-empty. If the directory is empty, the user must have WA plus Wp to change its parameters.

***Move a Directory or a File:*** Through AFP a directory or a file can be moved from a source parent directory to a destination parent directory on the same volume. The user must have SA rights to the source parent directory, WA access to destination parent directory, plus Write access rights to both source and destination parents. Furthermore to move a file, the user needs in addition Read access rights to the source parent directory. To move a folder, Search access to the source parent directory is required in addition instead of Rp.

***Modify a Directory's Access Rights Information:*** A directory's Owner ID, Group ID, and three Access Rights bytes can be modified only if the user is the directory's owner and then only if the user has WA plus Wp or Sp access to the parent directory.

***Copy a file (FPCopyFile):*** To copy a file, possibly across volumes managed by the server, the user must have SA plus Rp to the source parent directory and WA plus Wp to the destination parent directory.

## Special Cases

OwnerID=0 means that the folder is "unowned" or owned by <any user>. The owner bit of the User Rights summary byte is always set for such a folder.

GroupID=0 means that the folder has no group affiliation; hence the group's access privileges (R, W, S) are ignored for such a folder.

